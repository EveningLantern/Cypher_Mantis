import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, Disc as Discord, Newspaper, Calendar } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      title: "AI in Education: Transforming Learning Paths",
      date: "March 15, 2024",
      excerpt: "Discover how artificial intelligence is revolutionizing educational guidance and career planning.",
      image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      title: "The Future of Career Planning",
      date: "March 12, 2024",
      excerpt: "Exploring innovative approaches to career development in the digital age.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      title: "Success Stories: AI-Guided Careers",
      date: "March 10, 2024",
      excerpt: "Real stories from students who found their perfect career path using AI guidance.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center mb-12">
          <div className="logo-container glow-effect mb-8 mx-auto">
            <Brain size={64} className="text-blue-400" />
          </div>
          <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Mantis
          </h1>
          <p className="text-3xl text-blue-300 mb-8">predicting your future</p>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Unlock your potential with AI-powered predictions tailored to your educational journey.
            Let Mantis guide you towards your ideal career path.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/auth')}
              className="glass button-hover px-8 py-4 rounded-xl text-xl flex items-center gap-3"
            >
              Begin Your Journey
              <ArrowRight size={24} />
            </button>
            <a
              href="https://discord.gg/mantis"
              target="_blank"
              rel="noopener noreferrer"
              className="glass button-hover px-8 py-4 rounded-xl text-xl flex items-center gap-3 bg-[#5865F2]/20"
            >
              Join Discord
              <Discord size={24} />
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <div className="glass p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Smart Predictions</h3>
            <p className="text-gray-300">
              Advanced AI algorithms analyze your educational background to predict optimal career paths.
            </p>
          </div>
          <div className="glass p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Personalized Insights</h3>
            <p className="text-gray-300">
              Get tailored recommendations based on your unique educational journey and interests.
            </p>
          </div>
          <div className="glass p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Career Tracking</h3>
            <p className="text-gray-300">
              Monitor your progress and adjust your path with real-time career development insights.
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="max-w-6xl mx-auto w-full px-4 mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Latest Insights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Calendar size={16} />
                    <span className="text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                  <button className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-4xl mx-auto w-full px-4 mb-20">
          <div className="glass p-8 rounded-xl text-center">
            <Newspaper size={40} className="text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest insights on AI-driven career guidance and educational trends.
            </p>
            <form className="flex gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;