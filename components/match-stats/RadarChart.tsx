import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Polygon, Circle, Line, Text as SvgText } from 'react-native-svg';
import { RadarChartProps } from '@/types/matchStats';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

export const RadarChart: React.FC<RadarChartProps> = ({ stats }) => {
  const [homeAnimation] = useState(new Animated.Value(0));
  const [awayAnimation] = useState(new Animated.Value(0));
  
  const size = 200;
  const center = size / 2;
  const maxRadius = 80;
  
  const categories = [
    { label: 'Shots', home: stats.shots.home, away: stats.shots.away, max: 20 },
    { label: 'Passes', home: stats.passes.home, away: stats.passes.away, max: 600 },
    { label: 'Tackles', home: stats.tackles.home, away: stats.tackles.away, max: 30 },
    { label: 'Fouls', home: stats.fouls.home, away: stats.fouls.away, max: 20 },
    { label: 'Corners', home: stats.cornerKicks.home, away: stats.cornerKicks.away, max: 10 },
    { label: 'Saves', home: stats.saves.home, away: stats.saves.away, max: 10 },
  ];
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(homeAnimation, {
        toValue: 1,
        duration: 1500,
        delay: 500,
        useNativeDriver: false,
      }),
      Animated.timing(awayAnimation, {
        toValue: 1,
        duration: 1500,
        delay: 700,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);
  
  const getPoint = (value: number, max: number, angle: number, animationValue: Animated.Value) => {
    const normalizedValue = Math.min(value / max, 1);
    const radius = normalizedValue * maxRadius;
    const radian = (angle * Math.PI) / 180;
    
    return {
      x: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [center, center + radius * Math.cos(radian)],
      }),
      y: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [center, center + radius * Math.sin(radian)],
      }),
    };
  };
  
  const homePoints = categories.map((cat, index) => {
    const angle = (index * 360) / categories.length - 90;
    return getPoint(cat.home, cat.max, angle, homeAnimation);
  });
  
  const awayPoints = categories.map((cat, index) => {
    const angle = (index * 360) / categories.length - 90;
    return getPoint(cat.away, cat.max, angle, awayAnimation);
  });
  
  const gridLines = [0.2, 0.4, 0.6, 0.8, 1.0].map(ratio => {
    const points = categories.map((_, index) => {
      const angle = (index * 360) / categories.length - 90;
      const radian = (angle * Math.PI) / 180;
      const radius = ratio * maxRadius;
      return `${center + radius * Math.cos(radian)},${center + radius * Math.sin(radian)}`;
    }).join(' ');
    
    return (
      <Polygon
        key={ratio}
        points={points}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1"
      />
    );
  });
  
  const axisLines = categories.map((_, index) => {
    const angle = (index * 360) / categories.length - 90;
    const radian = (angle * Math.PI) / 180;
    const endX = center + maxRadius * Math.cos(radian);
    const endY = center + maxRadius * Math.sin(radian);
    
    return (
      <Line
        key={index}
        x1={center}
        y1={center}
        x2={endX}
        y2={endY}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1"
      />
    );
  });
  
  return (
    <View style={styles.radarContainer}>
      <Svg width={size} height={size}>
        {gridLines}
        {axisLines}
        
        {/* home team polygon */}
        <AnimatedPolygon
          points={homePoints.map(p => `${p.x._value || center},${p.y._value || center}`).join(' ')}
          fill="rgba(34, 197, 94, 0.2)"
          stroke="#22c55e"
          strokeWidth="2"
        />
        
        {/* away team polygon */}
        <AnimatedPolygon
          points={awayPoints.map(p => `${p.x._value || center},${p.y._value || center}`).join(' ')}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        
        {/* center dot */}
        <Circle cx={center} cy={center} r="2" fill="#ffffff" />
      </Svg>
      
      <View style={styles.radarLabels}>
        {categories.map((cat, index) => {
          const angle = (index * 360) / categories.length - 90;
          const radian = (angle * Math.PI) / 180;
          const labelRadius = maxRadius + 20;
          const x = center + labelRadius * Math.cos(radian) - size / 2;
          const y = center + labelRadius * Math.sin(radian) - size / 2;
          
          return (
            <Text
              key={index}
              style={[
                styles.radarLabel,
                {
                  left: x,
                  top: y,
                }
              ]}
            >
              {cat.label}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  radarLabels: {
    position: 'absolute',
    width: 200,
    height: 200,
  },
  radarLabel: {
    position: 'absolute',
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    width: 40,
    marginLeft: -20,
    marginTop: -6,
  },
});