import React from 'react';
import { BarChart3, FileText, TestTube, Users, Map, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ImpactSection: React.FC = () => {
  const { t } = useTranslation();
  const metrics = [
    {
      icon: <Map className="h-12 w-12 text-blue-600" />,
      number: "8",
      label: t('impact.metrics.statesCoverage'),
      description: t('impact.metrics.statesCoverageDesc'),
      color: "blue"
    },
    {
      icon: <FileText className="h-12 w-12 text-green-600" />,
      number: "12,450",
      label: t('impact.metrics.reportsSubmitted'),
      description: t('impact.metrics.reportsSubmittedDesc'),
      color: "green"
    },
    {
      icon: <TestTube className="h-12 w-12 text-purple-600" />,
      number: "10,000+",
      label: t('impact.metrics.waterTests'),
      description: t('impact.metrics.waterTestsDesc'),
      color: "purple"
    },
    {
      icon: <Users className="h-12 w-12 text-orange-600" />,
      number: "5,200",
      label: t('impact.metrics.ashaWorkers'),
      description: t('impact.metrics.ashaWorkersDesc'),
      color: "orange"
    },
    {
      icon: <Building2 className="h-12 w-12 text-teal-600" />,
      number: "324",
      label: t('impact.metrics.healthCenters'),
      description: t('impact.metrics.healthCentersDesc'),
      color: "teal"
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-red-600" />,
      number: "3.2M",
      label: t('impact.metrics.livesProtected'),
      description: t('impact.metrics.livesProtectedDesc'),
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      green: "bg-green-50 border-green-200 hover:bg-green-100",
      purple: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      orange: "bg-orange-50 border-orange-200 hover:bg-orange-100",
      teal: "bg-teal-50 border-teal-200 hover:bg-teal-100",
      red: "bg-red-50 border-red-200 hover:bg-red-100"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t('impact.title')}</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">{t('impact.subtitle')}</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className={`bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-white/20 rounded-xl">
                  {metric.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl lg:text-4xl font-bold text-white">
                    {metric.number}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {metric.label}
              </h3>
              <p className="text-blue-100">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Success Story Highlight */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 lg:p-12 border border-white/20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">{t('impact.success.title')}</h3>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                {t('impact.success.body')}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-300">89%</div>
                  <div className="text-green-100 text-sm">{t('impact.success.metrics.preventionRate')}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-300">72hrs</div>
                  <div className="text-blue-100 text-sm">{t('impact.success.metrics.earlyWarning')}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/20 rounded-2xl p-8 text-center">
                <h4 className="text-xl font-semibold text-white mb-4">{t('impact.systemStatus.title')}</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">{t('impact.systemStatus.uptime')}</span>
                    <span className="text-green-300 font-semibold">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">{t('impact.systemStatus.activeMonitors')}</span>
                    <span className="text-white font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">{t('impact.systemStatus.alertsThisWeek')}</span>
                    <span className="text-yellow-300 font-semibold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">{t('impact.systemStatus.falsePositiveRate')}</span>
                    <span className="text-green-300 font-semibold">3.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;