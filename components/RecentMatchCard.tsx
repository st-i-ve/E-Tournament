import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, MapPin, Home, Clock, Check, X } from 'lucide-react-native';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  status: 'upcoming' | 'completed';
  scheduledDate: string;
  homeScore?: number;
  awayScore?: number;
  matchday?: number;
}

interface RecentMatchCardProps {
  match: Match;
  userTeam: string;
  onPress?: () => void;
}

const RecentMatchCard = ({
  match,
  userTeam,
  onPress,
}: RecentMatchCardProps) => {
  const isHomeTeam = match.homeTeam === userTeam;
  const isWin =
    match.status === 'completed' &&
    ((isHomeTeam && match.homeScore! > match.awayScore!) ||
      (!isHomeTeam && match.awayScore! > match.homeScore!));
  const isDraw =
    match.status === 'completed' && match.homeScore === match.awayScore;

  const getResultColor = () => {
    if (match.status === 'upcoming') return styles.upcomingCard;
    if (isWin) return styles.winCard;
    if (isDraw) return styles.drawCard;
    return styles.lossCard;
  };

  const getResultBadge = () => {
    if (match.status === 'upcoming')
      return {
        text: 'UPCOMING',
        style: styles.upcomingBadge,
        icon: Clock,
      };
    if (isWin)
      return {
        text: 'WIN',
        style: styles.winBadge,
        icon: Check,
      };
    if (isDraw)
      return {
        text: 'DRAW',
        style: styles.drawBadge,
        icon: null,
      };
    return {
      text: 'LOSS',
      style: styles.lossBadge,
      icon: X,
    };
  };

  const result = getResultBadge();
  const ResultIcon = result.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, getResultColor()]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.teamsContainer}>
          <View style={styles.teamRow}>
            <Text
              style={[
                styles.teamName,
                match.homeTeam === userTeam && styles.userTeam,
              ]}
              numberOfLines={1}
            >
              {match.homeTeam}
            </Text>
            <Text style={styles.vsText}>vs</Text>
            <Text
              style={[
                styles.teamName,
                match.awayTeam === userTeam && styles.userTeam,
              ]}
              numberOfLines={1}
            >
              {match.awayTeam}
            </Text>
          </View>
          <View style={styles.dateRow}>
            <Calendar size={12} color="#9CA3AF" />
            <Text style={styles.dateText}>
              {formatDate(match.scheduledDate)}
            </Text>
          </View>
        </View>

        <View style={[styles.badge, result.style]}>
          {ResultIcon && <ResultIcon size={12} color={result.style.color} />}
          <Text style={[styles.badgeText, { color: result.style.color }]}>
            {result.text}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        {match.status === 'completed' ? (
          <Text style={styles.scoreText}>
            {match.homeScore} - {match.awayScore}
          </Text>
        ) : (
          <Text style={styles.timeText}>{formatTime(match.scheduledDate)}</Text>
        )}

        {match.matchday && (
          <Text style={styles.matchdayText}>MD {match.matchday}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  upcomingCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  winCard: {
    backgroundColor: 'rgba(5, 150, 105, 0.2)',
    borderColor: 'rgba(5, 150, 105, 0.3)',
  },
  drawCard: {
    backgroundColor: 'rgba(194, 65, 12, 0.2)',
    borderColor: 'rgba(194, 65, 12, 0.3)',
  },
  lossCard: {
    backgroundColor: 'rgba(220, 38, 38, 0.2)',
    borderColor: 'rgba(220, 38, 38, 0.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  teamsContainer: {
    flex: 1,
    minWidth: 0,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  teamName: {
    fontSize: 14,
    color: '#E5E7EB',
    flexShrink: 1,
  },
  userTeam: {
    fontWeight: '600',
    color: '#34D399',
  },
  vsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  upcomingBadge: {
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
    color: '#9CA3AF',
  },
  winBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    color: '#34D399',
  },
  drawBadge: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    color: '#F97316',
  },
  lossBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#EF4444',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timeText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  matchdayText: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default RecentMatchCard;
{/* <RecentMatchCard
  match={match}
  userTeam={userTeam}
  onPress={() => navigation.navigate('MatchDetails', { matchId: match.id })}
/>; */}