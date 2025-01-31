import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, Download, Mail, Calendar, Book, Briefcase, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type TestHistory = {
  id: string;
  type: 'career' | 'personality';
  date: string;
  results: {
    [key: string]: number;
  };
  recommendations: string[];
};

const mockTestHistory: TestHistory[] = [
  {
    id: '1',
    type: 'career',
    date: '2024-03-15',
    results: {
      technical: 75,
      creative: 45,
      social: 30,
      analytical: 60
    },
    recommendations: ['Software Engineer', 'Data Analyst', 'System Architect']
  },
  {
    id: '2',
    type: 'personality',
    date: '2024-03-10',
    results: {
      analytical: 80,
      creative: 40,
      social: 35,
      intuitive: 55
    },
    recommendations: ['Research Scientist', 'Financial Analyst', 'Business Intelligence']
  }
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    setIsChangingPassword(false);
  };

  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    console.log('Downloading PDF...');
  };

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
            <button
              onClick={handleDownloadPDF}
              className="nav-icon-button"
            >
              <Download size={24} />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="glass p-8 rounded-xl mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-blue-400/20 flex items-center justify-center">
              <User size={48} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{user?.user_metadata?.name || 'User'}</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Member Since</p>
                  <p>{new Date(user?.created_at || '').toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Book size={20} className="text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Tests Taken</p>
                  <p>{mockTestHistory.length}</p>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => setIsChangingPassword(true)}
                className="w-full glass p-4 rounded-xl hover:bg-blue-400/10 transition-colors flex items-center justify-center gap-2"
              >
                <Lock size={20} />
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Password Change Form */}
        {isChangingPassword && (
          <div className="glass p-8 rounded-xl mb-8">
            <h3 className="text-xl font-bold mb-6">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="flex-1 px-4 py-2 glass rounded-lg hover:bg-blue-400/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-400 text-black rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Test History */}
        <div className="glass p-8 rounded-xl">
          <h3 className="text-xl font-bold mb-6">Recent Test History</h3>
          <div className="space-y-6">
            {mockTestHistory.map((test) => (
              <div key={test.id} className="glass p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {test.type === 'career' ? (
                      <Briefcase size={20} className="text-blue-400" />
                    ) : (
                      <Brain size={20} className="text-purple-400" />
                    )}
                    <div>
                      <p className="font-semibold capitalize">{test.type} Assessment</p>
                      <p className="text-sm text-gray-400">
                        {new Date(test.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {Object.entries(test.results).map(([key, value]) => (
                      <div key={key} className="glass p-3 rounded-lg">
                        <p className="text-sm text-gray-400 capitalize mb-1">{key}</p>
                        <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-400 h-full transition-all duration-300"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Recommendations</p>
                  <div className="flex flex-wrap gap-2">
                    {test.recommendations.map((rec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 glass rounded-full text-sm text-blue-400"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;