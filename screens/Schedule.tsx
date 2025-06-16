import React, { useState, useMemo } from 'react';
import {
  Clock,
  Trophy,
  Calendar,
  Filter,
  CheckCircle2,
  Circle,
  X,
} from 'lucide-react-native-native';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  currentUser,
  mockMatches,
  mockTournaments,
  Match,
} from '@/data/enhancedMockData';
import { detailedMatches } from '@/data/matchStats';
import MatchCard from '@/components/MatchCard';
import MatchInfoModal from '@/components/MatchInfoModal';
import DetailedMatchCard from '@/components/DetailedMatchCard';
import { useNavigate } from 'react-router-dom';

const SchedulePage = () => {
  const [selectedTournament, setSelectedTournament] = useState<string>('all');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const navigate = useNavigate();

  // Get all user's matches (both upcoming and completed)
  const upcomingMatches = mockMatches.filter(
    (match) =>
      (match.homeTeam === currentUser.teamName ||
        match.awayTeam === currentUser.teamName) &&
      match.status === 'upcoming'
  );

  const completedMatches = detailedMatches.filter(
    (match) =>
      match.team_home.name === currentUser.teamName ||
      match.team_away.name === currentUser.teamName
  );

  // Get user's tournaments
  const userTournaments = mockTournaments.filter((t) =>
    t.participants.includes(currentUser.id)
  );

  // Group matches by month
  const groupedMatches = useMemo(() => {
    const groups: { [key: string]: { upcoming: Match[]; completed: any[] } } =
      {};

    // Process upcoming matches
    upcomingMatches.forEach((match) => {
      if (
        selectedTournament !== 'all' &&
        match.tournamentId !== selectedTournament
      )
        return;

      const date = new Date(match.scheduledDate);
      const monthKey = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      if (!groups[monthKey]) {
        groups[monthKey] = { upcoming: [], completed: [] };
      }
      groups[monthKey].upcoming.push(match);
    });

    // Process completed matches - use timestamp instead of scheduled_date
    completedMatches.forEach((match) => {
      if (
        selectedTournament !== 'all' &&
        match.tournament_name !== selectedTournament
      )
        return;

      const date = new Date(match.timestamp); // Fixed: use timestamp instead of scheduled_date
      const monthKey = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      if (!groups[monthKey]) {
        groups[monthKey] = { upcoming: [], completed: [] };
      }
      groups[monthKey].completed.push(match);
    });

    // Sort months
    return Object.keys(groups)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .reduce((acc, key) => {
        acc[key] = groups[key];
        return acc;
      }, {} as typeof groups);
  }, [selectedTournament, upcomingMatches, completedMatches]);

  const handleViewDetails = (match: any) => {
    navigate(`/match-stats?matchId=${match.match_id}`);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 pb-24 h-screen flex flex-col bg-black relative overflow-hidden">
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

      {/* Header */}
      <div className="mb-6 relative z-10">
        <div className="flex items-start gap-4 mb-1 ml-2">
          <div className="w-6 h-6 mt-1 flex-shrink-0 relative">
            <div className="w-6 h-6 border-2 border-green-400 rounded-full relative">
              <div className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-green-400 transform -translate-x-1/2 -translate-y-0.5 rotate-45"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent leading-tight">
              Schedule
            </h1>
            <p className="text-xs text-gray-500 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2s_ease-in-out_infinite]">
              All your matches - upcoming and completed
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 mt-4">
          <Button
            onClick={() => navigate('/fixtures')}
            className="relative overflow-hidden bg-gray-800 text-white border border-gray-700 hover:border-gray-600 hover:bg-gray-700 px-4 py-2 text-sm group transition-all duration-300"
          >
            <span className="relative z-10">Back to Fixtures</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </Button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-400">Upcoming</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-400">Completed</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select
            value={selectedTournament}
            onValueChange={setSelectedTournament}
          >
            <SelectTrigger className="w-48 bg-gray-900/50 border-0 text-white rounded-xl">
              <SelectValue placeholder="Filter by tournament" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C1C1E] border-gray-700 rounded-xl">
              <SelectItem
                value="all"
                className="text-white hover:bg-gray-800 rounded-lg"
              >
                All Tournaments
              </SelectItem>
              {userTournaments.map((tournament) => (
                <SelectItem
                  key={tournament.id}
                  value={tournament.id}
                  className="text-white hover:bg-gray-800 rounded-lg"
                >
                  {tournament.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grouped Matches */}
      <div className="space-y-8 relative z-10 overflow-y-auto flex-1">
        {Object.entries(groupedMatches).map(([month, matches]) => (
          <div key={month} className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-3">
              <Trophy className="h-5 w-5 text-green-500" />
              {month}
            </h2>

            <div className="space-y-4">
              {/* Upcoming matches */}
              {matches.upcoming.map((match, index) => (
                <div
                  key={`upcoming-${index}`}
                  className="flex items-start gap-3"
                >
                  <Circle className="h-4 w-4 text-blue-400 mt-4 flex-shrink-0" />
                  <div className="flex-1">
                    <MatchCard
                      match={match}
                      userTeam={currentUser.teamName}
                      onInfoClick={setSelectedMatch}
                    />
                  </div>
                </div>
              ))}

              {/* Completed matches */}
              {matches.completed.map((match, index) => (
                <div
                  key={`completed-${index}`}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-4 flex-shrink-0" />
                  <div className="flex-1">
                    <DetailedMatchCard
                      match={match}
                      userTeam={currentUser.teamName}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(groupedMatches).length === 0 && (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">
              No matches found
            </h3>
            <p className="text-sm text-gray-500">
              {selectedTournament === 'all'
                ? 'Join a tournament to start playing matches'
                : 'No matches found in the selected tournament'}
            </p>
          </div>
        )}
      </div>

      {/* Match Info Modal */}
      <MatchInfoModal
        match={selectedMatch}
        userTeam={currentUser.teamName}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </div>
  );
};

export default SchedulePage;
