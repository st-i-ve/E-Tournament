import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from 'lucide-react-native';
import { TeamLegendProps } from '@/types/matchStats';

export const TeamLegend: React.FC<TeamLegendProps> = ({ homeTeam, awayTeam }) => {
  return (
    <View style={styles.legendContainer}>
      <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: '#22c55e' }]} />
        <Badge size={16} color="#22c55e" />
        <Text style={styles.legendText}>{homeTeam}</Text>
      </View>
      
      <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: '#3b82f6' }]} />
        <Badge size={16} color="#3b82f6" />
        <Text style={styles.legendText}>{awayTeam}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});