import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  User,
  Trophy,
  Target,
  TrendingUp,
  Award,
  Users,
  UserPlus,
  Star,
  Gamepad2,
  MessageCircle,
} from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';
import CountUp from '@/components/CountUp';
import { router } from 'expo-router';
import { FriendProfile } from '@/types/friend';

// mock friend data - replace with real data from route params
const mockFriendData: FriendProfile = {
  id: 'friend1',
  displayName: 'Alex Johnson',
  username: 'alexj',
  isOnline: true,
  teamName: 'Manchester United',
  profilePicture: null,
  gameStats: {
    totalGoals: 47,
    tournaments: 12,
    winRate: 73,
    gamesPlayed: 89,
    gamesWon: 65,
    shotAccuracy: 82,
    passAccuracy: 91,
    currentStreak: 4,
    bestStreak: 12,
  },
  favoriteGames: [
    { name: 'FIFA 24', hoursPlayed: 156, skillLevel: 'Expert' },
    { name: 'eFootball', hoursPlayed: 89, skillLevel: 'Advanced' },
    { name: 'Football Manager', hoursPlayed: 234, skillLevel: 'Expert' },
  ],
  playStyle: {
    position: 'Midfielder',
    strengths: ['Ball Control', 'Passing', 'Vision'],
    weaknesses: ['Pace', 'Finishing'],
    preferredFormation: '4-3-3',
  },
  achievements: [
    { title: 'Goal Machine', description: '50+ goals scored', icon: Target },
    { title: 'Assist King', description: '30+ assists provided', icon: Users },
    { title: 'Tournament Winner', description: 'Won 5 tournaments', icon: Trophy },
    { title: 'Consistency Master', description: '10+ game win streak', icon: Award },
  ],
  friends: [
    {
      id: 'mutual1',
      displayName: 'Sarah Wilson',
      username: 'sarahw',
      isOnline: true,
      isMutual: true,
    },
    {
      id: 'mutual2',
      displayName: 'Mike Brown',
      username: 'mikeb',
      isOnline: false,
      isMutual: false,
    },
    {
      id: 'mutual3',
      displayName: 'Emma Davis',
      username: 'emmad',
      isOnline: true,
      isMutual: false,
    },
  ],
  peerRatings: {
    overall: 4.3,
    teamwork: 4.5,
    sportsmanship: 4.8,
    skill: 4.1,
    communication: 4.0,
    totalRatings: 23,
  },
};

