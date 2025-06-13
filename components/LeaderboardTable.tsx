import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';

interface TeamStats {
  rank: number;
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  isCurrentUser?: boolean;
}

interface LeaderboardTableProps {
  teams: TeamStats[];
}

export default function LeaderboardTable({ teams }: LeaderboardTableProps) {
  const getGoalDifference = (team: TeamStats) => {
    return team.goalsFor - team.goalsAgainst;
  };

  return (
    <GlassCard style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.rankColumn]}>#</Text>
            <Text style={[styles.headerCell, styles.nameColumn]}>Team</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>P</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>W</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>D</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>L</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>GF</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>GA</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>GD</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>Pts</Text>
          </View>

          {/* Data Rows */}
          {teams.map((team, index) => (
            <MotiView
              key={team.name}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: index * 50 }}
            >
              <View 
                style={[
                  styles.dataRow,
                  team.isCurrentUser && styles.currentUserRow
                ]}
              >
                <Text style={[styles.dataCell, styles.rankColumn, styles.rankText]}>
                  {team.rank}
                </Text>
                <Text style={[styles.dataCell, styles.nameColumn, styles.nameText]}>
                  {team.name}
                </Text>
                <Text style={[styles.dataCell, styles.statColumn]}>{team.played}</Text>
                <Text style={[styles.dataCell, styles.statColumn]}>{team.wins}</Text>
                <Text style={[styles.dataCell, styles.statColumn]}>{team.draws}</Text>
                <Text style={[styles.dataCell, styles.statColumn]}>{team.losses}</Text>
                <Text style={[styles.dataCell, styles.statColumn]}>{team.goalsFor}</Text>
                <Text style={[styles.dataCell, styles.statColumn]}>{team.goalsAgainst}</Text>
                <Text style={[styles.dataCell, styles.statColumn]}>
                  {getGoalDifference(team) >= 0 ? '+' : ''}{getGoalDifference(team)}
                </Text>
                <Text style={[styles.dataCell, styles.statColumn, styles.pointsText]}>
                  {team.points}
                </Text>
              </View>
            </MotiView>
          ))}
        </View>
      </ScrollView>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  table: {
    minWidth: 500,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 255, 136, 0.3)',
    paddingBottom: 8,
    marginBottom: 8,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  currentUserRow: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  headerCell: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00FF88',
    textAlign: 'center',
  },
  dataCell: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 4,
  },
  rankColumn: {
    width: 40,
  },
  nameColumn: {
    width: 120,
    textAlign: 'left',
  },
  statColumn: {
    width: 40,
  },
  rankText: {
    fontWeight: 'bold',
    color: '#00FF88',
  },
  nameText: {
    fontWeight: '600',
    textAlign: 'left',
  },
  pointsText: {
    fontWeight: 'bold',
    color: '#00FF88',
  },
});