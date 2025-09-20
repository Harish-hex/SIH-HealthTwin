import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const educationSlides = [
  {
    id: 1,
    title: "Understanding Waterborne Diseases",
    content: "Learn about cholera, typhoid, hepatitis A, and diarrheal diseases common in Northeast India",
    image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Disease Prevention",
    duration: "5 min read"
  },
  {
    id: 2,
    title: "Safe Water Practices",
    content: "Essential techniques for water purification, storage, and testing in rural communities",
    image: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Water Safety",
    duration: "7 min read"
  },
  {
    id: 3,
    title: "Community Health Response",
    content: "How to organize rapid response teams and implement emergency health protocols",
    image: "https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Emergency Response",
    duration: "10 min read"
  },
  {
    id: 4,
    title: "Early Warning Signs",
    content: "Recognizing symptoms and environmental indicators of potential disease outbreaks",
    image: "https://images.pexels.com/photos/4386430/pexels-photo-4386430.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Detection",
    duration: "6 min read"
  }
];

const EducationSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % educationSlides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % educationSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + educationSlides.length) % educationSlides.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Empowering Communities Through Education</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Knowledge is the first line of defense against waterborne diseases
          </p>
        </div>

        {/* Education Carousel */}
        <div 
          className="relative mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="lg:flex">
              {/* Image Side */}
              <div className="lg:w-1/2 relative">
                <img 
                  src={educationSlides[currentSlide].image} 
                  alt={educationSlides[currentSlide].title}
                  className="w-full h-64 lg:h-96 object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-semibold">
                    {educationSlides[currentSlide].category}
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Play className="h-4 w-4 mr-2" />
                  <span>{educationSlides[currentSlide].duration}</span>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {educationSlides[currentSlide].title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {educationSlides[currentSlide].content}
                </p>

                <div className="flex space-x-4">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Start Learning
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                    Download Guide
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {educationSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Education Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center border border-gray-100">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">25,000+</div>
            <div className="text-gray-600 font-medium">Community Members Trained</div>
            <div className="text-sm text-gray-500 mt-2">Across all 8 states</div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg text-center border border-gray-100">
            <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">400+</div>
            <div className="text-gray-600 font-medium">Educational Resources</div>
            <div className="text-sm text-gray-500 mt-2">Available in local languages</div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg text-center border border-gray-100">
            <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">97%</div>
            <div className="text-gray-600 font-medium">Knowledge Retention Rate</div>
            <div className="text-sm text-gray-500 mt-2">Post-training assessments</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;