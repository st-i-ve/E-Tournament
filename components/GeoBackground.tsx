import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Circle, Square, Triangle, X } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface GeoShapeProps {
  icon: React.ComponentType<any>;
  size: number;
  color: string;
  glowIntensity: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

const GeoShape: React.FC<GeoShapeProps> = ({ 
  icon: Icon, 
  size, 
  color, 
  glowIntensity, 
  top, 
  left, 
  right, 
  bottom 
}) => {
  return (
    <View 
      style={[
        styles.shapeContainer,
        {
          position: 'absolute',
          top,
          left,
          right,
          bottom,
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: glowIntensity,
          shadowRadius: glowIntensity * 15,
          elevation: glowIntensity * 10,
        }
      ]}
    >
      <Icon 
        size={size} 
        color={color} 
        strokeWidth={1.5}
      />
    </View>
  );
};

export default function GeoBackground() {
  const shapes = [
    // top edge shapes
    { icon: Circle, size: 24, color: '#ff6b6b', glowIntensity: 0.8, top: 50, left: 30 },
    { icon: X, size: 28, color: '#4ecdc4', glowIntensity: 0.6, top: 80, right: 40 },
    { icon: Square, size: 22, color: '#45b7d1', glowIntensity: 0.9, top: 120, left: width * 0.8 },
    
    // left edge shapes
    { icon: Triangle, size: 26, color: '#96ceb4', glowIntensity: 0.7, top: height * 0.3, left: 20 },
    { icon: Circle, size: 20, color: '#feca57', glowIntensity: 0.5, top: height * 0.5, left: 15 },
    { icon: X, size: 24, color: '#ff9ff3', glowIntensity: 0.8, top: height * 0.7, left: 25 },
    
    // right edge shapes
    { icon: Square, size: 25, color: '#54a0ff', glowIntensity: 0.6, top: height * 0.25, right: 20 },
    { icon: Triangle, size: 23, color: '#5f27cd', glowIntensity: 0.9, top: height * 0.45, right: 15 },
    { icon: Circle, size: 27, color: '#00d2d3', glowIntensity: 0.7, top: height * 0.65, right: 25 },
    
    // bottom edge shapes
    { icon: X, size: 22, color: '#ff6348', glowIntensity: 0.5, bottom: 100, left: 40 },
    { icon: Square, size: 26, color: '#2ed573', glowIntensity: 0.8, bottom: 80, right: 50 },
    { icon: Triangle, size: 24, color: '#ffa502', glowIntensity: 0.6, bottom: 120, left: width * 0.6 },
    { icon: Circle, size: 21, color: '#3742fa', glowIntensity: 0.9, bottom: 60, left: width * 0.2 },
  ];

  return (
    <View style={styles.container}>
      {shapes.map((shape, index) => (
        <GeoShape
          key={index}
          icon={shape.icon}
          size={shape.size}
          color={shape.color}
          glowIntensity={shape.glowIntensity}
          top={shape.top}
          left={shape.left}
          right={shape.right}
          bottom={shape.bottom}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  shapeContainer: {
    opacity: 0.3,
  },
});