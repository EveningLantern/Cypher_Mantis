import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, Search, Building, Briefcase, TrendingUp, Calendar } from 'lucide-react';

type NewsItem = {
  id: string;
  title: string;
  company: string;
  description: string;
  type: 'job' | 'news' | 'trend';
  date: string;
  image: string;
  link: string;
};

const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'Google Announces 1000+ New Positions in AI Development',
    company: 'Google',
    description: 'Tech giant Google is expanding its AI research team with new positions across multiple locations...',
    type: 'job',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    link: '#'
  },
  {
    id: '2',
    title: 'Tech Industry Sees 25% Growth in Remote Work Opportunities',
    company: 'Industry Report',
    description: 'New study shows significant increase in remote work positions across tech sector...',
    type: 'trend',
    date: 'March 14, 2024',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    link: '#'
  },
  {
    id: '3',
    title: 'Microsoft Launches New Graduate Program',
    company: 'Microsoft',
    description: 'Microsoft announces comprehensive graduate program focusing on cloud computing and AI...',
    type: 'news',
    date: 'March 13, 2024',
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    link: '#'
  }
];

const ExplorePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'job' | 'news' | 'trend'>('all');

  const filteredNews = newsData.filter(item =>
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedType === 'all' || item.type === selectedType)
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

        {/* Search and Filters */}
        <div className="glass p-6 rounded-xl mb-8"> 
          <boltAction type="file" filePath="src/pages/ExplorePage.tsx"/>          
            <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search news and opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedType === 'all' ? 'bg-blue-400 text-black' : 'glass'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('job')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedType === 'job' ? 'bg-blue-400 text-black' : 'glass'
                }`}
              >
                Jobs
              </button>
              <button
                onClick={() => setSelectedType('news')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedType === 'news' ? 'bg-blue-400 text-black' : 'glass'
                }`}
              >
                News
              </button>
              <button
                onClick={() => setSelectedType('trend')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedType === 'trend' ? 'bg-blue-400 text-black' : 'glass'
                }`}
              >
                Trends
              </button>
            </div>
          </div>
        </div>
        
        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(item => (
            <div key={item.id} className="glass rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {item.type === 'job' && (
                    <Briefcase size={20} className="text-blue-400" />
                  )}
                  {item.type === 'news' && (
                    <Building size={20} className="text-green-400" />
                  )}
                  {item.type === 'trend' && (
                    <TrendingUp size={20} className="text-purple-400" />
                  )}
                  <span className="text-sm text-gray-400">{item.company}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar size={16} />
                    <span>{item.date}</span>
                  </div>
                  <a
                    href={item.link}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="glass p-8 rounded-xl mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-6">
            Get the latest job opportunities and industry news delivered to your inbox
          </p>
          <div className="flex gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
            />
            <button className="px-6 py-2 bg-blue-400 text-black rounded-lg hover:bg-blue-500 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;