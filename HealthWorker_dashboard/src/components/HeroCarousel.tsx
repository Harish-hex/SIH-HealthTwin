import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Activity, Shield, Users, Zap } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Protecting Northeast India from Water-Borne Diseases",
    subtitle: "AI-powered health monitoring & early warning system for 8 states",
    description: "Advanced technology meets community healthcare to safeguard millions of lives across Northeast India through intelligent disease prediction and prevention systems.",
    icon: <Shield className="h-12 w-12 text-blue-400" />,
    bgImage: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    stats: "8 States Protected"
  },
  {
    id: 2,
    title: "24/7 Smart Health Monitoring",
    subtitle: "Early Detection Rate: 95%",
    description: "Continuous surveillance of water sources, health centers, and community health data across all Northeast states, ensuring no health threat goes undetected with 95% accuracy.",
    icon: <Activity className="h-12 w-12 text-green-400" />,
    bgImage: "https://images.pexels.com/photos/4386430/pexels-photo-4386430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    stats: "95% Detection Rate"
  },
  {
    id: 3,
    title: "Empowering Communities with Knowledge",
    subtitle: "Awareness, education, and prevention at your fingertips",
    description: "Building a network of trained community champions through ASHA workers and local health centers who can respond quickly to health emergencies with proper knowledge and tools.",
    icon: <Users className="h-12 w-12 text-blue-400" />,
    bgImage: "https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    stats: "5,000+ ASHA Workers"
  },
  {
    id: 4,
    title: "Real Numbers, Real Change",
    subtitle: "Measurable Impact Across Northeast India",
    description: "Transforming community health through data-driven insights: 8 states covered, 10,000+ water tests analyzed, 5,000+ ASHA workers onboarded, and 95% early outbreak detection accuracy.",
    icon: <Zap className="h-12 w-12 text-yellow-400" />,
    bgImage: "https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    stats: "10,000+ Tests Done"
  }
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/75 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="flex items-center space-x-4 mb-6">
              {slides[currentSlide].icon}
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
                {slides[currentSlide].stats}
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {slides[currentSlide].title}
            </h1>
            
            <h2 className="text-xl lg:text-2xl mb-6 text-blue-100 font-medium">
              {slides[currentSlide].subtitle}
            </h2>
            
            <p className="text-lg mb-8 text-blue-50 leading-relaxed max-w-2xl">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                Join the Movement
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-white text-2xl font-bold mb-6">Live Dashboard</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-300">2,847</div>
                  <div className="text-green-100 text-sm">Active Monitors</div>
                </div>
                <div className="bg-blue-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-300">3.2M</div>
                  <div className="text-blue-100 text-sm">People Protected</div>
                </div>
                <div className="bg-yellow-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-300">99.2%</div>
                  <div className="text-yellow-100 text-sm">System Uptime</div>
                </div>
                <div className="bg-purple-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-300">23</div>
                  <div className="text-purple-100 text-sm">Alerts Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;