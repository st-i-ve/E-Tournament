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

  const getRankStyle = (rank: number) => {
    if (rank === 1) return styles.firstPlace;
    if (rank === 2) return styles.secondPlace;
    if (rank === 3) return styles.thirdPlace;
    if (rank <= 6) return styles.topSix;
    return styles.normalRank;
  };

  const getWinRate = (team: TeamStats) => {
    return team.played > 0 ? Math.round((team.wins / team.played) * 100) : 0;
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>League Table</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {teams.map((team, index) => {
          const goalDiff = getGoalDifference(team);
          const winRate = getWinRate(team);

          return (
            <MotiView
              key={team.name}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                delay: index * 60,
                type: 'timing',
                duration: 400,
              }}
            >
              <View
                style={[
                  styles.teamCard,
                  team.isCurrentUser && styles.currentUserCard,
                  index === teams.length - 1 && styles.lastCard,
                ]}
              >
                {/* Top Row: Rank, Team Name, Points */}
                <View style={styles.topRow}>
                  <View style={[styles.rankBadge, getRankStyle(team.rank)]}>
                    <Text
                      style={[
                        styles.rankText,
                        team.rank <= 3
                          ? styles.medalText
                          : styles.normalRankText,
                      ]}
                    >
                      {team.rank}
                    </Text>
                  </View>

                  <View style={styles.teamInfo}>
                    <Text style={styles.teamName} numberOfLines={1}>
                      {team.name}
                    </Text>
                    <Text style={styles.winRateText}>{winRate}% wins</Text>
                  </View>

                  <View style={styles.pointsContainer}>
                    <Text style={styles.pointsValue}>{team.points}</Text>
                    <Text style={styles.pointsLabel}>pts</Text>
                  </View>
                </View>

                {/* Bottom Row: Detailed Stats */}
                <View style={styles.statsRow}>
                  <View style={styles.statGroup}>
                    <Text style={styles.statLabel}>P</Text>
                    <Text style={styles.statValue}>{team.played}</Text>
                  </View>

                  <View style={styles.statGroup}>
                    <Text style={styles.statLabel}>W</Text>
                    <Text style={[styles.statValue, styles.winsValue]}>
                      {team.wins}
                    </Text>
                  </View>

                  <View style={styles.statGroup}>
                    <Text style={styles.statLabel}>D</Text>
                    <Text style={[styles.statValue, styles.drawsValue]}>
                      {team.draws}
                    </Text>
                  </View>

                  <View style={styles.statGroup}>
                    <Text style={styles.statLabel}>L</Text>
                    <Text style={[styles.statValue, styles.lossesValue]}>
                      {team.losses}
                    </Text>
                  </View>

                  <View style={styles.statGroup}>
                    <Text style={styles.statLabel}>GF</Text>
                    <Text style={styles.statValue}>{team.goalsFor}</Text>
                  </View>

                  <View style={styles.statGroup}>
                    <Text style={styles.statLabel}>GA</Text>
                    <Text style={styles.statValue}>{team.goalsAgainst}</Text>
                  </View>

                  <View style={styles.statGroup}>
                    <Text style={styles.statLabel}>GD</Text>
                    <Text
                      style={[
                        styles.statValue,
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
                </View>

                {/* Progress Bar for Points */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(
                            (team.points /
                              Math.max(...teams.map((t) => t.points))) *
                              100,
                            100
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </MotiView>
          );
        })}
      </ScrollView>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 255, 136, 0.3)',
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FF88',
    textAlign: 'center',
  },
  teamCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  currentUserCard: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#00FF88',
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  firstPlace: {
    backgroundColor: '#FFD700',
  },
  secondPlace: {
    backgroundColor: '#C0C0C0',
  },
  thirdPlace: {
    backgroundColor: '#CD7F32',
  },
  topSix: {
    backgroundColor: '#00FF88',
  },
  normalRank: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  medalText: {
    color: '#000',
  },
  normalRankText: {
    color: '#fff',
  },
  teamInfo: {
    flex: 1,
    marginRight: 12,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  winRateText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00FF88',
  },
  pointsLabel: {
    fontSize: 10,
    color: 'rgba(0, 255, 136, 0.7)',
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statGroup: {
    alignItems: 'center',
    minWidth: 32,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  winsValue: {
    color: '#00FF88',
  },
  drawsValue: {
    color: '#FFD700',
  },
  lossesValue: {
    color: '#FF6B6B',
  },
  positiveGD: {
    color: '#00FF88',
  },
  negativeGD: {
    color: '#FF6B6B',
  },
  neutralGD: {
    color: '#ffffff',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00FF88',
    borderRadius: 2,
  },
});
