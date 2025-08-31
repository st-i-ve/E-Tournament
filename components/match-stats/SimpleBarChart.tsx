import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SimpleBarChartProps } from '@/types/matchStats';

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  homeValue, 
  awayValue, 
  homeTeam, 
  awayTeam, 
  maxValue, 
  delay = 0 
}) => {
  const [homeAnimation] = useState(new Animated.Value(0));
  const [awayAnimation] = useState(new Animated.Value(0));
  
  const max = maxValue || Math.max(homeValue, awayValue, 1);
  const homePercentage = (homeValue / max) * 100;
  const awayPercentage = (awayValue / max) * 100;

  useEffect(() => {
    const animateBar = (animation: Animated.Value, targetValue: number) => {
      Animated.timing(animation, {
        toValue: targetValue,
        duration: 1000,
        delay: delay,
        useNativeDriver: false,
      }).start();
    };

    animateBar(homeAnimation, homePercentage);
    animateBar(awayAnimation, awayPercentage);
  }, [homePercentage, awayPercentage, delay]);

  return (
    <View style={styles.barChartContainer}>
      <View style={styles.barRow}>
        <View style={styles.leftBar}>
          <Text style={styles.barValue}>{homeValue}</Text>
          <View style={styles.barTrack}>
            <Animated.View 
              style={[
                styles.barFill, 
                styles.homeBar,
                {
                  width: homeAnimation.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp',
                  }),
                }
              ]} 
            />
          </View>
        </View>
        
        <View style={styles.centerDivider}>
          <View style={styles.centerDot} />
        </View>
        
        <View style={styles.rightBar}>
          <View style={styles.barTrack}>
            <Animated.View 
              style={[
                styles.barFill, 
                styles.awayBar,
                {
                  width: awayAnimation.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp',
                  }),
                }
              ]} 
            />
          </View>
          <Text style={styles.barValue}>{awayValue}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barChartContainer: {
    paddingHorizontal: 16,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  leftBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rightBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  barTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    flex: 1,
    marginHorizontal: 12,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  homeBar: {
    backgroundColor: '#22c55e',
    alignSelf: 'flex-end',
  },
  awayBar: {
    backgroundColor: '#3b82f6',
    alignSelf: 'flex-start',
  },
  barValue: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    minWidth: 30,
    textAlign: 'center',
  },
  centerDivider: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  centerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
});