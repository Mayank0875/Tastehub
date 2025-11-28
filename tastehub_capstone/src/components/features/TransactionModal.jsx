import Modal from '../ui/Modal';

const TransactionModal = ({ isOpen, onClose, actionType, amount, setAmount, desc, setDesc, onSubmit, loading, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={actionType === 'EARN' ? 'Add Income' : 'Record Expense'} loading={loading}>
      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Description</label>
          <input 
            autoFocus 
            type="text" 
            value={desc} 
            onChange={e => setDesc(e.target.value)} 
            placeholder={actionType === 'EARN' ? user.incomeSource : "Coffee, Uber, etc."} 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 focus:border-slate-900 focus:ring-0 outline-none text-lg font-medium transition-all placeholder:text-slate-300" 
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Amount (₹)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            placeholder="0" 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 focus:border-slate-900 focus:ring-0 outline-none text-3xl font-bold text-slate-900 transition-all placeholder:text-slate-300" 
          />
        </div>
        <button 
          onClick={onSubmit} 
          disabled={!amount || loading} 
          className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl transform active:scale-95 transition-all flex items-center justify-center gap-2 text-lg ${
            actionType === 'EARN' ? 'bg-slate-900 hover:bg-slate-800' : 'bg-orange-600 hover:bg-orange-500'
          }`}
        >
          {loading ? 'Processing...' : 'Confirm'}
        </button>
      </div>
    </Modal>
  );
};

export default TransactionModal;

