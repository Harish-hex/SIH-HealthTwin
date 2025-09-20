import React from 'react';
import { AlertTriangle, Droplets, Users, BarChart3, Shield, Smartphone, Brain, HeartHandshake } from 'lucide-react';

const ChallengeSection: React.FC = () => {
  const challenges = [
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: "Water Quality Crisis",
      description: "45% of water sources in NE India are contaminated with harmful pathogens"
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "Limited Healthcare Access",
      description: "Remote communities lack timely access to healthcare professionals"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-yellow-600" />,
      title: "No Early Warning System",
      description: "Disease outbreaks detected only after widespread community impact"
    }
  ];

  const features = [
    {
      icon: <Brain className="h-12 w-12 text-purple-600" />,
      title: "AI-Powered Predictions",
      description: "Machine learning algorithms analyze patterns to predict outbreaks 72 hours in advance",
      highlight: "95% Accuracy"
    },
    {
      icon: <Shield className="h-12 w-12 text-green-600" />,
      title: "Real-Time Monitoring",
      description: "24/7 surveillance of water sources and health indicators across all states",
      highlight: "24/7 Active"
    },
    {
      icon: <Smartphone className="h-12 w-12 text-blue-600" />,
      title: "Mobile-First Design",
      description: "Works on basic smartphones with offline capabilities for remote areas",
      highlight: "Offline Ready"
    },
    {
      icon: <HeartHandshake className="h-12 w-12 text-pink-600" />,
      title: "Community Integration",
      description: "Direct collaboration with ASHA workers and local health centers",
      highlight: "500+ Workers"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Challenge We're Solving */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-orange-500 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">The Challenge We're Solving</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Northeast India faces critical challenges in preventing waterborne diseases that affect millions of lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  {challenge.icon}
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">{challenge.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Solution Features */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Innovative Solution</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets community healthcare to create a comprehensive early warning system
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.highlight}
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-gray-50 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-300">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;