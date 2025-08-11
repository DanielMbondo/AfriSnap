import React from 'react';
import { 
  Camera, 
  Users, 
  Search, 
  QrCode, 
  Zap, 
  Shield,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

interface LandingPageProps {
  onShowLogin: () => void;
  onShowSignup: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onShowLogin, onShowSignup }) => {
  const features = [
    {
      icon: Camera,
      title: 'Real-time Photo Sharing',
      description: 'Photos are instantly uploaded and shared with your clients as you shoot.'
    },
    {
      icon: Search,
      title: 'AI Face Recognition',
      description: 'Clients can find their photos instantly by uploading a selfie.'
    },
    {
      icon: QrCode,
      title: 'QR Code Access',
      description: 'Share gallery access easily with unique QR codes for each event.'
    },
    {
      icon: Users,
      title: 'Multi-photographer Support',
      description: 'Collaborate with your team seamlessly in shared workspaces.'
    },
    {
      icon: Zap,
      title: 'Instant Notifications',
      description: 'Clients receive automatic alerts when new photos are available.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with granular privacy controls.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Wedding Photographer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'Honcho has revolutionized my business. Clients love getting their photos instantly, and I\'ve seen a 40% increase in sales.'
    },
    {
      name: 'Marcus Chen',
      role: 'Event Photographer',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'The AI face recognition is incredible. My conference clients can find themselves in thousands of photos within seconds.'
    },
    {
      name: 'Emma Davis',
      role: 'Portrait Photographer',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'The collaborative features allow my team to work together seamlessly. It\'s like having a virtual studio.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AfriSnap</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onShowLogin}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={onShowSignup}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-3xl mb-8">
              <Camera className="h-10 w-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The Future of
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Event Photography
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Share photos instantly, find faces with AI, and grow your photography business 
              with the most advanced event photography platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={onShowSignup}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center space-x-2 shadow-lg"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => window.open('https://www.youtube.com/watch?v=demo', '_blank')}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Watch Demo
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-blue-200">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-current text-yellow-300" />
                <span>4.9/5 rating</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-blue-300 rounded-full"></div>
              <div>10,000+ photographers</div>
              <div className="hidden sm:block w-1 h-1 bg-blue-300 rounded-full"></div>
              <div>1M+ photos processed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your workflow and delight your clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by photographers worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See how Honcho is transforming photography businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to transform your photography business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of photographers who are already using AfriSnap to grow their business
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={onShowSignup}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3 text-blue-100">
              <CheckCircle className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};