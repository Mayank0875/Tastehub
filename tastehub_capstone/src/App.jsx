import { useState } from 'react';
import LandingPage from './components/pages/LandingPage';
import ProfileSelection from './components/pages/ProfileSelection';
import Dashboard from './components/pages/Dashboard';

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('landing'); 
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const startDemo = () => {
    setLoading(true);
    setTimeout(() => {
      setView('profiles');
      setLoading(false);
    }, 800);
  };

  const selectProfile = (profile) => {
    setLoading(false); 
    setCurrentUser(profile);
    setView('dashboard');
  };

  const logout = () => {
    setView('landing');
    setCurrentUser(null);
  };

  const goHome = () => {
    setView('landing');
    setCurrentUser(null);
  };

  const switchProfile = () => {
    setView('profiles');
    setCurrentUser(null);
  }

  if (loading) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">GuardWallet</h2>
        <p className="text-slate-400 text-sm mt-2 font-medium">Initializing Agent Interface...</p>
      </div>
    );
  }

  return (
    <>
      {view === 'landing' && <LandingPage onStartDemo={startDemo} />}
      {view === 'profiles' && <ProfileSelection onSelectProfile={selectProfile} onHome={goHome} />}
      {view === 'dashboard' && <Dashboard user={currentUser} onLogout={logout} onHome={goHome} onSwitchProfile={switchProfile} />}
    </>
  );
}
