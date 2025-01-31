import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Brain, Sparkles, Target, Clock, Compass, Share2, Settings, User, Menu, Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const buttons = [
    { 
      icon: <Brain size={32} />, 
      text: 'Predict', 
      path: '/predict',
      description: 'Take a comprehensive MCQ test to discover career paths that best match your interests and abilities'
    },
    { 
      icon: <Sparkles size={32} />, 
      text: 'Relevant Jobs', 
      path: '/careers',
      description: 'Explore career paths tailored to your profile with detailed roadmaps and requirements'
    },
    { 
      icon: <Target size={32} />, 
      text: 'Psychology Test', 
      path: '/psychology',
      description: 'Understand your personality type and work preferences through our detailed assessment'
    },
    { 
      icon: <Clock size={32} />, 
      text: 'Market Analysis', 
      path: '/market',
      description: 'Track real-time job market trends, salaries, and hiring patterns across industries'
    },
    { 
      icon: <Compass size={32} />, 
      text: 'Professional Guidance', 
      path: '/guidance',
      description: 'Connect with industry experts through our premium consultation packages'
    },
    { 
      icon: <Share2 size={32} />, 
      text: 'Explore', 
      path: '/explore',
      description: 'Stay updated with the latest job openings, hiring news, and industry developments'
    }
  ];

  return (
    <div>
      {/* Navigation Bar */}
      <div className="fixed w-full z-50 px-6 py-4">
        <nav className="nav-glass mx-auto max-w-6xl rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo and User Profile */}
            <div className="flex items-center space-x-6">
              <div className="logo-container glow-effect">
                <Brain size={32} className="text-blue-400" />
              </div>
              <button className="nav-button flex items-center space-x-2" > 
                <User size={20} />
                <span>{user?.user_metadata?.name || 'Profile'}</span>
              </button>
            </div>

            {/* Right Section - Navigation Items */}
            <div className="flex items-center space-x-4">
              <button className="nav-icon-button">
                <Search size={20} />
              </button>
              <button className="nav-icon-button">
                <Bell size={20} />
              </button>
              <button className="nav-icon-button">
                <Settings size={20} />
              </button>
              <button className="nav-icon-button">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-32">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Welcome, {user?.user_metadata?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-2xl text-blue-300">Your future awaits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => navigate(button.path)}
              className="glass p-8 rounded-xl button-hover flex flex-col items-center justify-center gap-4 transition-all duration-300 min-h-[240px] group hover:bg-blue-400/10"
            >
              <div className="text-blue-400 transition-transform duration-300 group-hover:scale-110">
                {button.icon}
              </div>
              <h3 className="text-xl font-semibold">{button.text}</h3>
              <p className="text-gray-400 text-center text-sm">
                {button.description}
              </p>
            </button>
          ))}
        </div>

        {/* Floating AI Assistant Button */}
        <button className="fixed bottom-8 right-8 glass p-4 rounded-full button-hover z-50">
          <MessageCircle size={24} className="text-blue-400" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
