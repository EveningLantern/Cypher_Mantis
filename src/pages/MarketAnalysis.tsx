import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, Search, TrendingUp, DollarSign, Users, Filter } from 'lucide-react';

type JobMarket = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  openings: number;
  growth: string;
  requirements: string[];
  type: string;
  posted: string;
};

const jobMarketData: JobMarket[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    openings: 150,
    growth: '+25%',
    requirements: ['5+ years experience', 'Bachelor\'s in CS', 'React expertise'],
    type: 'Full-time',
    posted: '2 days ago'
  },
  {
    id: '2',
    title: 'Data Scientist',
    company: 'Analytics Inc',
    location: 'New York, NY',
    salary: '$130,000 - $190,000',
    openings: 80,
    growth: '+30%',
    requirements: ['ML expertise', 'PhD preferred', 'Python skills'],
    type: 'Full-time',
    posted: '1 day ago'
  },
  // Add more job market data...
];

const MarketAnalysis = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'salary' | 'openings' | 'growth'>('salary');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredAndSortedJobs = jobMarketData
    .filter(job => 
      (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterType === 'all' || job.type === filterType)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'salary':
          return parseInt(b.salary.replace(/\D/g, '')) - parseInt(a.salary.replace(/\D/g, ''));
        case 'openings':
          return b.openings - a.openings;
        case 'growth':
          return parseInt(b.growth) - parseInt(a.growth);
        default:
          return 0;
      }
    });

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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'salary' | 'openings' | 'growth')}
                className="px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
              >
                <option value="salary">Sort by Salary</option>
                <option value="openings">Sort by Openings</option>
                <option value="growth">Sort by Growth</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-blue-400/10">
                <DollarSign size={24} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Average Salary</h3>
                <p className="text-2xl font-bold text-blue-400">$125,000</p>
              </div>
            </div>
            <p className="text-gray-400">Across all listed positions</p>
          </div>

          <div className="glass p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-green-400/10">
                <TrendingUp size={24} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Market Growth</h3>
                <p className="text-2xl font-bold text-green-400">+28%</p>
              </div>
            </div>
            <p className="text-gray-400">Year over year increase</p>
          </div>

          <div className="glass p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-purple-400/10">
                <Users size={24} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total Openings</h3>
                <p className="text-2xl font-bold text-purple-400">1,250</p>
              </div>
            </div>
            <p className="text-gray-400">Active job listings</p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredAndSortedJobs.map(job => (
            <div key={job.id} className="glass p-6 rounded-xl hover:bg-blue-400/5 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400">{job.title}</h3>
                  <p className="text-gray-300">{job.company} • {job.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{job.salary}</p>
                  <p className="text-green-400">{job.growth} growth</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full glass text-sm text-blue-400"
                  >
                    {req}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <span>{job.type}</span>
                  <span>{job.openings} openings</span>
                </div>
                <span>{job.posted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;