import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Thermometer, 
  Heart, 
  Activity, 
  Users, 
  TrendingUp, 
  Calendar,
  MapPin,
  User,
  AlertTriangle,
  Stethoscope,
  Trash2
} from 'lucide-react';

interface HealthMetricsRecord {
  id: number;
  temperature: number | null;
  systolic_bp: number | null;
  diastolic_bp: number | null;
  blood_oxygen: number | null;
  patient_name: string | null;
  patient_age: number | null;
  patient_gender: string | null;
  location: string | null;
  state: string | null;
  district: string | null;
  recorded_by: string | null;
  notes: string | null;
  timestamp: string;
}

interface HealthMetricsStats {
  total_records: number;
  recent_records: number;
  average_metrics: {
    temperature: number;
    systolic_bp: number;
    diastolic_bp: number;
    blood_oxygen: number;
  };
}

interface SymptomStatistic {
  symptom: string;
  count: number;
}

interface SymptomStats {
  symptom_statistics: SymptomStatistic[];
  total_symptom_records: number;
}

const HealthMetrics: React.FC = () => {
  const { t } = useTranslation();
  const [records, setRecords] = useState<HealthMetricsRecord[]>([]);
  const [stats, setStats] = useState<HealthMetricsStats | null>(null);
  const [symptomStats, setSymptomStats] = useState<SymptomStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string>('');
  const [deletingRecords, setDeletingRecords] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchHealthMetrics();
    fetchHealthStats();
    fetchSymptomStats();
  }, [selectedState]);

  const fetchHealthMetrics = async () => {
    try {
      setLoading(true);
      const url = selectedState 
        ? `http://127.0.0.1:5000/health-metrics?state=${selectedState}&per_page=20`
        : 'http://127.0.0.1:5000/health-metrics?per_page=20';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setRecords(data.records);
      } else {
        setError('Failed to fetch health metrics');
      }
    } catch (err) {
      setError('Error fetching health metrics');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthStats = async () => {
    try {
      const url = selectedState 
        ? `http://127.0.0.1:5000/health-metrics/stats?state=${selectedState}`
        : 'http://127.0.0.1:5000/health-metrics/stats';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const fetchSymptomStats = async () => {
    try {
      const url = selectedState 
        ? `http://127.0.0.1:5000/health-metrics/symptom-stats?state=${selectedState}`
        : 'http://127.0.0.1:5000/health-metrics/symptom-stats';
      
      console.log('Fetching symptom stats from:', url);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log('Symptom stats data:', data);
        setSymptomStats(data);
      } else {
        console.error('Failed to fetch symptom stats:', response.status);
      }
    } catch (err) {
      console.error('Error fetching symptom stats:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const deleteRecord = async (recordId: number) => {
    console.log('Delete button clicked for record ID:', recordId);
    
    if (!confirm('Are you sure you want to delete this health record? This action cannot be undone.')) {
      console.log('Delete cancelled by user');
      return;
    }

    try {
      console.log('Starting deletion process for record:', recordId);
      setDeletingRecords(prev => new Set(prev).add(recordId));
      
      const url = `http://127.0.0.1:5000/health-metrics/${recordId}`;
      console.log('Making DELETE request to:', url);
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('Delete successful:', result);
        
        // Remove the record from the local state
        setRecords(prev => {
          const newRecords = prev.filter(record => record.id !== recordId);
          console.log('Updated records count:', newRecords.length);
          return newRecords;
        });
        
        // Refresh the stats and symptom stats
        fetchHealthStats();
        fetchSymptomStats();
        
        alert('Health record deleted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Delete failed:', errorData);
        alert(`Failed to delete record: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error deleting record:', err);
      alert('Error deleting record. Please try again.');
    } finally {
      setDeletingRecords(prev => {
        const newSet = new Set(prev);
        newSet.delete(recordId);
        console.log('Removed record from deleting state:', recordId);
        return newSet;
      });
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchHealthMetrics}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Health Metrics Dashboard</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All States</option>
            <option value="Assam">Assam</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tripura">Tripura</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_records}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Recent (7 days)</p>
                <p className="text-2xl font-bold text-gray-900">{stats.recent_records}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Temperature</p>
                <p className="text-2xl font-bold text-gray-900">{stats.average_metrics.temperature}°C</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Blood Oxygen</p>
                <p className="text-2xl font-bold text-gray-900">{stats.average_metrics.blood_oxygen}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Symptom Statistics */}
      {symptomStats && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Symptom Statistics</h3>
              <p className="text-sm text-gray-600">
                Total symptom reports: {symptomStats.total_symptom_records}
              </p>
            </div>
          </div>
          
          {symptomStats.symptom_statistics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {symptomStats.symptom_statistics.map((symptom, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 capitalize">
                        {symptom.symptom}
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {symptom.count}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-gray-500">
                      {symptom.count === 1 ? 'patient' : 'patients'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No symptom data available</p>
              <p className="text-sm text-gray-400 mt-1">
                Symptoms will appear here as ASHA workers report them
              </p>
            </div>
          )}
        </div>
      )}

      {/* Records Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Health Records</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Pressure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Oxygen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symptoms
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recorded By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {record.patient_name || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.patient_age && record.patient_gender 
                            ? `${record.patient_age} years, ${record.patient_gender}`
                            : 'No details'
                          }
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Thermometer className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {record.temperature ? `${record.temperature}°C` : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {record.systolic_bp && record.diastolic_bp 
                          ? `${record.systolic_bp}/${record.diastolic_bp}`
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {record.blood_oxygen ? `${record.blood_oxygen}%` : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {record.notes ? record.notes.replace('Symptom: ', '') : 'No symptoms reported'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {record.location || 'Unknown'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.recorded_by || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(record.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        console.log('Delete button clicked for record:', record.id);
                        deleteRecord(record.id);
                      }}
                      disabled={deletingRecords.has(record.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {deletingRecords.has(record.id) ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {records.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No health metrics records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthMetrics;
