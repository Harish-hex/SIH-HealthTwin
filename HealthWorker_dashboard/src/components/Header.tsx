import React, { useEffect, useState } from 'react';
import { Globe, Menu, X, BarChart3, FlaskConical, LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  currentView: 'dashboard' | 'healthtwin' | 'analytics' | 'healthmetrics';
  onViewChange: (view: 'dashboard' | 'healthtwin' | 'analytics' | 'healthmetrics') => void;
  user?: any;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<string>(i18n.language?.toUpperCase() || 'EN');

  useEffect(() => {
    // Keep local state in sync if language changes elsewhere
    const handler = () => setSelectedLang(i18n.language?.toUpperCase() || 'EN');
    i18n.on('languageChanged', handler);
    return () => {
      i18n.off('languageChanged', handler);
    };
  }, [i18n]);

  const changeLang = (lng: string) => {
    setSelectedLang(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center">
              <img 
                src="https://cdn.pulse2.com/cdn/2025/08/Twin-Health-Logo.jpeg" 
                alt="Digital Health Twin Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t('appName')}</h1>
              <p className="text-sm text-gray-600">{t('appTagline')}</p>
            </div>
          </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Navigation Tabs */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => onViewChange('dashboard')}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'dashboard'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => onViewChange('healthtwin')}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'healthtwin'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FlaskConical className="h-4 w-4 mr-2" />
                    Health Twin
                  </button>
                  <button
                    onClick={() => onViewChange('analytics')}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'analytics'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </button>
                  <button
                    onClick={() => onViewChange('healthmetrics')}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'healthmetrics'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Health Metrics
                  </button>
                </div>

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

                {/* User Info and Logout */}
                {user && onLogout && (
                  <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-gray-500">{user.role} - {user.worker_id}</p>
                      </div>
                    </div>
                    <button
                      onClick={onLogout}
                      className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                {/* Mobile Navigation */}
                <div className="space-y-2">
                  <button
                    onClick={() => onViewChange('dashboard')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      currentView === 'dashboard'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => onViewChange('healthtwin')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      currentView === 'healthtwin'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FlaskConical className="h-4 w-4 mr-2" />
                    Health Twin
                  </button>
                  <button
                    onClick={() => onViewChange('analytics')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      currentView === 'analytics'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </button>
                  <button
                    onClick={() => onViewChange('healthmetrics')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      currentView === 'healthmetrics'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Health Metrics
                  </button>
                </div>

                <select
                  value={selectedLang}
                  onChange={(e) => changeLang(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="EN">English</option>
                  <option value="AS">Assamese</option>
                  <option value="BN">Bengali</option>
                  <option value="HI">Hindi</option>
                </select>
              </div>
            </div>
          )}
      </div>
    </header>
  );
};

export default Header;