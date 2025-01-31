import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type EducationLevel = {
  institution: string;
  degree: string;
  field: string;
  year: string;
};

const AuthPage = () => {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Basic Info
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Education Info
  const [schooling, setSchooling] = useState({
    school: '',
    graduationYear: '',
    board: '',
    percentage: '',
  });
  
  const [higherEducation, setHigherEducation] = useState<EducationLevel[]>([{
    institution: '',
    degree: '',
    field: '',
    year: '',
  }]);

  const validateForm = () => {
    setError('');
    
    if (!email) {
      setError('Email is required');
      return false;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!password) {
      setError('Password is required');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (isSignUp) {
      if (!name) {
        setError('Name is required');
        return false;
      }
      
      if (currentStep === 2) {
        if (!schooling.school || !schooling.graduationYear || !schooling.board || !schooling.percentage) {
          setError('All school education fields are required');
          return false;
        }
      }
      
      if (currentStep === 3) {
        const isValid = higherEducation.every(edu => 
          edu.institution && edu.degree && edu.field && edu.year
        );
        if (!isValid) {
          setError('All higher education fields are required');
          return false;
        }
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      if (isSignUp) {
        await signUp({
          email,
          password,
          metadata: {
            name,
            schooling,
            higherEducation,
          },
        });
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      switch (err.message) {
        case 'Invalid login credentials':
          setError('Invalid email or password');
          break;
        case 'User already registered':
          setError('An account with this email already exists');
          break;
        case 'Email not confirmed':
          setError('Please confirm your email address');
          break;
        default:
          setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const addEducationLevel = () => {
    setHigherEducation([...higherEducation, {
      institution: '',
      degree: '',
      field: '',
      year: '',
    }]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass p-8 rounded-2xl max-w-2xl w-full">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="nav-icon-button"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="logo-container glow-effect">
            <Brain size={32} className="text-blue-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp ? (
            <>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">School Education</h3>
                  <input
                    type="text"
                    placeholder="School Name"
                    value={schooling.school}
                    onChange={(e) => setSchooling({...schooling, school: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Graduation Year"
                    value={schooling.graduationYear}
                    onChange={(e) => setSchooling({...schooling, graduationYear: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Board"
                    value={schooling.board}
                    onChange={(e) => setSchooling({...schooling, board: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Percentage/CGPA"
                    value={schooling.percentage}
                    onChange={(e) => setSchooling({...schooling, percentage: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Higher Education</h3>
                  {higherEducation.map((edu, index) => (
                    <div key={index} className="space-y-4 p-4 glass rounded-lg">
                      <input
                        type="text"
                        placeholder="Institution Name"
                        value={edu.institution}
                        onChange={(e) => {
                          const newEdu = [...higherEducation];
                          newEdu[index].institution = e.target.value;
                          setHigherEducation(newEdu);
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...higherEducation];
                          newEdu[index].degree = e.target.value;
                          setHigherEducation(newEdu);
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => {
                          const newEdu = [...higherEducation];
                          newEdu[index].field = e.target.value;
                          setHigherEducation(newEdu);
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => {
                          const newEdu = [...higherEducation];
                          newEdu[index].year = e.target.value;
                          setHigherEducation(newEdu);
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEducationLevel}
                    className="w-full px-4 py-2 glass button-hover rounded-lg"
                  >
                    Add Another Degree
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-blue-400/30 focus:outline-none focus:border-blue-400"
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-400 hover:text-blue-300"
            >
              {isSignUp ? 'Already have an account?' : 'Need an account?'}
            </button>

            {isSignUp ? (
              <div className="flex gap-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 glass button-hover rounded-lg"
                    disabled={loading}
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (validateForm()) {
                        setCurrentStep(currentStep + 1);
                      }
                    }}
                    className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={loading}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </button>
                )}
              </div>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;