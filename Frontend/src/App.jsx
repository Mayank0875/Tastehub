// App.jsx
import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { Router, Route } from './components/Router';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import RealtimeSubmissions from './components/RealtimeSubmissions';
import HomePage from './pages/HomePage';
import ProblemsetPage from './pages/ProblemsetPage';
import ProblemPage from './pages/ProblemPage';
import SubmissionsPage from './pages/SubmissionsPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import SettingsPage from './pages/SettingsPage';
import BlogPage from './pages/BlogPage';
import TeamsPage from './pages/TeamsPage';
import FavouritesPage from './pages/FavouritesPage';
import GroupsPage from './pages/GroupsPage';
import TalksPage from './pages/TalksPage';
import ContestsPage from './pages/ContestsPage';

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showRealtimeSubmissions, setShowRealtimeSubmissions] = useState(false);

  return (
    <AuthProvider>
      <SocketProvider>
        <AppProvider>
          <Router>
            <div className="min-h-screen bg-gray-100 text-gray-900 p-4 font-sans">
              <div className="container mx-auto max-w-7xl">
                <Navbar 
                  onShowAuth={(mode) => {
                    setAuthMode(mode);
                    setShowAuthModal(true);
                  }}
                  onShowRealtimeSubmissions={() => setShowRealtimeSubmissions(true)}
                />
                
                <Route path="/home" component={HomePage} exact />
                <Route path="/" component={HomePage} exact />
                <Route path="/problemset" component={ProblemsetPage} exact />
                <Route path="/problem" component={ProblemPage} />
                <Route path="/submissions" component={SubmissionsPage} exact />
                <Route path="/admin" component={AdminPage} exact />
                <Route path="/settings" component={SettingsPage} exact />
                <Route path="/blog" component={BlogPage} exact />
                <Route path="/teams" component={TeamsPage} exact />
                <Route path="/favourites" component={FavouritesPage} exact />
                <Route path="/groups" component={GroupsPage} exact />
                <Route path="/talks" component={TalksPage} exact />
                <Route path="/contests" component={ContestsPage} exact />
                
                <Route path="*" component={NotFoundPage} />
              </div>

              {/* Auth Modal */}
              <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                mode={authMode}
              />

              {/* Real-time Submissions */}
              <RealtimeSubmissions
                show={showRealtimeSubmissions}
                onClose={() => setShowRealtimeSubmissions(false)}
              />
            </div>
          </Router>
        </AppProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;