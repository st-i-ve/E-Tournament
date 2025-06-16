import React from 'react';
import { Calendar, MapPin, Home, Clock, Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Match } from '@/data/enhancedMockData';

interface RecentMatchCardProps {
  match: Match;
  userTeam: string;
}

const RecentMatchCard = ({ match, userTeam }: RecentMatchCardProps) => {
  const isHomeTeam = match.homeTeam === userTeam;
  const isWin = match.status === 'completed' && 
    ((isHomeTeam && match.homeScore > match.awayScore) || 
     (!isHomeTeam && match.awayScore > match.homeScore));
  const isDraw = match.status === 'completed' && match.homeScore === match.awayScore;
  
  const getResultColor = () => {
    if (match.status === 'upcoming') return 'bg-gray-800/30 hover:bg-gray-800/50';
    if (isWin) return 'bg-green-900/20 hover:bg-green-900/30';
    if (isDraw) return 'bg-orange-900/20 hover:bg-orange-900/30';
    return 'bg-red-900/20 hover:bg-red-900/30';
  };

  const getResultBadge = () => {
    if (match.status === 'upcoming') return { 
      text: 'UPCOMING', 
      color: 'bg-gray-500/20 text-gray-400',
      icon: Clock
    };
    if (isWin) return { 
      text: 'WIN', 
      color: 'bg-green-500/20 text-green-400',
      icon: Check
    };
    if (isDraw) return { 
      text: 'DRAW', 
      color: 'bg-orange-500/20 text-orange-400',
      icon: null
    };
    return { 
      text: 'LOSS', 
      color: 'bg-red-500/20 text-red-400',
      icon: X
    };
  };

  const result = getResultBadge();
  const ResultIcon = result.icon;

  return (
    <div className={`${getResultColor()} rounded-xl p-4 transition-all duration-200 border border-gray-800/50 hover:border-gray-700/50`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-sm">
              <span className={`truncate ${match.homeTeam === userTeam ? 'font-semibold text-green-400' : 'text-gray-300'}`}>
                {match.homeTeam}
              </span>
              <span className="text-gray-500">vs</span>
              <span className={`truncate ${match.awayTeam === userTeam ? 'font-semibold text-green-400' : 'text-gray-300'}`}>
                {match.awayTeam}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              <Calendar className="h-3 w-3" />
              <span>{new Date(match.scheduledDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge variant="outline" className={`text-xs border-0 ${result.color} flex items-center gap-1`}>
            {ResultIcon && <ResultIcon className="h-3 w-3" />}
            {result.text}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          {match.status === 'completed' ? (
            <div className="text-lg font-bold text-white">
              {match.homeScore} - {match.awayScore}
            </div>
          ) : (
            <div className="text-sm text-gray-400">
              {new Date(match.scheduledDate).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit' 
              })}
            </div>
          )}
        </div>
        
        {match.matchday && (
          <span className="text-gray-500">MD {match.matchday}</span>
        )}
      </div>
    </div>
  );
};

export default RecentMatchCard;
