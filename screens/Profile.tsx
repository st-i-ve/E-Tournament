
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Target, TrendingUp, Settings, User, Award, Bell, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { currentUser, mockTournaments } from '@/data/enhancedMockData';
import { detailedMatches, TeamMatchStats } from '@/data/matchStats';
import { useNavigate } from 'react-router-dom';
import CountUp from '@/components/CountUp';

// Mock pending actions data
const mockPendingActions = [
  {
    id: 'action-1',
    type: 'submit_result',
    matchId: 'match-123',
    opponent: 'Phoenix Rising',
    tournament: 'Champions Elite League',
    deadline: '2025-06-16T23:59:59Z',
    priority: 'high'
  },
  {
    id: 'action-2',
    type: 'verify_result',
    matchId: 'match-124',
    opponent: 'Lightning Strikes',
    tournament: 'Weekend Warriors Cup',
    submittedScore: '2-1',
    deadline: '2025-06-17T23:59:59Z',
    priority: 'medium'
  },
  {
    id: 'action-3',
    type: 'awaiting_verification',
    matchId: 'match-125',
    opponent: 'Desert Eagles',
    tournament: 'Champions Elite League',
    submittedAt: '2025-06-15T14:30:00Z',
    priority: 'low'
  }
];

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate player stats
  const userMatches = detailedMatches.filter(match => 
    match.team_home.name === currentUser.teamName || match.team_away.name === currentUser.teamName
  );

  const totalGoals = userMatches.reduce((total, match) => {
    const isHome = match.team_home.name === currentUser.teamName;
    return total + (isHome ? match.team_home.score : match.team_away.score);
  }, 0);

  const wins = userMatches.filter(match => {
    const isHome = match.team_home.name === currentUser.teamName;
    const userScore = isHome ? match.team_home.score : match.team_away.score;
    const opponentScore = isHome ? match.team_away.score : match.team_home.score;
    return userScore > opponentScore;
  }).length;

  const winRate = userMatches.length > 0 ? Math.round((wins / userMatches.length) * 100) : 0;

  // Get user tournaments
  const userTournaments = mockTournaments.filter(t => 
    t.participants.includes(currentUser.id)
  );

  // Calculate strengths and weaknesses
  const calculateAverageStats = (): TeamMatchStats | null => {
    if (userMatches.length === 0) return null;

    const totalStats = userMatches.reduce((acc, match) => {
      const isHome = match.team_home.name === currentUser.teamName;
      const userTeamStats = isHome ? match.team_home.stats : match.team_away.stats;
      
      Object.keys(userTeamStats).forEach(key => {
        acc[key as keyof TeamMatchStats] = (acc[key as keyof TeamMatchStats] || 0) + userTeamStats[key as keyof TeamMatchStats];
      });
      
      return acc;
    }, {} as TeamMatchStats);

    const avgStats: TeamMatchStats = {} as TeamMatchStats;
    Object.keys(totalStats).forEach(key => {
      avgStats[key as keyof TeamMatchStats] = Math.round(totalStats[key as keyof TeamMatchStats] / userMatches.length);
    });

    return avgStats;
  };

  const avgStats = calculateAverageStats();

  const getStrengthsAndWeaknesses = () => {
    if (!avgStats) return { strengths: [], weaknesses: [] };

    const strengths: Array<{ name: string; value: string }> = [];
    const weaknesses: Array<{ name: string; value: string }> = [];

    if ('possession_percent' in avgStats && avgStats.possession_percent >= 55) {
      strengths.push({ name: 'Ball Control', value: `${avgStats.possession_percent}%` });
    } else if ('possession_percent' in avgStats && avgStats.possession_percent <= 40) {
      weaknesses.push({ name: 'Ball Control', value: `${avgStats.possession_percent}%` });
    }

    if ('successful_passes' in avgStats && 'passes' in avgStats) {
      const passAccuracy = Math.round((avgStats.successful_passes / avgStats.passes) * 100);
      if (passAccuracy >= 80) strengths.push({ name: 'Passing Accuracy', value: `${passAccuracy}%` });
      else if (passAccuracy <= 65) weaknesses.push({ name: 'Passing Accuracy', value: `${passAccuracy}%` });
    }

    if ('shots_on_target' in avgStats && 'shots' in avgStats) {
      const shotAccuracy = Math.round((avgStats.shots_on_target / avgStats.shots) * 100);
      if (shotAccuracy >= 60) strengths.push({ name: 'Shot Accuracy', value: `${shotAccuracy}%` });
      else if (shotAccuracy <= 40) weaknesses.push({ name: 'Shot Accuracy', value: `${shotAccuracy}%` });
    }

    if ('tackles' in avgStats && avgStats.tackles >= 15) {
      strengths.push({ name: 'Defensive Work', value: `${avgStats.tackles} tackles/game` });
    } else if ('tackles' in avgStats && avgStats.tackles <= 8) {
      weaknesses.push({ name: 'Defensive Work', value: `${avgStats.tackles} tackles/game` });
    }

    return { strengths, weaknesses };
  };

  const { strengths, weaknesses } = getStrengthsAndWeaknesses();

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'submit_result':
        return <Upload className="h-4 w-4" />;
      case 'verify_result':
        return <CheckCircle className="h-4 w-4" />;
      case 'awaiting_verification':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getActionColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'medium':
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'low':
        return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
      default:
        return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  const getActionText = (action: any) => {
    switch (action.type) {
      case 'submit_result':
        return `Submit result vs ${action.opponent}`;
      case 'verify_result':
        return `Verify result vs ${action.opponent} (${action.submittedScore})`;
      case 'awaiting_verification':
        return `Awaiting verification from ${action.opponent}`;
      default:
        return 'Unknown action';
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffHours = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h left`;
    } else {
      const diffDays = Math.ceil(diffHours / 24);
      return `${diffDays}d left`;
    }
  };

  const pendingCount = mockPendingActions.length;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Geometric background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Triangles */}
        <div className="absolute top-20 left-10 w-8 h-8 border border-green-500/10 transform rotate-45"></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 border border-green-500/10 transform rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/4 w-10 h-10 border border-green-500/10 transform rotate-45"></div>
        
        {/* Circles */}
        <div className="absolute top-1/4 left-1/3 w-12 h-12 border border-green-500/10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-8 h-8 border border-green-500/10 rounded-full"></div>
        <div className="absolute top-2/3 left-20 w-6 h-6 border border-green-500/10 rounded-full"></div>
        
        {/* Rectangles */}
        <div className="absolute top-1/2 right-10 w-12 h-8 border border-green-500/10"></div>
        <div className="absolute bottom-20 left-1/2 w-8 h-12 border border-green-500/10"></div>
        
        {/* Crossing lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/5 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/5 to-transparent"></div>
      </div>

      {/* Header with notification badge */}
      <div className="relative z-10 p-4">
        <div className="flex items-start gap-4 mb-1">
          <div className="w-8 h-8 mt-1 flex-shrink-0 relative">
            {/* Intersecting circles design */}
            <div className="absolute top-0 left-0 w-6 h-6 border-2 border-green-400 rounded-full"></div>
            <div className="absolute top-2 left-2 w-6 h-6 border-2 border-green-400 rounded-full"></div>
          </div>
          <div className="flex flex-col flex-1">
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent leading-tight">
              Profile
            </h1>
            <p className="text-xs text-gray-500 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2s_ease-in-out_infinite]">
              Your tournament stats and performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            {pendingCount > 0 && (
              <Button
                onClick={() => navigate('/pending-actions')}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-gray-800/50 relative"
              >
                <Bell className="h-5 w-5 text-gray-400" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  {pendingCount}
                </Badge>
              </Button>
            )}
            <Button 
              onClick={() => navigate('/settings')}
              variant="ghost" 
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-gray-800/50"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{user?.username || 'Player'}</h2>
            <p className="text-sm text-green-400">{user?.teamName || 'No Team Selected'}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-8 relative z-10">
        {/* Player Overview */}
        <div className="py-4">
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-4 w-4 text-green-400" />
            <h2 className="text-sm font-medium text-white">Overview</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                <CountUp end={totalGoals} duration={1500} />
              </div>
              <div className="text-xs text-gray-400">Total Goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                <CountUp end={userTournaments.length} duration={1500} />
              </div>
              <div className="text-xs text-gray-400">Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                <CountUp end={winRate} duration={1500} suffix="%" />
              </div>
              <div className="text-xs text-gray-400">Win Rate</div>
            </div>
          </div>
        </div>

        {/* Line separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

        {/* Tournament Performance */}
        <div className="py-4">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="h-4 w-4 text-green-400" />
            <h2 className="text-sm font-medium text-white">Tournaments</h2>
          </div>
          
          <div className="space-y-3">
            {userTournaments.map((tournament) => (
              <div 
                key={tournament.id} 
                className="flex items-center justify-between py-3"
              >
                <div>
                  <h4 className="text-sm font-medium text-white">{tournament.name}</h4>
                  <p className="text-xs text-gray-400">{tournament.type} • {tournament.totalParticipants} players</p>
                </div>
                <div className="flex items-center gap-2">
                  {tournament.userPosition && (
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        tournament.userPosition === 1 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                        tournament.userPosition <= 3 ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                        'bg-gray-500/10 text-gray-400 border-gray-500/30'
                      }`}
                    >
                      {tournament.userPosition === 1 ? '1st' :
                       tournament.userPosition === 2 ? '2nd' :
                       tournament.userPosition === 3 ? '3rd' :
                       `${tournament.userPosition}th`}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
                    {tournament.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Line separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

        {/* Performance Analysis */}
        <div className="py-4">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <h2 className="text-sm font-medium text-white">Performance Analysis</h2>
          </div>
          
          <div className="space-y-8">
            {/* Strengths */}
            <div>
              <h3 className="text-sm font-medium text-green-400 mb-4 flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                Strengths
              </h3>
              {strengths.length > 0 ? (
                <div className="space-y-3">
                  {strengths.map((strength, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center py-2"
                    >
                      <span className="text-sm text-gray-200">{strength.name}</span>
                      <span className="text-sm text-green-400 font-medium">{strength.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic py-2">Play more matches to see your strengths!</p>
              )}
            </div>

            {/* Line separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

            {/* Areas for Improvement */}
            <div>
              <h3 className="text-sm font-medium text-orange-400 mb-4 flex items-center gap-2">
                <Award className="h-3 w-3" />
                Areas for Improvement
              </h3>
              {weaknesses.length > 0 ? (
                <div className="space-y-3">
                  {weaknesses.map((weakness, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center py-2"
                    >
                      <span className="text-sm text-gray-200">{weakness.name}</span>
                      <span className="text-sm text-orange-400 font-medium">{weakness.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic py-2">Great job! No major weaknesses detected.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default ProfilePage;
