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

  // Mock form data - replace with actual form data
  const getFormData = () => {
    return ['W', 'L', 'D', 'L', 'W']; // Example: W=Win, L=Loss, D=Draw
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.rankColumn]}>Pos</Text>
            <Text style={[styles.headerCell, styles.clubColumn]}>Club</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>MP</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>W</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>D</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>L</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>Pts</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>GD</Text>
            <Text style={[styles.headerCell, styles.formColumn]}>Last 5</Text>
          </View>

          {/* Team Rows */}
          {teams.map((team, index) => {
            const goalDiff = getGoalDifference(team);
            const formData = getFormData();

            return (
              <MotiView
                key={team.name}
                from={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 50 }}
              >
                <View
                  style={[
                    styles.dataRow,
                    team.isCurrentUser && styles.currentUserRow,
                  ]}
                >
                  <Text style={[styles.dataCell, styles.rankColumn]}>
                    {team.rank}
                  </Text>

                  <View
                    style={[
                      styles.dataCell,
                      styles.clubColumn,
                      styles.clubContainer,
                    ]}
                  >
                    <View style={styles.clubIcon}>
                      <Text style={styles.clubIconText}>
                        {team.name
                          .split(' ')
                          .map((word) => word[0])
                          .join('')
                          .substring(0, 2)}
                      </Text>
                    </View>
                    <Text style={styles.clubName} numberOfLines={1}>
                      {team.name}
                    </Text>
                  </View>

                  <Text style={[styles.dataCell, styles.statColumn]}>
                    {team.played}
                  </Text>
                  <Text style={[styles.dataCell, styles.statColumn]}>
                    {team.wins}
                  </Text>
                  <Text style={[styles.dataCell, styles.statColumn]}>
                    {team.draws}
                  </Text>
                  <Text style={[styles.dataCell, styles.statColumn]}>
                    {team.losses}
                  </Text>
                  <Text
                    style={[
                      styles.dataCell,
                      styles.statColumn,
                      styles.pointsText,
                    ]}
                  >
                    {team.points}
                  </Text>
                  <Text style={[styles.dataCell, styles.statColumn]}>
                    {goalDiff > 0 ? '+' : ''}
                    {goalDiff}
                  </Text>

                  <View style={[styles.dataCell, styles.formColumn]}>
                    <View style={styles.formContainer}>
                      {formData.map((result, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.formDot,
                            result === 'W' && styles.winDot,
                            result === 'L' && styles.lossDot,
                            result === 'D' && styles.drawDot,
                          ]}
                        >
                          <Text style={styles.formText}>
                            {result === 'W' ? '✓' : result === 'L' ? '✗' : '−'}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </MotiView>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 0,
  },
  table: {
    minWidth: 600,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  currentUserRow: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
  },
  headerCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
    textAlign: 'left',
  },
  dataCell: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'left',
    justifyContent: 'center',
  },
  rankColumn: {
    width: 40,
    textAlign: 'center',
  },
  clubColumn: {
    width: 180,
  },
  statColumn: {
    width: 50,
    textAlign: 'center',
  },
  formColumn: {
    width: 120,
  },
  clubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clubIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  clubIconText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  clubName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    flex: 1,
  },
  pointsText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  formContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  formDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winDot: {
    backgroundColor: '#4CAF50',
  },
  lossDot: {
    backgroundColor: '#F44336',
  },
  drawDot: {
    backgroundColor: '#9E9E9E',
  },
  formText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
