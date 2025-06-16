import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { currentUser, mockTournaments, recentMatches } from '@/data/enhancedMockData';
import { Separator } from '@/components/NewComponents/ui/separator';
import TournamentCard from '@/components/NewComponents/TournamentCard';
import QuickActionButton from '@/components/NewComponents/QuickActionButton';
import RecentMatchCard from '@/components/NewComponents/RecentMatchCard';
import CreateTournamentModal from '@/components/NewComponents/CreateTournamentModal';
import JoinTournamentModal from '@/components/NewComponents/JoinTournamentModal';
import DecryptedText from '@/components/NewComponents/DecryptedText';
import MinimalTournamentCard from '@/components/NewComponents/MinimalTournamentCard';
import { Calendar, Plus, Star, Target, Trophy, Users } from 'lucide-react-native';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  
  // If not authenticated, redirect to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const userTournaments = mockTournaments.filter(t => 
    t.participants.includes(currentUser.id) && t.status === 'active'
  );

  const userRecentMatches = recentMatches.slice(0, 3);

  const handleCreateTournament = () => {
    setIsCreateModalOpen(true);
  };

  const handleJoinTournament = () => {
    setIsJoinModalOpen(true);
  };

  const handleViewLeaderboards = () => {
    navigate('/leaderboard');
  };

  const handleViewFixtures = () => {
    navigate('/fixtures');
  };

  const handleTournamentCreated = (tournamentData: any) => {
    console.log('Tournament created:', tournamentData);
    // TODO: Add tournament to state/database
  };

  const handleTournamentJoined = (tournamentId: string) => {
    console.log('Joined tournament:', tournamentId);
    // TODO: Add user to tournament participants
  };

  if (!isAuthenticated) {
    return null; // or loading spinner
  }

  // Use currentUser for display since AuthContext user doesn't have all properties yet
  const displayUser = currentUser;

  // Get initials from username
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle geometric background shapes */}
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

      {/* Full-width Header with Abstract Shapes Background */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden rounded-b-3xl">
        {/* Abstract geometric background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating triangles */}
          <div className="absolute top-4 left-8 w-16 h-16 border-2 border-green-500/20 transform rotate-45"></div>
          <div className="absolute top-12 right-12 w-8 h-8 bg-green-500/10 transform rotate-12"></div>
          <div className="absolute bottom-6 left-20 w-12 h-12 border border-green-400/15 transform rotate-45"></div>
          
          {/* Floating circles */}
          <div className="absolute top-8 left-1/2 w-20 h-20 border border-green-500/15 rounded-full"></div>
          <div className="absolute bottom-4 right-8 w-14 h-14 bg-green-500/5 rounded-full"></div>
          <div className="absolute top-16 right-1/4 w-6 h-6 bg-green-400/20 rounded-full"></div>
          
          {/* Abstract lines */}
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-green-500/10 via-transparent to-green-500/10"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/15 to-transparent"></div>
          
          {/* Polygonal shapes */}
          <div className="absolute bottom-8 left-1/3 w-10 h-6 bg-green-500/8 transform skew-x-12"></div>
          <div className="absolute top-6 right-1/3 w-8 h-8 border border-green-400/12 transform rotate-12"></div>
        </div>
        
        <div className="relative p-6 pb-8 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full bg-black border-2 border-green-500 flex items-center justify-center"
                style={{ backgroundColor: displayUser.teamColor }}
              >
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" fill="currentColor" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono tracking-wider" 
                   style={{ 
                     fontFamily: 'monospace, "Courier New", courier'
                   }}>
                <DecryptedText
                  text="Welcome back,"
                  className="block"
                  interval={30}
                />
                <DecryptedText
                  text={user?.username || displayUser.username}
                  className="block"
                  interval={30}
                />
              </div>
              <p className="text-green-400 font-medium">{user?.teamName || displayUser.teamName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 mt-2 relative z-10">
        {/* Quick Actions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-4 w-4 text-green-400" />
            <h2 className="text-sm font-medium text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionButton
              icon={Plus}
              title="Create Tournament"
              description="Start your own league"
              onClick={handleCreateTournament}
              variant="primary"
            />
            <QuickActionButton
              icon={Users}
              title="Join Tournament"
              description="Find tournaments"
              onClick={handleJoinTournament}
              variant="secondary"
            />
            <QuickActionButton
              icon={Trophy}
              title="Leaderboards"
              description="Check rankings"
              onClick={handleViewLeaderboards}
              variant="secondary"
            />
            <QuickActionButton
              icon={Calendar}
              title="Fixtures"
              description="View matches"
              onClick={handleViewFixtures}
              variant="secondary"
            />
          </div>
        </div>

        <Separator className="bg-gray-800/50" />

        {/* My Tournaments - Minimal */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-green-400" />
              <h2 className="text-sm font-medium text-white">My Tournaments</h2>
            </div>
            <span className="text-xs text-gray-400">{userTournaments.length}/5</span>
          </div>
          
          {userTournaments.length > 0 ? (
            <div className="space-y-2">
              {userTournaments.map((tournament) => (
                <MinimalTournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  isAdmin={tournament.adminId === currentUser.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Target className="h-5 w-5 text-gray-500 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-white mb-1">No Active Tournaments</h3>
              <p className="text-xs text-gray-400 mb-3">Join or create a tournament to start playing</p>
              <div className="flex gap-2 justify-center">
                <button 
                  onClick={handleCreateTournament}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs rounded-lg transition-colors"
                >
                  Create
                </button>
                <button 
                  onClick={handleJoinTournament}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition-colors"
                >
                  Join
                </button>
              </div>
            </div>
          )}
        </div>

        <Separator className="bg-gray-800/50" />

        {/* Recent Matches */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-green-400" />
            <h2 className="text-sm font-medium text-white">Recent Matches</h2>
          </div>
          <div className="space-y-3">
            {userRecentMatches.map((match) => (
              <RecentMatchCard
                key={match.id}
                match={match}
                userTeam={displayUser.teamName}
              />
            ))}
          </div>
          
          {userRecentMatches.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-6 w-6 text-gray-500 mx-auto mb-2" />
              <p className="text-xs text-gray-400">No recent matches</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>

      {/* Modals */}
      <CreateTournamentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTournament={handleTournamentCreated}
      />
      
      <JoinTournamentModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoinTournament={handleTournamentJoined}
      />
    </div>
  );
};

export default HomePage;
