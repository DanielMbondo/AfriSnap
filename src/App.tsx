import React from 'react';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import { Header } from './components/Layout/Header';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { PhotographerDashboard } from './components/Dashboard/PhotographerDashboard';
import { EventGallery } from './components/Gallery/EventGallery';
import { LandingPage } from './components/Landing/LandingPage';

function App() {
  const auth = useAuthProvider();
  const [currentView, setCurrentView] = React.useState<'landing' | 'login' | 'signup' | 'dashboard' | 'gallery'>('landing');

  // Simple router logic based on URL or state
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/gallery')) {
      setCurrentView('gallery');
    } else if (path.includes('/dashboard') || auth.user?.role === 'photographer') {
      setCurrentView('dashboard');
    } else if (path.includes('/login')) {
      setCurrentView('login');
    } else if (path.includes('/signup')) {
      setCurrentView('signup');
    } else {
      setCurrentView('landing');
    }
  }, [auth.user]);

  // Auto-redirect after login/signup
  React.useEffect(() => {
    if (auth.user) {
      if (auth.user.role === 'photographer') {
        setCurrentView('dashboard');
      } else {
        setCurrentView('gallery');
      }
    }
  }, [auth.user]);

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      <div className="min-h-screen bg-gray-50">
        {/* Show landing page to non-authenticated users */}
        {!auth.user && currentView === 'landing' && (
          <LandingPage 
            onShowLogin={() => setCurrentView('login')}
            onShowSignup={() => setCurrentView('signup')}
          />
        )}
        
        {/* Show login form */}
        {!auth.user && currentView === 'login' && (
          <LoginForm onShowSignup={() => setCurrentView('signup')} />
        )}
        
        {/* Show signup form */}
        {!auth.user && currentView === 'signup' && (
          <SignupForm onBackToLogin={() => setCurrentView('login')} />
        )}
        
        {/* Show authenticated content */}
        {auth.user && (
          <>
            <Header title={
              currentView === 'dashboard' ? 'Honcho Dashboard' :
              currentView === 'gallery' ? 'Event Gallery' :
              'Honcho'
            } />
            
            {currentView === 'dashboard' && auth.user.role === 'photographer' && (
              <PhotographerDashboard onViewGallery={() => setCurrentView('gallery')} />
            )}
            
            {currentView === 'gallery' && (
              <EventGallery />
            )}
            
            {/* Default dashboard for other users */}
            {currentView === 'dashboard' && auth.user.role !== 'photographer' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to AfriSnap</h1>
                <p className="text-gray-600 mb-8">You can access event galleries shared with you.</p>
                <button 
                  onClick={() => setCurrentView('gallery')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Browse Galleries
                </button>
              </div>
            )}
          </>
        )}

        {/* Simple Navigation for Demo */}
        {auth.user && (
          <div className="fixed bottom-6 right-6 space-y-2">
            {auth.user.role === 'photographer' && (
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`block w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'dashboard' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border'
                }`}
              >
                Dashboard
              </button>
            )}
            <button
              onClick={() => setCurrentView('gallery')}
              className={`block w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'gallery' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => {
                auth.logout();
                setCurrentView('landing');
              }}
              className="block w-full px-4 py-2 rounded-lg font-medium transition-colors bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;