import { Menu, Bell } from 'lucide-react';

const Header = ({ activeTab, onHome }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
      <div className="md:hidden flex items-center gap-2 cursor-pointer" onClick={onHome}>
        <Menu className="text-slate-900" />
        <span className="font-bold text-lg">GuardWallet</span>
      </div>
      <h2 className="hidden md:block text-xl font-bold text-slate-900 tracking-tight">{activeTab}</h2>
      <div className="flex items-center gap-4">
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

