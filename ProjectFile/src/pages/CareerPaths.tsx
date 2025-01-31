import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, Search, ChevronRight, Briefcase, GraduationCap, Trophy } from 'lucide-react';

type CareerPath = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  education: string[];
  exams: string[];
  salary: string;
  growth: string;
  image: string;
};

const careerPaths: CareerPath[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Design and develop software solutions and applications',
    skills: ['Programming', 'Problem Solving', 'System Design', 'Algorithms'],
    education: ['B.Tech in Computer Science', 'M.Tech in Software Engineering'],
    exams: ['GATE', 'GRE', 'Company Specific Tests'],
    salary: '$70,000 - $150,000',
    growth: 'High',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data sets to help guide business decisions',
    skills: ['Statistics', 'Machine Learning', 'Python', 'Data Visualization'],
    education: ['B.Tech/BSc in Statistics/Mathematics', 'MS in Data Science'],
    exams: ['GRE', 'GMAT', 'Company Assessments'],
    salary: '$80,000 - $160,000',
    growth: 'Very High',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

const CareerPaths = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPaths = careerPaths.filter(path =>
    path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Search Bar */}
        <div className="glass p-4 rounded-xl mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search career paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Career Paths List */}
          <div className="space-y-4">
            {filteredPaths.map(path => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path)}
                className={`w-full text-left p-6 glass rounded-xl transition-all duration-300 hover:bg-blue-400/10 ${
                  selectedPath?.id === path.id ? 'border-2 border-blue-400' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-blue-400">{path.title}</h3>
                  <ChevronRight size={20} className="text-blue-400" />
                </div>
                <p className="text-gray-300 mb-4">{path.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {path.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full bg-blue-400/10 text-blue-400 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Career Details */}
          {selectedPath && (
            <div className="glass p-8 rounded-xl space-y-6">
              <img
                src={selectedPath.image}
                alt={selectedPath.title}
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              
              <h2 className="text-3xl font-bold text-blue-400 mb-4">
                {selectedPath.title}
              </h2>
              
              <div className="flex gap-4 mb-6">
                <div className="flex-1 glass p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Average Salary</p>
                  <p className="text-lg font-semibold">{selectedPath.salary}</p>
                </div>
                <div className="flex-1 glass p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Growth Potential</p>
                  <p className="text-lg font-semibold">{selectedPath.growth}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap size={24} className="text-blue-400" />
                    <h3 className="text-xl font-semibold">Education Path</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    {selectedPath.education.map((edu, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy size={24} className="text-blue-400" />
                    <h3 className="text-xl font-semibold">Required Exams</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    {selectedPath.exams.map((exam, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        {exam}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase size={24} className="text-blue-400" />
                    <h3 className="text-xl font-semibold">Key Skills</h3>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {selectedPath.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full glass text-blue-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPaths;