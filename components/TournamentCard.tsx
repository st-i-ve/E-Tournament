import React from 'react';
import {
  Trophy,
  Users,
  Crown,
  Calendar,
  Star,
  Medal,
} from 'lucide-react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tournament } from '@/data/enhancedMockData';

interface TournamentCardProps {
  tournament: Tournament;
  isAdmin?: boolean;
}

const TournamentCard = ({
  tournament,
  isAdmin = false,
}: TournamentCardProps) => {
  const getPositionColor = (position?: number) => {
    if (!position) return 'bg-gray-500';
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
    if (position === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400';
    if (position === 3) return 'bg-gradient-to-r from-amber-500 to-amber-600';
    if (position <= 4) return 'bg-gradient-to-r from-green-500 to-green-600';
    return 'bg-gray-500';
  };

  const getPositionText = (position?: number) => {
    if (!position) return 'N/A';
    if (position === 1) return '1st';
    if (position === 2) return '2nd';
    if (position === 3) return '3rd';
    return `${position}th`;
  };

  const getPositionIcon = (position?: number) => {
    if (!position) return null;
    if (position === 1) return <Trophy className="h-3 w-3" />;
    if (position === 2) return <Medal className="h-3 w-3" />;
    if (position === 3) return <Star className="h-3 w-3" />;
    return null;
  };

  return (
    <Card className="bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] border-0 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      <CardContent className="p-4 relative">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full -translate-y-8 translate-x-8" />

        <div className="flex items-start justify-between mb-3 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-bold text-white text-sm truncate">
                  {tournament.name}
                </h3>
              </div>
              {isAdmin && (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full">
                  <Crown className="h-3 w-3 text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-medium">
                    Admin
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="outline"
                className={`text-xs border-0 ${
                  tournament.type === 'league'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-purple-500/20 text-purple-400'
                }`}
              >
                {tournament.type.toUpperCase()}
              </Badge>
              <Badge
                variant="outline"
                className="border-0 bg-green-500/20 text-green-400 text-xs"
              >
                ACTIVE
              </Badge>
            </div>
          </div>

          {tournament.userPosition && (
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-bold text-white ${getPositionColor(
                tournament.userPosition
              )} flex items-center gap-1 shadow-lg`}
            >
              {getPositionIcon(tournament.userPosition)}
              {getPositionText(tournament.userPosition)}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-400">
              <Users className="h-3 w-3" />
              <span className="font-medium">
                {tournament.totalParticipants}/{tournament.maxParticipants}
              </span>
            </div>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-1 text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>{tournament.matchDays.length} days/week</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-green-400 font-semibold text-xs">
              {Math.round(
                (tournament.totalParticipants / tournament.maxParticipants) *
                  100
              )}
              % full
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
            style={{
              width: `${
                (tournament.totalParticipants / tournament.maxParticipants) *
                100
              }%`,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentCard;
