import React, { useState, useEffect } from 'react';
import { BarChart3, AlertTriangle, Users, Database, TrendingUp, Clock, MapPin, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardData {
  summary: {
    total_records: number;
    active_alerts: number;
    total_workers: number;
  };
  disease_breakdown: Array<{ disease: string; count: number }>;
  state_breakdown: Array<{ state: string; total_predictions: number; disease_predictions: number }>;
}

interface HealthRecord {
  id: number;
  predicted_disease: string;
  health_alert: string;
  timestamp: string;
  water_quality: {
    ph: number;
    turbidity: number;
    tds: number;
    people_affected: number;
    location: string;
    state: string;
    district: string;
    collected_by: string;
  };
}

interface HealthAlert {
  id: number;
  alert_level: string;
  status: string;
  created_at: string;
  notes: string;
  prediction: {
    disease: string;
    health_alert: string;
  };
  location: {
    state: string;
    district: string;
    location: string;
  };
  assigned_worker: any;
}

const Analytics: React.FC = () => {
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [recentRecords, setRecentRecords] = useState<HealthRecord[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<HealthAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'records' | 'alerts'>('overview');

  console.log('Analytics: Component rendered, loading:', loading, 'error:', error, 'dashboardData:', dashboardData);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Analytics: Starting data fetch...');
      
      // Fetch dashboard data
      console.log('Analytics: Fetching dashboard data...');
      const dashboardResponse = await fetch('http://127.0.0.1:5000/dashboard');
      const dashboardData = await dashboardResponse.json();
      console.log('Analytics: Dashboard data received:', dashboardData);
      setDashboardData(dashboardData);

      // Fetch recent records
      console.log('Analytics: Fetching records data...');
      const recordsResponse = await fetch('http://127.0.0.1:5000/records?limit=20');
      const recordsData = await recordsResponse.json();
      console.log('Analytics: Records data received:', recordsData);
      setRecentRecords(recordsData);

      // Fetch active alerts
      console.log('Analytics: Fetching alerts data...');
      const alertsResponse = await fetch('http://127.0.0.1:5000/alerts');
      const alertsData = await alertsResponse.json();
      console.log('Analytics: Alerts data received:', alertsData);
      setActiveAlerts(alertsData);

      console.log('Analytics: All data fetched successfully');
    } catch (err) {
      console.error('Analytics: Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const getAlertLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Loading analytics data...</span>
          </div>
        </div>
      </section>
    );
  }

  // Debug: Show data if available
  if (dashboardData) {
    console.log('Analytics: Dashboard data available:', dashboardData);
  }

  if (error) {
    return (
      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
            <p className="text-red-700">{error}</p>
            <button 
              onClick={fetchData}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              {t('analytics.retry')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <BarChart3 className="h-10 w-10 text-blue-600 mr-3" />
            {t('analytics.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('analytics.subtitle')}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'overview'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2 inline" />
              {t('analytics.tabs.overview')}
            </button>
            <button
              onClick={() => setSelectedTab('records')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'records'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Database className="h-4 w-4 mr-2 inline" />
              {t('analytics.tabs.records')}
            </button>
            <button
              onClick={() => setSelectedTab('alerts')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'alerts'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <AlertTriangle className="h-4 w-4 mr-2 inline" />
              {t('analytics.tabs.alerts')}
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && dashboardData && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <Database className="h-8 w-8 text-blue-600" />
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-900">{dashboardData.summary.total_records}</div>
                <div className="text-blue-700 font-medium">{t('analytics.overview.totalRecords')}</div>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-center justify-between mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <div className="text-red-600 text-sm font-semibold">ACTIVE</div>
                </div>
                <div className="text-3xl font-bold text-red-900">{dashboardData.summary.active_alerts}</div>
                <div className="text-red-700 font-medium">{t('analytics.overview.activeAlerts')}</div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-900">{dashboardData.summary.total_workers}</div>
                <div className="text-green-700 font-medium">Health Workers</div>
              </div>
            </div>

            {/* Disease Breakdown */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Disease Breakdown</h3>
                <div className="space-y-3">
                  {dashboardData.disease_breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">
                        {item.disease === 'None' ? 'No Disease Detected' : item.disease}
                      </span>
                      <span className="text-lg font-bold text-blue-600">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">State-wise Summary</h3>
                <div className="space-y-3">
                  {dashboardData.state_breakdown.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{item.state}</span>
                        <span className="text-sm text-gray-600">{item.total_predictions} total</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600">Disease predictions: </span>
                        <span className="ml-1 font-semibold text-red-600">{item.disease_predictions}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Records Tab */}
        {selectedTab === 'records' && (
          <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Recent Health Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Quality</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collected By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{record.water_quality.state}</div>
                            <div className="text-sm text-gray-500">{record.water_quality.district}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          record.predicted_disease === 'None' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.predicted_disease === 'None' ? 'No Disease' : record.predicted_disease}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>pH: {record.water_quality.ph}</div>
                        <div>TDS: {record.water_quality.tds}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.water_quality.collected_by}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {formatDate(record.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {selectedTab === 'alerts' && (
          <div className="space-y-4">
            {activeAlerts.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">No Active Alerts</h3>
                <p className="text-green-700">All health alerts have been resolved or there are no current health risks detected.</p>
              </div>
            ) : (
              activeAlerts.map((alert) => (
                <div key={alert.id} className="bg-white rounded-xl shadow-lg border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {alert.prediction.disease} Alert
                        </h3>
                        <p className="text-sm text-gray-600">
                          {alert.location.state}, {alert.location.district}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getAlertLevelColor(alert.alert_level)}`}>
                      {alert.alert_level}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Health Alert:</h4>
                      <p className="text-gray-700">{alert.prediction.health_alert}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Created:</h4>
                      <p className="text-gray-700">{formatDate(alert.created_at)}</p>
                    </div>
                  </div>
                  
                  {alert.notes && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Notes:</h4>
                      <p className="text-gray-700">{alert.notes}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Analytics;
