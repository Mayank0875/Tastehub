import { AlertTriangle, Lock, Activity, ArrowRight, Brain } from 'lucide-react';
import React, { useMemo, useState } from 'react';

const AnalyticsView = ({ 
  score, 
  rentSecured,
  safeBalance,
  realBalance,
  transactions,
  irregularityLabel,
  lockRate,
  onSubscriptionCancelled
}) => {
  // --- FRS Decomposition (toy math just for explanation) ---
  const { sri, vi, lambda } = useMemo(() => {
    // Very simple mapping just for demo: high score => better SRI, lower VI
    const normalized = Math.min(Math.max(score / 100, 0), 1);
    const lambdaVal = 0.6;
    const sriVal = 0.3 + normalized * 0.7;      // 0.3 - 1.0
    const viVal = 1 - normalized * 0.7;         // 1.0 - 0.3
    return { sri: sriVal, vi: viVal, lambda: lambdaVal };
  }, [score]);

  // --- Income Irregularity Quick Stats ---
  const incomeCount = useMemo(
    () => transactions.filter((t) => t.type === 'income').length,
    [transactions]
  );

  // --- Sunk Cost Breaker (local demo state) ---
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Hotstar', amount: 149, usedHours: 0, status: 'Active', recommended: true },
    { id: 2, name: 'Spotify', amount: 129, usedHours: 1, status: 'Active', recommended: true },
    { id: 3, name: 'Gym Membership', amount: 799, usedHours: 0, status: 'Active', recommended: true },
  ]);

  const cancelSubscription = (sub) => {
    setSubscriptions((prev) =>
      prev.map((s) =>
        s.id === sub.id ? { ...s, status: 'Cancelled by Vasooli', recommended: false } : s
      )
    );
    // NOTE: For now this only updates the UI; logging is handled in Dashboard's AgentCore.
    onSubscriptionCancelled?.();
  };

  // --- What-if Simulator ---
  const [whatIfRent, setWhatIfRent] = useState(8000);
  const [whatIfWants, setWhatIfWants] = useState(300); // daily wants

  const rentOutcome = useMemo(() => {
    if (!safeBalance || safeBalance <= 0) {
      return { daysToSafe: Infinity, verdict: 'At current behavior, rent is NOT secured.', tone: 'bad' };
    }
    const dailyWants = whatIfWants;
    const daysUntilRentAtRisk = Math.floor(safeBalance / dailyWants || 0);
    const alreadyCovered = safeBalance >= whatIfRent;
    if (alreadyCovered) {
      return {
        daysToSafe: 0,
        verdict: 'Rent already jugad. Even if you keep current wants, month-end is safe.',
        tone: 'good',
      };
    }
    if (daysUntilRentAtRisk < 10) {
      return {
        daysToSafe: daysUntilRentAtRisk,
        verdict: `Iss speed pe ${daysUntilRentAtRisk} din baad rent ka paisa khatam. Cut wants or get ready for Vasooli.`,
        tone: 'bad',
      };
    }
    return {
      daysToSafe: daysUntilRentAtRisk,
      verdict: `If you control wants to ₹${dailyWants}/day, rent is mostly safe for this month.`,
      tone: 'ok',
    };
  }, [safeBalance, whatIfRent, whatIfWants]);
  return (
    <div className="animate-fade-in p-2">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Apna Hisaab (Analytics)</h3>

      {/* ROW 0: FRS Decomposition + Causal Mini-Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* FRS Decomposition */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
            FRS Decomposition (Cobb-Douglas)
          </h4>
          <p className="text-xs text-slate-500 mb-3">
            FRS ≈ 100 · SRI<sup>λ</sup> · (1 - VI)<sup>1-λ</sup> &nbsp; where λ ≈ {Math.round(lambda * 100)}%
          </p>
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-slate-50 rounded-2xl p-3">
              <p className="font-bold text-slate-400 uppercase tracking-widest mb-1">SRI</p>
              <p className="text-lg font-bold text-emerald-600">
                {(sri * 100).toFixed(0)}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Self-Regulation</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3">
              <p className="font-bold text-slate-400 uppercase tracking-widest mb-1">VI</p>
              <p className="text-lg font-bold text-red-600">
                {(vi * 100).toFixed(0)}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Vulnerability</p>
            </div>
            <div className="bg-slate-900 text-white rounded-2xl p-3">
              <p className="font-bold text-slate-400 uppercase tracking-widest mb-1">FRS</p>
              <p className="text-lg font-bold">{score}</p>
              <p className="text-[10px] text-slate-400 mt-1">Financial Resilience</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            Translation: You are {score >= 60 ? 'holding things together but vulnerable to shocks' : 'at high risk of month-end crash'}.
          </p>
        </div>

        {/* Causal Mini-Graph */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 opacity-80" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Brain size={16} /> Causal Map
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                Toy Neuro-Symbolic View
              </span>
            </div>
            <div className="flex flex-wrap gap-2 items-center text-[11px]">
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                Income Volatility
              </span>
              <ArrowRight size={14} className="text-slate-500" />
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                Impulse Spend
              </span>
              <ArrowRight size={14} className="text-slate-500" />
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                Rent Default Risk
              </span>
              <ArrowRight size={14} className="text-slate-500" />
              <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/60 text-orange-100">
                Vasooli Mode
              </span>
            </div>
            <p className="mt-4 text-[11px] text-slate-300 leading-relaxed">
              Jab income {irregularityLabel === 'Chaotic' ? 'ultra irregular' : 'unstable'} ho + impulse spends badh jaate hain,
              model rent default risk ko spike karta hai and Vasooli mode ON ho jaata hai.
            </p>
          </div>
        </div>
      </div>

      {/* ROW 1: Existing spend breakdown + Vasooli report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Paisa Kahan Gaya?</h4>
          <div className="flex items-center gap-8 justify-center mb-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="60, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="40, 100" strokeDashoffset="-60" />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-2xl font-bold text-slate-800">Total</span><br/>
                <span className="text-xs text-slate-500">₹15k</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-bold text-slate-700">Zaroori (Needs)</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-bold text-slate-700">Faltu (Wants)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Vasooli Report Card</h4>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Vasooli Score</p>
                  <p className="text-xs text-slate-500">Lower is better</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                  {score} (High)
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Lock size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Rent Jugad</p>
                  <p className="text-xs text-slate-500">Secured in Vault</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-slate-900">{rentSecured}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: Income Rhythm + What-if & Sunk Cost Breaker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Income Rhythm */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
            Income Rhythm
          </h4>
          <p className="text-xs text-slate-500 mb-4">
            We approximate how \"chaotic\" your payouts are to decide how aggressive the vault should be.
          </p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Pattern
              </p>
              <p className="text-lg font-bold text-slate-900">
                {irregularityLabel || 'Analysing...'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {incomeCount} income hits observed in last window.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Lock Rule
              </p>
              <p className="text-lg font-bold text-orange-600">
                {lockRate != null ? `${Math.round(lockRate * 100)}%` : '--'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                More chaos ⇒ more rent auto-locked.
              </p>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex gap-1 h-10 items-end">
              {[4, 7, 2, 9, 5, 8].map((h, idx) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="flex-1 bg-slate-100 rounded-t-full overflow-hidden"
                >
                  <div
                    className="w-full bg-slate-900 rounded-t-full"
                    style={{ height: `${20 + h * 6}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What-if Simulator */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
            What-if: Rent Survival
          </h4>
          <p className="text-xs text-slate-500 mb-3">
            Play with rent and daily \"faltu\" spend to see how fast Vasooli Bhai will have to show up.
          </p>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-600">Monthly Rent</span>
                <span className="font-mono text-slate-900">₹{whatIfRent}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="20000"
                step="500"
                value={whatIfRent}
                onChange={(e) => setWhatIfRent(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-600">Daily Wants Spend</span>
                <span className="font-mono text-slate-900">₹{whatIfWants}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={whatIfWants}
                onChange={(e) => setWhatIfWants(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-4 p-3 rounded-2xl text-xs border flex flex-col gap-1"
            style={{
              borderColor:
                rentOutcome.tone === 'good'
                  ? '#22c55e55'
                  : rentOutcome.tone === 'bad'
                  ? '#ef444455'
                  : '#eab30855',
              backgroundColor:
                rentOutcome.tone === 'good'
                  ? '#ecfdf3'
                  : rentOutcome.tone === 'bad'
                  ? '#fef2f2'
                  : '#fffbeb',
            }}
          >
            <p className="font-semibold text-slate-900">
              Safe balance: ₹{safeBalance.toLocaleString()}
            </p>
            <p className="font-mono">
              Est. days until rent at risk:{" "}
              {rentOutcome.daysToSafe === Infinity ? '∞' : rentOutcome.daysToSafe}
            </p>
            <p className="text-[11px] mt-1">{rentOutcome.verdict}</p>
          </div>
        </div>

        {/* Sunk Cost Breaker */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
            Sunk Cost Breaker
          </h4>
          <p className="text-xs text-slate-500 mb-3">
            Subscriptions jo sirf paisa kha rahe hain, value nahi de rahe – Vasooli Bhai autoflag karta hai.
          </p>
          <div className="space-y-2 text-xs flex-1 overflow-auto">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="border border-slate-200 rounded-2xl px-3 py-2 flex items-center justify-between gap-2"
              >
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{sub.name}</p>
                  <p className="text-[11px] text-slate-500">
                    ₹{sub.amount}/month • Used {sub.usedHours} hrs last 30 days
                  </p>
                  {sub.recommended && (
                    <p className="text-[10px] text-red-600 font-semibold mt-0.5">
                      Total sunk cost. Recommendation: CANCEL.
                    </p>
                  )}
                  {sub.status.startsWith('Cancelled') && (
                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                      Cancelled. Vasooli saved this leak.
                    </p>
                  )}
                </div>
                <button
                  disabled={sub.status.startsWith('Cancelled')}
                  onClick={() => cancelSubscription(sub)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    sub.status.startsWith('Cancelled')
                      ? 'bg-slate-100 text-slate-400 cursor-default'
                      : 'bg-red-600 text-white hover:bg-red-500'
                  }`}
                >
                  {sub.status.startsWith('Cancelled') ? 'Done' : 'Cancel'}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-slate-400">
            Sunk cost fallacy todne ke liye, agent aggressively low-usage subs pe attack karta hai.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;

