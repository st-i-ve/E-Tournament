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
        <View
          style={[
            styles.triangle,
            { top: 200, right: 80, transform: [{ rotate: '12deg' }] },
          ]}
        />
        <View
          style={[
            styles.circle,
            { top: 150, left: 120, width: 48, height: 48 },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            { top: 300, right: 40, width: 48, height: 32 },
          ]}
        />
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.friendsIcon}>
              <View style={styles.pierceCircle} />
              <View style={styles.pierceTriangle} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Friends</Text>
              <Text style={styles.headerSubtitle}>
                Connect with other players
              </Text>
              <Text style={styles.headerSubtitle}>
                lets see whose up for a match
              </Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                console.log('Game requests pressed');
                router.push('/friends/invites');
              }}
            >
              <Gamepad2 color="#9ca3af" size={18} />
              {pendingInvites > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>{pendingInvites}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
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
                  onPress={() => {
                    console.log('Primary button pressed');
                    setShowAddFriendModal(true);
                  }}
                  activeOpacity={0.8}
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
        onPress={() => {
          console.log('Floating button pressed');
          setShowAddFriendModal(true);
        }}
        activeOpacity={0.8}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 8,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 16,
  },
  friendsIcon: {
    width: 32,
    height: 32,
    marginTop: 4,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pierceCircle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#22c55e',
    borderRadius: 12,
  },
  pierceTriangle: {
    position: 'absolute',
    width: 1,
    height: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#22c55e',
    top: 20,
    left: 6,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    lineHeight: 20,
  },
  headerSubtitle: {
    color: '#6b7280',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
    lineHeight: 14,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  actionButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontFamily: 'Inter-Bold',
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
    backgroundColor: 'transparent',
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
    elevation: 10,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});