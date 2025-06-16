
import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react-native';

interface Team {
  id: number;
  name: string;
  league: string;
  color: string;
}

interface AnimatedTeamListProps {
  teams: Team[];
  selectedTeam: Team | null;
  onTeamSelect: (team: Team) => void;
}

const AnimatedTeamList = ({ teams, selectedTeam, onTeamSelect }: AnimatedTeamListProps) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      teams.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, index * 100);
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [teams]);

  return (
    <div className="space-y-3">
      {teams.map((team, index) => (
        <div
          key={team.id}
          onClick={() => onTeamSelect(team)}
          className={`
            relative p-4 rounded-xl cursor-pointer transition-all duration-500 backdrop-blur-sm
            ${visibleItems.includes(index) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
            }
            ${selectedTeam?.id === team.id
              ? 'bg-white/20 border-2 border-white/40 shadow-lg scale-105'
              : 'bg-white/10 border border-white/20 hover:bg-white/15 hover:scale-102'
            }
          `}
          style={{
            transitionDelay: `${index * 50}ms`
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
              style={{ backgroundColor: team.color }}
            >
              {team.name.substring(0, 2)}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium">{team.name}</h3>
              <p className="text-gray-300 text-sm">{team.league}</p>
            </div>
            {selectedTeam?.id === team.id && (
              <div className="animate-scale-in">
                <Check className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedTeamList;