export default function FriendProfilePage() {
  const [friend] = useState(mockFriendData);

  const handleSendFriendRequest = (friendId: string, friendName: string) => {
    Alert.alert(
      'Friend Request Sent',
      `Friend request sent to ${friendName}!`,
      [{ text: 'OK' }]
    );
  };

  const handleSendMessage = () => {
    Alert.alert(
      'Message',
      `Start a conversation with ${friend.displayName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Message', onPress: () => {} },
      ]
    );
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={12} color="#22c55e" fill="#22c55e" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={12} color="#22c55e" fill="#22c55e" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={12} color="#6b7280" />
      );
    }

    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* geometric background elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View
          style={[
            styles.triangle,
            { top: 200, right: 80, transform: [{ rotate: '12deg' }] },
          ]}
        />
        <View style={[styles.triangle, { bottom: 200, left: 100 }]} />
        <View
          style={[
            styles.circle,
            { top: 150, left: 120, width: 48, height: 48 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { bottom: 250, right: 100, width: 32, height: 32 },
          ]}
        />
        <View
          style={[styles.circle, { top: 400, left: 80, width: 24, height: 24 }]}
        />
        <View
          style={[
            styles.rectangle,
            { top: 300, right: 40, width: 48, height: 32 },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            { bottom: 80, left: 200, width: 32, height: 48 },
          ]}
        />
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#22c55e" size={20} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{friend.displayName}</Text>
            <Text style={styles.headerSubtitle}>@{friend.username}</Text>
          </View>
          <TouchableOpacity
            style={styles.messageButton}
            onPress={handleSendMessage}
          >
            <MessageCircle color="#22c55e" size={20} />
          </TouchableOpacity>
        </View>

        {/* user info */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <View
              style={[
                styles.userAvatar,
                { backgroundColor: friend.isOnline ? '#22c55e' : '#6b7280' },
              ]}
            >
              <Text style={styles.userAvatarText}>
                {friend.displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
            {friend.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{friend.displayName}</Text>
            <Text style={styles.userTeam}>{friend.teamName}</Text>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: friend.isOnline ? '#22c55e' : '#6b7280',
                  },
                ]}
              />
              <Text style={styles.statusText}>
                {friend.isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.lineSeparator} />

        {/* game stats overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Performance Stats</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <CountUp
                end={friend.gameStats.totalGoals}
                duration={1500}
                style={styles.statValue}
              />
              <Text style={styles.statLabel}>Goals</Text>
            </View>
            <View style={styles.statCard}>
              <CountUp
                end={friend.gameStats.tournaments}
                duration={1500}
                style={styles.statValue}
              />
              <Text style={styles.statLabel}>Tournaments</Text>
            </View>
            <View style={styles.statCard}>
              <CountUp
                end={friend.gameStats.winRate}
                duration={1500}
                suffix="%"
                style={styles.statValue}
              />
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
          </View>
        </View>

        <View style={styles.lineSeparator} />

        {/* accuracy stats */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Accuracy & Precision</Text>
          </View>
          <View style={styles.accuracyGrid}>
            <View style={styles.accuracyCard}>
              <Text style={styles.accuracyValue}>
                {friend.gameStats.shotAccuracy}%
              </Text>
              <Text style={styles.accuracyLabel}>Shot Accuracy</Text>
            </View>
            <View style={styles.accuracyCard}>
              <Text style={styles.accuracyValue}>
                {friend.gameStats.passAccuracy}%
              </Text>
              <Text style={styles.accuracyLabel}>Pass Accuracy</Text>
            </View>
          </View>
        </View>

        <View style={styles.lineSeparator} />

        {/* favorite games */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Gamepad2 color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Favorite Games</Text>
          </View>
          <View style={styles.gamesList}>
            {friend.favoriteGames.map((game, index) => (
              <View key={index} style={styles.gameCard}>
                <View style={styles.gameInfo}>
                  <Text style={styles.gameName}>{game.name}</Text>
                  <Text style={styles.gameDetails}>
                    {game.hoursPlayed}h played • {game.skillLevel}
                  </Text>
                </View>
                <Badge
                  variant="outline"
                  style={styles.skillBadge}
                  textStyle={styles.skillBadgeText}
                >
                  {game.skillLevel}
                </Badge>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.lineSeparator} />

        {/* play style */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Play Style</Text>
          </View>
          <View style={styles.playStyleContainer}>
            <View style={styles.playStyleItem}>
              <Text style={styles.playStyleLabel}>Position</Text>
              <Text style={styles.playStyleValue}>{friend.playStyle.position}</Text>
            </View>
            <View style={styles.playStyleItem}>
              <Text style={styles.playStyleLabel}>Formation</Text>
              <Text style={styles.playStyleValue}>
                {friend.playStyle.preferredFormation}
              </Text>
            </View>
            <View style={styles.playStyleItem}>
              <Text style={styles.playStyleLabel}>Strengths</Text>
              <View style={styles.tagsContainer}>
                {friend.playStyle.strengths.map((strength, index) => (
                  <Badge
                    key={index}
                    style={styles.strengthTag}
                    textStyle={styles.strengthTagText}
                  >
                    {strength}
                  </Badge>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.lineSeparator} />

        {/* peer ratings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Star color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Peer Ratings</Text>
          </View>
          <View style={styles.ratingsContainer}>
            <View style={styles.overallRating}>
              <Text style={styles.overallRatingValue}>
                {friend.peerRatings.overall.toFixed(1)}
              </Text>
              <View style={styles.starsContainer}>
                {renderStarRating(friend.peerRatings.overall)}
              </View>
              <Text style={styles.ratingsCount}>
                Based on {friend.peerRatings.totalRatings} ratings
              </Text>
            </View>
            <View style={styles.ratingBreakdown}>
              {Object.entries(friend.peerRatings)
                .filter(([key]) => !['overall', 'totalRatings'].includes(key))
                .map(([category, rating]) => (
                  <View key={category} style={styles.ratingItem}>
                    <Text style={styles.ratingCategory}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                    <View style={styles.ratingStars}>
                      {renderStarRating(rating as number)}
                    </View>
                    <Text style={styles.ratingValue}>
                      {(rating as number).toFixed(1)}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </View>

        <View style={styles.lineSeparator} />

        {/* friends list */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Friends ({friend.friends.length})</Text>
          </View>
          <View style={styles.friendsList}>
            {friend.friends.map((friendItem) => (
              <View key={friendItem.id} style={styles.friendCard}>
                <View style={styles.friendInfo}>
                  <View style={styles.friendAvatarContainer}>
                    <View
                      style={[
                        styles.friendAvatar,
                        {
                          backgroundColor: friendItem.isOnline
                            ? '#22c55e'
                            : '#6b7280',
                        },
                      ]}
                    >
                      <Text style={styles.friendAvatarText}>
                        {friendItem.displayName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    {friendItem.isOnline && (
                      <View style={styles.friendOnlineIndicator} />
                    )}
                  </View>
                  <View style={styles.friendDetails}>
                    <Text style={styles.friendName}>{friendItem.displayName}</Text>
                    <Text style={styles.friendUsername}>@{friendItem.username}</Text>
                  </View>
                </View>
                {!friendItem.isMutual && (
                  <TouchableOpacity
                    style={styles.addFriendButton}
                    onPress={() =>
                      handleSendFriendRequest(
                        friendItem.id,
                        friendItem.displayName
                      )
                    }
                  >
                    <UserPlus color="#22c55e" size={16} />
                  </TouchableOpacity>
                )}
                {friendItem.isMutual && (
                  <Badge
                    style={styles.mutualBadge}
                    textStyle={styles.mutualBadgeText}
                  >
                    Mutual
                  </Badge>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Achievements</Text>
          </View>
          <View style={styles.achievementsList}>
            {friend.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <achievement.icon color="#22c55e" size={16} />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
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
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  circle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 50,
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
    paddingBottom: 8,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  headerSubtitle: {
    color: '#6b7280',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  messageButton: {
    padding: 8,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    zIndex: 10,
  },
  avatarContainer: {
    position: 'relative',
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22c55e',
    borderWidth: 3,
    borderColor: '#0a0a0a',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  userTeam: {
    color: '#22c55e',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  lineSeparator: {
    height: 1,
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#22c55e',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
    textAlign: 'center',
  },
  accuracyGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  accuracyCard: {
    flex: 1,
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  accuracyValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#22c55e',
  },
  accuracyLabel: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
    textAlign: 'center',
  },
  gamesList: {
    gap: 12,
  },
  gameCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  gameDetails: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  skillBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  skillBadgeText: {
    color: '#22c55e',
  },
  playStyleContainer: {
    gap: 16,
  },
  playStyleItem: {
    gap: 8,
  },
  playStyleLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  playStyleValue: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  strengthTag: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  strengthTagText: {
    color: '#22c55e',
  },
  ratingsContainer: {
    gap: 16,
  },
  overallRating: {
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  overallRatingValue: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#22c55e',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  ratingsCount: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 8,
  },
  ratingBreakdown: {
    gap: 12,
  },
  ratingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  ratingCategory: {
    color: '#e5e7eb',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
    marginHorizontal: 12,
  },
  ratingValue: {
    color: '#22c55e',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    minWidth: 30,
    textAlign: 'right',
  },
  friendsList: {
    gap: 12,
  },
  friendCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  friendAvatarContainer: {
    position: 'relative',
  },
  friendAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendAvatarText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  friendOnlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#1f2937',
  },
  friendDetails: {
    marginLeft: 12,
    flex: 1,
  },
  friendName: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  friendUsername: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  addFriendButton: {
    padding: 8,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  mutualBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  mutualBadgeText: {
    color: '#22c55e',
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  achievementIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementInfo: {
    marginLeft: 12,
    flex: 1,
  },
  achievementTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  achievementDescription: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  bottomSpacing: {
    height: 80,
  },
});