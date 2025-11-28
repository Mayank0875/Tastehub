import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl transform transition-all scale-100 relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center text-center backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-slate-900 text-lg">Analyzing Risk...</p>
            <p className="text-sm text-slate-500">Checking Streak Consistency Score</p>
          </div>
        )}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="text-slate-400" size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

