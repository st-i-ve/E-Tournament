import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Check, Timer, Gamepad2, Trophy, Users, X, ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { GameInviteWithUser } from '@/types/firebase';

// TODO: Firebase - Replace with real game invites data
const mockGameInvites: GameInviteWithUser[] = [
  {
    id: 'invite1',
    fromUserId: 'user1',
    toUserId: 'currentUser',
    gameType: 'FIFA 24',
    tournamentId: 'tournament1',
    status: 'pending',
    expiresAt: new Date(Date.now() + 300000), // 5 minutes from now
    createdAt: new Date(Date.now() - 60000), // 1 minute ago
    updatedAt: new Date(Date.now() - 60000),
    fromUser: {
      uid: 'user1',
      email: 'alex.johnson@example.com',
      displayName: 'Alex Johnson',
      username: 'alexj',
      profilePicture: null,
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      friends: [],
      blockedUsers: [],
      gameStats: {
        gamesPlayed: 42,
        gamesWon: 28,
        winRate: 67,
        currentStreak: 2,
        bestStreak: 9,
      },
    },
  },
  {
    id: 'invite2',
    fromUserId: 'user2',
    toUserId: 'currentUser',
    gameType: 'Call of Duty',
    tournamentId: 'tournament2',
    status: 'pending',
    expiresAt: new Date(Date.now() + 180000), // 3 minutes from now
    createdAt: new Date(Date.now() - 120000), // 2 minutes ago
    updatedAt: new Date(Date.now() - 120000),
    fromUser: {
      uid: 'user2',
      email: 'sarah.wilson@example.com',
      displayName: 'Sarah Wilson',
      username: 'sarahw',
      profilePicture: null,
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      friends: [],
      blockedUsers: [],
      gameStats: {
        gamesPlayed: 18,
        gamesWon: 15,
        winRate: 83,
        currentStreak: 6,
        bestStreak: 8,
      },
    },
  },
  {
    id: 'invite3',
    fromUserId: 'user3',
    toUserId: 'currentUser',
    gameType: 'Rocket League',
    tournamentId: null, // casual game
    status: 'pending',
    expiresAt: new Date(Date.now() + 420000), // 7 minutes from now
    createdAt: new Date(Date.now() - 30000), // 30 seconds ago
    updatedAt: new Date(Date.now() - 30000),
    fromUser: {
      uid: 'user3',
      email: 'mike.brown@example.com',
      displayName: 'Mike Brown',
      username: 'mikeb',
      profilePicture: null,
      isOnline: false,
      lastSeen: new Date(Date.now() - 300000), // 5 min ago
      createdAt: new Date(),
      updatedAt: new Date(),
      friends: [],
      blockedUsers: [],
      gameStats: {
        gamesPlayed: 31,
        gamesWon: 19,
        winRate: 61,
        currentStreak: 1,
        bestStreak: 5,
      },
    },
  },
];

