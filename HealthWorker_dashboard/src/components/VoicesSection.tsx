import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, User, MapPin } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ritu Sharma",
    role: "ASHA Worker",
    location: "Dibrugarh, Assam",
    image: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "Earlier we didn't know why children were sick. Now alerts reach us before outbreaks. Digital Health Twin helped us prevent a major cholera outbreak in our village.",
    rating: 5,
    impact: "200+ families protected"
  },
  {
    id: 2,
    name: "Dr. Pranjal Bora",
    role: "District Health Officer",
    location: "Shillong, Meghalaya",
    image: "https://images.pexels.com/photos/5214962/pexels-photo-5214962.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "The real-time water quality monitoring has revolutionized how we respond to health threats. We can now act before diseases spread, not after.",
    rating: 5,
    impact: "12 districts covered"
  },
  {
    id: 3,
    name: "Lalrinsanga Ralte",
    role: "Village Health Committee Chief",
    location: "Aizawl, Mizoram",
    image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "Safe water tests helped us avoid cholera last year. The mobile app works even without internet, connecting our remote villages instantly.",
    rating: 5,
    impact: "50+ villages connected"
  },
  {
    id: 4,
    name: "Maya Chettri",
    role: "Community Health Volunteer",
    location: "Gangtok, Sikkim",
    image: "https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "Training through Digital Health Twin transformed our understanding of water safety. Now our community has zero waterborne disease cases for 8 months straight.",
    rating: 5,
    impact: "Zero cases in 8 months"
  }
];

const VoicesSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Quote className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Voices from Our Community</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from health workers and community leaders who are making a difference
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div 
          className="relative mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="lg:flex">
              {/* Image Side */}
              <div className="lg:w-2/5 relative">
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {testimonials[currentTestimonial].impact}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <Quote className="h-12 w-12 text-green-600 mb-6" />
                
                <blockquote className="text-xl lg:text-2xl text-gray-800 leading-relaxed mb-8 italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-green-600 font-medium">
                      {testimonials[currentTestimonial].role}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-green-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Community Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-700 font-medium">Community Satisfaction</div>
            <div className="text-sm text-gray-500 mt-1">Based on 5,200+ surveys</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">5,200</div>
            <div className="text-gray-700 font-medium">Active Health Workers</div>
            <div className="text-sm text-gray-500 mt-1">Trained and certified</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">850+</div>
            <div className="text-gray-700 font-medium">Villages Protected</div>
            <div className="text-sm text-gray-500 mt-1">Across all 8 states</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-100">
            <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-700 font-medium">Disease Prevention Rate</div>
            <div className="text-sm text-gray-500 mt-1">Outbreak prevention success</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoicesSection;