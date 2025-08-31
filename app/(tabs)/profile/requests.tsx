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
import { Check, X, UserPlus, UserMinus, ChevronLeft, Timer } from 'lucide-react-native';
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
          <Check color="#4DBB21FF" size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => handleDeclineRequest(request.id)}
        >
          <X color="#FF5F5FFF" size={18} />
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
            <Timer color="#f59e0b" size={14} />
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
            <Text style={styles.headerTitle}>Friend Requests</Text>
          </View>
        </View>

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

        <View style={styles.content}>
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
    marginTop:20,
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
  requestsSection: {
    marginTop: 20,
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1f2937',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
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
  requestTime: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 2,
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
  actionButtons: {
    flexDirection: 'row',
    gap: 1,
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
    backgroundColor: '#6E1515FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
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
