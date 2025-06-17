import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users, Crown, Calendar, Target } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Tournament } from '@/data/enhancedMockData';

interface MinimalTournamentCardProps {
  tournament: Tournament;
  isAdmin?: boolean;
  onPress?: () => void;
}

const MinimalTournamentCard = ({
  tournament,
  isAdmin = false,
  onPress,
}: MinimalTournamentCardProps) => {
  const navigation = useNavigation();

  const getPositionColor = (position?: number) => {
    if (!position) return styles.grayText;
    if (position === 1) return styles.goldText;
    if (position === 2) return styles.silverText;
    if (position === 3) return styles.bronzeText;
    if (position <= 4) return styles.greenText;
    return styles.grayText;
  };

  const getTournamentTypeColor = () => {
    if (tournament.type === 'league') return styles.blueText;
    if (tournament.type === 'knockout') return styles.purpleText;
    return styles.orangeText;
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.tournamentName} numberOfLines={1}>
            {tournament.name}
          </Text>
          <View style={styles.typeContainer}>
            <Text style={[styles.tournamentType, getTournamentTypeColor()]}>
              {tournament.type.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.positionContainer}>
          {isAdmin && <Crown size={16} color="#fbbf24" />}
          {tournament.userPosition && (
            <View
              style={[
                styles.positionBadge,
                getPositionColor(tournament.userPosition),
              ]}
            >
              <Text style={styles.positionText}>
                #{tournament.userPosition}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Users size={14} color="#9ca3af" />
            <Text style={styles.infoText}>
              {tournament.totalParticipants}/{tournament.maxParticipants}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Calendar size={14} color="#9ca3af" />
            <Text style={styles.infoText}>
              {new Date(tournament.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statusIndicator,
            tournament.status === 'active'
              ? styles.activeStatus
              : styles.inactiveStatus,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(31, 41, 55, 0.5)',
    marginBottom: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    minWidth: 0,
    marginRight: 8,
  },
  tournamentName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  tournamentType: {
    fontSize: 12,
  },
  positionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    gap: 8,
  },
  positionBadge: {
    borderRadius: 6,
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  positionText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeStatus: {
    backgroundColor: '#10b981',
  },
  inactiveStatus: {
    backgroundColor: '#6b7280',
  },
  // Text colors
  blueText: {
    color: '#60a5fa',
  },
  purpleText: {
    color: '#a78bfa',
  },
  orangeText: {
    color: '#fb923c',
  },
  goldText: {
    color: '#fbbf24',
  },
  silverText: {
    color: '#d1d5db',
  },
  bronzeText: {
    color: '#f59e0b',
  },
  greenText: {
    color: '#34d399',
  },
  grayText: {
    color: '#6b7280',
  },
});

export default MinimalTournamentCard;
