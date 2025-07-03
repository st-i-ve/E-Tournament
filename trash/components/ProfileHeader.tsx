import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Star, Award, ChevronRight } from 'lucide-react-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ProfileHeaderProps {
  username: string;
  avatar: string;
  rating: number;
  peerRating: number;
  matchesPlayed?: number;
  onPress?: () => void;
}

export default function ProfileHeader({
  username,
  avatar,
  rating,
  peerRating,
  matchesPlayed,
  onPress,
}: ProfileHeaderProps) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <GlassCard style={styles.container}>
        <LinearGradient
          colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.gradientBackground}
        />

        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100, type: 'spring' }}
          style={styles.content}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View style={styles.ratingBadge}>
              <Award size={16} color="#00FF88" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>

          <View style={styles.userInfo}>
            <View style={styles.usernameRow}>
              <Text style={styles.username} numberOfLines={1}>
                {username}
              </Text>
              {onPress && <ChevronRight size={20} color="#00FF88" />}
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Star size={16} color="#FFAA00" />
                <Text style={styles.statText}>
                  {peerRating.toFixed(1)} peer rating
                </Text>
              </View>

              {matchesPlayed !== undefined && (
                <View style={styles.statItem}>
                  <Text style={styles.statText}>
                    {matchesPlayed} match{matchesPlayed !== 1 ? 'es' : ''}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </MotiView>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
    bottom: -6,
    right: -6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#00FF88',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  ratingText: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  statsContainer: {
    marginTop: 12,
    gap: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 15,
    color: '#E5E7EB',
  },
});
{/* <ProfileHeader
  username="PlayerOne"
  avatar="https://example.com/avatar.jpg"
  rating={4.8}
  peerRating={4.5}
  matchesPlayed={42}
  onPress={() => navigation.navigate('Profile')}
/>; */}