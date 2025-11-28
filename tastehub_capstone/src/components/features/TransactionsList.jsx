import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const TransactionsList = ({ transactions }) => {
  return (
    <div className="animate-fade-in p-2">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Recent Transactions</h3>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {transactions.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            <p>No transactions yet. AI is fetching history...</p>
          </div>
        )}
        {transactions.map((tx) => (
          <div 
            key={tx.id} 
            className={`flex items-center justify-between p-5 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${
              tx.type === 'blocked' ? 'bg-red-50/50' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'income' ? 'bg-green-100 text-green-600' : 
                tx.type === 'blocked' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {tx.type === 'income' ? <ArrowLeft size={18} className="rotate-[-45deg]" /> : 
                 tx.type === 'blocked' ? <X size={18} /> : <ArrowRight size={18} className="rotate-[-45deg]" />}
              </div>
              <div>
                <p className="font-bold text-slate-900">{tx.desc}</p>
                <p className="text-xs text-slate-400 font-medium">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${
                tx.type === 'income' ? 'text-green-600' : 
                tx.type === 'blocked' ? 'text-red-500 line-through opacity-70' : 'text-slate-900'
              }`}>
                {tx.type === 'income' ? '+' : '-'} ₹{Math.abs(tx.amount)}
              </p>
              <p className={`text-[10px] font-bold uppercase tracking-wide ${
                tx.type === 'blocked' ? 'text-red-600' : 'text-slate-400'
              }`}>
                {tx.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;

