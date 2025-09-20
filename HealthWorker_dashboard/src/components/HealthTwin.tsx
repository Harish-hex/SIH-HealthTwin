import React, { useState } from 'react';
import { Activity, FlaskConical, Droplets, AlertTriangle, CheckCircle, XCircle, MapPin, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PredictionResult {
  predicted_disease: string;
  health_alert: string;
  record_id?: number;
  saved_to_database?: boolean;
}

const HealthTwin: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    ph: '',
    turbidity: '',
    tds: '',
    people_affected_per_5000: '',
    state: 'Assam',
    district: '',
    location: '',
    collected_by: 'Government Dashboard'
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const neStates = ['Assam', 'Arunachal Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ph: parseFloat(formData.ph),
          turbidity: parseFloat(formData.turbidity),
          tds: parseFloat(formData.tds),
          people_affected_per_5000: parseInt(formData.people_affected_per_5000),
          state: formData.state,
          district: formData.district,
          location: formData.location,
          collected_by: formData.collected_by
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error connecting to health prediction service');
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (alert: string) => {
    if (alert.toLowerCase().includes('safe') || alert.toLowerCase().includes('no immediate')) {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    } else if (alert.toLowerCase().includes('medium')) {
      return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
    } else {
      return <XCircle className="h-6 w-6 text-red-600" />;
    }
  };

  const getAlertColor = (alert: string) => {
    if (alert.toLowerCase().includes('safe') || alert.toLowerCase().includes('no immediate')) {
      return 'bg-green-50 border-green-200 text-green-800';
    } else if (alert.toLowerCase().includes('medium')) {
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    } else {
      return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <FlaskConical className="h-10 w-10 text-blue-600 mr-3" />
            {t('healthTwin.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('healthTwin.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Prediction Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Activity className="h-6 w-6 text-blue-600 mr-2" />
              Health Prediction Analysis
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  Location Information
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('healthTwin.stateLabel')}
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {neStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('healthTwin.districtLabel')}
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Guwahati"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('healthTwin.locationLabel')}
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Village/Area name"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="collected_by" className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      {t('healthTwin.collectedByLabel')}
                    </label>
                    <input
                      type="text"
                      id="collected_by"
                      name="collected_by"
                      value={formData.collected_by}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., ASHA Worker Name or ID"
                    />
                  </div>
                </div>
              </div>

              {/* Water Quality Parameters */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Droplets className="h-5 w-5 text-blue-600 mr-2" />
                  Water Quality Parameters
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('healthTwin.phLabel')}
                    </label>
                    <input
                      type="number"
                      id="ph"
                      name="ph"
                      value={formData.ph}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      max="14"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="6.5 - 8.5"
                    />
                  </div>

                  <div>
                    <label htmlFor="turbidity" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('healthTwin.turbidityLabel')}
                    </label>
                    <input
                      type="number"
                      id="turbidity"
                      name="turbidity"
                      value={formData.turbidity}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0 - 5"
                    />
                  </div>

                  <div>
                    <label htmlFor="tds" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('healthTwin.tdsLabel')}
                    </label>
                    <input
                      type="number"
                      id="tds"
                      name="tds"
                      value={formData.tds}
                      onChange={handleInputChange}
                      step="1"
                      min="0"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50 - 500"
                    />
                  </div>

                  <div>
                    <label htmlFor="people_affected_per_5000" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('healthTwin.peopleAffectedLabel')}
                    </label>
                    <input
                      type="number"
                      id="people_affected_per_5000"
                      name="people_affected_per_5000"
                      value={formData.people_affected_per_5000}
                      onChange={handleInputChange}
                      step="1"
                      min="0"
                      max="5000"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0 - 100"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('healthTwin.predicting')}
                  </div>
                ) : (
                  t('healthTwin.predictButton')
                )}
              </button>
            </form>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Parameter Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Droplets className="h-5 w-5 text-blue-600 mr-2" />
                Water Quality Parameters
              </h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>pH Range:</span>
                  <span className="font-medium">6.5 - 8.5 (Safe)</span>
                </div>
                <div className="flex justify-between">
                  <span>Turbidity:</span>
                  <span className="font-medium">&lt; 1 NTU (Clear)</span>
                </div>
                <div className="flex justify-between">
                  <span>TDS:</span>
                  <span className="font-medium">50 - 300 mg/L (Good)</span>
                </div>
                <div className="flex justify-between">
                  <span>Population Impact:</span>
                  <span className="font-medium">Lower is better</span>
                </div>
              </div>
            </div>

            {/* Results Display */}
            {result && (
              <div className={`rounded-2xl p-6 shadow-lg border-2 ${getAlertColor(result.health_alert)}`}>
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  {getAlertIcon(result.health_alert)}
                  <span className="ml-2">{t('healthTwin.predictionResult')}</span>
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium">{t('healthTwin.predictedDisease')}:</span>
                    <p className="text-lg font-bold mt-1">{result.predicted_disease}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">{t('healthTwin.healthAlert')}:</span>
                    <p className="text-lg font-bold mt-1">{result.health_alert}</p>
                  </div>

                  {result.saved_to_database && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                      <p className="text-sm text-green-800">
                        ✅ {t('healthTwin.recordSaved')} (ID: {result.record_id})
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Connection Error
                </h4>
                <p className="text-red-700">{error}</p>
                <p className="text-sm text-red-600 mt-2">
                  Make sure the Digital Health Twin backend is running on port 5001.
                </p>
              </div>
            )}

            {/* Usage Instructions */}
            {!result && !error && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Enter location details (state, district, specific area)</li>
                  <li>• Specify who collected the data (ASHA worker, etc.)</li>
                  <li>• Input water quality measurements from the field</li>
                  <li>• Enter the number of people affected per 5000 population</li>
                  <li>• Click "Predict Health Risk" to get AI analysis</li>
                  <li>• All data is automatically saved to the database</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthTwin;
