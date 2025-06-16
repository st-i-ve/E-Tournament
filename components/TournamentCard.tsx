import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Trophy,
  Users,
  Crown,
  Calendar,
  Star,
  Medal,
} from 'lucide-react-native';
import { Tournament } from '@/data/enhancedMockData';

interface TournamentCardProps {
  tournament: Tournament;
  isAdmin?: boolean;
}

const TournamentCard = ({
  tournament,
  isAdmin = false,
}: TournamentCardProps) => {
  const getPositionColors = (position?: number) => {
    if (!position) return ['#6B7280', '#6B7280'];
    if (position === 1) return ['#F59E0B', '#FBBF24'];
    if (position === 2) return ['#D1D5DB', '#9CA3AF'];
    if (position === 3) return ['#F97316', '#EA580C'];
    if (position <= 4) return ['#22C55E', '#16A34A'];
    return ['#6B7280', '#6B7280'];
  };

  const getPositionText = (position?: number) => {
    if (!position) return 'N/A';
    if (position === 1) return '1st';
    if (position === 2) return '2nd';
    if (position === 3) return '3rd';
    return `${position}th`;
  };

  const getPositionIcon = (position?: number) => {
    if (!position) return null;
    if (position === 1) return <Trophy size={12} color="white" />;
    if (position === 2) return <Medal size={12} color="white" />;
    if (position === 3) return <Star size={12} color="white" />;
    return null;
  };

  const progressWidth = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(progressWidth, {
      toValue:
        (tournament.totalParticipants / tournament.maxParticipants) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [tournament.totalParticipants]);

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.cardContainer}>
      <LinearGradient
        colors={['#1C1C1E', '#2C2C2E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Background accent */}
        <View style={styles.backgroundAccent} />

        <View style={styles.cardContent}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                <Trophy size={16} color="#22C55E" />
              </View>
              <Text style={styles.tournamentName} numberOfLines={1}>
                {tournament.name}
              </Text>
            </View>

            {isAdmin && (
              <View style={styles.adminBadge}>
                <Crown size={12} color="#F59E0B" />
                <Text style={styles.adminText}>Admin</Text>
              </View>
            )}
          </View>

          <View style={styles.badgeContainer}>
            <View
              style={[
                styles.typeBadge,
                tournament.type === 'league'
                  ? styles.leagueBadge
                  : styles.tournamentBadge,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  tournament.type === 'league'
                    ? styles.leagueText
                    : styles.tournamentText,
                ]}
              >
                {tournament.type.toUpperCase()}
              </Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          </View>

          {tournament.userPosition && (
            <View style={styles.positionContainer}>
              <LinearGradient
                colors={getPositionColors(tournament.userPosition)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.positionBadge}
              >
                {getPositionIcon(tournament.userPosition)}
                <Text style={styles.positionText}>
                  {getPositionText(tournament.userPosition)}
                </Text>
              </LinearGradient>
            </View>
          )}

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Users size={12} color="#9CA3AF" />
              <Text style={styles.infoText}>
                {tournament.totalParticipants}/{tournament.maxParticipants}
              </Text>
            </View>
            <Text style={styles.divider}>•</Text>
            <View style={styles.infoItem}>
              <Calendar size={12} color="#9CA3AF" />
              <Text style={styles.infoText}>
                {tournament.matchDays.length} days/week
              </Text>
            </View>

            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>
                {Math.round(
                  (tournament.totalParticipants / tournament.maxParticipants) *
                    100
                )}
                % full
              </Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  backgroundAccent: {
    position: 'absolute',
    top: -32,
    right: 32,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderRadius: 40,
  },
  cardContent: {
    padding: 16,
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  tournamentName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  adminText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  leagueBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  tournamentBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  leagueText: {
    color: '#3B82F6',
  },
  tournamentText: {
    color: '#A855F7',
  },
  statusBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: '#22C55E',
    fontSize: 12,
    fontWeight: '500',
  },
  positionContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  positionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  positionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  infoText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  divider: {
    color: '#4B5563',
    marginHorizontal: 4,
  },
  progressTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  progressText: {
    color: '#22C55E',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});

export default TournamentCard;
