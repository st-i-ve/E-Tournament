import React from 'react';
import { Calendar, Clock, Eye, Check, X } from 'lucide-react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DetailedMatch } from '@/data/matchStats';

interface DetailedMatchCardProps {
  match: DetailedMatch;
  userTeam: string;
  onViewDetails: (match: DetailedMatch) => void;
}

const DetailedMatchCard = ({
  match,
  userTeam,
  onViewDetails,
}: DetailedMatchCardProps) => {
  const isHomeTeam = match.team_home.name === userTeam;
  const isWin =
    (isHomeTeam && match.team_home.score > match.team_away.score) ||
    (!isHomeTeam && match.team_away.score > match.team_home.score);
  const isDraw = match.team_home.score === match.team_away.score;

  const getResultColor = () => {
    if (isWin) return 'bg-green-900/20 hover:bg-green-900/30';
    if (isDraw) return 'bg-orange-900/20 hover:bg-orange-900/30';
    return 'bg-red-900/20 hover:bg-red-900/30';
  };

  const getResultBadge = () => {
    if (isWin)
      return {
        text: '',
        color: 'bg-green-500/20 text-green-400',
        icon: Check,
      };
    if (isDraw)
      return {
        text: 'DRAW',
        color: 'bg-orange-500/20 text-orange-400',
        icon: null,
      };
    return {
      text: 'LOSS',
      color: 'bg-red-500/20 text-red-400',
      icon: X,
    };
  };

  const result = getResultBadge();
  const ResultIcon = result.icon;
  const matchDate = new Date(match.timestamp);

  return (
    <div
      className={`${getResultColor()} rounded-xl p-3 transition-all duration-200 border border-gray-800/50 hover:border-gray-700/50 cursor-pointer`}
      onClick={() => onViewDetails(match)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`truncate ${
                  match.team_home.name === userTeam
                    ? 'font-semibold text-green-400'
                    : 'text-gray-300'
                }`}
              >
                {match.team_home.name}
              </span>
              <span className="text-gray-500">vs</span>
              <span
                className={`truncate ${
                  match.team_away.name === userTeam
                    ? 'font-semibold text-green-400'
                    : 'text-gray-300'
                }`}
              >
                {match.team_away.name}
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
          <Badge
            variant="outline"
            className={`text-xs border-0 ${result.color} flex items-center gap-1 px-1 py-0.5`}
          >
            {ResultIcon && <ResultIcon className="h-3 w-3" />}
            {result.text}
          </Badge>
          <Eye className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="text-sm font-bold text-white">
            {match.team_home.score} - {match.team_away.score}
          </div>
        </div>

        {match.tournament_name && (
          <span className="text-gray-500 text-xs">{match.tournament_name}</span>
        )}
      </div>
    </div>
  );
};

export default DetailedMatchCard;
