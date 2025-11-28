import { Brain } from 'lucide-react';
import { useEffect, useRef } from 'react';

const AgentCore = ({ agentLogs }) => {
  const logsEndRef = useRef(null);
  
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [agentLogs]);

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm flex flex-col h-[600px] lg:h-auto relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/20">
          <Brain className="text-white" size={24} />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Agent Core</h3>
          <p className="text-xs text-slate-400 font-medium">Psycho-behavioral Analysis</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {agentLogs.map((log) => (
          <div 
            key={log.id} 
            className={`p-4 rounded-2xl border text-sm font-medium animate-fade-in ${
              log.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' : 
              log.type === 'success' ? 'bg-green-50 border-green-100 text-green-800' : 
              log.type === 'warning' ? 'bg-orange-50 border-orange-100 text-orange-800' : 
              'bg-slate-50 border-slate-100 text-slate-600'
            }`}
          >
            <div className="flex justify-between items-center mb-2 opacity-50 text-[10px] font-bold uppercase tracking-wider">
              <span>{log.time}</span>
              <span>LOG-ID-{log.id.toString().slice(-4)}</span>
            </div>
            {log.text}
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
      <div className="mt-6 pt-6 border-t border-slate-100 text-center">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Model: Vasooli-V1</p>
      </div>
    </div>
  );
};

export default AgentCore;

