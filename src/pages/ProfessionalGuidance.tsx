import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, Check, Star, Clock, MessageCircle, Video, Calendar } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$49',
    period: 'month',
    features: [
      '2 one-on-one calls',
      '10 chat messages',
      'Basic career guidance',
      'Email support'
    ],
    recommended: false
  },
  {
    name: 'Professional',
    price: '$99',
    period: 'month',
    features: [
      '5 one-on-one calls',
      'Unlimited chat messages',
      'Personalized career roadmap',
      'Resume review',
      'Interview preparation',
      'Priority support'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: 'month',
    features: [
      '10 one-on-one calls',
      'Unlimited chat messages',
      'Comprehensive career strategy',
      'Resume & portfolio review',
      'Mock interviews',
      '24/7 priority support',
      'Networking opportunities'
    ],
    recommended: false
  }
];

const ProfessionalGuidance = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/home')}
            className="nav-icon-button"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="logo-container glow-effect">
              <Brain size={32} className="text-blue-400" />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Professional Career Guidance</h1>
          <p className="text-xl text-gray-300">
            Get personalized guidance from industry experts to accelerate your career
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="glass p-6 rounded-xl text-center">
            <Video className="mx-auto mb-4 text-blue-400" size={32} />
            <h3 className="font-semibold mb-2">Video Calls</h3>
            <p className="text-gray-400">One-on-one mentoring sessions</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <MessageCircle className="mx-auto mb-4 text-blue-400" size={32} />
            <h3 className="font-semibold mb-2">Chat Support</h3>
            <p className="text-gray-400">Direct messaging with mentors</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <Calendar className="mx-auto mb-4 text-blue-400" size={32} />
            <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-gray-400">Book sessions at your convenience</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <Star className="mx-auto mb-4 text-blue-400" size={32} />
            <h3 className="font-semibold mb-2">Expert Mentors</h3>
            <p className="text-gray-400">Industry professionals</p>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`glass p-8 rounded-xl relative ${
                plan.recommended ? 'border-2 border-blue-400' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check size={20} className="text-blue-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl transition-colors ${
                plan.recommended
                  ? 'bg-blue-400 hover:bg-blue-500 text-black'
                  : 'glass hover:bg-blue-400/10'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">
                How do the video calls work?
              </h3>
              <p className="text-gray-300">
                You can schedule video calls with your mentor through our platform.
                Choose a time that works for you, and connect via our secure video
                conferencing system.
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">
                Can I change my mentor?
              </h3>
              <p className="text-gray-300">
                Yes, you can request to change your mentor if you feel they're not
                the right fit. We'll help you find a better match for your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalGuidance;