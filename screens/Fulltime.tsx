
import React, { useState } from 'react';
import { Trophy, Calendar, Filter, Search } from 'lucide-react-native';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/NewComponents/Header';
import { Badge } from '@/components/NewComponents/ui/badge';
import { Input } from '@/components/NewComponents/ui/input';
import DetailedMatchCard from '@/components/NewComponents/DetailedMatchCard';
import { detailedMatches, DetailedMatch } from '@/data/matchStats';
import { currentUser } from '@/data/enhancedMockData';

const FulltimePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTournament, setFilterTournament] = useState<string>('all');

  const userTeam = currentUser.teamName;

  // Get unique tournaments for filter
  const tournaments = Array.from(new Set(detailedMatches.map(match => match.tournament_name).filter(Boolean)));

  // Filter matches based on search and tournament filter
  const filteredMatches = detailedMatches.filter(match => {
    const matchesSearch = searchTerm === '' || 
      match.team_home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team_away.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.tournament_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTournament = filterTournament === 'all' || match.tournament_name === filterTournament;
    
    return matchesSearch && matchesTournament;
  });

  // Calculate user's record
  const userMatches = detailedMatches.filter(match => 
    match.team_home.name === userTeam || match.team_away.name === userTeam
  );

  const wins = userMatches.filter(match => {
    const isHome = match.team_home.name === userTeam;
    return (isHome && match.team_home.score > match.team_away.score) ||
           (!isHome && match.team_away.score > match.team_home.score);
  }).length;

  const draws = userMatches.filter(match => match.team_home.score === match.team_away.score).length;
  const losses = userMatches.length - wins - draws;

  const handleViewDetails = (match: DetailedMatch) => {
    navigate(`/match-stats?matchId=${match.match_id}`);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 pb-24">
      <Header />
      
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
            <Trophy className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Match History</h1>
            <p className="text-gray-400 text-sm">Completed matches and detailed statistics</p>
          </div>
        </div>

        {/* User Record Summary */}
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-2">Your Record</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">{wins}</div>
                  <div className="text-xs text-gray-400">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-400">{draws}</div>
                  <div className="text-xs text-gray-400">Draws</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-400">{losses}</div>
                  <div className="text-xs text-gray-400">Losses</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{userMatches.length}</div>
              <div className="text-xs text-gray-400">Total Matches</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search matches or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/30 border-gray-700 text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterTournament}
              onChange={(e) => setFilterTournament(e.target.value)}
              className="bg-gray-800/30 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="all">All Tournaments</option>
              {tournaments.map(tournament => (
                <option key={tournament} value={tournament}>{tournament}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Match List */}
      <div className="space-y-4">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <DetailedMatchCard
              key={match.match_id}
              match={match}
              userTeam={userTeam}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div className="bg-gray-900/30 rounded-xl p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No Matches Found</h3>
            <p className="text-gray-400 text-sm">
              {searchTerm || filterTournament !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No completed matches available yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FulltimePage;
