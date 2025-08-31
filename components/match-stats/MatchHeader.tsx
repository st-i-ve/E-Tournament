import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ChevronLeft, Trophy } from 'lucide-react-native';
import { MatchHeaderProps } from '@/types/matchStats';

export const MatchHeader: React.FC<MatchHeaderProps> = ({ 
  homeTeam, 
  awayTeam, 
  homeScore, 
  awayScore, 
  date, 
  tournament, 
  animation 
}) => {
  return (
    <Animated.View
      style={[
        styles.header,
        {
          opacity: animation,
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        },
      ]}
    >
      

      <View style={styles.matchInfo}>
        <View style={styles.teamSection}>
          <Text style={styles.teamName}>{homeTeam}</Text>
          <Text style={styles.score}>{homeScore}</Text>
        </View>

        <View style={styles.vsSection}>
          <Text style={styles.vsText}>VS</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>

        <View style={styles.teamSection}>
          <Text style={styles.teamName}>{awayTeam}</Text>
          <Text style={styles.score}>{awayScore}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  tournamentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tournamentText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  matchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 8,
  },
  score: {
    color: '#22c55e',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  vsSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  vsText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 9,
    fontFamily: 'Inter-Regular',
  },
});