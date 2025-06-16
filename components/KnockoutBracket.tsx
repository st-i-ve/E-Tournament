
import React from 'react';
import { Trophy, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { mockUsers, currentUser } from '@/data/enhancedMockData';

// Generate knockout bracket structure
const generateBracketData = () => {
  const participants = mockUsers.slice(0, 8); // 8 participants for clean bracket
  
  // Round of 8 (Quarterfinals)
  const quarterfinals = [
    { id: 'qf1', round: 'quarterfinal', player1: participants[0], player2: participants[7], winner: participants[0], score: '3-1' },
    { id: 'qf2', round: 'quarterfinal', player1: participants[1], player2: participants[6], winner: participants[1], score: '2-0' },
    { id: 'qf3', round: 'quarterfinal', player1: participants[2], player2: participants[5], winner: participants[2], score: '4-2' },
    { id: 'qf4', round: 'quarterfinal', player1: participants[3], player2: participants[4], winner: participants[3], score: '1-0' },
  ];

  // Semifinals
  const semifinals = [
    { id: 'sf1', round: 'semifinal', player1: quarterfinals[0].winner, player2: quarterfinals[1].winner, winner: quarterfinals[0].winner, score: '2-1' },
    { id: 'sf2', round: 'semifinal', player1: quarterfinals[2].winner, player2: quarterfinals[3].winner, winner: quarterfinals[2].winner, score: '3-0' },
  ];

  // Final
  const final = {
    id: 'final',
    round: 'final',
    player1: semifinals[0].winner,
    player2: semifinals[1].winner,
    winner: null, // Upcoming match
    score: null
  };

  return { quarterfinals, semifinals, final };
};

const MatchCard = ({ match, isUpcoming = false }: { match: any; isUpcoming?: boolean }) => {
  const isCurrentUserMatch = match.player1?.id === currentUser.id || match.player2?.id === currentUser.id;
  
  const getTooltipContent = () => {
    if (isUpcoming) {
      return `${match.player1?.username} vs ${match.player2?.username}`;
    }
    return `${match.player1?.username} vs ${match.player2?.username}\nScore: ${match.score}`;
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`bg-gray-900/50 rounded-md p-2 border transition-all cursor-default w-24 ${
          isCurrentUserMatch ? 'border-green-500/50 bg-green-500/5' : 'border-gray-700/50'
        }`}>
          <div className="space-y-1">
            {/* Player 1 */}
            <div className={`flex items-center justify-between text-[10px] ${
              match.winner?.id === match.player1?.id ? 'text-green-400 font-medium' : 
              isUpcoming ? 'text-white' : 'text-gray-400'
            }`}>
              <span className="truncate max-w-[50px]">{match.player1?.username.substring(0, 6)}</span>
              {match.score && !isUpcoming && (
                <span className="ml-1 text-[9px]">{match.score.split('-')[0]}</span>
              )}
            </div>
            
            {/* VS or Score */}
            <div className="text-center">
              {isUpcoming ? (
                <span className="text-[8px] text-gray-500">VS</span>
              ) : (
                <div className="text-[8px] text-gray-500">-</div>
              )}
            </div>
            
            {/* Player 2 */}
            <div className={`flex items-center justify-between text-[10px] ${
              match.winner?.id === match.player2?.id ? 'text-green-400 font-medium' : 
              isUpcoming ? 'text-white' : 'text-gray-400'
            }`}>
              <span className="truncate max-w-[50px]">{match.player2?.username.substring(0, 6)}</span>
              {match.score && !isUpcoming && (
                <span className="ml-1 text-[9px]">{match.score.split('-')[1]}</span>
              )}
            </div>
          </div>
          
          {isUpcoming && (
            <div className="mt-1 text-center">
              <Badge variant="outline" className="text-[8px] bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-1 py-0">
                UP
              </Badge>
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-gray-800 border-gray-700 text-white">
        <p className="whitespace-pre-line">{getTooltipContent()}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const KnockoutBracket = () => {
  const { quarterfinals, semifinals, final } = generateBracketData();

  return (
    <TooltipProvider>
      <div className="space-y-6 -mx-4 px-4">
        {/* Bracket Container */}
        <div className="min-h-[400px] overflow-x-auto">
          <div className="flex gap-6 min-w-[500px] justify-center py-4">
            {/* Quarterfinals */}
            <div className="flex flex-col justify-center space-y-3">
              <h3 className="text-xs font-medium text-gray-400 text-center mb-1">Quarterfinals</h3>
              {quarterfinals.map((match) => (
                <div key={match.id}>
                  <MatchCard match={match} />
                </div>
              ))}
            </div>

            {/* Connection Lines */}
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col space-y-12 h-full justify-center">
                {[0, 1].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-6 h-px bg-gray-600"></div>
                    <div className="w-2 h-12 border-t border-b border-r border-gray-600 rounded-r"></div>
                    <div className="w-6 h-px bg-gray-600"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Semifinals */}
            <div className="flex flex-col justify-center space-y-12 relative">
              <h3 className="text-xs font-medium text-gray-400 text-center mb-1 absolute -top-8 left-1/2 transform -translate-x-1/2">Semifinals</h3>
              {semifinals.map((match) => (
                <div key={match.id}>
                  <MatchCard match={match} />
                </div>
              ))}
            </div>

            {/* Connection Lines to Final */}
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center">
                <div className="w-6 h-px bg-gray-600"></div>
                <div className="w-2 h-24 border-t border-b border-r border-gray-600 rounded-r"></div>
                <div className="w-6 h-px bg-gray-600"></div>
              </div>
            </div>

            {/* Final */}
            <div className="flex flex-col justify-center">
              <h3 className="text-xs font-medium text-gray-400 text-center mb-3">Final</h3>
              <div>
                <MatchCard match={final} isUpcoming={true} />
              </div>
              <div className="mt-3 text-center">
                <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                <p className="text-[9px] text-gray-400 mt-1">Champion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Info */}
        <div className="text-center bg-gray-900/30 rounded-lg p-3">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Users className="h-3 w-3" />
            <span>8 players • Single elimination</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default KnockoutBracket;
