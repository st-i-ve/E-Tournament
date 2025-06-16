import React from 'react';
import {
  Trophy,
  Target,
  Shield,
  TrendingUp,
  Users,
  X,
} from 'lucide-react-native';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { mockUsers, mockMatches, currentUser } from '@/data/enhancedMockData';

interface OpponentStatsModalProps {
  opponent: string;
  isOpen: boolean;
  onClose: () => void;
}

const OpponentStatsModal = ({
  opponent,
  isOpen,
  onClose,
}: OpponentStatsModalProps) => {
  // Get opponent user data
  const opponentUser = mockUsers.find((user) => user.teamName === opponent);

  // Get head-to-head matches
  const headToHeadMatches = mockMatches
    .filter(
      (match) =>
        (match.homeTeam === currentUser.teamName &&
          match.awayTeam === opponent) ||
        (match.homeTeam === opponent && match.awayTeam === currentUser.teamName)
    )
    .filter((match) => match.status === 'completed');

  // Calculate head-to-head stats
  const calculateH2HStats = () => {
    let wins = 0;
    let draws = 0;
    let losses = 0;
    let goalsFor = 0;
    let goalsAgainst = 0;

    headToHeadMatches.forEach((match) => {
      const isHome = match.homeTeam === currentUser.teamName;
      const userScore = isHome ? match.homeScore : match.awayScore;
      const oppScore = isHome ? match.awayScore : match.homeScore;

      goalsFor += userScore;
      goalsAgainst += oppScore;

      if (userScore > oppScore) wins++;
      else if (userScore === oppScore) draws++;
      else losses++;
    });

    return {
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      totalMatches: headToHeadMatches.length,
    };
  };

  // Generate mock recent form for opponent
  const getOpponentForm = () => {
    return ['W', 'L', 'D', 'W', 'L'].slice(0, 5);
  };

  // Generate mock season stats for opponent
  const getOpponentSeasonStats = () => {
    return {
      matchesPlayed: 8,
      wins: 5,
      draws: 2,
      losses: 1,
      goalsFor: 12,
      goalsAgainst: 6,
      points: 17,
      position: 3,
    };
  };

  const h2hStats = calculateH2HStats();
  const opponentForm = getOpponentForm();
  const seasonStats = getOpponentSeasonStats();

  const getFormIcon = (result: string) => {
    const styles = {
      W: 'text-green-400 bg-green-400/20',
      L: 'text-red-400 bg-red-400/20',
      D: 'text-yellow-400 bg-yellow-400/20',
    };
    return (
      <div
        className={`flex items-center justify-center h-6 w-6 rounded-sm ${
          styles[result as keyof typeof styles]
        }`}
      >
        <span className="text-xs font-bold">{result}</span>
      </div>
    );
  };

  const getTeamCrest = (teamName: string) => {
    const initial = teamName.charAt(0).toUpperCase();
    return (
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {initial}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1C1C1E] border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-3">
            {getTeamCrest(opponent)}
            <div>
              <div className="text-lg font-bold">{opponent}</div>
              <div className="text-sm text-gray-400">
                {opponentUser?.username || 'Unknown Player'}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Head-to-Head Record */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Head-to-Head Record
            </h3>
            {h2hStats.totalMatches > 0 ? (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center mb-3">
                  <div>
                    <div className="text-lg font-bold text-green-400">
                      {h2hStats.wins}
                    </div>
                    <div className="text-xs text-gray-400">Wins</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-400">
                      {h2hStats.draws}
                    </div>
                    <div className="text-xs text-gray-400">Draws</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-400">
                      {h2hStats.losses}
                    </div>
                    <div className="text-xs text-gray-400">Losses</div>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400">
                  Goals: {h2hStats.goalsFor} - {h2hStats.goalsAgainst} (
                  {h2hStats.totalMatches} matches)
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-lg p-4 text-center text-gray-400">
                No previous matches
              </div>
            )}
          </div>

          {/* Season Stats */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              Season Performance
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Position:</span>
                  <span className="text-white font-medium">
                    #{seasonStats.position}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Points:</span>
                  <span className="text-white font-medium">
                    {seasonStats.points}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Matches:</span>
                  <span className="text-white font-medium">
                    {seasonStats.matchesPlayed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Goals:</span>
                  <span className="text-white font-medium">
                    {seasonStats.goalsFor}:{seasonStats.goalsAgainst}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Form */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              Recent Form
            </h3>
            <div className="flex justify-center space-x-2">
              {opponentForm.map((result, index) => (
                <div key={index}>{getFormIcon(result)}</div>
              ))}
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Quick Analysis
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                >
                  Strong Attack
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
                >
                  Good Form
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-red-500/20 text-red-400 border-red-500/30 text-xs"
                >
                  Weak Defense
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs"
                >
                  Inconsistent
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpponentStatsModal;
