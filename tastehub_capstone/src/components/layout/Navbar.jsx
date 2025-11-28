import { Shield, ArrowLeft } from 'lucide-react';

const Navbar = ({ 
  onHome, 
  showBackButton = false, 
  showTryButton = false, 
  onStartDemo,
  onOpenHowTo,
  onToggleJudgeMode,
  judgeMode,
  onShowGuide
}) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#F5F5F7]/80 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2 cursor-pointer group">
          <Shield className="w-6 h-6 text-slate-900 fill-current group-hover:text-orange-600 transition-colors" />
          <span className="font-bold text-lg tracking-tight group-hover:text-orange-600 transition-colors">GuardWallet</span>
        </button>
        <div className="flex items-center gap-3">
          {!showBackButton && !showTryButton && (
            <div className="hidden md:flex gap-8 text-xs font-semibold tracking-wide text-slate-500">
              <a href="#agent" className="hover:text-slate-900 cursor-pointer transition-colors">THE AGENT</a>
              <a href="#philosophy" className="hover:text-slate-900 cursor-pointer transition-colors">PHILOSOPHY</a>
              <a href="#blueprint" className="hover:text-slate-900 cursor-pointer transition-colors">BLUEPRINT</a>
            </div>
          )}
          {showBackButton && (
            <button 
              onClick={onHome}
              className="text-slate-500 hover:text-slate-900 text-xs font-bold uppercase tracking-wide flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Back to Home
            </button>
          )}
          {showTryButton && (
            <>
              <button
                onClick={onToggleJudgeMode}
                className={`hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold border ${
                  judgeMode
                    ? 'bg-red-50 text-red-600 border-red-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {judgeMode ? 'Judge Mode: ON' : 'Enter Judge Mode'}
              </button>
              <button
                onClick={onOpenHowTo}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                Demo Script
              </button>
              <button
                onClick={onShowGuide}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                Guided Tour
              </button>
              <button 
                onClick={onStartDemo}
                className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg shadow-slate-900/10"
              >
                Try Prototype
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

