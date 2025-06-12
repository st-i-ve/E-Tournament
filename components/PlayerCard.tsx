import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Crown, Shield } from 'lucide-react-native';

interface PlayerCardProps {
  position: string;
  rating: number;
  isStar: boolean;
  onPress: () => void;
}

export default function PlayerCard({ position, rating, isStar, onPress }: PlayerCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isStar) {
      const shimmerAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      shimmerAnimation.start();
    }
  }, [isStar, shimmerAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: scaleAnim }] },
          isStar && styles.starContainer,
        ]}
      >
        <BlurView intensity={20} style={styles.blur}>
          <View style={[styles.card, isStar && styles.starCard]}>
            {isStar && (
              <Animated.View
                style={[
                  styles.shimmerOverlay,
                  { opacity: shimmerOpacity },
                ]}
              />
            )}
            
            <View style={styles.iconContainer}>
              {isStar ? (
                <Crown color="#00FF88" size={16} strokeWidth={2} />
              ) : (
                <Shield color="#666666" size={16} strokeWidth={2} />
              )}
            </View>
            
            <Text style={[styles.rating, isStar && styles.starRating]}>
              {rating}
            </Text>
            
            <Text style={[styles.position, isStar && styles.starPosition]}>
              {position}
            </Text>
          </View>
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  starContainer: {
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  blur: {
    flex: 1,
    borderRadius: 12,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  starCard: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderRadius: 12,
  },
  iconContainer: {
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  starRating: {
    color: '#00FF88',
  },
  position: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#888888',
    letterSpacing: 0.5,
  },
  starPosition: {
    color: '#00FF88',
  },
});