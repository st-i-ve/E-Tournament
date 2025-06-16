import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Trophy,
  Target,
  TrendingUp,
  Settings,
  User,
  Award,
  Bell,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react-native';

// Mock data
const currentUser = {
  id: 'user-1',
  username: 'Player',
  teamName: 'Dream Team',
};

const mockTournaments = [
  {
    id: 'tournament-1',
    name: 'Champions Elite League',
    type: 'League',
    totalParticipants: 12,
    userPosition: 1,
    status: 'Active',
    participants: ['user-1'],
  },
  {
    id: 'tournament-2',
    name: 'Weekend Warriors Cup',
    type: 'Cup',
    totalParticipants: 8,
    userPosition: 3,
    status: 'Ongoing',
    participants: ['user-1'],
  },
];

const detailedMatches = [
  {
    team_home: {
      name: 'Dream Team',
      score: 3,
      stats: {
        possession_percent: 60,
        passes: 450,
        successful_passes: 380,
        shots: 12,
        shots_on_target: 8,
        tackles: 18,
      },
    },
    team_away: {
      name: 'Phoenix Rising',
      score: 1,
      stats: {
        possession_percent: 40,
        passes: 320,
        successful_passes: 250,
        shots: 8,
        shots_on_target: 3,
        tackles: 12,
      },
    },
  },
];

