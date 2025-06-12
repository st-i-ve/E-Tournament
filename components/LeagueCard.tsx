import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Trophy } from 'lucide-react-native';

interface LeagueCardProps {
  position: number;
}

export default function LeagueCard({ position }: LeagueCardProps) {
  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={styles.blur}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Trophy color="#00FF88" size={16} strokeWidth={2} />
            <Text style={styles.label}>LEAGUE POS</Text>
          </View>
          <Text style={styles.position}>#{position}</Text>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  blur: {
    flex: 1,
    borderRadius: 16,
  },
  card: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#888888',
    letterSpacing: 1,
  },
  position: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});