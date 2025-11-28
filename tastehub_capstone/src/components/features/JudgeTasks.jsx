const JudgeTasks = ({ tasks = [] }) => {
  if (!tasks.length) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Judge Checklist</p>
      <h4 className="text-lg font-bold text-slate-900 mb-4">3-minute Vasooli Flow</h4>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 rounded-2xl border text-sm font-medium ${
              task.done
                ? 'bg-green-50 border-green-100 text-green-700'
                : 'bg-slate-50 border-slate-100 text-slate-500'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                task.done ? 'bg-green-600 text-white border-green-600' : 'border-slate-200'
              }`}
            >
              {task.done ? '✓' : task.step}
            </span>
            <div>
              <p className={`font-semibold ${task.done ? 'text-green-800' : 'text-slate-700'}`}>
                {task.title}
              </p>
              <p className="text-[11px] text-slate-500">{task.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JudgeTasks;
