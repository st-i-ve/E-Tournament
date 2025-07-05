import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from '@/components/ui/badge';

interface Tournament {
  id: number;
  name: string;
  type: string;
  participants: number;
  position: number;
  status: string;
}

interface MinimalTournamentCardProps {
  tournament: Tournament;
  isAdmin: boolean;
}

export const MinimalTournamentCard: React.FC<MinimalTournamentCardProps> = ({
  tournament,
  isAdmin,
}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.name}>{tournament.name}</Text>
          <Text style={styles.details}>
            {tournament.type} • {tournament.participants} players
          </Text>
        </View>
        <View style={styles.badges}>
          <Badge 
            variant="outline" 
            style={[
              styles.positionBadge,
              tournament.position === 1 && styles.goldBadge,
              tournament.position <= 3 && tournament.position > 1 && styles.greenBadge,
            ]}
            textStyle={[
              tournament.position === 1 && styles.goldText,
              tournament.position <= 3 && tournament.position > 1 && styles.greenText,
            ]}
          >
            {tournament.position === 1 ? '1st' :
             tournament.position === 2 ? '2nd' :
             tournament.position === 3 ? '3rd' :
             `${tournament.position}th`}
          </Badge>
          <Badge style={styles.statusBadge}>
            {tournament.status}
          </Badge>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  details: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  positionBadge: {
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
    borderColor: 'rgba(156, 163, 175, 0.3)',
  },
  goldBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  greenBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  goldText: {
    color: '#ffd700',
  },
  greenText: {
    color: '#22c55e',
  },
  statusBadge: {
    backgroundColor: '#22c55e',
  },
});