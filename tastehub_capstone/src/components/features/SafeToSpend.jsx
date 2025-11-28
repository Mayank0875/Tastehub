import { Plus, Minus } from 'lucide-react';

const SafeToSpend = ({ safeBalance, realBalance, lockRate, irregularityLabel, onAddIncome, onSpend }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-1 shadow-sm border border-slate-200">
      <div className="bg-slate-900 rounded-[2.3rem] p-10 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-orange-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3 group-hover:opacity-30 transition-opacity duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-3">Safe to Spend</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-bold tracking-tighter">₹{safeBalance.toLocaleString()}</span>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-slate-400 text-sm font-medium">
                *₹{(realBalance - safeBalance).toLocaleString()} is locked in the vault for rent.
              </p>
              {lockRate != null && (
                <p className="text-xs text-orange-200 font-semibold">
                  Current rule: <span className="text-white">{Math.round(lockRate * 100)}%</span> of every income is auto-locked
                  {irregularityLabel ? ` (Income rhythm: ${irregularityLabel})` : ''}.
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={onAddIncome}
              className="flex-1 md:flex-none h-14 px-6 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl font-bold backdrop-blur-sm transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              <Plus size={20} /> Add Income
            </button>
            <button 
              onClick={onSpend}
              className="flex-1 md:flex-none h-14 px-6 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2"
            >
              <Minus size={20} /> Spend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeToSpend;

