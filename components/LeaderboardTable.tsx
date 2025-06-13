import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient'; // If you're using Expo

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

  const getRankBadgeStyle = (rank: number) => {
    if (rank <= 3) {
      return [styles.rankBadge, styles.topRankBadge];
    } else if (rank <= 6) {
      return [styles.rankBadge, styles.goodRankBadge];
    } else {
      return [styles.rankBadge, styles.normalRankBadge];
    }
  };

  const getRankColors = (rank: number) => {
    if (rank === 1) return ['#FFD700', '#FFA500']; // Gold gradient
    if (rank === 2) return ['#C0C0C0', '#A0A0A0']; // Silver gradient
    if (rank === 3) return ['#CD7F32', '#8B4513']; // Bronze gradient
    if (rank <= 6) return ['#00FF88', '#00CC6A']; // Green gradient
    return ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']; // Default gradient
  };

  const getFormIndicator = (team: TeamStats) => {
    const winRate = team.played > 0 ? (team.wins / team.played) * 100 : 0;
    if (winRate >= 70) return { color: '#00FF88', symbol: '●' };
    if (winRate >= 40) return { color: '#FFD700', symbol: '●' };
    return { color: '#FF4444', symbol: '●' };
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableTitle}>League Table</Text>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#00FF88' }]} />
            <Text style={styles.legendText}>Top Form</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFD700' }]} />
            <Text style={styles.legendText}>Good Form</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF4444' }]} />
            <Text style={styles.legendText}>Poor Form</Text>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          {/* Enhanced Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.rankColumn]}>Pos</Text>
            <Text style={[styles.headerCell, styles.nameColumn]}>Club</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>P</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>W</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>D</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>L</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>GF</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>GA</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>GD</Text>
            <Text style={[styles.headerCell, styles.statColumn]}>Pts</Text>
            <Text style={[styles.headerCell, styles.formColumn]}>Form</Text>
          </View>

          {/* Enhanced Data Rows */}
          {teams.map((team, index) => {
            const formIndicator = getFormIndicator(team);
            const goalDiff = getGoalDifference(team);

            return (
              <MotiView
                key={team.name}
                from={{ opacity: 0, translateX: -30, scale: 0.95 }}
                animate={{ opacity: 1, translateX: 0, scale: 1 }}
                transition={{
                  delay: index * 80,
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                }}
              >
                <View
                  style={[
                    styles.dataRow,
                    team.isCurrentUser && styles.currentUserRow,
                    index % 2 === 0 && styles.evenRow,
                  ]}
                >
                  {/* Enhanced Rank with Badge */}
                  <View style={[styles.dataCell, styles.rankColumn]}>
                    <View style={getRankBadgeStyle(team.rank)}>
                      <Text
                        style={[
                          styles.rankText,
                          { color: team.rank <= 3 ? '#000' : '#fff' },
                        ]}
                      >
                        {team.rank}
                      </Text>
                    </View>
                  </View>

                  {/* Team Name with Icon */}
                  <View style={[styles.dataCell, styles.nameColumn]}>
                    <View style={styles.teamNameContainer}>
                      <View style={styles.teamIcon}>
                        <Text style={styles.teamIconText}>
                          {team.name.substring(0, 2).toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.nameText} numberOfLines={1}>
                        {team.name}
                      </Text>
                    </View>
                  </View>

                  {/* Stats with better formatting */}
                  <Text style={[styles.dataCell, styles.statColumn]}>
                    {team.played}
                  </Text>
                  <Text
                    style={[
                      styles.dataCell,
                      styles.statColumn,
                      styles.winsText,
                    ]}
                  >
                    {team.wins}
                  </Text>
                  <Text
                    style={[
                      styles.dataCell,
                      styles.statColumn,
                      styles.drawsText,
                    ]}
                  >
                    {team.draws}
                  </Text>
                  <Text
                    style={[
                      styles.dataCell,
                      styles.statColumn,
                      styles.lossesText,
                    ]}
                  >
                    {team.losses}
                  </Text>
                  <Text style={[styles.dataCell, styles.statColumn]}>
                    {team.goalsFor}
                  </Text>
                  <Text style={[styles.dataCell, styles.statColumn]}>
                    {team.goalsAgainst}
                  </Text>

                  {/* Enhanced Goal Difference */}
                  <Text
                    style={[
                      styles.dataCell,
                      styles.statColumn,
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

                  {/* Enhanced Points */}
                  <View style={[styles.dataCell, styles.statColumn]}>
                    <View style={styles.pointsBadge}>
                      <Text style={styles.pointsText}>{team.points}</Text>
                    </View>
                  </View>

                  {/* Form Indicator */}
                  <View style={[styles.dataCell, styles.formColumn]}>
                    <Text
                      style={[
                        styles.formIndicator,
                        { color: formIndicator.color },
                      ]}
                    >
                      {formIndicator.symbol}
                    </Text>
                  </View>
                </View>
              </MotiView>
            );
          })}
        </View>
      </ScrollView>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 16,
  },
  tableHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 255, 136, 0.2)',
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00FF88',
    textAlign: 'center',
    marginBottom: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  table: {
    minWidth: 600,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  evenRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  currentUserRow: {
    backgroundColor: 'rgba(0, 255, 136, 0.15)',
    borderColor: 'rgba(0, 255, 136, 0.4)',
    borderWidth: 2,
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00FF88',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  dataCell: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankColumn: {
    width: 50,
  },
  nameColumn: {
    width: 140,
    textAlign: 'left',
  },
  statColumn: {
    width: 36,
  },
  formColumn: {
    width: 40,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  topRankBadge: {
    backgroundColor: '#FFD700',
  },
  goodRankBadge: {
    backgroundColor: '#00FF88',
  },
  normalRankBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  teamNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 255, 136, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.5)',
  },
  teamIconText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#00FF88',
  },
  nameText: {
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  winsText: {
    color: '#00FF88',
    fontWeight: '600',
  },
  drawsText: {
    color: '#FFD700',
    fontWeight: '600',
  },
  lossesText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  positiveGD: {
    color: '#00FF88',
    fontWeight: '600',
  },
  negativeGD: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  neutralGD: {
    color: '#ffffff',
  },
  pointsBadge: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.4)',
  },
  pointsText: {
    fontWeight: 'bold',
    color: '#00FF88',
    fontSize: 14,
  },
  formIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
