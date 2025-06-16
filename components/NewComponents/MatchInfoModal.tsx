import React from 'react';
import { Circle, Users, Target, TrendingUp, Flag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Match, mockTournaments, mockUsers, mockMatches, currentUser } from '@/data/enhancedMockData';

interface MatchInfoModalProps {
  match: Match | null;
  userTeam: string;
  isOpen: boolean;
  onClose: () => void;
}

const MatchInfoModal = ({ match, userTeam, isOpen, onClose }: MatchInfoModalProps) => {
  if (!match) return null;

  const isHomeTeam = match.homeTeam === userTeam;
  const opponentTeam = isHomeTeam ? match.awayTeam : match.homeTeam;
  const tournament = mockTournaments.find(t => t.id === match.tournamentId);
  const opponentUser = mockUsers.find(user => user.teamName === opponentTeam);
  const currentUserData = mockUsers.find(user => user.teamName === userTeam);

  // Get head-to-head matches
  const headToHeadMatches = mockMatches.filter(match => 
    (match.homeTeam === currentUser.teamName && match.awayTeam === opponentTeam) ||
    (match.homeTeam === opponentTeam && match.awayTeam === currentUser.teamName)
  ).filter(match => match.status === 'completed');

  // Calculate head-to-head stats
  const calculateH2HStats = () => {
    let wins = 0;
    let draws = 0;
    let losses = 0;
    let goalsFor = 0;
    let goalsAgainst = 0;

    headToHeadMatches.forEach(match => {
      const isHome = match.homeTeam === currentUser.teamName;
      const userScore = isHome ? match.homeScore : match.awayScore;
      const oppScore = isHome ? match.awayScore : match.homeScore;
      
      goalsFor += userScore;
      goalsAgainst += oppScore;
      
      if (userScore > oppScore) wins++;
      else if (userScore === oppScore) draws++;
      else losses++;
    });

    return { wins, draws, losses, goalsFor, goalsAgainst, totalMatches: headToHeadMatches.length };
  };

  // Generate mock recent form for opponent
  const getOpponentForm = () => {
    return ['W', 'L', 'D', 'W', 'L'].slice(0, 5);
  };

  const h2hStats = calculateH2HStats();
  const opponentForm = getOpponentForm();

  const getPlayerAvatar = (username: string) => {
    const initial = username.charAt(0).toUpperCase();
    return (
      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-medium text-sm">
        {initial}
      </div>
    );
  };

  const getFormIcon = (result: string) => {
    const styles = {
      W: 'text-green-400 bg-green-500/20',
      L: 'text-red-400 bg-red-500/20',
      D: 'text-yellow-400 bg-yellow-500/20',
    };
    return (
      <div className={`flex items-center justify-center h-6 w-6 rounded ${styles[result as keyof typeof styles]}`}>
        <span className="text-xs font-medium">{result}</span>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1C1C1E] border-gray-800 text-white max-w-sm max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center gap-2 text-lg font-medium text-white">
            <Circle className="h-5 w-5 text-green-500" />
            Match Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Tournament Badge */}
          {tournament && (
            <div className="text-center">
              <Badge variant="outline" className="text-xs text-gray-300 border-gray-600 bg-transparent">
                {tournament.name}
              </Badge>
            </div>
          )}

          {/* Players Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentUserData && getPlayerAvatar(currentUserData.username)}
              <div>
                <div className="text-sm font-medium text-white">
                  {isHomeTeam ? currentUserData?.username : opponentUser?.username}
                </div>
                <div className="text-xs text-gray-500">
                  {isHomeTeam ? 'You (Home)' : 'Opponent (Home)'}
                </div>
              </div>
            </div>

            <div className="text-sm font-medium text-gray-400">VS</div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {isHomeTeam ? opponentUser?.username : currentUserData?.username}
                </div>
                <div className="text-xs text-gray-500">
                  {isHomeTeam ? 'Opponent (Away)' : 'You (Away)'}
                </div>
              </div>
              {isHomeTeam ? (opponentUser && getPlayerAvatar(opponentUser.username)) : (currentUserData && getPlayerAvatar(currentUserData.username))}
            </div>
          </div>

          {/* Match Date */}
          <div className="text-center">
            <div className="text-sm font-medium text-white">
              {new Date(match.scheduledDate).toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>

          {/* Opponent Stats Section */}
          {opponentUser && (
            <>
              <Separator className="bg-gray-800" />
              
              {/* Head-to-Head Record */}
              <div>
                <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                  <Flag className="h-4 w-4 text-yellow-500" />
                  Head-to-Head Record
                </h4>
                {h2hStats.totalMatches > 0 ? (
                  <div>
                    <div className="grid grid-cols-3 gap-4 text-center mb-2">
                      <div>
                        <div className="text-lg font-semibold text-green-400">{h2hStats.wins}</div>
                        <div className="text-xs text-gray-500">Wins</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-yellow-400">{h2hStats.draws}</div>
                        <div className="text-xs text-gray-500">Draws</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-red-400">{h2hStats.losses}</div>
                        <div className="text-xs text-gray-500">Losses</div>
                      </div>
                    </div>
                    <div className="text-center text-xs text-gray-500">
                      Goals: {h2hStats.goalsFor} - {h2hStats.goalsAgainst} ({h2hStats.totalMatches} matches)
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500">
                    No previous matches
                  </div>
                )}
              </div>

              <Separator className="bg-gray-800" />

              {/* Season Stats */}
              <div>
                <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-400" />
                  Season Stats
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Goals:</span>
                    <span className="text-white font-medium">{opponentUser.totalGoals}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Matches:</span>
                    <span className="text-white font-medium">{opponentUser.totalMatches}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Win Rate:</span>
                    <span className="text-white font-medium">{opponentUser.winRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Assists:</span>
                    <span className="text-white font-medium">{opponentUser.totalAssists}</span>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-800" />

              {/* Recent Form */}
              <div>
                <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                  Recent Form
                </h4>
                <div className="flex justify-center space-x-2">
                  {opponentForm.map((result, index) => (
                    <div key={index}>
                      {getFormIcon(result)}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchInfoModal;
