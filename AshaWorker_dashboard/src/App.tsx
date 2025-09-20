import { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  FileText, 
  AlertTriangle,
  Plus,
  CheckCircle,
  MessageCircle,
  Send,
  X,
  LogOut,
  Globe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<{name: string; role: string; username: string; worker_id: string} | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [patientName, setPatientName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Lachung');
  const [temperature, setTemperature] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [diastolicBP, setDiastolicBP] = useState('');
  const [bloodOxygen, setBloodOxygen] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>((i18n.language || 'en').toUpperCase());
  const [forceUpdate, setForceUpdate] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'support', time: '10:30 AM' },
    { id: 2, text: 'I need help with reporting water quality issues', sender: 'user', time: '10:32 AM' },
    { id: 3, text: 'I can help you with that. Please use the Report Water section to submit your findings.', sender: 'support', time: '10:33 AM' }
  ]);

  // Language change function
  const changeLang = (lng: string) => {
    const lowerLng = lng.toLowerCase();
    console.log('Changing language to:', lowerLng);
    setSelectedLang(lng);
    i18n.changeLanguage(lowerLng).then(() => {
      console.log('Language changed successfully to:', i18n.language);
      setForceUpdate(prev => prev + 1); // Force re-render
    });
  };

  // Language change effect
  useEffect(() => {
    const handler = () => setSelectedLang(i18n.language?.toUpperCase() || 'EN');
    i18n.on('languageChanged', handler);
    return () => {
      i18n.off('languageChanged', handler);
    };
  }, [i18n]);

  // Simplified Authentication check (temporarily relaxed for debugging)
  useEffect(() => {
    const checkAuth = () => {
      console.log('=== ASHA Dashboard: SIMPLIFIED Authentication Check ===');
      
      // Try multiple authentication methods (relaxed security)
      const storedUser = localStorage.getItem('user');
      const storedAuth = localStorage.getItem('isAuthenticated');
      
      console.log('ASHA Dashboard: storedUser:', storedUser);
      console.log('ASHA Dashboard: storedAuth:', storedAuth);
      
      // Method 1: Check for proper authentication
      if (storedUser && storedAuth === 'true') {
        try {
          const userData = JSON.parse(storedUser);
          console.log('ASHA Dashboard: Parsed user data:', userData);
          
          if (userData.role === 'ASHA') {
            console.log('ASHA Dashboard: ✅ AUTHENTICATED via Method 1 (proper auth)');
            setUser(userData);
            setIsAuthenticated(true);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log('ASHA Dashboard: Method 1 failed:', error instanceof Error ? error.message : 'Unknown error');
        }
      }
      
      // Method 2: Check for any user data with ASHA role (relaxed)
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (userData.role === 'ASHA') {
            console.log('ASHA Dashboard: ✅ AUTHENTICATED via Method 2 (relaxed - user exists with ASHA role)');
            setUser(userData);
            setIsAuthenticated(true);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log('ASHA Dashboard: Method 2 failed:', error instanceof Error ? error.message : 'Unknown error');
        }
      }
      
      // Method 3: Allow access to ASHA dashboard if coming from login page (very relaxed)
      const referrer = document.referrer;
      console.log('ASHA Dashboard: Referrer:', referrer);
      if (referrer && referrer.includes('localhost:8081')) {
        console.log('ASHA Dashboard: ✅ AUTHENTICATED via Method 3 (came from login page)');
        // Set default ASHA user data
        const defaultUser = {
          name: 'Priya Sharma',
          role: 'ASHA',
          username: 'asha001',
          worker_id: 'AS001'
        };
        setUser(defaultUser);
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }
      
      // Method 4: Allow access for development (temporary)
      console.log('ASHA Dashboard: ✅ AUTHENTICATED via Method 4 (development mode - allowing access)');
      const devUser = {
        name: 'Development User',
        role: 'ASHA',
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
    const loginUrl = import.meta.env.VITE_LOGIN_URL || 'http://localhost:8081';
    window.location.href = loginUrl;
  };
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'risk': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: chatMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  const handleSubmitHealthMetrics = async () => {
    try {
      const healthData = {
        temperature: temperature ? parseFloat(temperature) : null,
        systolic_bp: systolicBP ? parseInt(systolicBP) : null,
        diastolic_bp: diastolicBP ? parseInt(diastolicBP) : null,
        blood_oxygen: bloodOxygen ? parseFloat(bloodOxygen) : null,
        patient_name: patientName || null,
        patient_age: null,
        patient_gender: null,
        recorded_by: user?.worker_id || 'Unknown',
        location: selectedLocation,
        state: 'Sikkim',
        district: 'North Sikkim',
        notes: selectedSymptom ? `Symptom: ${selectedSymptom}` : null,
        timestamp: new Date().toISOString()
      };

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/health-metrics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(healthData)
      });

      if (response.ok) {
        // Clear form
        setPatientName('');
        setSelectedSymptom('');
        setTemperature('');
        setSystolicBP('');
        setDiastolicBP('');
        setBloodOxygen('');
        
        // Show success message
        alert('Symptoms and health metrics submitted successfully!');
      } else {
        alert('Failed to submit data. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please check your connection.');
    }
  };
  const recentActivities = [
    { id: 1, text: 'Reported 5 diarrhea cases', date: 'Sep 15', type: 'health' },
    { id: 2, text: 'Reported yellow water', date: 'Sep 14', type: 'water' },
    { id: 3, text: 'Submitted fever cases', date: 'Sep 13', type: 'health' },
    { id: 4, text: 'Water quality report', date: 'Sep 12', type: 'water' }
  ];

  const statistics = [
    { icon: Heart, value: '247', label: t('peopleServed'), color: 'bg-blue-50 text-blue-600' },
    { icon: Plus, value: '23', label: t('reportsFiled'), color: 'bg-green-50 text-green-600' },
    { icon: FileText, value: '3', label: t('activeCases'), color: 'bg-yellow-50 text-yellow-600' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('appTagline')} - Loading...</p>
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
            onClick={() => {
              const loginUrl = import.meta.env.VITE_LOGIN_URL || 'http://localhost:8081';
              window.location.href = loginUrl;
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" key={forceUpdate}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src="https://cdn.pulse2.com/cdn/2025/08/Twin-Health-Logo.jpeg" 
                alt="Digital Health Twin Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{t('appName')}</h1>
              <p className="text-sm text-gray-600">{t('appTagline')} - {t('welcome')}, {user?.name} ({user?.worker_id})</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={selectedLang}
                onChange={(e) => changeLang(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="EN">English</option>
                <option value="AS">Assamese</option>
                <option value="BN">Bengali</option>
                <option value="HI">Hindi</option>
              </select>
              <Globe className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-20 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">{t('supportChat')}</h3>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('typeMessage')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Report and Location Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Symptoms Card - Takes 2 columns */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t('report')}</h3>
                <p className="text-red-600 text-sm font-medium">{t('symptoms')}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <input 
                type="text"
                placeholder={t('enterPatientName')}
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              
              <select 
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">{t('selectSymptom')}</option>
                <option value="fever">{t('fever')}</option>
                <option value="cough">{t('cough')}</option>
                <option value="diarrhea">{t('diarrhea')}</option>
                <option value="headache">{t('headache')}</option>
                <option value="fatigue">{t('fatigue')}</option>
                <option value="skin rash">{t('skinRash')}</option>
                <option value="vomiting">{t('vomiting')}</option>
                <option value="stomach pain">{t('stomachPain')}</option>
              </select>
              
              
              {/* Health Metrics Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Health Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Temperature */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">{t('temperature')}</label>
                    <input 
                      type="number"
                      step="0.1"
                      placeholder="36.5"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Blood Oxygen */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">{t('bloodOxygen')}</label>
                    <input 
                      type="number"
                      placeholder="98"
                      value={bloodOxygen}
                      onChange={(e) => setBloodOxygen(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Blood Pressure - Full width */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-medium text-gray-600">{t('bloodPressure')}</label>
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <input 
                          type="number"
                          placeholder="120"
                          value={systolicBP}
                          onChange={(e) => setSystolicBP(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <div className="text-xs text-gray-400 mt-1 text-center">{t('systolic')}</div>
                      </div>
                      <div className="flex items-center text-gray-400 text-lg font-medium">
                        /
                      </div>
                      <div className="flex-1">
                        <input 
                          type="number"
                          placeholder="80"
                          value={diastolicBP}
                          onChange={(e) => setDiastolicBP(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <div className="text-xs text-gray-400 mt-1 text-center">{t('diastolic')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleSubmitHealthMetrics}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                {t('report')} Symptoms & Health Metrics
              </button>
            </div>
          </div>

          {/* Location Selector - Takes 1 column */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{t('selectLocation')}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('currentVillage')}
                </label>
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                  <option value="Lachung">{t('lachung')}</option>
                  <option value="Lachen">{t('lachen')}</option>
                  <option value="Yuksom">{t('yuksom')}</option>
                  <option value="Ravangla">{t('ravangla')}</option>
                  <option value="Dentam">{t('dentam')}</option>
                </select>
              </div>
              
              {/* Location Status Display */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedLocation}</h4>
                    <p className="text-green-600 text-sm font-medium">{t('sikkim')} • {t('statusActive')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Row - Full width */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{t('recentActivity')}</h3>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.text}</p>
                    <p className="text-blue-600 text-sm mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statistics.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-blue-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;