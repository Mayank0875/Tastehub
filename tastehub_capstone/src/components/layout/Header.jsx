import { Menu, Bell, Sparkles } from 'lucide-react';

const Header = ({ activeTab, onHome, agentMode, onShowGuide }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
      <div className="md:hidden flex items-center gap-2 cursor-pointer" onClick={onHome}>
        <Menu className="text-slate-900" />
        <span className="font-bold text-lg">GuardWallet</span>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{activeTab}</h2>
        {agentMode && (
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
              agentMode === 'Vasooli'
                ? 'bg-red-50 text-red-700 border-red-200'
                : agentMode === 'Strict'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            Mode: {agentMode}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {onShowGuide && (
          <button
            onClick={onShowGuide}
            className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            <Sparkles size={14} /> Guided Tour
          </button>
        )}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 shadow-sm text-slate-600 text-xs font-bold rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          AGENT ONLINE
        </div>
        <div className="w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:shadow-md transition-all cursor-pointer">
          <Bell size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;

