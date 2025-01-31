import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, Download } from 'lucide-react';

const PredictResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results || {
    technical: 0,
    creative: 0,
    social: 0,
    analytical: 0
  };

  const careerSuggestions = {
    technical: [
      "Software Engineer",
      "Data Scientist",
      "Systems Architect"
    ],
    creative: [
      "UX Designer",
      "Art Director",
      "Product Designer"
    ],
    social: [
      "HR Manager",
      "Teacher",
      "Counselor"
    ],
    analytical: [
      "Business Analyst",
      "Financial Advisor",
      "Research Analyst"
    ]
  };

  // Find the highest scoring category
  const topCategory = Object.entries(results).reduce((a, b) => 
    results[a] > results[b] ? a : b
  );

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="max-w-4xl mx-auto w-full">
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
            <button className="nav-icon-button">
              <Download size={24} />
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="glass p-8 rounded-xl mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Your Career Prediction Results</h2>
          
          {/* Donut Chart */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="10"
              />
              {Object.entries(results).map(([category, value], index) => {
                const offset = Object.entries(results)
                  .slice(0, index)
                  .reduce((acc, [_, val]) => acc + val, 0);
                const percentage = value;
                return (
                  <circle
                    key={category}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={
                      category === 'technical' ? '#60A5FA' :
                      category === 'creative' ? '#34D399' :
                      category === 'social' ? '#F472B6' :
                      '#A78BFA'
                    }
                    strokeWidth="10"
                    strokeDasharray={`${percentage} ${100 - percentage}`}
                    strokeDashoffset={-offset}
                    transform="rotate(-90 50 50)"
                    style={{
                      transition: 'stroke-dasharray 1s ease-in-out',
                    }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {Object.entries(results).map(([category, value]) => (
              <div key={category} className="flex items-center gap-2">
                <div 
                  className={`w-4 h-4 rounded-full ${
                    category === 'technical' ? 'bg-blue-400' :
                    category === 'creative' ? 'bg-green-400' :
                    category === 'social' ? 'bg-pink-400' :
                    'bg-purple-400'
                  }`}
                />
                <span className="capitalize">{category}</span>
                <span className="text-blue-400">{value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Suggestions */}
        <div className="glass p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-6">Recommended Career Paths</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(careerSuggestions).map(([category, careers]) => (
              <div key={category} className="glass p-6 rounded-xl">
                <h4 className="text-xl font-semibold mb-4 capitalize text-blue-400">
                  {category} Careers
                </h4>
                <ul className="space-y-2">
                  {careers.map((career, index) => (
                    <li 
                      key={index}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      {career}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictResults;