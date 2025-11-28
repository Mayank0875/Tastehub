import { X, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: '1. Launch Prototype with Rahul',
    detail: "Click 'Try Prototype', pick Rahul (High Risk) to trigger Vasooli Bhai in full mode.",
  },
  {
    title: '2. Force a blocked spend',
    detail: "On dashboard, tap 'Spend' and enter an amount larger than Safe to Spend. Watch the fear appeal.",
  },
  {
    title: '3. Open Analytics tab',
    detail: 'Play with the What-if sliders, FRS decomposition, and cancel a subscription under Sunk Cost Breaker.',
  },
];

const HowToDemoModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] flex items-center justify-center px-6">
      <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400"
        >
          <X size={18} />
        </button>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
          How to demo GuardWallet
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Get the Vasooli Experience in 60 seconds</h3>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-3 items-start bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <CheckCircle className="text-orange-500 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-slate-900 text-sm">{step.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-sm tracking-wide"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default HowToDemoModal;
