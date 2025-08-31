import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { StatRowProps } from '@/types/matchStats';

export const StatRow: React.FC<StatRowProps> = ({ 
  icon: Icon, 
  title, 
  homeValue, 
  awayValue, 
  unit = '', 
  delay = 0 
}) => {
  const [slideAnimation] = useState(new Animated.Value(50));
  const [opacityAnimation] = useState(new Animated.Value(0));
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 600,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 600,
        delay: delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay]);
  
  return (
    <Animated.View 
      style={[
        styles.statRow,
        {
          opacity: opacityAnimation,
          transform: [{ translateY: slideAnimation }],
        }
      ]}
    >
      <View style={styles.statLeft}>
        <Text style={styles.statValue}>
          {homeValue}{unit}
        </Text>
      </View>
      
      <View style={styles.statCenter}>
        <Icon size={20} color="#22c55e" />
        <Text style={styles.statLabel}>{title}</Text>
      </View>
      
      <View style={styles.statRight}>
        <Text style={styles.statValue}>
          {awayValue}{unit}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent:'center'
  },
  statLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  statCenter: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
});