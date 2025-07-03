import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Circle, Users, Target, TrendingUp, Flag } from 'lucide-react-native';
import {
  Match,
  mockTournaments,
  mockUsers,
  mockMatches,
  currentUser,
} from '@/data/enhancedMockData';

interface MatchInfoModalProps {
  match: Match | null;
  userTeam: string;
  isOpen: boolean;
  onClose: () => void;
}

const MatchInfoModal = ({
  match,
  userTeam,
  isOpen,
  onClose,
}: MatchInfoModalProps) => {
  if (!match) return null;

  const isHomeTeam = match.homeTeam === userTeam;
  const opponentTeam = isHomeTeam ? match.awayTeam : match.homeTeam;
  const tournament = mockTournaments.find((t) => t.id === match.tournamentId);
  const opponentUser = mockUsers.find((user) => user.teamName === opponentTeam);
  const currentUserData = mockUsers.find((user) => user.teamName === userTeam);

  // Get head-to-head matches
  const headToHeadMatches = mockMatches
    .filter(
      (match) =>
        (match.homeTeam === currentUser.teamName &&
          match.awayTeam === opponentTeam) ||
        (match.homeTeam === opponentTeam &&
          match.awayTeam === currentUser.teamName)
    )
    .filter((match) => match.status === 'completed');

  // Calculate head-to-head stats
  const calculateH2HStats = () => {
    let wins = 0;
    let draws = 0;
    let losses = 0;
    let goalsFor = 0;
    let goalsAgainst = 0;

    headToHeadMatches.forEach((match) => {
      const isHome = match.homeTeam === currentUser.teamName;
      const userScore = isHome ? match.homeScore : match.awayScore;
      const oppScore = isHome ? match.awayScore : match.homeScore;

      goalsFor += userScore;
      goalsAgainst += oppScore;

      if (userScore > oppScore) wins++;
      else if (userScore === oppScore) draws++;
      else losses++;
    });

    return {
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      totalMatches: headToHeadMatches.length,
    };
  };

  // Generate mock recent form for opponent
  const getOpponentForm = () => {
    return ['W', 'L', 'D', 'W', 'L'].slice(0, 5);
  };

  const h2hStats = calculateH2HStats();
  const opponentForm = getOpponentForm();

  const getPlayerAvatar = (username: string) => {
    const initial = username.charAt(0).toUpperCase();
    return (
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
    );
  };

  const getFormIcon = (result: string) => {
    const resultStyles = {
      W: { color: '#34d399', backgroundColor: 'rgba(16, 185, 129, 0.2)' },
      L: { color: '#f87171', backgroundColor: 'rgba(239, 68, 68, 0.2)' },
      D: { color: '#fbbf24', backgroundColor: 'rgba(245, 158, 11, 0.2)' },
    };

    const style = resultStyles[result as keyof typeof resultStyles] || {};

    return (
      <View
        style={[styles.formIcon, { backgroundColor: style.backgroundColor }]}
      >
        <Text style={[styles.formIconText, { color: style.color }]}>
          {result}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.headerTitle}>
              <Circle size={20} color="#10b981" />
              <Text style={styles.modalTitle}>Match Details</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Tournament Badge */}
            {tournament && (
              <View style={styles.tournamentBadgeContainer}>
                <View style={styles.tournamentBadge}>
                  <Text style={styles.tournamentBadgeText}>
                    {tournament.name}
                  </Text>
                </View>
              </View>
            )}

            {/* Players Section */}
            <View style={styles.playersContainer}>
              <View style={styles.playerInfo}>
                {currentUserData && getPlayerAvatar(currentUserData.username)}
                <View style={styles.playerText}>
                  <Text style={styles.playerName}>
                    {isHomeTeam
                      ? currentUserData?.username
                      : opponentUser?.username}
                  </Text>
                  <Text style={styles.playerRole}>
                    {isHomeTeam ? 'You (Home)' : 'Opponent (Home)'}
                  </Text>
                </View>
              </View>

              <Text style={styles.vsText}>VS</Text>

              <View style={styles.playerInfo}>
                <View style={[styles.playerText, styles.playerTextRight]}>
                  <Text style={styles.playerName}>
                    {isHomeTeam
                      ? opponentUser?.username
                      : currentUserData?.username}
                  </Text>
                  <Text style={styles.playerRole}>
                    {isHomeTeam ? 'Opponent (Away)' : 'You (Away)'}
                  </Text>
                </View>
                {isHomeTeam
                  ? opponentUser && getPlayerAvatar(opponentUser.username)
                  : currentUserData &&
                    getPlayerAvatar(currentUserData.username)}
              </View>
            </View>

            {/* Match Date */}
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {new Date(match.scheduledDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </View>

            {/* Opponent Stats Section */}
            {opponentUser && (
              <>
                <View style={styles.separator} />

                {/* Head-to-Head Record */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Flag size={16} color="#f59e0b" />
                    <Text style={styles.sectionTitle}>Head-to-Head Record</Text>
                  </View>
                  {h2hStats.totalMatches > 0 ? (
                    <View>
                      <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                          <Text style={styles.statValueGreen}>
                            {h2hStats.wins}
                          </Text>
                          <Text style={styles.statLabel}>Wins</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Text style={styles.statValueYellow}>
                            {h2hStats.draws}
                          </Text>
                          <Text style={styles.statLabel}>Draws</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Text style={styles.statValueRed}>
                            {h2hStats.losses}
                          </Text>
                          <Text style={styles.statLabel}>Losses</Text>
                        </View>
                      </View>
                      <Text style={styles.goalsText}>
                        Goals: {h2hStats.goalsFor} - {h2hStats.goalsAgainst} (
                        {h2hStats.totalMatches} matches)
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.noMatchesText}>
                      No previous matches
                    </Text>
                  )}
                </View>

                <View style={styles.separator} />

                {/* Season Stats */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Target size={16} color="#60a5fa" />
                    <Text style={styles.sectionTitle}>Season Stats</Text>
                  </View>
                  <View style={styles.statsList}>
                    <View style={styles.statRow}>
                      <Text style={styles.statLabel}>Goals:</Text>
                      <Text style={styles.statValue}>
                        {opponentUser.totalGoals}
                      </Text>
                    </View>
                    <View style={styles.statRow}>
                      <Text style={styles.statLabel}>Matches:</Text>
                      <Text style={styles.statValue}>
                        {opponentUser.totalMatches}
                      </Text>
                    </View>
                    <View style={styles.statRow}>
                      <Text style={styles.statLabel}>Win Rate:</Text>
                      <Text style={styles.statValue}>
                        {opponentUser.winRate}%
                      </Text>
                    </View>
                    <View style={styles.statRow}>
                      <Text style={styles.statLabel}>Assists:</Text>
                      <Text style={styles.statValue}>
                        {opponentUser.totalAssists}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.separator} />

                {/* Recent Form */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <TrendingUp size={16} color="#a78bfa" />
                    <Text style={styles.sectionTitle}>Recent Form</Text>
                  </View>
                  <View style={styles.formContainer}>
                    {opponentForm.map((result, index) => (
                      <View key={index}>{getFormIcon(result)}</View>
                    ))}
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
  },
  scrollContent: {
    padding: 16,
  },
  tournamentBadgeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  tournamentBadge: {
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'transparent',
  },
  tournamentBadgeText: {
    color: '#d1d5db',
    fontSize: 12,
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  playerText: {
    flex: 1,
  },
  playerTextRight: {
    alignItems: 'flex-end',
  },
  playerName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  playerRole: {
    color: '#9ca3af',
    fontSize: 12,
  },
  vsText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  dateContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#374151',
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  statValueGreen: {
    color: '#34d399',
    fontSize: 18,
    fontWeight: '600',
  },
  statValueYellow: {
    color: '#fbbf24',
    fontSize: 18,
    fontWeight: '600',
  },
  statValueRed: {
    color: '#f87171',
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  goalsText: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
  },
  noMatchesText: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
  },
  statsList: {
    gap: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  formIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formIconText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default MatchInfoModal;
