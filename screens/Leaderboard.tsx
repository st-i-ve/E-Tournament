import React, { useState } from 'react';
import { Triangle, Users, Target, Info } from 'lucide-react-native-native';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { currentUser, mockTournaments } from '@/data/enhancedMockData';
import LeagueLeaderboardTable from '@/components/LeagueLeaderboardTable';
import KnockoutBracket from '@/components/KnockoutBracket';

const LeaderboardPage = () => {
  const [selectedTournament, setSelectedTournament] = useState<string>(
    mockTournaments[0]?.id || ''
  );

  // Get user's active tournaments for the selector
  const userTournaments = mockTournaments.filter(
    (t) => t.participants.includes(currentUser.id) && t.status === 'active'
  );

  const selectedTournamentData = mockTournaments.find(
    (t) => t.id === selectedTournament
  );

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
          <Triangle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent leading-tight">
              Tournament Leaderboards
            </h1>
            <p className="text-xs text-gray-500 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2s_ease-in-out_infinite]">
              Track your performance and rankings
            </p>
          </div>
        </div>
      </div>

      {/* Tournament Selector and Legend */}
      <div className="mb-6 flex items-center gap-4 relative z-10">
        <div className="flex-1">
          <Select
            value={selectedTournament}
            onValueChange={setSelectedTournament}
          >
            <SelectTrigger className="bg-[#1C1C1E]/50 border-gray-700/50 text-white">
              <SelectValue placeholder="Choose a tournament" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C1C1E] border-gray-700">
              {userTournaments.map((tournament) => (
                <SelectItem
                  key={tournament.id}
                  value={tournament.id}
                  className="text-white hover:bg-gray-800"
                >
                  <div className="flex items-center gap-2">
                    {tournament.type === 'league' ? (
                      <Users className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Target className="h-4 w-4 text-purple-500" />
                    )}
                    <span>{tournament.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Legend info modal beside dropdown */}
        {selectedTournamentData?.type === 'league' && (
          <Dialog>
            <DialogTrigger asChild>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Info className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#1C1C1E] border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Match Result Legend</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-400/20 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-sm">Win</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-400/20 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                  <span className="text-sm">Draw</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-400/20 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                  <span className="text-sm">Loss</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Tournament Type Based Display */}
      {selectedTournamentData && (
        <div className="relative z-10 flex-1">
          {selectedTournamentData.type === 'league' ? (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-medium text-white flex items-center gap-2">
                  League Table
                </h2>
              </div>
              <LeagueLeaderboardTable />
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-medium text-white flex items-center gap-2">
                  Tournament Bracket
                </h2>
              </div>
              <KnockoutBracket />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
