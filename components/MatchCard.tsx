import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Calendar, Info } from 'lucide-react-native';
import { Match } from '@/data/enhancedMockData';
import { useNavigation } from '@react-navigation/native';

interface MatchCardProps {
  match: Match;
  userTeam: string;
  onInfoClick: (match: Match) => void;
  compact?: boolean;
}

const MatchCard = ({
  match,
  userTeam,
  onInfoClick,
  compact = false,
}: MatchCardProps) => {
  const navigation = useNavigation();
  const isHomeTeam = match.homeTeam === userTeam;
  const matchDate = new Date(match.scheduledDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.teamContainer}>
          <View style={styles.teamInfo}>
            <View style={styles.teamRow}>
              <Text
                style={[
                  styles.teamText,
                  match.homeTeam === userTeam && styles.userTeam,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {match.homeTeam}
              </Text>
              <Text style={styles.vsText}>vs</Text>
              <Text
                style={[
                  styles.teamText,
                  match.awayTeam === userTeam && styles.userTeam,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {match.awayTeam}
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
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => onInfoClick(match)}
            style={styles.infoButton}
          >
            <Info size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.timeText}>
          {matchDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(17, 24, 39, 0.3)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(31, 41, 55, 0.5)',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 0,
  },
  teamInfo: {
    minWidth: 0,
    flex: 1,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
  },
  teamText: {
    color: '#D1D5DB',
    fontSize: 14,
    flexShrink: 1,
  },
  userTeam: {
    fontWeight: '600',
    color: '#34D399',
  },
  vsText: {
    color: '#6B7280',
    fontSize: 14,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  dateText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  infoButton: {
    padding: 4,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});

export default MatchCard;
