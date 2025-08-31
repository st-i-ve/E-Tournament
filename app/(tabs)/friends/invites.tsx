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
import { Check, Timer, Gamepad2, Trophy, Users, X, ChevronLeft, UserMinus, Info } from 'lucide-react-native';
import { router } from 'expo-router';
import { GameInviteWithUser } from '@/types/firebase';
import { GameInviteModalInfo } from '../../../components/GameInviteModalInfo';

// TODO: Firebase - Replace with real game invites data
const mockReceivedInvites: GameInviteWithUser[] = [
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

const mockSentInvites: GameInviteWithUser[] = [
  {
    id: 'sent1',
    fromUserId: 'currentUser',
    toUserId: 'user4',
    gameType: 'FIFA 24',
    tournamentId: 'tournament3',
    status: 'pending',
    expiresAt: new Date(Date.now() + 240000), // 4 minutes from now
    createdAt: new Date(Date.now() - 90000), // 1.5 minutes ago
    updatedAt: new Date(Date.now() - 90000),
    toUser: {
      uid: 'user4',
      email: 'emma.davis@example.com',
      displayName: 'Emma Davis',
      username: 'emmad',
      profilePicture: null,
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      friends: [],
      blockedUsers: [],
      gameStats: {
        gamesPlayed: 25,
        gamesWon: 18,
        winRate: 72,
        currentStreak: 3,
        bestStreak: 7,
      },
    },
  },
  {
    id: 'sent2',
    fromUserId: 'currentUser',
    toUserId: 'user5',
    gameType: 'Rocket League',
    tournamentId: null,
    status: 'pending',
    expiresAt: new Date(Date.now() + 360000), // 6 minutes from now
    createdAt: new Date(Date.now() - 45000), // 45 seconds ago
    updatedAt: new Date(Date.now() - 45000),
    toUser: {
      uid: 'user5',
      email: 'james.wilson@example.com',
      displayName: 'James Wilson',
      username: 'jamesw',
      profilePicture: null,
      isOnline: false,
      lastSeen: new Date(Date.now() - 600000), // 10 min ago
      createdAt: new Date(),
      updatedAt: new Date(),
      friends: [],
      blockedUsers: [],
      gameStats: {
        gamesPlayed: 38,
        gamesWon: 22,
        winRate: 58,
        currentStreak: 0,
        bestStreak: 4,
      },
    },
  },
];

export default function InvitesPage() {
  const [receivedInvites, setReceivedInvites] = useState(mockReceivedInvites);
  const [sentInvites, setSentInvites] = useState(mockSentInvites);
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showInfoModal, setShowInfoModal] = useState(false);

  // update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // remove expired invites
      setReceivedInvites((prev) =>
        prev.filter((invite) => invite.expiresAt > new Date())
      );
      setSentInvites((prev) =>
        prev.filter((invite) => invite.expiresAt > new Date())
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // TODO: Firebase - Implement accept game invite
  const handleAcceptInvite = async (inviteId: string) => {
    const invite = receivedInvites.find((inv) => inv.id === inviteId);
    if (!invite) return;

    Alert.alert(
      'Game Invite Accepted',
      `You've accepted ${invite.fromUser.displayName}'s invite to play ${invite.gameType}!`,
      [{ text: 'OK' }]
    );
    setReceivedInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
  };

  // TODO: Firebase - Implement decline game invite
  const handleDeclineInvite = async (inviteId: string) => {
    Alert.alert('Game Invite Declined', 'The game invite has been declined.', [
      { text: 'OK' },
    ]);
    setReceivedInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
  };

  // TODO: Firebase - Implement cancel sent invite
  const handleCancelInvite = async (inviteId: string) => {
    Alert.alert(
      'Invite Cancelled',
      'Your game invite has been cancelled.',
      [{ text: 'OK' }]
    );
    setSentInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
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

  const renderReceivedInvite = (invite: GameInviteWithUser) => {
    const timeLeft = invite.expiresAt.getTime() - currentTime.getTime();
    const isExpiring = timeLeft <= 60000; // less than 1 minute
    const isExpired = timeLeft <= 0;

    if (isExpired) return null;

    return (
      <View
        key={invite.id}
        style={[styles.inviteCard, isExpiring && styles.expiringCard]}
      >
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

          <TouchableOpacity 
            style={styles.userDetails}
            onPress={() => {
              router.push({
                pathname: '/profile/friend-profile',
                params: {
                  friendId: invite.fromUser.uid,
                  friendData: JSON.stringify({
                    ...invite.fromUser,
                    teamName: 'FC Barcelona' // i added mock team data for consistency
                  })
                }
              });
            }}
          >
            <Text style={styles.userName}>{invite.fromUser.displayName}</Text>
            <Text style={styles.userUsername}>@{invite.fromUser.username}</Text>
            <View style={styles.gameInfo}>
              <View style={styles.gameDetails}>
                {invite.tournamentId ? (
                  <Trophy color="#f59e0b" size={14} />
                ) : (
                  <Users color="#49F751FF" size={14} />
                )}
              </View>
            </View>
          </TouchableOpacity>
         </View>

         <View style={styles.timerContainer}>
           <View
             style={[
               styles.countdownContainer,
               isExpiring && styles.expiringCountdown,
             ]}
           >
             <Timer color={isExpiring ? '#ef4444' : '#f59e0b'} size={12} />
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

         <View style={styles.actionButtons}>
           <TouchableOpacity
             style={styles.acceptButton}
             onPress={() => handleAcceptInvite(invite.id)}
           >
             <Check color="#4DBB21FF" size={18} />
           </TouchableOpacity>
           <TouchableOpacity
             style={styles.declineButton}
             onPress={() => handleDeclineInvite(invite.id)}
           >
             <X color="#FF5F5FFF" size={18} />
           </TouchableOpacity>
         </View>

      </View>
    );
  };

  const renderSentInvite = (invite: GameInviteWithUser) => {
    const timeLeft = invite.expiresAt.getTime() - currentTime.getTime();
    const isExpiring = timeLeft <= 60000; // less than 1 minute
    const isExpired = timeLeft <= 0;

    if (isExpired) return null;

    return (
      <View
        key={invite.id}
        style={[styles.inviteCard, isExpiring && styles.expiringCard]}
      >
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: invite.toUser!.isOnline
                    ? '#22c55e'
                    : '#6b7280',
                },
              ]}
            >
              <Text style={styles.avatarText}>
                {invite.toUser!.displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
            {invite.toUser!.isOnline && <View style={styles.onlineIndicator} />}
          </View>

          <TouchableOpacity 
            style={styles.userDetails}
            onPress={() => {
              router.push({
                pathname: '/profile/friend-profile',
                params: {
                  friendId: invite.toUser!.uid,
                  friendData: JSON.stringify({
                    ...invite.toUser!,
                    teamName: 'Real Madrid' // i added mock team data for consistency
                  })
                }
              });
            }}
          >
            <Text style={styles.userName}>{invite.toUser!.displayName}</Text>
            <Text style={styles.userUsername}>@{invite.toUser!.username}</Text>
            <View style={styles.gameInfo}>
              <View style={styles.gameDetails}>
                {invite.tournamentId ? (
                  <Trophy color="#f59e0b" size={14} />
                ) : (
                  <Users color="#49F751FF" size={14} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.timerContainer}>
          <View
            style={[
              styles.countdownContainer,
              isExpiring && styles.expiringCountdown,
            ]}
          >
            <Timer color={isExpiring ? '#ef4444' : '#f59e0b'} size={12} />
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

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelInvite(invite.id)}
          >
            <X color="#FF5F5FFF" size={18} />
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
          <TouchableOpacity 
            style={styles.infoButton}
            onPress={() => setShowInfoModal(true)}
          >
            <Info color="#22c55e" size={20} />
          </TouchableOpacity>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'received' && styles.activeTab]}
            onPress={() => setActiveTab('received')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'received' && styles.activeTabText,
              ]}
            >
              Received ({receivedInvites.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'sent' && styles.activeTab]}
            onPress={() => setActiveTab('sent')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'sent' && styles.activeTabText,
              ]}
            >
              Sent ({sentInvites.length})
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === 'received' ? (
            <View style={styles.invitesSection}>
              {receivedInvites.length > 0 ? (
                receivedInvites.map(renderReceivedInvite)
              ) : (
                <View style={styles.emptyState}>
                  <Gamepad2 color="#6b7280" size={48} />
                  <Text style={styles.emptyStateText}>No received invites</Text>
                  <Text style={styles.emptyStateSubtext}>
                    When friends invite you to play games, they'll appear here
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.invitesSection}>
              {sentInvites.length > 0 ? (
                sentInvites.map(renderSentInvite)
              ) : (
                <View style={styles.emptyState}>
                  <Gamepad2 color="#6b7280" size={48} />
                  <Text style={styles.emptyStateText}>No sent invites</Text>
                  <Text style={styles.emptyStateSubtext}>
                    Game invites you send will appear here
                  </Text>
                </View>
              )}
            </View>
          )}


        </View>
      </ScrollView>
      
      <GameInviteModalInfo 
        visible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
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
    marginTop: 20,
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

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#22c55e',
  },
  tabText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 16,
  },
  invitesSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 12,
  },
  inviteCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 10,
    paddingBottom: 40,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    position: 'relative',
    minHeight: 70,
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
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#1f2937',
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  userUsername: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tournamentIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  casualIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#37415100',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 4,
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pendingText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#f59e0b',
    marginLeft: 4,
  },
  expiringCountdown: {
    backgroundColor: '#7f1d1d',
  },
  countdownText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#f59e0b',
    marginLeft: 3,
  },
  expiringCountdownText: {
    color: '#ef4444',
  },
  gameInfo: {
    marginTop: 4,
  },
  gameDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  timerContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  sentActionButtons: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  acceptButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  declineButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 24,
    paddingHorizontal: 32,
  },
  emptyStateSubtext: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 6,
  },
});
