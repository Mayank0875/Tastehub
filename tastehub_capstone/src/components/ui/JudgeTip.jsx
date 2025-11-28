import { Info } from 'lucide-react';

const JudgeTip = ({ text }) => (
  <div className="bg-amber-50 border border-amber-100 text-amber-900 px-4 py-3 rounded-xl text-sm font-medium flex gap-3 items-start animate-fade-in mb-6 shadow-sm">
    <div className="bg-amber-100 p-1 rounded-md mt-0.5">
      <Info size={16} className="text-amber-700" />
    </div>
    <div>
      <p className="font-bold text-amber-900 text-xs uppercase tracking-wider mb-1">👨‍⚖️ Judge's Guide</p>
      {text}
    </div>
  </div>
);

export default JudgeTip;

