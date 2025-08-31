import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Polygon, Circle, Line, Text as SvgText } from 'react-native-svg';
import { RadarChartProps } from '@/types/matchStats';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

export const RadarChart: React.FC<RadarChartProps> = ({ stats }) => {
  const [homeAnimation] = useState(new Animated.Value(0));
  const [awayAnimation] = useState(new Animated.Value(0));
  const [homePoints, setHomePoints] = useState<string>('');
  const [awayPoints, setAwayPoints] = useState<string>('');

  const size = 300; // Increased size to accommodate labels
  const center = size / 2;
  const maxRadius = 100; // Increased radius proportionally

  const categories = [
    {
      label: 'Attack',
      home: stats.shots.home,
      away: stats.shots.away,
      max: 20,
    },
    {
      label: 'Passing',
      home: Math.round(stats.passes.home / 10),
      away: Math.round(stats.passes.away / 10),
      max: 60,
    },
    {
      label: 'Defense',
      home: stats.tackles.home,
      away: stats.tackles.away,
      max: 30,
    },
    {
      label: 'Discipline',
      home: Math.max(0, 20 - stats.fouls.home),
      away: Math.max(0, 20 - stats.fouls.away),
      max: 20,
    },
    {
      label: 'Set Pieces',
      home: stats.cornerKicks.home,
      away: stats.cornerKicks.away,
      max: 10,
    },
    {
      label: 'Goalkeeping',
      home: stats.saves.home,
      away: stats.saves.away,
      max: 10,
    },
  ];

  useEffect(() => {
    const calculatePoints = (
      values: number[],
      animationValue: Animated.Value
    ) => {
      return values
        .map((value, index) => {
          const angle = (index * 360) / categories.length - 90;
          const radian = (angle * Math.PI) / 180;
          const normalizedValue = Math.min(value / categories[index].max, 1);
          const radius = normalizedValue * maxRadius;
          const x = center + radius * Math.cos(radian);
          const y = center + radius * Math.sin(radian);
          return `${x},${y}`;
        })
        .join(' ');
    };

    const homeValues = categories.map((cat) => cat.home);
    const awayValues = categories.map((cat) => cat.away);

    // i set up listeners to update polygon points during animation
    const homeListener = homeAnimation.addListener(({ value }) => {
      const animatedHomeValues = homeValues.map((val) => val * value);
      setHomePoints(calculatePoints(animatedHomeValues, homeAnimation));
    });

    const awayListener = awayAnimation.addListener(({ value }) => {
      const animatedAwayValues = awayValues.map((val) => val * value);
      setAwayPoints(calculatePoints(animatedAwayValues, awayAnimation));
    });

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

    return () => {
      homeAnimation.removeListener(homeListener);
      awayAnimation.removeListener(awayListener);
    };
  }, []);

  // i create grid lines for the radar background
  const createGridLines = () => {
    return [0.2, 0.4, 0.6, 0.8, 1.0].map((ratio) => {
      const points = categories
        .map((_, index) => {
          const angle = (index * 360) / categories.length - 90;
          const radian = (angle * Math.PI) / 180;
          const radius = ratio * maxRadius;
          return `${center + radius * Math.cos(radian)},${
            center + radius * Math.sin(radian)
          }`;
        })
        .join(' ');

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
  };

  // i create axis lines from center to each category
  const createAxisLines = () => {
    return categories.map((_, index) => {
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
  };

  // Calculate label positions with proper offset
  const getLabelPosition = (index: number) => {
    const angle = (index * 360) / categories.length - 90;
    const radian = (angle * Math.PI) / 180;
    const labelRadius = maxRadius + 9; // Increased label radius

    // Calculate position
    const x = center + labelRadius * Math.cos(radian);
    const y = center + labelRadius * Math.sin(radian);

    // Determine text alignment based on position
    let textAnchor = 'middle';
    let dy = -20; // Vertical offset for the label
    let dx = 0; // Horizontal offset for the label

    // Adjust for left/right positioning
    if (Math.cos(radian) > 0.3) {
      // Right side
      textAnchor = 'start';
    } else if (Math.cos(radian) < -0.3) {
      // Left side
      textAnchor = 'end';
    }
    if(Math.cos(radian) > 0.3) {
      dx = 10;
    } else if(Math.cos(radian) < -0.3) {
      dx = -10;
    }

    // Adjust for top/bottom positioning
    if (Math.sin(radian) < -0.5) {
      // Top
      dy = -15;
    } else if (Math.sin(radian) > 0.5) {
      // Bottom
      dy = 20;
    }
    

    return { x, y, textAnchor, dy ,dx};
  };

  return (
    <View style={styles.radarContainer}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {createGridLines()}
        {createAxisLines()}

        {/* home team polygon - green for home team strength */}
        <Polygon
          points={homePoints || `${center},${center}`}
          fill="rgba(34, 197, 94, 0.25)"
          stroke="#22c55e"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* away team polygon - blue for away team strength */}
        <Polygon
          points={awayPoints || `${center},${center}`}
          fill="rgba(59, 130, 246, 0.25)"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* i add dots at each data point for better visibility */}
        {homePoints &&
          homePoints.split(' ').map((point, index) => {
            const [x, y] = point.split(',').map(Number);
            return (
              <Circle
                key={`home-${index}`}
                cx={x}
                cy={y}
                r="3"
                fill="#22c55e"
                stroke="#ffffff"
                strokeWidth="1"
              />
            );
          })}

        {awayPoints &&
          awayPoints.split(' ').map((point, index) => {
            const [x, y] = point.split(',').map(Number);
            return (
              <Circle
                key={`away-${index}`}
                cx={x}
                cy={y}
                r="3"
                fill="#3b82f6"
                stroke="#ffffff"
                strokeWidth="1"
              />
            );
          })}

        {/* center dot */}
        <Circle
          cx={center}
          cy={center}
          r="3"
          fill="#ffffff"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />

        {/* Add labels directly in SVG for better positioning */}
        {categories.map((cat, index) => {
          const { x, y, textAnchor, dy ,dx} = getLabelPosition(index);
          return (
            <React.Fragment key={index}>
              <SvgText
                x={x}
                y={y}
                dy={dy}
                textAnchor={textAnchor}
                fill="#ffffff"
                fontSize="10"
                fontFamily="Inter-Medium"
                fontWeight="bold"
              >
                {cat.label}
              </SvgText>
              <SvgText
                x={x+(dx> 0? 5 : -15)}
                y={y + (dy > 5 ? 8 : -0)}
                textAnchor={textAnchor}
                fill="rgba(255, 255, 255, 0.7)"
                fontSize="8"
                fontFamily="Inter-Regular"
              >
                {cat.home} - {cat.away}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  radarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});
