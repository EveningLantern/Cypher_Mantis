import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, HelpCircle } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "How do you typically make decisions?",
    options: [
      "Based on logic and facts",
      "Based on feelings and values",
      "Considering both facts and feelings",
      "Going with my intuition"
    ]
  },
  {
    id: 2,
    text: "In a group setting, you usually:",
    options: [
      "Take charge and lead discussions",
      "Listen and observe before contributing",
      "Mediate between different viewpoints",
      "Focus on maintaining harmony"
    ]
  },
  {
    id: 3,
    text: "When facing a challenge, you prefer to:",
    options: [
      "Break it down into smaller steps",
      "Look for creative solutions",
      "Discuss it with others",
      "Trust your instincts"
    ]
  },
  {
    id: 4,
    text: "Your ideal work environment is:",
    options: [
      "Structured and organized",
      "Flexible and innovative",
      "Collaborative and supportive",
      "Quiet and independent"
    ]
  },
  {
    id: 5,
    text: "When learning something new, you prefer:",
    options: [
      "Following a systematic approach",
      "Experimenting and exploring",
      "Learning from others' experiences",
      "Understanding the big picture first"
    ]
  }
];

const personalityTypes = {
  analytical: "Analytical Thinker",
  creative: "Creative Innovator",
  social: "Social Connector",
  intuitive: "Intuitive Leader"
};

const PsychologyTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [personalityType, setPersonalityType] = useState('');

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate personality type
      const type = calculatePersonalityType(newAnswers);
      setPersonalityType(type);
      setShowResults(true);
    }
  };

  const calculatePersonalityType = (answers: number[]) => {
    const counts = answers.reduce((acc, val) => {
      const type = val === 0 ? 'analytical' :
                  val === 1 ? 'creative' :
                  val === 2 ? 'social' : 'intuitive';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).reduce((a, b) => 
      counts[a] > counts[b[0]] ? a : b[0]
    );
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
            <button className="nav-icon-button">
              <HelpCircle size={24} />
            </button>
          </div>
        </div>

        {!showResults ? (
          <>
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

            {/* Question Card */}
            <div className="glass p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-8">
                {questions[currentQuestion].text}
              </h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left p-4 glass hover:bg-blue-400/10 rounded-xl transition-all duration-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          // Results Section
          <div className="glass p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Your Personality Profile
            </h2>
            <div className="text-center mb-8">
              <div className="text-2xl font-semibold text-blue-400 mb-4">
                {personalityTypes[personalityType as keyof typeof personalityTypes]}
              </div>
              <p className="text-gray-300">
                {personalityType === 'analytical' && "You excel at logical thinking and problem-solving. Your methodical approach makes you well-suited for roles requiring attention to detail and systematic analysis."}
                {personalityType === 'creative' && "Your innovative thinking and originality shine through. You thrive in environments that allow you to explore new ideas and express your creativity."}
                {personalityType === 'social' && "Your strength lies in understanding and connecting with others. You excel in roles that involve collaboration, communication, and helping others."}
                {personalityType === 'intuitive' && "You have a natural ability to see the big picture and trust your instincts. Your leadership qualities make you effective in decision-making roles."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {personalityType === 'analytical' && [
                    "Problem-solving",
                    "Attention to detail",
                    "Logical thinking",
                    "Data analysis"
                  ].map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      {strength}
                    </li>
                  ))}
                  {/* Add similar blocks for other personality types */}
                </ul>
              </div>

              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">
                  Recommended Careers
                </h3>
                <ul className="space-y-2">
                  {personalityType === 'analytical' && [
                    "Data Scientist",
                    "Financial Analyst",
                    "Software Engineer",
                    "Research Scientist"
                  ].map((career, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      {career}
                    </li>
                  ))}
                  {/* Add similar blocks for other personality types */}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychologyTest;