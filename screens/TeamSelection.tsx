import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedTeamList from '@/components/AnimatedTeamList';

const teams = [
  {
    id: 1,
    name: 'Manchester United',
    league: 'Premier League',
    color: '#DA020E',
  },
  { id: 2, name: 'Barcelona', league: 'La Liga', color: '#A50044' },
  { id: 3, name: 'Bayern Munich', league: 'Bundesliga', color: '#DC052D' },
  { id: 4, name: 'Juventus', league: 'Serie A', color: '#000000' },
  { id: 5, name: 'PSG', league: 'Ligue 1', color: '#004170' },
  { id: 6, name: 'Real Madrid', league: 'La Liga', color: '#FEBE10' },
  { id: 7, name: 'Liverpool', league: 'Premier League', color: '#C8102E' },
  { id: 8, name: 'Chelsea', league: 'Premier League', color: '#034694' },
];

const TeamSelectionPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<(typeof teams)[0] | null>(
    null
  );
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const handleTeamSelect = (team: (typeof teams)[0]) => {
    setSelectedTeam(team);
  };

  const handleContinue = () => {
    if (selectedTeam && user) {
      updateUser({
        ...user,
        teamName: selectedTeam.name,
        teamColor: selectedTeam.color,
      });
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <style>
        {`
          @keyframes aurora {
            0%, 100% {
              opacity: 0.8;
              transform: scale(1) rotate(0deg);
            }
            25% {
              opacity: 1;
              transform: scale(1.1) rotate(90deg);
            }
            50% {
              opacity: 0.6;
              transform: scale(0.9) rotate(180deg);
            }
            75% {
              opacity: 0.9;
              transform: scale(1.05) rotate(270deg);
            }
          }

          .aurora-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, 
              rgba(147, 51, 234, 0.3) 0%,
              rgba(79, 70, 229, 0.3) 25%,
              rgba(59, 130, 246, 0.3) 50%,
              rgba(16, 185, 129, 0.3) 75%,
              rgba(147, 51, 234, 0.3) 100%);
            background-size: 400% 400%;
            animation: aurora 20s ease-in-out infinite;
            filter: blur(60px);
          }

          .aurora-overlay {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 20% 80%, 
              rgba(147, 51, 234, 0.2) 0%,
              transparent 50%),
            radial-gradient(circle at 80% 20%, 
              rgba(59, 130, 246, 0.2) 0%,
              transparent 50%),
            radial-gradient(circle at 40% 40%, 
              rgba(16, 185, 129, 0.1) 0%,
              transparent 50%);
            animation: aurora 15s ease-in-out infinite reverse;
          }
        `}
      </style>

      {/* Aurora Background */}
      <div className="aurora-bg"></div>
      <div className="aurora-overlay"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Team Selection
            </h1>
            <p className="text-gray-400">Choose your favorite team</p>
          </div>

          {/* Team List */}
          <AnimatedTeamList
            teams={teams}
            selectedTeam={selectedTeam}
            onTeamSelect={handleTeamSelect}
          />

          {/* Continue Button */}
          {selectedTeam && (
            <div className="pt-6 animate-fade-in">
              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Continue with {selectedTeam.name}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSelectionPage;
