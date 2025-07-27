import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ScrollArea } from './ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';
import { GameResultIcon } from './GameResultIcon';

// Mock data for the leaderboard
const teams = [
  { pos: 1, name: 'footballer_pro', mp: 8, w: 6, d: 2, l: 0, pts: 24, last5: ['W', 'W', 'D', 'W', 'W'], isCurrentUser: false },
  { pos: 2, name: 'google_user', mp: 8, w: 5, d: 2, l: 1, pts: 21, last5: ['W', 'L', 'D', 'W', 'W'], isCurrentUser: true },
  { pos: 3, name: 'midfield_master', mp: 8, w: 4, d: 2, l: 2, pts: 18, last5: ['L', 'W', 'D', 'W', 'L'], isCurrentUser: false },
  { pos: 4, name: 'goal_keeper_ace', mp: 8, w: 3, d: 2, l: 3, pts: 15, last5: ['W', 'L', 'L', 'W', 'D'], isCurrentUser: false },
  { pos: 5, name: 'defense_king', mp: 8, w: 2, d: 2, l: 4, pts: 12, last5: ['L', 'L', 'D', 'W', 'L'], isCurrentUser: false },
  { pos: 6, name: 'chelsea_fan', mp: 8, w: 1, d: 2, l: 5, pts: 9, last5: ['L', 'L', 'D', 'L', 'W'], isCurrentUser: false },
  { pos: 7, name: 'spurs_player', mp: 8, w: 0, d: 2, l: 6, pts: 6, last5: ['L', 'L', 'D', 'L', 'L'], isCurrentUser: false },
  { pos: 8, name: 'united_star', mp: 8, w: 0, d: 1, l: 7, pts: 3, last5: ['L', 'L', 'L', 'D', 'L'], isCurrentUser: false },
];

const truncateName = (name: string, maxLength: number = 10) => {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength) + '...';
};

export const LeaderboardTable: React.FC = () => {
  return (
    <TooltipProvider>
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          {/* Fixed Table - Position and Player */}
          <View style={styles.fixedTable}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={styles.posColumn} align="center">Pos</TableHead>
                  <TableHead style={styles.playerColumn} align="left">Player</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team) => (
                  <TableRow key={team.pos} isHighlighted={team.isCurrentUser}>
                    <TableCell 
                      style={styles.posColumn} 
                      align="center"
                      textStyle={[
                        styles.positionText,
                        team.isCurrentUser && styles.highlightedText
                      ]}
                    >
                      {team.pos}
                    </TableCell>
                    <TableCell style={styles.playerColumn} align="left">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <TouchableOpacity>
                            <Text style={[
                              styles.playerText,
                              team.isCurrentUser && styles.highlightedText
                            ]}>
                              {truncateName(team.name)}
                            </Text>
                          </TouchableOpacity>
                        </TooltipTrigger>
                        {team.name.length > 10 && (
                          <TooltipContent>
                            <Text style={styles.tooltipText}>{team.name}</Text>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </View>

          {/* Scrollable Table - Stats and Last 5 */}
          <View style={styles.scrollableTable}>
            <ScrollArea horizontal showsHorizontalScrollIndicator={false}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={styles.statColumn} align="center">MP</TableHead>
                    <TableHead style={styles.statColumn} align="center">W</TableHead>
                    <TableHead style={styles.statColumn} align="center">D</TableHead>
                    <TableHead style={styles.statColumn} align="center">L</TableHead>
                    <TableHead style={styles.statColumn} align="center">Pts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.pos} isHighlighted={team.isCurrentUser}>
                      <TableCell style={styles.statColumn} align="center" textStyle={styles.statText}>
                        {team.mp}
                      </TableCell>
                      <TableCell style={styles.statColumn} align="center" textStyle={styles.winText}>
                        {team.w}
                      </TableCell>
                      <TableCell style={styles.statColumn} align="center" textStyle={styles.statText}>
                        {team.d}
                      </TableCell>
                      <TableCell style={styles.statColumn} align="center" textStyle={styles.lossText}>
                        {team.l}
                      </TableCell>
                      <TableCell style={styles.statColumn} align="center" textStyle={styles.pointsText}>
                        {team.pts}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </View>
        </View>
      </View>
    </TooltipProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -20,
  },
  tableContainer: {
    flexDirection: 'row',
  },
  fixedTable: {
    width: '40%',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: 'hidden',
  },
  scrollableTable: {
    width: '60%',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  posColumn: {
    width: 40,
  },
  playerColumn: {
    flex: 1,
    paddingLeft: 8,
  },
  statColumn: {
    width: 40,
  },
  last5Column: {
    width: 80,
  },
  positionText: {
    fontFamily: 'Inter-SemiBold',
  },
  playerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: '#e5e7eb',
  },
  highlightedText: {
    color: '#22c55e',
  },
  statText: {
    color: '#e5e7eb',
  },
  winText: {
    color: '#22c55e',
    fontFamily: 'Inter-SemiBold',
  },
  lossText: {
    color: '#ef4444',
    fontFamily: 'Inter-SemiBold',
  },
  pointsText: {
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
  },
  last5Container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  tooltipText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});