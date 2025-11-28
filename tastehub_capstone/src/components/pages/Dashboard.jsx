import { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import SafeToSpend from '../features/SafeToSpend';
import VasooliScore from '../features/VasooliScore';
import RentSecured from '../features/RentSecured';
import TransactionsList from '../features/TransactionsList';
import AnalyticsView from '../features/AnalyticsView';
import SettingsView from '../features/SettingsView';
import AgentCore from '../features/AgentCore';
import TransactionModal from '../features/TransactionModal';
import JudgeTasks from '../features/JudgeTasks';
import { generateFinancialData } from '../../services/financialDataService';

const Dashboard = ({ user, onLogout, onHome, onSwitchProfile, judgeMode = false, onShowGuide }) => {
  if (!user) {
    return (
      <div className="h-screen bg-[#F5F5F7] flex flex-col items-center justify-center text-slate-700">
        <p className="text-lg font-bold mb-4">No profile selected</p>
        <button
          onClick={onHome}
          className="px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-bold"
        >
          Back to Landing
        </button>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('Dashboard'); 
  const [realBalance, setRealBalance] = useState(user.realBalance || 0);
  const [safeBalance, setSafeBalance] = useState(user.safeBalance || 0);
  const [transactions, setTransactions] = useState([]);
  const [vasooliScore, setVasooliScore] = useState(0);
  const [rentSecured, setRentSecured] = useState(0);
  const [agentMode, setAgentMode] = useState('Advisor'); // Advisor | Strict | Vasooli
  const [irregularityLabel, setIrregularityLabel] = useState('Analysing');
  const [lockRate, setLockRate] = useState(user.risk === 'High' ? 0.3 : 0.15);
  const [loadingAI, setLoadingAI] = useState(true);
  const [aiStatus, setAiStatus] = useState("Initializing Agent...");
  const [agentLogs, setAgentLogs] = useState([
    { id: 1, time: 'Now', text: `System initialized for ${user.name}.`, type: 'info' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState('EARN'); 
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);
  const [judgeTasksState, setJudgeTasksState] = useState({
    spendBlocked: false,
    analyticsVisited: false,
    subscriptionCancelled: false,
  });

  const markTask = (key) => {
    setJudgeTasksState((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  };
  
  // --- Helpers ---
  const computeIrregularity = (txs) => {
    const incomes = txs.filter((t) => t.type === 'income');
    if (incomes.length <= 1) return 'Stable';
    const amounts = incomes.map((t) => Math.abs(t.amount));
    const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    if (!mean) return 'Stable';
    const variance =
      amounts.reduce((sum, val) => sum + (val - mean) * (val - mean), 0) / amounts.length;
    const stdDev = Math.sqrt(variance);
    const cv = stdDev / mean; // coefficient of variation
    if (cv > 0.7) return 'Chaotic';
    if (cv > 0.3) return 'Unsteady';
    return 'Stable';
  };

  const getLockRate = (risk, irregularity) => {
    if (irregularity === 'Chaotic') return 0.4;
    if (irregularity === 'Unsteady') return risk === 'High' ? 0.35 : 0.25;
    return risk === 'High' ? 0.3 : 0.18;
  };

  const computeAgentMode = (score, rent) => {
    if (rent < 60 || score > 75) return 'Vasooli';
    if (rent < 80 || score > 50) return 'Strict';
    return 'Advisor';
  };

  const recomputeDerivedState = (txs, scoreVal, rentVal) => {
    const irr = computeIrregularity(txs);
    setIrregularityLabel(irr);
    setLockRate(getLockRate(user.risk, irr));
    setAgentMode(computeAgentMode(scoreVal, rentVal));
  };

  useEffect(() => {
    if (activeTab === 'Analytics') {
      markTask('analyticsVisited');
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoadingAI(true);
      setAiStatus("Connecting to Bank API...");
      await new Promise(r => setTimeout(r, 1000));
      
      setAiStatus("Reading Transaction History...");
      await new Promise(r => setTimeout(r, 1000));

      setAiStatus("AI Profiling & Fine-Tuning...");
      const data = await generateFinancialData(user);
      
      setTransactions(data.transactions);
      setSafeBalance(data.safeBalance);
      setRealBalance(data.realBalance);
      setVasooliScore(data.vasooliScore);
      setRentSecured(data.rentSecured);
      recomputeDerivedState(data.transactions, data.vasooliScore, data.rentSecured);
      
      setLoadingAI(false);
      addLog("History generated via LLM. Risk Profile active.", "success");
    };
    fetchHistory();
  }, [user]);

  const addLog = (text, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAgentLogs(prev => [...prev, { id: Date.now(), time, text, type }]);
  };

  const handleTransaction = () => {
    const val = parseFloat(amount);
    if (!val) return;
    setLoadingAction(true);
    setTimeout(() => {
      const newTxId = Date.now();
      const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (actionType === 'EARN') {
        const taxRate = lockRate; 
        const tax = Math.floor(val * taxRate);
        const safe = val - tax;
        setRealBalance(prev => prev + val);
        setSafeBalance(prev => prev + safe);
        const newTx = { id: newTxId, desc: desc || user.incomeSource, amount: val, status: `Locked (${Math.round(taxRate*100)}%)`, type: 'income', date: `Today, ${timeString}` };
        setTransactions(prev => {
          const updated = [newTx, ...prev];
          recomputeDerivedState(updated, vasooliScore, rentSecured);
          return updated;
        });
        addLog(`Income detected: ₹${val}. Applying Partitioning.`, 'info');
        setTimeout(() => addLog(`Vasooli Successful. Locked ₹${tax}.`, 'success'), 600);
      } else {
        addLog(`Spending request: ₹${val}...`, 'info');
        if (val > safeBalance) {
          const newTx = { id: newTxId, desc: desc || "Attempted Spend", amount: val, status: 'BLOCKED BY AGENT', type: 'blocked', date: `Today, ${timeString}` };
          setTransactions(prev => {
            const updated = [newTx, ...prev];
            // blocked spend => likely switch to harsher mode
            setAgentMode('Vasooli');
            return updated;
          });
          markTask('spendBlocked');
          setTimeout(() => addLog(`CRITICAL: User ignoring future rent. REJECTED.`, 'error'), 600);
          alert("🛑 VASOOLI BHAI SAYS: \n\n'Pagal hai kya? Rent tera baap bharega?' \n\nTransaction Rejected.");
        } else {
          setRealBalance(prev => prev - val);
          setSafeBalance(prev => prev - val);
          const newTx = { id: newTxId, desc: desc || "Expense", amount: val, status: 'Approved', type: 'expense', date: `Today, ${timeString}` };
          setTransactions(prev => {
            const updated = [newTx, ...prev];
            recomputeDerivedState(updated, vasooliScore, rentSecured);
            return updated;
          });
          setTimeout(() => addLog(`Analysis: Expense allowed.`, 'success'), 600);
        }
      }
      setLoadingAction(false);
      setIsModalOpen(false);
      setAmount('');
      setDesc('');
    }, 800);
  };

  if (loadingAI) {
    return (
      <div className="h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 size={48} className="text-orange-500 animate-spin mb-6" />
        <h2 className="text-2xl font-bold tracking-tight">{aiStatus}</h2>
        <p className="text-slate-400 text-sm mt-2">Generative AI is analyzing spending patterns...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F5F5F7] font-sans text-slate-800 overflow-hidden selection:bg-orange-200">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onLogout={onLogout} 
        onHome={onHome} 
        onSwitchProfile={onSwitchProfile} 
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header activeTab={activeTab} onHome={onHome} agentMode={agentMode} onShowGuide={onShowGuide} />

        <div className="flex-1 overflow-auto p-4 md:p-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'Dashboard' && (
                <>
                  {judgeMode && (
                    <JudgeTasks
                      tasks={[
                        {
                          id: 't1',
                          step: '1',
                          title: 'Force a blocked spend',
                          detail: 'Hit “Spend” with amount greater than Safe balance to hear Vasooli Bhai.',
                          done: judgeTasksState.spendBlocked
                        },
                        {
                          id: 't2',
                          step: '2',
                          title: 'Open Analytics tab',
                          detail: 'FRS breakdown, causal map, and What-if simulator explain the math.',
                          done: judgeTasksState.analyticsVisited
                        },
                        {
                          id: 't3',
                          step: '3',
                          title: 'Cancel a sunk cost subscription',
                          detail: 'Under Sunk Cost Breaker, cancel Hotstar to see intervention logging.',
                          done: judgeTasksState.subscriptionCancelled
                        },
                      ]}
                    />
                  )}
                  <SafeToSpend 
                    safeBalance={safeBalance}
                    realBalance={realBalance}
                    lockRate={lockRate}
                    irregularityLabel={irregularityLabel}
                    onAddIncome={() => { setActionType('EARN'); setIsModalOpen(true); }}
                    onSpend={() => { setActionType('SPEND'); setIsModalOpen(true); }}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <VasooliScore score={vasooliScore} />
                    <RentSecured rentSecured={rentSecured} rentDue={user.rentDue || "Tomorrow"} />
                  </div>
                </>
              )}
              {activeTab === 'Transactions' && <TransactionsList transactions={transactions} />}
              {activeTab === 'Analytics' && (
                <AnalyticsView 
                  score={vasooliScore} 
                  rentSecured={rentSecured} 
                  safeBalance={safeBalance}
                  realBalance={realBalance}
                  transactions={transactions}
                  irregularityLabel={irregularityLabel}
                  lockRate={lockRate}
                  onSubscriptionCancelled={() => markTask('subscriptionCancelled')}
                />
              )}
              {activeTab === 'Settings' && <SettingsView />}
            </div>
            {/* Right Column - BRAIN */}
            <AgentCore agentLogs={agentLogs} />
          </div>
        </div>
      </main>
      
      {/* Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actionType={actionType}
        amount={amount}
        setAmount={setAmount}
        desc={desc}
        setDesc={setDesc}
        onSubmit={handleTransaction}
        loading={loadingAction}
        user={user}
      />
    </div>
  );
};

export default Dashboard;

