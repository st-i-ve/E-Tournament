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
      <View style={styles.tableWrapper}>
        {/* TABLE 1 - Fixed Columns (Position & Club) */}
        <View style={styles.fixedTable}>
          {/* Fixed Header */}
          <View style={styles.fixedHeader}>
            <Text style={[styles.headerCell, styles.posColumn]}>Pos</Text>
            <Text style={[styles.headerCell, styles.clubColumn]}>Club</Text>
          </View>

          {/* Fixed Rows */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {teams.map((team, index) => (
              <MotiView
                key={`fixed-${team.name}`}
                from={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 50 }}
              >
                <View
                  style={[
                    styles.fixedRow,
                    team.isCurrentUser && styles.currentUserRow,
                  ]}
                >
                  <View style={[styles.dataCell, styles.posColumn]}>
                    <Text style={styles.positionText}>{team.rank}</Text>
                  </View>

                  <View style={[styles.dataCell, styles.clubColumn]}>
                    <View style={styles.clubContainer}>
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
                  </View>
                </View>
              </MotiView>
            ))}
          </ScrollView>
        </View>

        {/* TABLE 2 - Scrollable Columns (Stats) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollableTable}
        >
          <View style={styles.scrollableTableContent}>
            {/* Scrollable Header */}
            <View style={styles.scrollableHeader}>
              <Text style={[styles.headerCell, styles.statColumn]}>MP</Text>
              <Text style={[styles.headerCell, styles.statColumn]}>W</Text>
              <Text style={[styles.headerCell, styles.statColumn]}>D</Text>
              <Text style={[styles.headerCell, styles.statColumn]}>L</Text>
              <Text style={[styles.headerCell, styles.statColumn]}>Pts</Text>
              <Text style={[styles.headerCell, styles.statColumn]}>GD</Text>
              <Text style={[styles.headerCell, styles.formColumn]}>Last 5</Text>
            </View>

            {/* Scrollable Rows */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {teams.map((team, index) => {
                const goalDiff = getGoalDifference(team);
                const formData = getFormData();

                return (
                  <MotiView
                    key={`scrollable-${team.name}`}
                    from={{ opacity: 0, translateX: 10 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: index * 50 }}
                  >
                    <View
                      style={[
                        styles.scrollableRow,
                        team.isCurrentUser && styles.currentUserScrollableRow,
                      ]}
                    >
                      <View style={[styles.dataCell, styles.statColumn]}>
                        <Text style={styles.dataText}>{team.played}</Text>
                      </View>
                      <View style={[styles.dataCell, styles.statColumn]}>
                        <Text style={[styles.dataText, styles.winsText]}>
                          {team.wins}
                        </Text>
                      </View>
                      <View style={[styles.dataCell, styles.statColumn]}>
                        <Text style={[styles.dataText, styles.drawsText]}>
                          {team.draws}
                        </Text>
                      </View>
                      <View style={[styles.dataCell, styles.statColumn]}>
                        <Text style={[styles.dataText, styles.lossesText]}>
                          {team.losses}
                        </Text>
                      </View>
                      <View style={[styles.dataCell, styles.statColumn]}>
                        <Text style={[styles.dataText, styles.pointsText]}>
                          {team.points}
                        </Text>
                      </View>
                      <View style={[styles.dataCell, styles.statColumn]}>
                        <Text
                          style={[
                            styles.dataText,
                            goalDiff > 0
                              ? styles.positiveGD
                              : goalDiff < 0
                              ? styles.negativeGD
                              : styles.neutralGD,
                          ]}
                        >
                          {goalDiff > 0 ? '+' : ''}
                          {goalDiff}
                        </Text>
                      </View>
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
                                {result === 'W'
                                  ? '✓'
                                  : result === 'L'
                                  ? '✗'
                                  : '−'}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                  </MotiView>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableWrapper: {
    flexDirection: 'row',
  },

  // TABLE 1 - Fixed columns
  fixedTable: {
    backgroundColor: '#1a1a1a',
  },
  fixedHeader: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#1f1f1f',
  },
  fixedRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2a2a2a',
    minHeight: 44,
  },
  currentUserRow: {
    backgroundColor: 'rgba(0, 255, 136, 0.08)',
    borderLeftWidth: 2,
    borderLeftColor: '#00FF88',
  },

  // TABLE 2 - Scrollable columns
  scrollableTable: {
    flex: 1,
  },
  scrollableTableContent: {
    paddingRight: 16,
  },
  scrollableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#1f1f1f',
  },
  scrollableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2a2a2a',
    minHeight: 44,
  },
  currentUserScrollableRow: {
    backgroundColor: 'rgba(0, 255, 136, 0.08)',
  },

  // Common styles
  headerCell: {
    fontSize: 10,
    fontWeight: '500',
    color: '#666666',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  dataCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  posColumn: {
    width: 35,
  },
  clubColumn: {
    width: 130,
  },
  statColumn: {
    width: 35,
  },
  formColumn: {
    width: 85,
  },
  positionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  clubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    width: '100%',
  },
  clubIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  clubIconText: {
    fontSize: 8,
    fontWeight: '500',
    color: '#ffffff',
  },
  clubName: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ffffff',
    flex: 1,
  },
  dataText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '400',
  },
  winsText: {
    color: '#4CAF50',
    fontWeight: '500',
    fontSize: 12,
  },
  drawsText: {
    color: '#FF9800',
    fontWeight: '500',
    fontSize: 12,
  },
  lossesText: {
    color: '#F44336',
    fontWeight: '500',
    fontSize: 12,
  },
  pointsText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 12,
  },
  positiveGD: {
    color: '#4CAF50',
    fontWeight: '500',
    fontSize: 12,
  },
  negativeGD: {
    color: '#F44336',
    fontWeight: '500',
    fontSize: 12,
  },
  neutralGD: {
    color: '#ffffff',
    fontSize: 12,
  },
  formContainer: {
    flexDirection: 'row',
    gap: 2,
    paddingHorizontal: 2,
  },
  formDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
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
    fontSize: 8,
    fontWeight: '500',
    color: '#ffffff',
  },
});