const ProfilePage = () => {
  const navigation = useNavigation();
  const [pendingCount] = useState(mockTournaments.length);

  // Calculate player stats
  const userMatches = detailedMatches.filter(
    (match) =>
      match.team_home.name === currentUser.teamName ||
      match.team_away.name === currentUser.teamName
  );

  const totalGoals = userMatches.reduce((total, match) => {
    const isHome = match.team_home.name === currentUser.teamName;
    return total + (isHome ? match.team_home.score : match.team_away.score);
  }, 0);

  const wins = userMatches.filter((match) => {
    const isHome = match.team_home.name === currentUser.teamName;
    const userScore = isHome ? match.team_home.score : match.team_away.score;
    const opponentScore = isHome
      ? match.team_away.score
      : match.team_home.score;
    return userScore > opponentScore;
  }).length;

  const winRate =
    userMatches.length > 0 ? Math.round((wins / userMatches.length) * 100) : 0;

  // Get user tournaments
  const userTournaments = mockTournaments.filter((t) =>
    t.participants.includes(currentUser.id)
  );

  // Calculate strengths and weaknesses
  const calculateAverageStats = () => {
    if (userMatches.length === 0) return null;

    const totalStats = userMatches.reduce((acc, match) => {
      const isHome = match.team_home.name === currentUser.teamName;
      const userTeamStats = isHome
        ? match.team_home.stats
        : match.team_away.stats;

      Object.keys(userTeamStats).forEach((key) => {
        acc[key] = (acc[key] || 0) + userTeamStats[key];
      });

      return acc;
    }, {});

    const avgStats = {};
    Object.keys(totalStats).forEach((key) => {
      avgStats[key] = Math.round(totalStats[key] / userMatches.length);
    });

    return avgStats;
  };

  const avgStats = calculateAverageStats();

  const getStrengthsAndWeaknesses = () => {
    if (!avgStats) return { strengths: [], weaknesses: [] };

    const strengths = [];
    const weaknesses = [];

    if (avgStats.possession_percent >= 55) {
      strengths.push({
        name: 'Ball Control',
        value: `${avgStats.possession_percent}%`,
      });
    } else if (avgStats.possession_percent <= 40) {
      weaknesses.push({
        name: 'Ball Control',
        value: `${avgStats.possession_percent}%`,
      });
    }

    if (avgStats.successful_passes && avgStats.passes) {
      const passAccuracy = Math.round(
        (avgStats.successful_passes / avgStats.passes) * 100
      );
      if (passAccuracy >= 80)
        strengths.push({ name: 'Passing Accuracy', value: `${passAccuracy}%` });
      else if (passAccuracy <= 65)
        weaknesses.push({
          name: 'Passing Accuracy',
          value: `${passAccuracy}%`,
        });
    }

    if (avgStats.shots_on_target && avgStats.shots) {
      const shotAccuracy = Math.round(
        (avgStats.shots_on_target / avgStats.shots) * 100
      );
      if (shotAccuracy >= 60)
        strengths.push({ name: 'Shot Accuracy', value: `${shotAccuracy}%` });
      else if (shotAccuracy <= 40)
        weaknesses.push({ name: 'Shot Accuracy', value: `${shotAccuracy}%` });
    }

    if (avgStats.tackles >= 15) {
      strengths.push({
        name: 'Defensive Work',
        value: `${avgStats.tackles} tackles/game`,
      });
    } else if (avgStats.tackles <= 8) {
      weaknesses.push({
        name: 'Defensive Work',
        value: `${avgStats.tackles} tackles/game`,
      });
    }

    return { strengths, weaknesses };
  };

  const { strengths, weaknesses } = getStrengthsAndWeaknesses();

  const renderBackgroundShapes = () => {
    return (
      <View style={styles.backgroundContainer} pointerEvents="none">
        {/* Triangles */}
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View
          style={[
            styles.triangle,
            {
              top: '33%',
              right: 80,
              width: 24,
              height: 24,
              transform: [{ rotate: '12deg' }],
            },
          ]}
        />
        <View
          style={[
            styles.triangle,
            { bottom: '25%', left: '25%', width: 40, height: 40 },
          ]}
        />

        {/* Circles */}
        <View
          style={[
            styles.circle,
            { top: '25%', left: '33%', width: 48, height: 48 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { bottom: '33%', right: '25%', width: 32, height: 32 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { top: '66%', left: 80, width: 24, height: 24 },
          ]}
        />

        {/* Rectangles */}
        <View
          style={[
            styles.rectangle,
            { top: '50%', right: 40, width: 48, height: 32 },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            { bottom: 80, left: '50%', width: 32, height: 48 },
          ]}
        />

        {/* Lines */}
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>
    );
  };

  const CountUp = ({ end, duration = 1500, suffix = '' }) => {
    const [count] = useState(new Animated.Value(0));

    React.useEffect(() => {
      Animated.timing(count, {
        toValue: end,
        duration,
        useNativeDriver: true,
      }).start();
    }, [end]);

    return (
      <Animated.Text style={styles.countUpText}>
        {count.interpolate({
          inputRange: [0, end],
          outputRange: [0, end],
        })}
        {suffix}
      </Animated.Text>
    );
  };

  return (
    <View style={styles.container}>
      {renderBackgroundShapes()}

      {/* Header with notification badge */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle} />
            <View style={[styles.logoCircle, styles.logoCircleOverlay]} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Profile</Text>
            <Text style={styles.headerSubtitle}>
              Your tournament stats and performance
            </Text>
          </View>
          <View style={styles.headerActions}>
            {pendingCount > 0 && (
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => navigation.navigate('PendingActions')}
              >
                <Bell size={20} color="#9ca3af" />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{pendingCount}</Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Settings size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <User size={24} color="white" />
          </View>
          <View>
            <Text style={styles.username}>{currentUser.username}</Text>
            <Text style={styles.teamName}>{currentUser.teamName}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Player Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={16} color="#34d399" />
            <Text style={styles.sectionTitle}>Overview</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <CountUp end={totalGoals} duration={1500} />
              <Text style={styles.statLabel}>Total Goals</Text>
            </View>
            <View style={styles.statItem}>
              <CountUp end={userTournaments.length} duration={1500} />
              <Text style={styles.statLabel}>Tournaments</Text>
            </View>
            <View style={styles.statItem}>
              <CountUp end={winRate} duration={1500} suffix="%" />
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Tournament Performance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy size={16} color="#34d399" />
            <Text style={styles.sectionTitle}>Tournaments</Text>
          </View>

          <View style={styles.tournamentsList}>
            {userTournaments.map((tournament) => (
              <View key={tournament.id} style={styles.tournamentItem}>
                <View>
                  <Text style={styles.tournamentName}>{tournament.name}</Text>
                  <Text style={styles.tournamentDetails}>
                    {tournament.type} • {tournament.totalParticipants} players
                  </Text>
                </View>
                <View style={styles.tournamentBadges}>
                  <View
                    style={[
                      styles.positionBadge,
                      tournament.userPosition === 1 && styles.goldBadge,
                      tournament.userPosition === 2 && styles.silverBadge,
                      tournament.userPosition === 3 && styles.bronzeBadge,
                      tournament.userPosition > 3 && styles.grayBadge,
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {tournament.userPosition === 1
                        ? '1st'
                        : tournament.userPosition === 2
                        ? '2nd'
                        : tournament.userPosition === 3
                        ? '3rd'
                        : `${tournament.userPosition}th`}
                    </Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>
                      {tournament.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Performance Analysis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={16} color="#34d399" />
            <Text style={styles.sectionTitle}>Performance Analysis</Text>
          </View>

          <View style={styles.analysisContainer}>
            {/* Strengths */}
            <View style={styles.analysisSection}>
              <View style={styles.analysisHeader}>
                <TrendingUp size={12} color="#34d399" />
                <Text style={[styles.analysisTitle, { color: '#34d399' }]}>
                  Strengths
                </Text>
              </View>
              {strengths.length > 0 ? (
                <View style={styles.analysisList}>
                  {strengths.map((strength, index) => (
                    <View key={index} style={styles.analysisItem}>
                      <Text style={styles.analysisItemName}>
                        {strength.name}
                      </Text>
                      <Text
                        style={[styles.analysisItemValue, { color: '#34d399' }]}
                      >
                        {strength.value}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.noDataText}>
                  Play more matches to see your strengths!
                </Text>
              )}
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Areas for Improvement */}
            <View style={styles.analysisSection}>
              <View style={styles.analysisHeader}>
                <Award size={12} color="#f97316" />
                <Text style={[styles.analysisTitle, { color: '#f97316' }]}>
                  Areas for Improvement
                </Text>
              </View>
              {weaknesses.length > 0 ? (
                <View style={styles.analysisList}>
                  {weaknesses.map((weakness, index) => (
                    <View key={index} style={styles.analysisItem}>
                      <Text style={styles.analysisItemName}>
                        {weakness.name}
                      </Text>
                      <Text
                        style={[styles.analysisItemValue, { color: '#f97316' }]}
                      >
                        {weakness.value}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.noDataText}>
                  Great job! No major weaknesses detected.
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  triangle: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  verticalLine: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  horizontalLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  header: {
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 8,
  },
  logoContainer: {
    width: 32,
    height: 32,
    position: 'relative',
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#34d399',
    position: 'absolute',
  },
  logoCircleOverlay: {
    top: 8,
    left: 8,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 24,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  teamName: {
    fontSize: 14,
    color: '#34d399',
  },
  content: {
    paddingHorizontal: 16,
  },
  section: {
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  countUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34d399',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    marginVertical: 8,
  },
  tournamentsList: {
    gap: 12,
  },
  tournamentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  tournamentName: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  tournamentDetails: {
    fontSize: 12,
    color: '#9ca3af',
  },
  tournamentBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  positionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  goldBadge: {
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderColor: 'rgba(234, 179, 8, 0.3)',
  },
  silverBadge: {
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
    borderColor: 'rgba(156, 163, 175, 0.3)',
  },
  bronzeBadge: {
    backgroundColor: 'rgba(180, 83, 9, 0.1)',
    borderColor: 'rgba(180, 83, 9, 0.3)',
  },
  grayBadge: {
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
    borderColor: 'rgba(156, 163, 175, 0.3)',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  statusBadgeText: {
    fontSize: 12,
    color: '#34d399',
  },
  analysisContainer: {
    gap: 16,
  },
  analysisSection: {
    gap: 16,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  analysisTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  analysisList: {
    gap: 12,
  },
  analysisItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  analysisItemName: {
    fontSize: 14,
    color: '#e5e7eb',
  },
  analysisItemValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  noDataText: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
    paddingVertical: 8,
  },
  bottomSpacing: {
    height: 80,
  },
});

export default ProfilePage;