export default function InvitesPage() {
  const [gameInvites, setGameInvites] = useState(mockGameInvites);
  const [currentTime, setCurrentTime] = useState(new Date());

  // update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // remove expired invites
      setGameInvites((prev) =>
        prev.filter((invite) => invite.expiresAt > new Date())
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // TODO: Firebase - Implement accept game invite
  const handleAcceptInvite = async (inviteId: string) => {
    const invite = gameInvites.find((inv) => inv.id === inviteId);
    if (!invite) return;

    Alert.alert(
      'Game Invite Accepted',
      `You've accepted ${invite.fromUser.displayName}'s invite to play ${invite.gameType}!`,
      [{ text: 'OK' }]
    );
    setGameInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
  };

  // TODO: Firebase - Implement decline game invite
  const handleDeclineInvite = async (inviteId: string) => {
    Alert.alert('Game Invite Declined', 'The game invite has been declined.', [
      { text: 'OK' },
    ]);
    setGameInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
  };

  const formatCountdown = (expiresAt: Date) => {
    const timeLeft = expiresAt.getTime() - currentTime.getTime();

    if (timeLeft <= 0) {
      return 'Expired';
    }

    const minutes = Math.floor(timeLeft / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getGameIcon = (gameType: string) => {
    // i could add specific game icons here based on game type
    return <Gamepad2 color="#22c55e" size={20} />;
  };

  const renderGameInvite = (invite: GameInviteWithUser) => {
    const timeLeft = invite.expiresAt.getTime() - currentTime.getTime();
    const isExpiring = timeLeft <= 60000; // less than 1 minute
    const isExpired = timeLeft <= 0;

    if (isExpired) return null;

    return (
      <View
        key={invite.id}
        style={[styles.inviteCard, isExpiring && styles.expiringCard]}
      >
        <View style={styles.inviteHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: invite.fromUser.isOnline
                      ? '#22c55e'
                      : '#6b7280',
                  },
                ]}
              >
                <Text style={styles.avatarText}>
                  {invite.fromUser.displayName.charAt(0).toUpperCase()}
                </Text>
              </View>
              {invite.fromUser.isOnline && (
                <View style={styles.onlineIndicator} />
              )}
            </View>

            <View style={styles.userDetails}>
              <Text style={styles.userName}>{invite.fromUser.displayName}</Text>
              <Text style={styles.inviteText}>
                wants to play {invite.gameType}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.countdownContainer,
              isExpiring && styles.expiringCountdown,
            ]}
          >
            <Timer color={isExpiring ? '#ef4444' : '#f59e0b'} size={16} />
            <Text
              style={[
                styles.countdownText,
                isExpiring && styles.expiringCountdownText,
              ]}
            >
              {formatCountdown(invite.expiresAt)}
            </Text>
          </View>
        </View>

        <View style={styles.gameInfo}>
          <View style={styles.gameDetails}>
            {getGameIcon(invite.gameType)}
            <Text style={styles.gameType}>{invite.gameType}</Text>
            {invite.tournamentId ? (
              <View style={styles.tournamentBadge}>
                <Trophy color="#f59e0b" size={14} />
                <Text style={styles.tournamentText}>Tournament</Text>
              </View>
            ) : (
              <View style={styles.casualBadge}>
                <Users color="#6b7280" size={14} />
                <Text style={styles.casualText}>Casual</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.declineButton}
            onPress={() => handleDeclineInvite(invite.id)}
          >
            <X color="#ffffff" size={18} />
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => handleAcceptInvite(invite.id)}
          >
            <Check color="#ffffff" size={18} />
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Geometric background elements */}
      <View style={styles.backgroundElements}>
        {/* Triangles */}
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View style={[styles.triangle, { top: 200, right: 80, transform: [{ rotate: '12deg' }] }]} />
        <View style={[styles.triangle, { bottom: 200, left: 100 }]} />
        
        {/* Circles */}
        <View style={[styles.circle, { top: 150, left: 120, width: 48, height: 48 }]} />
        <View style={[styles.circle, { bottom: 250, right: 100, width: 32, height: 32 }]} />
        <View style={[styles.circle, { top: 400, left: 80, width: 24, height: 24 }]} />
        
        {/* Rectangles */}
        <View style={[styles.rectangle, { top: 300, right: 40, width: 48, height: 32 }]} />
        <View style={[styles.rectangle, { bottom: 80, left: 200, width: 32, height: 48 }]} />
        
        {/* Lines */}
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#22c55e" size={20} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Game Invites</Text>
          </View>
        </View>

        <View style={styles.content}>
        <View style={styles.invitesSection}>
          {gameInvites.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>
                Active Invites ({gameInvites.length})
              </Text>
              {gameInvites.map(renderGameInvite)}
            </>
          ) : (
            <View style={styles.emptyState}>
              <Gamepad2 color="#6b7280" size={48} />
              <Text style={styles.emptyStateText}>No game invites</Text>
              <Text style={styles.emptyStateSubtext}>
                When friends invite you to play games, they'll appear here
              </Text>
            </View>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>How it works</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              • Game invites expire after 10 minutes
            </Text>
            <Text style={styles.infoText}>
              • Accept invites to start playing immediately
            </Text>
            <Text style={styles.infoText}>
              • Tournament invites give you ranking points
            </Text>
            <Text style={styles.infoText}>• Casual games are just for fun</Text>
          </View>
        </View>
        </View>
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
  scrollView: {
    flex: 1,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },

  content: {
    paddingHorizontal: 16,
  },
  invitesSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  inviteCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  expiringCard: {
    borderColor: '#ef4444',
    backgroundColor: '#1f1f2e',
  },
  inviteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  onlineIndicator: {
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
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  inviteText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 2,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  expiringCountdown: {
    backgroundColor: '#7f1d1d',
  },
  countdownText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#f59e0b',
    marginLeft: 4,
  },
  expiringCountdownText: {
    color: '#ef4444',
  },
  gameInfo: {
    marginBottom: 16,
  },
  gameDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameType: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginLeft: 8,
    flex: 1,
  },
  tournamentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#451a03',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tournamentText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#f59e0b',
    marginLeft: 4,
  },
  casualBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  casualText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 8,
  },
  acceptButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 6,
  },
  declineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
  },
  declineButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  infoSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 8,
  },
});
