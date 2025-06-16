
import React, { useState } from 'react';
import { Trophy, Check, X, Minus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { mockUsers, currentUser } from '@/data/enhancedMockData';

// Enhanced teams data with user integration
const teams = mockUsers.map((user, index) => ({
  pos: index + 1,
  name: user.username,
  mp: 8,
  w: 6 - index,
  d: 2,
  l: index,
  pts: 24 - (index * 3),
  gd: 12 - (index * 4) > 0 ? `+${12 - (index * 4)}` : `${12 - (index * 4)}`,
  last5: ['W', 'L', 'D', 'W', 'L'].slice(0, 5),
  isCurrentUser: user.id === currentUser.id
}));

const GameResultIcon = ({ result }: { result: 'W' | 'L' | 'D' }) => {
  const styles = {
    W: 'text-green-400 bg-green-400/20',
    L: 'text-red-400 bg-red-400/20',
    D: 'text-yellow-400 bg-yellow-400/20',
  };
  const icon = {
    W: <Check className="h-3 w-3" />,
    L: <X className="h-3 w-3" />,
    D: <Minus className="h-3 w-3" />,
  };
  return (
    <div className={`flex items-center justify-center h-4 w-4 rounded-sm ${styles[result]}`}>
      {icon[result]}
    </div>
  );
};

const truncateName = (name: string, maxLength: number = 10) => {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength) + '...';
};

const LeaderboardTable = () => {
  return (
    <TooltipProvider>
      <div className="space-y-4 -mx-4">
        <div className="flex">
          {/* Fixed Table 1 - Position and Player (Static, no scroll) */}
          <div className="flex-shrink-0 w-36 bg-gray-900/50 rounded-l-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-0">
                  <TableHead className="text-center text-xs text-gray-400 font-medium w-6 py-2 h-10" style={{fontSize: '11px'}}>Pos</TableHead>
                  <TableHead className="text-left text-xs text-gray-400 font-medium py-2 h-10" style={{fontSize: '11px'}}>Player</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team) => (
                  <TableRow
                    key={team.pos}
                    className={`hover:bg-gray-800/30 transition-colors border-0 h-10 ${
                      team.isCurrentUser ? 'bg-green-500/10 border-l-2 border-green-500' : ''
                    }`}
                  >
                    <TableCell className="text-center py-2 px-1 h-10">
                      <span className={`font-semibold ${team.isCurrentUser ? 'text-green-300' : 'text-white'}`} style={{fontSize: '11px'}}>
                        {team.pos}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-2 h-10">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className={`font-medium cursor-default ${team.isCurrentUser ? 'text-green-300' : 'text-gray-100'}`} 
                            style={{fontSize: '11px'}}
                          >
                            {truncateName(team.name)}
                          </div>
                        </TooltipTrigger>
                        {team.name.length > 10 && (
                          <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                            <p>{team.name}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Scrollable Table 2 - Stats and Last 5 */}
          <div className="flex-1 bg-gray-900/50 rounded-r-lg overflow-hidden">
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-0">
                    <TableHead className="text-center text-xs text-gray-400 font-medium w-10 py-2 h-10" style={{fontSize: '11px'}}>MP</TableHead>
                    <TableHead className="text-center text-xs text-gray-400 font-medium w-8 py-2 h-10" style={{fontSize: '11px'}}>W</TableHead>
                    <TableHead className="text-center text-xs text-gray-400 font-medium w-8 py-2 h-10" style={{fontSize: '11px'}}>D</TableHead>
                    <TableHead className="text-center text-xs text-gray-400 font-medium w-8 py-2 h-10" style={{fontSize: '11px'}}>L</TableHead>
                    <TableHead className="text-center text-xs text-gray-400 font-medium w-10 py-2 h-10" style={{fontSize: '11px'}}>Pts</TableHead>
                    <TableHead className="text-center text-xs text-gray-400 font-medium w-20 py-2 h-10" style={{fontSize: '11px'}}>Last 5</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow
                      key={team.pos}
                      className={`hover:bg-gray-800/30 transition-colors border-0 h-10 ${
                        team.isCurrentUser ? 'bg-green-500/10' : ''
                      }`}
                    >
                      <TableCell className="text-center text-gray-100 py-2 px-2 h-10" style={{fontSize: '11px'}}>{team.mp}</TableCell>
                      <TableCell className="text-center text-green-400 font-medium py-2 px-2 h-10" style={{fontSize: '11px'}}>{team.w}</TableCell>
                      <TableCell className="text-center text-gray-400 py-2 px-2 h-10" style={{fontSize: '11px'}}>{team.d}</TableCell>
                      <TableCell className="text-center text-red-400 font-medium py-2 px-2 h-10" style={{fontSize: '11px'}}>{team.l}</TableCell>
                      <TableCell className="text-center font-bold text-white py-2 px-2 h-10" style={{fontSize: '11px'}}>{team.pts}</TableCell>
                      <TableCell className="text-center py-2 px-2 h-10">
                        <div className="flex justify-center space-x-1">
                          {team.last5.map((result, index) => (
                            <GameResultIcon key={index} result={result as 'W' | 'L' | 'D'} />
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default LeaderboardTable;
