import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { User } from 'lucide-react-native';

interface CoachCardProps {
  name: string;
  rating: number;
}

export default function CoachCard({ name, rating }: CoachCardProps) {
  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={styles.blur}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <User color="#4A90E2" size={16} strokeWidth={2} />
            <Text style={styles.label}>COACH</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.rating}>{rating}</Text>
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
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
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
    color: '#4A90E2',
    letterSpacing: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4A90E2',
  },
});