import React from 'react';
import { Calendar, Info } from 'lucide-react-native';
import { Match } from '@/data/enhancedMockData';

interface MatchCardProps {
  match: Match;
  userTeam: string;
  onInfoClick: (match: Match) => void;
  compact?: boolean;
}

const MatchCard = ({
  match,
  userTeam,
  onInfoClick,
  compact = false,
}: MatchCardProps) => {
  const isHomeTeam = match.homeTeam === userTeam;
  const matchDate = new Date(match.scheduledDate);

  return (
    <div className="bg-gray-900/30 hover:bg-gray-900/50 rounded-xl p-3 transition-all duration-200 border border-gray-800/50 hover:border-gray-700/50">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`truncate ${
                  match.homeTeam === userTeam
                    ? 'font-semibold text-green-400'
                    : 'text-gray-300'
                }`}
              >
                {match.homeTeam}
              </span>
              <span className="text-gray-500">vs</span>
              <span
                className={`truncate ${
                  match.awayTeam === userTeam
                    ? 'font-semibold text-green-400'
                    : 'text-gray-300'
                }`}
              >
                {match.awayTeam}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              <Calendar className="h-3 w-3" />
              <span>
                {matchDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onInfoClick(match)}
            className="p-1 hover:bg-gray-800/50 rounded transition-colors"
          >
            <Info className="h-4 w-4 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="text-sm text-gray-400">
          {matchDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
