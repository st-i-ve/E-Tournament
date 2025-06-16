import React, { useState } from 'react';
import { Search, Users, Trophy, Calendar, MapPin } from 'lucide-react-native';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface JoinTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinTournament: (tournamentId: string) => void;
}

const JoinTournamentModal = ({
  isOpen,
  onClose,
  onJoinTournament,
}: JoinTournamentModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock available tournaments
  const availableTournaments = [
    {
      id: 'tour-4',
      name: 'Summer Championship',
      type: 'league',
      totalParticipants: 6,
      maxParticipants: 12,
      adminName: 'striker_pro',
      matchDays: ['Monday', 'Wednesday', 'Friday'],
      status: 'recruiting',
    },
    {
      id: 'tour-5',
      name: 'Quick Fire Cup',
      type: 'knockout',
      totalParticipants: 4,
      maxParticipants: 8,
      adminName: 'midfield_master',
      matchDays: ['Saturday', 'Sunday'],
      status: 'recruiting',
    },
    {
      id: 'tour-6',
      name: 'Legends League',
      type: 'league',
      totalParticipants: 8,
      maxParticipants: 10,
      adminName: 'defense_king',
      matchDays: ['Tuesday', 'Thursday'],
      status: 'recruiting',
    },
  ];

  const filteredTournaments = availableTournaments.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.adminName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoin = (tournamentId: string) => {
    onJoinTournament(tournamentId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1C1C1E] border-gray-700 max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            Join Tournament
          </DialogTitle>
        </DialogHeader>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tournaments..."
            className="bg-gray-800 border-gray-600 text-white pl-10"
          />
        </div>

        {/* Tournament List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map((tournament) => (
              <Card
                key={tournament.id}
                className="bg-gradient-to-br from-[#2C2C2E] to-[#1C1C1E] border-gray-700 hover:border-green-500/50 transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center">
                          <Trophy className="h-3 w-3 text-green-500" />
                        </div>
                        <h3 className="font-bold text-white text-sm">
                          {tournament.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
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
                          RECRUITING
                        </Badge>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleJoin(tournament.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-500 text-white"
                    >
                      Join
                    </Button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Users className="h-3 w-3" />
                        <span>
                          {tournament.totalParticipants}/
                          {tournament.maxParticipants} players
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin className="h-3 w-3" />
                        <span>by {tournament.adminName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>{tournament.matchDays.join(', ')}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                      style={{
                        width: `${
                          (tournament.totalParticipants /
                            tournament.maxParticipants) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-white font-semibold mb-2">
                No tournaments found
              </h3>
              <p className="text-gray-400 text-sm">
                Try adjusting your search or check back later
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-xs text-center">
            Can't find what you're looking for? Create your own tournament!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinTournamentModal;
