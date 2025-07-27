import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface BackgroundProps {
  /** Number of triangles to render (default: 2) */
  triangleCount?: number;
  /** Number of circles to render (default: 3) */
  circleCount?: number;
  /** Number of rectangles to render (default: 2) */
  rectangleCount?: number;
  /** Whether to show vertical lines (default: true) */
  showVerticalLines?: boolean;
  /** Whether to show horizontal lines (default: true) */
  showHorizontalLines?: boolean;
  /** Opacity for border elements (default: 0.1) */
  borderOpacity?: number;
  /** Opacity for line elements (default: 0.05) */
  lineOpacity?: number;
  /** Primary color for elements (default: '#22c55e') */
  color?: string;
  /** Seed for consistent randomization (optional) */
  seed?: number;
}

export const Background: React.FC<BackgroundProps> = ({
  triangleCount = 2,
  circleCount = 3,
  rectangleCount = 2,
  showVerticalLines = true,
  showHorizontalLines = true,
  borderOpacity = 0.1,
  lineOpacity = 0.05,
  color = '#22c55e',
  seed,
}) => {
  // Simple seeded random function for consistent randomization
  const seededRandom = useMemo(() => {
    let currentSeed = seed || Math.floor(Math.random() * 1000000);
    return () => {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };
  }, [seed]);

  const randomElements = useMemo(() => {
    const random = seededRandom;
    
    // Generate triangles with more subtle positioning
    const triangles = Array.from({ length: triangleCount }, (_, i) => ({
      id: `triangle-${i}`,
      top: 100 + random() * (screenHeight * 0.6), // More centered positioning
      left: 50 + random() * (screenWidth * 0.7),
      size: 24, // Fixed size for consistency
      rotation: random() * 45, // Less dramatic rotation
    }));

    // Generate circles with varying sizes but more subtle
    const circles = Array.from({ length: circleCount }, (_, i) => ({
      id: `circle-${i}`,
      top: 100 + random() * (screenHeight * 0.7),
      left: 50 + random() * (screenWidth * 0.7),
      size: [24, 32, 48][i % 3], // Predefined sizes for consistency
    }));

    // Generate rectangles with more subtle dimensions
    const rectangles = Array.from({ length: rectangleCount }, (_, i) => ({
      id: `rectangle-${i}`,
      top: 150 + random() * (screenHeight * 0.6),
      left: 50 + random() * (screenWidth * 0.7),
      width: [32, 48][i % 2], // Predefined widths
      height: [32, 48][i % 2], // Predefined heights
      rotation: random() * 15, // Very subtle rotation
    }));

    // Generate line positions - fewer and more strategic
    const verticalLinePositions = showVerticalLines ? [
      '25%',
      '75%',
    ] : [];

    const horizontalLinePositions = showHorizontalLines ? [
      '33%',
      '66%',
    ] : [];

    return {
      triangles,
      circles,
      rectangles,
      verticalLinePositions,
      horizontalLinePositions,
    };
  }, [triangleCount, circleCount, rectangleCount, showVerticalLines, showHorizontalLines, seededRandom]);

  // Proper color handling - convert hex to rgba
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const borderColor = hexToRgba(color, borderOpacity);
  const lineColor = hexToRgba(color, lineOpacity);

  return (
    <View style={styles.backgroundElements}>
      {/* Triangles */}
      {randomElements.triangles.map((triangle) => (
        <View
          key={triangle.id}
          style={[
            styles.triangle,
            {
              top: triangle.top,
              left: triangle.left,
              width: triangle.size,
              height: triangle.size,
              borderColor: borderColor,
              transform: [{ rotate: `${triangle.rotation}deg` }],
            },
          ]}
        />
      ))}

      {/* Circles */}
      {randomElements.circles.map((circle) => (
        <View
          key={circle.id}
          style={[
            styles.circle,
            {
              top: circle.top,
              left: circle.left,
              width: circle.size,
              height: circle.size,
              borderColor: borderColor,
              borderRadius: circle.size / 2,
            },
          ]}
        />
      ))}

      {/* Rectangles */}
      {randomElements.rectangles.map((rectangle) => (
        <View
          key={rectangle.id}
          style={[
            styles.rectangle,
            {
              top: rectangle.top,
              left: rectangle.left,
              width: rectangle.width,
              height: rectangle.height,
              borderColor: borderColor,
              transform: [{ rotate: `${rectangle.rotation}deg` }],
            },
          ]}
        />
      ))}

      {/* Vertical Lines */}
      {randomElements.verticalLinePositions.map((position, index) => (
        <View
          key={`vertical-${index}`}
          style={[
            styles.verticalLine,
            {
              left: position,
              backgroundColor: lineColor,
            },
          ]}
        />
      ))}

      {/* Horizontal Lines */}
      {randomElements.horizontalLinePositions.map((position, index) => (
        <View
          key={`horizontal-${index}`}
          style={[
            styles.horizontalLine,
            {
              top: position,
              backgroundColor: lineColor,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  triangle: {
    position: 'absolute',
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  circle: {
    position: 'absolute',
    borderWidth: 1,
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 1,
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
});