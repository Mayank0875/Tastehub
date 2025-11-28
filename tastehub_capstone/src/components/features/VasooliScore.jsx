const VasooliScore = ({ score }) => {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Vasooli Score</h4>
        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
          Calculated by AI
        </span>
      </div>
      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-bold text-slate-900">{score}</span>
        <span className="text-sm text-slate-400 font-bold mb-1.5">/ 100</span>
      </div>
      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
        <div className="bg-slate-900 h-full rounded-full" style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
};

export default VasooliScore;

