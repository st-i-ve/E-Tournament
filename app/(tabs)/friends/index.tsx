import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Gamepad2, 
  MessageSquare,
  QrCode,
  Search
} from 'lucide-react-native';
import { QuickActionButton } from '@/components/QuickActionButton';
import { Separator } from '@/components/ui/separator';
import { AddFriendModal } from '@/components/AddFriendModal';
import type { FriendUser, FriendListItem } from '@/types/firebase';

export default function FriendsPage() {
  const [friends, setFriends] = useState<FriendListItem[]>([]);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [pendingInvites, setPendingInvites] = useState(0);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);

  // TODO: replace with firebase real-time listeners
  useEffect(() => {
    loadMockFriends();
    // TODO: firebase - listen to friends collection changes
    // TODO: firebase - listen to friend requests count
    // TODO: firebase - listen to game invites count
  }, []);

  const loadMockFriends = () => {
    // i created mock data to demonstrate the ui structure
    const mockFriends: FriendListItem[] = [
      {
        user: {
          id: '1',
          username: 'alex_gamer',
          userCode: '123456',
          email: 'alex@example.com',
          isOnline: true,
          lastSeen: new Date(),
          friends: [],
          incomingFriendRequests: [],
          outgoingFriendRequests: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          displayName: 'Alex',
          gameStatus: 'available'
        },
        canInvite: true,
        lastActivity: 'Online now'
      },
      {
        user: {
          id: '2',
          username: 'sarah_pro',
          userCode: '789012',
          email: 'sarah@example.com',
          isOnline: true,
          lastSeen: new Date(),
          friends: [],
          incomingFriendRequests: [],
          outgoingFriendRequests: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          displayName: 'Sarah',
          gameStatus: 'in-game'
        },
        canInvite: false,
        lastActivity: 'In game'
      },
      {
        user: {
          id: '3',
          username: 'mike_legend',
          userCode: '345678',
          email: 'mike@example.com',
          isOnline: false,
          lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          friends: [],
          incomingFriendRequests: [],
          outgoingFriendRequests: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          displayName: 'Mike',
          gameStatus: 'away'
        },
        canInvite: false,
        lastActivity: '30 minutes ago'
      }
    ];

    setFriends(mockFriends);
    setPendingRequests(2); // mock pending requests
    setPendingInvites(1); // mock pending invites
  };

  const handleInviteFriend = (friendId: string) => {
    // TODO: firebase - open invite modal with friend data
    router.push({
      pathname: '/(tabs)/profile/invite-modal',
      params: { friendId }
    });
  };

  const renderFriendItem = ({ item }: { item: FriendListItem }) => {
    const { user, canInvite } = item;
    const statusColor = user.isOnline ? '#22c55e' : '#6b7280';

    return (
      <TouchableOpacity style={styles.friendItem}>
        <View style={styles.friendInfo}>
          {/* avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.displayName.charAt(0).toUpperCase()}
            </Text>
            {user.isOnline && (
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            )}
          </View>

          {/* friend details */}
          <View style={styles.friendDetails}>
            <Text style={styles.friendUsername}>@{user.username}</Text>
          </View>
        </View>

        {/* action buttons */}
        <View style={styles.friendActions}>
          <TouchableOpacity style={styles.actionButton}>
            <MessageSquare size={18} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, !canInvite && styles.disabledButton]}
            onPress={() => canInvite && handleInviteFriend(user.id)}
            disabled={!canInvite}
          >
            <Gamepad2 size={18} color={canInvite ? '#22c55e' : '#6b7280'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* geometric background elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View style={[styles.triangle, { top: 200, right: 80, transform: [{ rotate: '12deg' }] }]} />
        <View style={[styles.circle, { top: 150, left: 120, width: 48, height: 48 }]} />
        <View style={[styles.rectangle, { top: 300, right: 40, width: 48, height: 32 }]} />
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Users size={24} color="#22c55e" />
              <Text style={styles.pageTitle}>Friends</Text>
            </View>
            <Text style={styles.subtitle}>
              {friends.length} friends
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* game invites action */}
          <View style={styles.section}>
            <View style={styles.actionsGrid}>
              <QuickActionButton
                icon={Gamepad2}
                title="Game Invites"
                subtitle={`${pendingInvites} waiting`}
                onPress={() => router.push('/friends/invites')}
                badge={pendingInvites > 0 ? pendingInvites.toString() : undefined}
              />
            </View>
          </View>

          <Separator style={styles.separator} />

          {/* friends list */}
          {friends.length > 0 && (
            <View style={styles.section}>
              <FlatList
                data={friends}
                renderItem={renderFriendItem}
                keyExtractor={(item) => item.user.id}
                scrollEnabled={false}
                style={styles.friendsList}
              />
            </View>
          )}

          {/* empty state */}
          {friends.length === 0 && (
            <View style={styles.emptyState}>
              <Users size={48} color="#6b7280" />
              <Text style={styles.emptyStateTitle}>No Friends Yet</Text>
              <Text style={styles.emptyStateDescription}>
                Start building your gaming network by adding friends
              </Text>
              <View style={styles.emptyStateActions}>
                <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => setShowAddFriendModal(true)}
              >
                <Text style={styles.primaryButtonText}>Add Friend</Text>
              </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* floating add friend button */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => setShowAddFriendModal(true)}
      >
        <UserPlus size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* add friend modal */}
      <AddFriendModal 
        visible={showAddFriendModal}
        onClose={() => setShowAddFriendModal(false)}
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
    marginBottom: 8,
  },
  headerContent: {
    padding: 24,
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pageTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  section: {
    marginBottom: 24,
  },

  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  separator: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    marginVertical: 8,
  },
  friendsList: {
    gap: 8,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    position: 'relative',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0a0a0a',
  },
  friendDetails: {
    marginLeft: 12,
    flex: 1,
  },
  friendUsername: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  friendActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  disabledButton: {
    opacity: 0.5,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  emptyStateActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  bottomSpacing: {
    height: 80,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});