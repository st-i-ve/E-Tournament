import React from 'react';
import { Users, Crown, Calendar, Target } from 'lucide-react-native';
import { Tournament } from '@/data/enhancedMockData';

interface MinimalTournamentCardProps {
  tournament: Tournament;
  isAdmin?: boolean;
}

const MinimalTournamentCard = ({
  tournament,
  isAdmin = false,
}: MinimalTournamentCardProps) => {
  const getPositionColor = (position?: number) => {
    if (!position) return 'text-gray-500';
    if (position === 1) return 'text-yellow-400';
    if (position === 2) return 'text-gray-300';
    if (position === 3) return 'text-amber-500';
    if (position <= 4) return 'text-green-400';
    return 'text-gray-500';
  };

  return (
    <div className="bg-gray-800/30 rounded-xl p-4 hover:bg-gray-800/50 transition-all duration-200 border border-gray-800/50 hover:border-gray-700/50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-white text-sm truncate">
              {tournament.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              <span
                className={
                  tournament.type === 'league'
                    ? 'text-blue-400'
                    : tournament.type === 'knockout'
                    ? 'text-purple-400'
                    : 'text-orange-400'
                }
              >
                {tournament.type.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isAdmin && <Crown className="h-4 w-4 text-yellow-400" />}
          {tournament.userPosition && (
            <div
              className={`text-sm font-bold px-2 py-1 rounded-md bg-gray-700/50 ${getPositionColor(
                tournament.userPosition
              )}`}
            >
              #{tournament.userPosition}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Users className="h-3.5 w-3.5" />
            <span>
              {tournament.totalParticipants}/{tournament.maxParticipants}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {new Date(tournament.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div
          className={`w-2 h-2 rounded-full ${
            tournament.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
          }`}
        />
      </div>
    </div>
  );
};

export default MinimalTournamentCard;
