import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PredictTest from './pages/PredictTest';
import PredictResults from './pages/PredictResults';
import CareerPaths from './pages/CareerPaths';
import PsychologyTest from './pages/PsychologyTest';
import MarketAnalysis from './pages/MarketAnalysis';
import ProfessionalGuidance from './pages/ProfessionalGuidance';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="gradient-bg min-h-screen text-white glow-cursor">
      <div
        className="custom-cursor"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/auth" 
            element={!user ? <AuthPage /> : <Navigate to="/home" />} 
          />
          <Route 
            path="/home" 
            element={user ? <HomePage /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/predict" 
            element={user ? <PredictTest /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/predict/results" 
            element={user ? <PredictResults /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/careers" 
            element={user ? <CareerPaths /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/psychology" 
            element={user ? <PsychologyTest /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/market" 
            element={user ? <MarketAnalysis /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/guidance" 
            element={user ? <ProfessionalGuidance /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/explore" 
            element={user ? <ExplorePage /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <ProfilePage /> : <Navigate to="/auth" />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;