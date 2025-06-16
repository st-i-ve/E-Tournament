import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Star, Award } from 'lucide-react-native-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';

interface ProfileHeaderProps {
  username: string;
  avatar: string;
  rating: number;
  peerRating: number;
}

export default function ProfileHeader({
  username,
  avatar,
  rating,
  peerRating,
}: ProfileHeaderProps) {
  return (
    <GlassCard style={styles.container} sliced>
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 100 }}
        style={styles.content}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.ratingBadge}>
            <Award size={16} color="#00FF88" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.peerRatingContainer}>
            <Star size={16} color="#FFAA00" />
            <Text style={styles.peerRatingText}>
              {peerRating.toFixed(1)} peer rating
            </Text>
          </View>
        </View>
      </MotiView>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#00FF88',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c0c0c',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#00FF88',
    gap: 4,
  },
  ratingText: {
    color: '#00FF88',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  peerRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  peerRatingText: {
    fontSize: 16,
    color: '#cccccc',
  },
});
