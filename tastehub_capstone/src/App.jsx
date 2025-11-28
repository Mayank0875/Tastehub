import { useEffect, useMemo, useState } from 'react';
import LandingPage from './components/pages/LandingPage';
import ProfileSelection from './components/pages/ProfileSelection';
import Dashboard from './components/pages/Dashboard';
import GuidedTour from './components/ui/GuidedTour';
import HowToDemoModal from './components/ui/HowToDemoModal';
import { PROFILES } from './utils/constants';

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('landing'); 
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [tourSteps, setTourSteps] = useState([]);
  const [showHowTo, setShowHowTo] = useState(false);
  const [judgeMode, setJudgeMode] = useState(false);

  const landingTourSteps = useMemo(() => [
    {
      title: 'Launch the prototype',
      description: "Click 'Try Prototype' to enter the experience.",
      hint: 'The Vasooli agent works best when you start with Rahul (High Risk).'
    },
    {
      title: 'Trigger the fear block',
      description: "On the dashboard, hit 'Spend' and enter more than Safe to Spend.",
      hint: 'You’ll hear Vasooli Bhai reject the transaction.'
    },
    {
      title: 'Open Analytics',
      description: 'See FRS decomposition, causal map, Sunk Cost Breaker, and What-if simulator.',
      hint: 'Cancel a subscription to show the sunk cost breaker.'
    }
  ], []);

  const dashboardTourSteps = useMemo(() => [
    {
      title: '1. Watch Safe-to-Spend lie',
      description: 'Vault auto-lock % adapts to income chaos. Judges should read the rule line.',
      hint: 'Add income/spend to see it change.'
    },
    {
      title: '2. Follow the Judge Checklist',
      description: 'A sticky card tells judges exactly what interactions to try.',
    },
    {
      title: '3. Explore Analytics tab',
      description: 'FRS decomposition, causal map, What-if simulator, and Sunk Cost Breaker live there.'
    }
  ], []);

  const startTour = (type = 'landing') => {
    setTourSteps(type === 'dashboard' ? dashboardTourSteps : landingTourSteps);
    setShowTour(true);
  };

  const finishTour = () => {
    setShowTour(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('gw_tour_seen', '1');
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = window.localStorage.getItem('gw_tour_seen');
    if (!seen) {
      setTourSteps(landingTourSteps);
      setTimeout(() => setShowTour(true), 800);
    }
  }, [landingTourSteps]);

  const startDemo = () => {
    setLoading(true);
    setTimeout(() => {
      setView('profiles');
      setLoading(false);
    }, 800);
  };

  const selectProfile = (profile) => {
    setLoading(false); 
    setJudgeMode(false);
    setCurrentUser(profile);
    setView('dashboard');
  };

  const activateJudgeMode = () => {
    const rahul = PROFILES.find((p) => p.id === 'rahul');
    setJudgeMode(true);
    setCurrentUser(rahul || null);
    setView('dashboard');
    startTour('dashboard');
  };

  const logout = () => {
    setView('landing');
    setCurrentUser(null);
    setJudgeMode(false);
  };

  const goHome = () => {
    setView('landing');
    setCurrentUser(null);
    setJudgeMode(false);
  };

  const switchProfile = () => {
    setView('profiles');
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">GuardWallet</h2>
        <p className="text-slate-400 text-sm mt-2 font-medium">Initializing Agent Interface...</p>
      </div>
    );
  }

  const showFloatingButton = view !== 'profiles';

  return (
    <>
      {view === 'landing' && (
        <LandingPage 
          onStartDemo={startDemo} 
          onShowGuide={() => startTour('landing')}
          onOpenHowTo={() => setShowHowTo(true)}
          onJudgeMode={activateJudgeMode}
          judgeMode={judgeMode}
        />
      )}
      {view === 'profiles' && <ProfileSelection onSelectProfile={selectProfile} onHome={goHome} />}
      {view === 'dashboard' && (
        <Dashboard 
          user={currentUser} 
          onLogout={logout} 
          onHome={goHome} 
          onSwitchProfile={switchProfile} 
          judgeMode={judgeMode}
          onShowGuide={() => startTour('dashboard')}
        />
      )}

      <GuidedTour visible={showTour} steps={tourSteps} onFinish={finishTour} />
      <HowToDemoModal open={showHowTo} onClose={() => setShowHowTo(false)} />

      {showFloatingButton && !showTour && (
        <button
          onClick={() => setShowHowTo(true)}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-full text-xs font-bold shadow-lg shadow-slate-900/30"
        >
          How to Demo
        </button>
      )}
    </>
  );
}
