import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Info } from 'lucide-react-native';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  scheduledDate: string;
  status: string;
  tournamentId: string;
}

interface MatchCardProps {
  match: Match;
  userTeam: string;
  onInfoClick: (match: Match) => void;
  compact?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ 
  match, 
  userTeam, 
  onInfoClick, 
  compact = false 
}) => {
  const isHomeTeam = match.homeTeam === userTeam;
  const matchDate = new Date(match.scheduledDate);

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <View style={styles.content}>
        <View style={styles.matchInfo}>
          <View style={styles.teamsContainer}>
            <Text style={[
              styles.teamName,
              match.homeTeam === userTeam && styles.userTeam
            ]}>
              {match.homeTeam}
            </Text>
            <Text style={styles.vs}>vs</Text>
            <Text style={[
              styles.teamName,
              match.awayTeam === userTeam && styles.userTeam
            ]}>
              {match.awayTeam}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Calendar color="#9ca3af" size={12} />
            <Text style={styles.dateText}>
              {matchDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => onInfoClick(match)}
        >
          <Info color="#9ca3af" size={16} />
        </TouchableOpacity>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {matchDate.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit' 
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  compactContainer: {
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  matchInfo: {
    flex: 1,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  teamName: {
    color: '#e5e7eb',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  userTeam: {
    color: '#22c55e',
    fontFamily: 'Inter-SemiBold',
  },
  vs: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginHorizontal: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  infoButton: {
    padding: 4,
  },
  timeContainer: {
    alignItems: 'flex-start',
  },
  timeText: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
});