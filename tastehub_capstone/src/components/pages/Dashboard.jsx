import { useState, useEffect } from 'react';
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
import { generateFinancialData } from '../../services/financialDataService';

const Dashboard = ({ user, onLogout, onHome, onSwitchProfile }) => {
  const [activeTab, setActiveTab] = useState('Dashboard'); 
  const [realBalance, setRealBalance] = useState(user.realBalance || 0);
  const [safeBalance, setSafeBalance] = useState(user.safeBalance || 0);
  const [transactions, setTransactions] = useState([]);
  const [vasooliScore, setVasooliScore] = useState(0);
  const [rentSecured, setRentSecured] = useState(0);
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
        const taxRate = user.risk === 'High' ? 0.30 : 0.15; 
        const tax = Math.floor(val * taxRate);
        const safe = val - tax;
        setRealBalance(prev => prev + val);
        setSafeBalance(prev => prev + safe);
        const newTx = { id: newTxId, desc: desc || user.incomeSource, amount: val, status: `Locked (${taxRate*100}%)`, type: 'income', date: `Today, ${timeString}` };
        setTransactions(prev => [newTx, ...prev]);
        addLog(`Income detected: ₹${val}. Applying Partitioning.`, 'info');
        setTimeout(() => addLog(`Vasooli Successful. Locked ₹${tax}.`, 'success'), 600);
      } else {
        addLog(`Spending request: ₹${val}...`, 'info');
        if (val > safeBalance) {
          const newTx = { id: newTxId, desc: desc || "Attempted Spend", amount: val, status: 'BLOCKED BY AGENT', type: 'blocked', date: `Today, ${timeString}` };
          setTransactions(prev => [newTx, ...prev]);
          setTimeout(() => addLog(`CRITICAL: User ignoring future rent. REJECTED.`, 'error'), 600);
          alert("🛑 VASOOLI BHAI SAYS: \n\n'Pagal hai kya? Rent tera baap bharega?' \n\nTransaction Rejected.");
        } else {
          setRealBalance(prev => prev - val);
          setSafeBalance(prev => prev - val);
          const newTx = { id: newTxId, desc: desc || "Expense", amount: val, status: 'Approved', type: 'expense', date: `Today, ${timeString}` };
          setTransactions(prev => [newTx, ...prev]);
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
        <Header activeTab={activeTab} onHome={onHome} />

        <div className="flex-1 overflow-auto p-4 md:p-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'Dashboard' && (
                <>
                  <SafeToSpend 
                    safeBalance={safeBalance}
                    realBalance={realBalance}
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
              {activeTab === 'Analytics' && <AnalyticsView score={vasooliScore} rentSecured={rentSecured} />}
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

