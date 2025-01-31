import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, HelpCircle, ChevronRight } from 'lucide-react';

type Question = {
  id: number;
  text: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "Which activities do you enjoy most in your free time?",
    options: [
      "Solving complex problems or puzzles",
      "Creating art or designing things",
      "Helping and teaching others",
      "Analyzing data and patterns"
    ]
  },
  {
    id: 2,
    text: "How do you prefer to work?",
    options: [
      "Independently on challenging problems",
      "In a creative, flexible environment",
      "As part of a team helping others",
      "In a structured, organized setting"
    ]
  },
  {
    id: 3,
    text: "What subjects interest you the most?",
    options: [
      "Mathematics and Physics",
      "Art and Design",
      "Psychology and Sociology",
      "Business and Economics"
    ]
  },
  {
    id: 4,
    text: "How do you approach problem-solving?",
    options: [
      "Breaking down complex problems systematically",
      "Finding creative and innovative solutions",
      "Considering how it affects people",
      "Analyzing data and facts"
    ]
  },
  {
    id: 5,
    text: "What kind of work environment appeals to you?",
    options: [
      "High-tech and innovative",
      "Creative and flexible",
      "Collaborative and supportive",
      "Professional and structured"
    ]
  }
];

const PredictTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results and navigate to results page
      const results = calculateResults(newAnswers);
      navigate('/predict/results', { state: { results } });
    }
  };

  const calculateResults = (answers: number[]) => {
    // Simple calculation for demo - can be made more sophisticated
    const categories = {
      technical: 0,
      creative: 0,
      social: 0,
      analytical: 0
    };

    answers.forEach((answer) => {
      switch (answer) {
        case 0:
          categories.technical += 20;
          break;
        case 1:
          categories.creative += 20;
          break;
        case 2:
          categories.social += 20;
          break;
        case 3:
          categories.analytical += 20;
          break;
      }
    });

    return categories;
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
              onClick={() => setShowHelp(!showHelp)}
              className="nav-icon-button"
            >
              <HelpCircle size={24} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass p-4 rounded-xl mb-8">
          <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-400 h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-center mt-2 text-blue-300">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Help Dialog */}
        {showHelp && (
          <div className="glass p-6 rounded-xl mb-8 text-gray-300">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">How it works</h3>
            <p className="mb-4">
              This test helps predict potential career paths based on your preferences and interests.
              Answer honestly - there are no right or wrong answers!
            </p>
            <p>
              Your responses will be analyzed to create a personalized career prediction chart.
            </p>
          </div>
        )}

        {/* Question Card */}
        <div className="glass p-8 rounded-xl mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-8">
            {questions[currentQuestion].text}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 glass hover:bg-blue-400/10 rounded-xl transition-all duration-300 group flex items-center justify-between"
              >
                <span>{option}</span>
                <ChevronRight 
                  size={20} 
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictTest;