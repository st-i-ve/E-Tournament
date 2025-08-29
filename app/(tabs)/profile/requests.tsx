import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Check, UserPlus, UserMinus, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { FriendRequestWithUser } from '@/types/firebase';

// TODO: Firebase - Replace with real friend requests data
const mockIncomingRequests: FriendRequestWithUser[] = [
  {
    id: 'req1',
    fromUserId: 'user1',
    toUserId: 'currentUser',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    updatedAt: new Date(Date.now() - 3600000),
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
    id: 'req2',
    fromUserId: 'user2',
    toUserId: 'currentUser',
    status: 'pending',
    createdAt: new Date(Date.now() - 7200000), // 2 hours ago
    updatedAt: new Date(Date.now() - 7200000),
    fromUser: {
      uid: 'user2',
      email: 'sarah.wilson@example.com',
      displayName: 'Sarah Wilson',
      username: 'sarahw',
      profilePicture: null,
      isOnline: false,
      lastSeen: new Date(Date.now() - 1800000), // 30 min ago
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
];

const mockOutgoingRequests: FriendRequestWithUser[] = [
  {
    id: 'req3',
    fromUserId: 'currentUser',
    toUserId: 'user3',
    status: 'pending',
    createdAt: new Date(Date.now() - 1800000), // 30 min ago
    updatedAt: new Date(Date.now() - 1800000),
    toUser: {
      uid: 'user3',
      email: 'mike.brown@example.com',
      displayName: 'Mike Brown',
      username: 'mikeb',
      profilePicture: null,
      isOnline: true,
      lastSeen: new Date(),
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

export default function RequestsPage() {
  const [incomingRequests, setIncomingRequests] =
    useState(mockIncomingRequests);
  const [outgoingRequests, setOutgoingRequests] =
    useState(mockOutgoingRequests);
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing'>(
    'incoming'
  );

  // TODO: Firebase - Implement accept friend request
  const handleAcceptRequest = async (requestId: string) => {
    Alert.alert('Friend Request Accepted', 'You are now friends!', [
      { text: 'OK' },
    ]);
    setIncomingRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  // TODO: Firebase - Implement decline friend request
  const handleDeclineRequest = async (requestId: string) => {
    Alert.alert(
      'Friend Request Declined',
      'The friend request has been declined.',
      [{ text: 'OK' }]
    );
    setIncomingRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  // TODO: Firebase - Implement cancel outgoing request
  const handleCancelRequest = async (requestId: string) => {
    Alert.alert(
      'Request Cancelled',
      'Your friend request has been cancelled.',
      [{ text: 'OK' }]
    );
    setOutgoingRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const renderIncomingRequest = (request: FriendRequestWithUser) => (
    <View key={request.id} style={styles.requestCard}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: request.fromUser.isOnline
                  ? '#22c55e'
                  : '#6b7280',
              },
            ]}
          >
            <Text style={styles.avatarText}>
              {request.fromUser.displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          {request.fromUser.isOnline && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.userDetails}>
          <Text style={styles.userName}>{request.fromUser.displayName}</Text>
          <Text style={styles.userUsername}>@{request.fromUser.username}</Text>
          <Text style={styles.requestTime}>
            {formatTimeAgo(request.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAcceptRequest(request.id)}
        >
          <Check color="#ffffff" size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => handleDeclineRequest(request.id)}
        >
          <X color="#ffffff" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOutgoingRequest = (request: FriendRequestWithUser) => (
    <View key={request.id} style={styles.requestCard}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: request.toUser!.isOnline
                  ? '#22c55e'
                  : '#6b7280',
              },
            ]}
          >
            <Text style={styles.avatarText}>
              {request.toUser!.displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          {request.toUser!.isOnline && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.userDetails}>
          <Text style={styles.userName}>{request.toUser!.displayName}</Text>
          <Text style={styles.userUsername}>@{request.toUser!.username}</Text>
          <View style={styles.pendingContainer}>
            <Clock color="#f59e0b" size={14} />
            <Text style={styles.pendingText}>
              Pending • {formatTimeAgo(request.createdAt)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => handleCancelRequest(request.id)}
      >
        <UserMinus color="#ef4444" size={18} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'incoming' && styles.activeTab]}
          onPress={() => setActiveTab('incoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'incoming' && styles.activeTabText,
            ]}
          >
            Incoming ({incomingRequests.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'outgoing' && styles.activeTab]}
          onPress={() => setActiveTab('outgoing')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'outgoing' && styles.activeTabText,
            ]}
          >
            Outgoing ({outgoingRequests.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'incoming' ? (
          <View style={styles.requestsSection}>
            {incomingRequests.length > 0 ? (
              incomingRequests.map(renderIncomingRequest)
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No incoming requests</Text>
                <Text style={styles.emptyStateSubtext}>
                  When someone sends you a friend request, it will appear here
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.requestsSection}>
            {outgoingRequests.length > 0 ? (
              outgoingRequests.map(renderOutgoingRequest)
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No outgoing requests</Text>
                <Text style={styles.emptyStateSubtext}>
                  Friend requests you send will appear here
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#22c55e',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  requestsSection: {
    marginTop: 20,
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
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
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  userUsername: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  requestTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 4,
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pendingText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#f59e0b',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#22c55e',
    padding: 10,
    borderRadius: 8,
  },
  declineButton: {
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#374151',
    padding: 10,
    borderRadius: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
