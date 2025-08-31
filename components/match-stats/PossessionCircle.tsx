import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { PossessionCircleProps } from '@/types/matchStats';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const PossessionCircle: React.FC<PossessionCircleProps> = ({
  homePercentage,
  awayPercentage,
}) => {
  const [homeAnimation] = useState(new Animated.Value(0));
  const [awayAnimation] = useState(new Animated.Value(0));
  const [circleScale] = useState(new Animated.Value(0));

  const baseRadius = 60;
  const strokeWidth = 12;

  // Calculate the average possession to determine circle size
  const avgPossession = (homePercentage + awayPercentage) / 2;
  // Scale the radius based on possession (more possession = larger circle)
  const scaledRadius = baseRadius * (0.7 + (avgPossession / 100) * 0.6);
  const circumference = 2 * Math.PI * scaledRadius;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(homeAnimation, {
        toValue: homePercentage,
        duration: 1500,
        delay: 300,
        useNativeDriver: false,
      }),
      Animated.timing(awayAnimation, {
        toValue: awayPercentage,
        duration: 1500,
        delay: 300,
        useNativeDriver: false,
      }),
      Animated.timing(circleScale, {
        toValue: 1,
        duration: 1500,
        delay: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [homePercentage, awayPercentage]);

  return (
    <View style={styles.possessionContainer}>
      <Animated.View
        style={[
          styles.circleContainer,
          {
            transform: [
              {
                scale: circleScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Svg width={140} height={140} style={styles.svg}>
          {/* background circle */}
          <Circle
            cx={70}
            cy={70}
            r={scaledRadius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* home team arc */}
          <AnimatedCircle
            cx={70}
            cy={70}
            r={scaledRadius}
            stroke="#22c55e"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={homeAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: [
                circumference,
                circumference * (1 - homePercentage / 50),
              ],
            })}
            strokeLinecap="round"
            transform={`rotate(-90 70 70)`}
          />

          {/* away team arc - now starts from same point as home team */}
          <AnimatedCircle
            cx={70}
            cy={70}
            r={scaledRadius}
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={awayAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: [
                circumference,
                circumference * (1 + awayPercentage / 50),
              ],
            })}
            strokeLinecap="round"
            transform={`rotate(-90 70 70)`}
          />
        </Svg>

        <View style={styles.centerContent}>
          <Text style={styles.possessionTitle}>Ball</Text>
          <Text style={styles.possessionSubtitle}>Possession</Text>
        </View>
      </Animated.View>

      <View style={styles.possessionLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#22c55e' }]} />
          <Text style={styles.legendText}>{homePercentage}%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
          <Text style={styles.legendText}>{awayPercentage}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  possessionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    transform: [{ rotate: '0deg' }],
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  possessionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  possessionSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  possessionLegend: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
});
