import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Trophy,
  Target,
  Shield,
  TrendingUp,
  Users,
  X,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OpponentStatsModalProps {
  opponent: string;
  isOpen: boolean;
  onClose: () => void;
  opponentUser?: {
    username: string;
    teamName: string;
  };
  currentUser: {
    teamName: string;
  };
  mockMatches: Array<{
    homeTeam: string;
    awayTeam: string;
    status: string;
    homeScore?: number;
    awayScore?: number;
  }>;
}

const OpponentStatsModal = ({
  opponent,
  isOpen,
  onClose,
  opponentUser,
  currentUser,
  mockMatches,
}: OpponentStatsModalProps) => {
  // Get head-to-head matches
  const headToHeadMatches = mockMatches
    .filter(
      (match) =>
        (match.homeTeam === currentUser.teamName &&
          match.awayTeam === opponent) ||
        (match.homeTeam === opponent && match.awayTeam === currentUser.teamName)
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

      goalsFor += userScore || 0;
      goalsAgainst += oppScore || 0;

      if (userScore && oppScore) {
        if (userScore > oppScore) wins++;
        else if (userScore === oppScore) draws++;
        else losses++;
      }
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

  // Generate mock season stats for opponent
  const getOpponentSeasonStats = () => {
    return {
      matchesPlayed: 8,
      wins: 5,
      draws: 2,
      losses: 1,
      goalsFor: 12,
      goalsAgainst: 6,
      points: 17,
      position: 3,
    };
  };

  const h2hStats = calculateH2HStats();
  const opponentForm = getOpponentForm();
  const seasonStats = getOpponentSeasonStats();

  const getFormIcon = (result: string) => {
    const styles = {
      W: { backgroundColor: 'rgba(74, 222, 128, 0.2)', color: '#4ADE80' },
      L: { backgroundColor: 'rgba(248, 113, 113, 0.2)', color: '#F87171' },
      D: { backgroundColor: 'rgba(251, 191, 36, 0.2)', color: '#FBBF24' },
    };

    const style = styles[result as keyof typeof styles] || styles.W;

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

  const getTeamCrest = (teamName: string) => {
    const initial = teamName.charAt(0).toUpperCase();
    return (
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.teamCrest}
      >
        <Text style={styles.teamCrestText}>{initial}</Text>
      </LinearGradient>
    );
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['#1C1C1E', '#121212']}
            style={styles.gradientBackground}
          />

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#9CA3AF" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              {getTeamCrest(opponent)}
              <View style={styles.headerText}>
                <Text style={styles.teamName}>{opponent}</Text>
                <Text style={styles.username}>
                  {opponentUser?.username || 'Unknown Player'}
                </Text>
              </View>
            </View>
          </View>

          <ScrollView style={styles.content}>
            {/* Head-to-Head Record */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Trophy size={16} color="#FBBF24" />
                <Text style={styles.sectionTitle}>Head-to-Head Record</Text>
              </View>
              {h2hStats.totalMatches > 0 ? (
                <View style={styles.statsCard}>
                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Text style={styles.statValueGreen}>{h2hStats.wins}</Text>
                      <Text style={styles.statLabel}>Wins</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValueYellow}>
                        {h2hStats.draws}
                      </Text>
                      <Text style={styles.statLabel}>Draws</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValueRed}>{h2hStats.losses}</Text>
                      <Text style={styles.statLabel}>Losses</Text>
                    </View>
                  </View>
                  <Text style={styles.goalsText}>
                    Goals: {h2hStats.goalsFor} - {h2hStats.goalsAgainst} (
                    {h2hStats.totalMatches} matches)
                  </Text>
                </View>
              ) : (
                <View style={styles.statsCard}>
                  <Text style={styles.noMatchesText}>No previous matches</Text>
                </View>
              )}
            </View>

            {/* Season Stats */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Target size={16} color="#3B82F6" />
                <Text style={styles.sectionTitle}>Season Performance</Text>
              </View>
              <View style={styles.statsCard}>
                <View style={styles.statsGrid}>
                  <View style={styles.gridItem}>
                    <Text style={styles.gridLabel}>Position:</Text>
                    <Text style={styles.gridValue}>
                      #{seasonStats.position}
                    </Text>
                  </View>
                  <View style={styles.gridItem}>
                    <Text style={styles.gridLabel}>Points:</Text>
                    <Text style={styles.gridValue}>{seasonStats.points}</Text>
                  </View>
                  <View style={styles.gridItem}>
                    <Text style={styles.gridLabel}>Matches:</Text>
                    <Text style={styles.gridValue}>
                      {seasonStats.matchesPlayed}
                    </Text>
                  </View>
                  <View style={styles.gridItem}>
                    <Text style={styles.gridLabel}>Goals:</Text>
                    <Text style={styles.gridValue}>
                      {seasonStats.goalsFor}:{seasonStats.goalsAgainst}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Recent Form */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={16} color="#8B5CF6" />
                <Text style={styles.sectionTitle}>Recent Form</Text>
              </View>
              <View style={styles.formContainer}>
                {opponentForm.map((result, index) => (
                  <View key={index}>{getFormIcon(result)}</View>
                ))}
              </View>
            </View>

            {/* Quick Analysis */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Shield size={16} color="#4ADE80" />
                <Text style={styles.sectionTitle}>Quick Analysis</Text>
              </View>
              <View style={styles.badgesContainer}>
                <View style={styles.badgesRow}>
                  <View style={[styles.badge, styles.badgeGreen]}>
                    <Text style={styles.badgeTextGreen}>Strong Attack</Text>
                  </View>
                  <View style={[styles.badge, styles.badgeBlue]}>
                    <Text style={styles.badgeTextBlue}>Good Form</Text>
                  </View>
                </View>
                <View style={styles.badgesRow}>
                  <View style={[styles.badge, styles.badgeRed]}>
                    <Text style={styles.badgeTextRed}>Weak Defense</Text>
                  </View>
                  <View style={[styles.badge, styles.badgeYellow]}>
                    <Text style={styles.badgeTextYellow}>Inconsistent</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    marginHorizontal: 20,
    marginVertical: 50,
    borderRadius: 16,
    overflow: 'hidden',
    maxHeight: '80%',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  teamCrest: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teamCrestText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText: {
    flex: 1,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  username: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    marginLeft: 8,
  },
  statsCard: {
    backgroundColor: 'rgba(39, 39, 41, 0.5)',
    borderRadius: 12,
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValueGreen: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ADE80',
    marginBottom: 4,
  },
  statValueYellow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FBBF24',
    marginBottom: 4,
  },
  statValueRed: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F87171',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  goalsText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  noMatchesText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%',
    marginBottom: 12,
  },
  gridLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  formIconText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgesContainer: {
    gap: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  badgeGreen: {
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    borderColor: 'rgba(74, 222, 128, 0.3)',
  },
  badgeBlue: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  badgeRed: {
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
    borderColor: 'rgba(248, 113, 113, 0.3)',
  },
  badgeYellow: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  badgeTextGreen: {
    fontSize: 12,
    color: '#4ADE80',
  },
  badgeTextBlue: {
    fontSize: 12,
    color: '#3B82F6',
  },
  badgeTextRed: {
    fontSize: 12,
    color: '#F87171',
  },
  badgeTextYellow: {
    fontSize: 12,
    color: '#FBBF24',
  },
});

export default OpponentStatsModal;
