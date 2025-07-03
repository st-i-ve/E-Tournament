import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Calendar, Clock, Eye, Check, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface DetailedMatchCardProps {
  match: DetailedMatch;
  userTeam: string;
  onViewDetails: (match: DetailedMatch) => void;
}

const DetailedMatchCard = ({
  match,
  userTeam,
  onViewDetails,
}: DetailedMatchCardProps) => {
  const navigation = useNavigation();
  const isHomeTeam = match.team_home.name === userTeam;
  const isWin =
    (isHomeTeam && match.team_home.score > match.team_away.score) ||
    (!isHomeTeam && match.team_away.score > match.team_home.score);
  const isDraw = match.team_home.score === match.team_away.score;

  const getResultColor = () => {
    if (isWin) return styles.winBackground;
    if (isDraw) return styles.drawBackground;
    return styles.lossBackground;
  };

  const getResultBadge = () => {
    if (isWin)
      return {
        text: '',
        style: styles.winBadge,
        Icon: Check,
      };
    if (isDraw)
      return {
        text: 'DRAW',
        style: styles.drawBadge,
        Icon: null,
      };
    return {
      text: 'LOSS',
      style: styles.lossBadge,
      Icon: X,
    };
  };

  const result = getResultBadge();
  const ResultIcon = result.Icon;
  const matchDate = new Date(match.timestamp);

  return (
    <TouchableOpacity
      style={[styles.container, getResultColor()]}
      onPress={() => onViewDetails(match)}
    >
      <View style={styles.header}>
        <View style={styles.teamInfo}>
          <View style={styles.teamRow}>
            <Text
              style={[
                styles.teamText,
                match.team_home.name === userTeam && styles.userTeam,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {match.team_home.name}
            </Text>
            <Text style={styles.vsText}>vs</Text>
            <Text
              style={[
                styles.teamText,
                match.team_away.name === userTeam && styles.userTeam,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {match.team_away.name}
            </Text>
          </View>
          <View style={styles.dateRow}>
            <Calendar size={12} color="#9CA3AF" />
            <Text style={styles.dateText}>
              {matchDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.resultContainer}>
          <View style={[styles.badge, result.style]}>
            {ResultIcon && <ResultIcon size={12} color={result.style.color} />}
            {result.text ? (
              <Text style={[styles.badgeText, { color: result.style.color }]}>
                {result.text}
              </Text>
            ) : null}
          </View>
          <Eye size={16} color="#9CA3AF" />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {match.team_home.score} - {match.team_away.score}
          </Text>
        </View>

        {match.tournament_name && (
          <Text style={styles.tournamentText}>{match.tournament_name}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(31, 41, 55, 0.5)',
    marginBottom: 8,
  },
  winBackground: {
    backgroundColor: 'rgba(5, 150, 105, 0.2)',
  },
  drawBackground: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
  },
  lossBackground: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  teamInfo: {
    flex: 1,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamText: {
    color: '#D1D5DB',
    fontSize: 12,
    flexShrink: 1,
  },
  userTeam: {
    fontWeight: '600',
    color: '#34D399',
  },
  vsText: {
    color: '#6B7280',
    fontSize: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  dateText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  winBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    color: '#34D399',
  },
  drawBadge: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    color: '#FB923C',
  },
  lossBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#F87171',
  },
  badgeText: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  tournamentText: {
    color: '#6B7280',
    fontSize: 12,
  },
});

export default DetailedMatchCard;
