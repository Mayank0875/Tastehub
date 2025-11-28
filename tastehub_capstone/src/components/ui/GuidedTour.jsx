import { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

const GuidedTour = ({ visible, steps = [], onFinish }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (visible) {
      setIndex(0);
    }
  }, [visible]);

  if (!visible || steps.length === 0) return null;

  const step = steps[index];
  const onNext = () => {
    if (index === steps.length - 1) {
      onFinish?.();
      return;
    }
    setIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const skip = () => {
    onFinish?.();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[80] flex items-center justify-center px-6">
      <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 relative shadow-2xl">
        <button
          onClick={skip}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400"
        >
          <X size={18} />
        </button>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
          Step {index + 1} / {steps.length}
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">{step.description}</p>
        {step.hint && (
          <div className="text-xs bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-600 mb-6">
            {step.hint}
          </div>
        )}
        <div className="flex items-center justify-between">
          <button onClick={skip} className="text-xs font-bold uppercase tracking-wide text-slate-400 hover:text-slate-600">
            Skip Tour
          </button>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold"
          >
            {index === steps.length - 1 ? 'Done' : 'Next'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;
