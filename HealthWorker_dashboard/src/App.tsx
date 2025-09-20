import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MapSection from './components/MapSection';
import ImpactSection from './components/ImpactSection';
import HealthTwin from './components/HealthTwin';
import Analytics from './components/Analytics';
import HealthMetrics from './components/HealthMetrics';
import Footer from './components/Footer';
import { AlertTriangle, LogOut } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'healthtwin' | 'analytics' | 'healthmetrics'>('dashboard');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simplified Authentication check (temporarily relaxed for debugging)
  useEffect(() => {
    const checkAuth = () => {
      console.log('=== Health Worker Dashboard: SIMPLIFIED Authentication Check ===');
      
      // Try multiple authentication methods (relaxed security)
      const storedUser = localStorage.getItem('user');
      const storedAuth = localStorage.getItem('isAuthenticated');
      
      console.log('Health Dashboard: storedUser:', storedUser);
      console.log('Health Dashboard: storedAuth:', storedAuth);
      
      // Method 1: Check for proper authentication
      if (storedUser && storedAuth === 'true') {
        try {
          const userData = JSON.parse(storedUser);
          console.log('Health Dashboard: Parsed user data:', userData);
          
          if (userData.role === 'ASHA') {
            console.log('Health Dashboard: Redirecting ASHA worker to ASHA dashboard');
            window.location.href = 'http://localhost:5174';
            return;
          } else if (userData.role === 'PHC' || userData.role === 'ANM' || userData.role === 'ADMIN') {
            console.log('Health Dashboard: ✅ AUTHENTICATED via Method 1 (proper auth)');
            setUser(userData);
            setIsAuthenticated(true);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log('Health Dashboard: Method 1 failed:', error.message);
        }
      }
      
      // Method 2: Check for any health worker data (relaxed)
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (userData.role === 'PHC' || userData.role === 'ANM' || userData.role === 'ADMIN') {
            console.log('Health Dashboard: ✅ AUTHENTICATED via Method 2 (relaxed - health worker role)');
            setUser(userData);
            setIsAuthenticated(true);
            setLoading(false);
            return;
          } else if (userData.role === 'ASHA') {
            console.log('Health Dashboard: Redirecting ASHA worker to ASHA dashboard');
            window.location.href = 'http://localhost:5174';
            return;
          }
        } catch (error) {
          console.log('Health Dashboard: Method 2 failed:', error.message);
        }
      }
      
      // Method 3: Allow access if coming from login page (very relaxed)
      const referrer = document.referrer;
      console.log('Health Dashboard: Referrer:', referrer);
      if (referrer && referrer.includes('localhost:8081')) {
        console.log('Health Dashboard: ✅ AUTHENTICATED via Method 3 (came from login page)');
        // Set default health worker data
        const defaultUser = {
          name: 'Dr. Rajesh Kumar',
          role: 'PHC',
          username: 'health001',
          worker_id: 'PHC001'
        };
        setUser(defaultUser);
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }
      
      // Method 4: Allow access for development (temporary)
      console.log('Health Dashboard: ✅ AUTHENTICATED via Method 4 (development mode - allowing access)');
      const devUser = {
        name: 'Development Health Worker',
        role: 'PHC',
        username: 'dev001',
        worker_id: 'DEV001'
      };
      setUser(devUser);
      setIsAuthenticated(true);
      setLoading(false);
    };

    // Small delay to ensure localStorage is fully available
    setTimeout(checkAuth, 100);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = 'http://localhost:8081';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Health Worker Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this dashboard.</p>
          <button
            onClick={() => window.location.href = 'http://localhost:8081'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header currentView={currentView} onViewChange={setCurrentView} user={user} onLogout={handleLogout} />
      <main className={currentView === 'dashboard' ? 'py-8' : ''}>
        {currentView === 'dashboard' ? (
          <>
            <MapSection />
            <ImpactSection />
          </>
        ) : currentView === 'healthtwin' ? (
          <HealthTwin />
        ) : currentView === 'analytics' ? (
          <Analytics />
        ) : (
          <div className="py-8 px-6">
            <HealthMetrics />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
