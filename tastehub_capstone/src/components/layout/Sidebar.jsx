import { Shield, LayoutDashboard, Wallet, PieChart, Settings, LogOut, Bell } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, user, onLogout, onHome, onSwitchProfile }) => {
  const navItems = [
    { id: 'Dashboard', icon: LayoutDashboard },
    { id: 'Transactions', icon: Wallet },
    { id: 'Analytics', icon: PieChart },
    { id: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 hidden md:flex flex-col z-20">
      <div className="p-8 flex items-center gap-3 cursor-pointer" onClick={onHome}>
        <div className="bg-slate-900 p-2 rounded-xl shadow-lg shadow-slate-900/10">
          <Shield size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">GuardWallet</span>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              className={`flex items-center gap-3 w-full p-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={20} />
              {item.id}
            </button>
          );
        })}
      </nav>
      <div className="p-4 px-6 space-y-2">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-800">
          <p className="font-bold mb-1">💡 Demo Task:</p>
          <p className="leading-tight mb-2">Try adding an expense higher than the 'Safe' balance to trigger the AI block.</p>
        </div>
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.theme} flex items-center justify-center font-bold text-white text-sm shadow-md`}>
            {user.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
            <button onClick={onSwitchProfile} className="text-xs text-orange-600 hover:text-orange-700 font-bold">
              Switch Profile
            </button>
          </div>
          <LogOut 
            size={16} 
            className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer" 
            onClick={onLogout} 
            title="Log Out" 
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

