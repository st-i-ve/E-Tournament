import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

interface StatItem {
  label: string;
  value: number | string;
  color: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

interface StatsGridProps {
  stats: StatItem[];
  title?: string;
  columns?: number;
  cardHeight?: number;
  animationDelay?: number;
}

const { width } = Dimensions.get('window');

export default function StatsGrid({
  stats,
  title = 'Season Stats',
  columns = 3,
  cardHeight = 100,
  animationDelay = 100,
}: StatsGridProps) {
  // Calculate card width based on columns and gap
  const gap = 12;
  const cardWidth = (width - 40 - (columns - 1) * gap) / columns;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.titleContainer}
      >
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>

      <View style={[styles.grid, { gap }]}>
        {stats.map((stat, index) => (
          <MotiView
            key={`${stat.label}-${index}`}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              delay: index * animationDelay,
              damping: 12,
            }}
            style={{ width: cardWidth }}
          >
            <GlassCard style={[styles.statCard, { height: cardHeight }]}>
              <View style={styles.statHeader}>
                {stat.icon && (
                  <View style={styles.iconContainer}>{stat.icon}</View>
                )}
                {stat.trend && (
                  <View
                    style={[
                      styles.trendIndicator,
                      stat.trend === 'up' && styles.trendUp,
                      stat.trend === 'down' && styles.trendDown,
                    ]}
                  >
                    <Text style={styles.trendText}>
                      {stat.trend === 'up' ? '↑' : '↓'}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[styles.statValue, { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </GlassCard>
          </MotiView>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 20,
  },
  titleContainer: {
    paddingBottom: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendUp: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
  },
  trendDown: {
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
  },
  trendText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
});
{/* <StatsGrid
  title="Player Stats"
  columns={4}
  cardHeight={120}
  animationDelay={150}
  stats={[
    {
      label: 'Goals',
      value: 24,
      color: '#F59E0B',
      icon: <Trophy size={16} color="#F59E0B" />,
      trend: 'up',
    },
    {
      label: 'Assists',
      value: 12,
      color: '#3B82F6',
      icon: <Handshake size={16} color="#3B82F6" />,
      trend: 'neutral',
    },
    // ... more stats
  ]}
/>; */}