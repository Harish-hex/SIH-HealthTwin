import React, { useState } from 'react';
import { MapPin, TrendingUp, TrendingDown, Minus, Users, Droplets, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MapSection: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const { t } = useTranslation();

  const stateData = [
    { name: 'Assam', status: 'good', population: '3.1M', coverage: '92%', alerts: 8, color: '#10B981', waterQuality: 'Safe' },
    { name: 'Arunachal Pradesh', status: 'good', population: '1.4M', coverage: '85%', alerts: 3, color: '#10B981', waterQuality: 'Safe' },
    { name: 'Manipur', status: 'good', population: '2.8M', coverage: '94%', alerts: 2, color: '#10B981', waterQuality: 'Safe' },
    { name: 'Meghalaya', status: 'moderate', population: '3.0M', coverage: '78%', alerts: 12, color: '#F59E0B', waterQuality: 'Moderate' },
    { name: 'Mizoram', status: 'good', population: '1.1M', coverage: '96%', alerts: 1, color: '#10B981', waterQuality: 'Safe' },
    { name: 'Nagaland', status: 'moderate', population: '2.0M', coverage: '82%', alerts: 7, color: '#F59E0B', waterQuality: 'Moderate' },
    { name: 'Sikkim', status: 'good', population: '0.6M', coverage: '98%', alerts: 0, color: '#10B981', waterQuality: 'Safe' },
    { name: 'Tripura', status: 'risk', population: '3.7M', coverage: '74%', alerts: 15, color: '#EF4444', waterQuality: 'Risk' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'moderate': return <Minus className="h-5 w-5 text-yellow-600" />;
      case 'risk': return <TrendingDown className="h-5 w-5 text-red-600" />;
      default: return <Minus className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      good: 'bg-green-100 text-green-800 border-green-200',
      moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      risk: 'bg-red-100 text-red-800 border-red-200'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('map.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('map.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Visualization */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <MapPin className="h-6 w-6 text-blue-600 mr-2" />
              {t('map.coverage')}
            </h3>
            {/* Northeast India Coverage Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stateData.map((state, index) => (
                <div
                  key={state.name}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedState === state.name 
                      ? 'ring-2 ring-blue-300 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: state.color + '20',
                    borderColor: state.color 
                  }}
                  onClick={() => setSelectedState(selectedState === state.name ? null : state.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{state.name}</h4>
                    {getStatusIcon(state.status)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Coverage:</span>
                      <span className="font-medium">{state.coverage}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Alerts:</span>
                      <span className="font-medium">{state.alerts}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-700">{t('map.legend.good')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm text-gray-700">{t('map.legend.moderate')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-700">{t('map.legend.risk')}</span>
              </div>
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-8 w-8 text-green-600" />
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-900">5</div>
                <div className="text-green-700 font-medium">{t('map.stats.statesGood')}</div>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="h-8 w-8 text-yellow-600" />
                  <Minus className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-yellow-900">2</div>
                <div className="text-yellow-700 font-medium">{t('map.stats.statesModerate')}</div>
              </div>
              
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <Droplets className="h-8 w-8 text-red-600" />
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-red-900">1</div>
                <div className="text-red-700 font-medium">{t('map.stats.stateRisk')}</div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="h-8 w-8 text-blue-600" />
                  <div className="text-blue-600 text-sm font-semibold">100%</div>
                </div>
                <div className="text-3xl font-bold text-blue-900">8</div>
                <div className="text-blue-700 font-medium">{t('map.stats.totalCoverage')}</div>
              </div>
            </div>

            {/* State Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('map.stateDetails')}</h4>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {stateData.map((state, index) => (
                  <div 
                    key={state.name}
                    className={`p-4 bg-white rounded-lg border transition-all duration-300 cursor-pointer ${
                      selectedState === state.name ? 'ring-2 ring-blue-300 shadow-md' : 'hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedState(selectedState === state.name ? null : state.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">{state.name}</h5>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(state.status)}`}>
                        {state.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <div className="font-medium text-gray-900">{state.population}</div>
                        <div>{t('map.labels.population')}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{state.coverage}</div>
                        <div>{t('map.labels.coverage')}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{state.alerts}</div>
                        <div>{t('map.labels.activeAlerts')}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;