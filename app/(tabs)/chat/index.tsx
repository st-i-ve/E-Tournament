import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { MessageCircle, Users } from 'lucide-react-native';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  type: 'direct' | 'tournament';
  participantCount?: number;
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    lastMessage: 'Good game! Ready for the next match?',
    timestamp: '2m ago',
    unreadCount: 2,
    isOnline: true,
    type: 'direct',
  },
  {
    id: '2',
    name: 'FIFA Championship',
    lastMessage: 'Tournament starts in 30 minutes',
    timestamp: '5m ago',
    unreadCount: 0,
    isOnline: false,
    type: 'tournament',
    participantCount: 16,
  },
  {
    id: '3',
    name: 'Maria Santos',
    lastMessage: 'Thanks for the tips!',
    timestamp: '1h ago',
    unreadCount: 0,
    isOnline: true,
    type: 'direct',
  },
  {
    id: '4',
    name: 'Pro League Finals',
    lastMessage: 'Sarah: Let\'s discuss strategy',
    timestamp: '2h ago',
    unreadCount: 5,
    isOnline: false,
    type: 'tournament',
    participantCount: 8,
  },
  {
    id: '5',
    name: 'David Kim',
    lastMessage: 'See you in the tournament!',
    timestamp: '3h ago',
    unreadCount: 0,
    isOnline: false,
    type: 'direct',
  },
  {
    id: '6',
    name: 'Weekend Warriors',
    lastMessage: 'Mike: Who\'s ready for some action?',
    timestamp: '1d ago',
    unreadCount: 1,
    isOnline: false,
    type: 'tournament',
    participantCount: 12,
  },
];

const ChatListScreen = () => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      ['#ff6b6b', '#ee5a52'],
      ['#4ecdc4', '#44a08d'],
      ['#45b7d1', '#3498db'],
      ['#96ceb4', '#85c1a3'],
      ['#feca57', '#ff9f43'],
      ['#ff9ff3', '#f368e0'],
      ['#54a0ff', '#2e86de'],
      ['#5f27cd', '#341f97'],
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleChatPress = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const renderChatItem = ({ item }: { item: Chat }) => {
    const avatarColors = getAvatarColor(item.name);
    
    return (
      <Pressable
        style={styles.chatItem}
        onPress={() => handleChatPress(item.id)}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
          style={styles.chatItemGradient}
        >
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={avatarColors}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>
                {getInitials(item.name)}
              </Text>
              {item.isOnline && <View style={styles.onlineIndicator} />}
            </LinearGradient>
          </View>

          {/* Chat Content */}
          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <View style={styles.nameContainer}>
                <Text style={styles.chatName}>{item.name}</Text>
                {item.type === 'tournament' && (
                  <View style={styles.tournamentBadge}>
                    <Users size={12} color="#00ff88" />
                    <Text style={styles.participantCount}>
                      {item.participantCount}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
            
            <View style={styles.messageContainer}>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
              {item.unreadCount > 0 && (
                <LinearGradient
                  colors={['#00ff88', '#00d4ff']}
                  style={styles.unreadBadge}
                >
                  <Text style={styles.unreadCount}>
                    {item.unreadCount > 99 ? '99+' : item.unreadCount}
                  </Text>
                </LinearGradient>
              )}
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <LinearGradient
      colors={['#0a0a0a', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MessageCircle size={24} color="#00ff88" />
            <Text style={styles.headerTitle}>Messages</Text>
          </View>
        </View>

        {/* Chat List */}
        <FlatList
          data={mockChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatListContent}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    textShadowColor: 'rgba(0, 255, 136, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    padding: 16,
    gap: 8,
  },
  chatItem: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  chatItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
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
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00ff88',
    borderWidth: 2,
    borderColor: '#0a0a0a',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  chatName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  tournamentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 2,
  },
  participantCount: {
    color: '#00ff88',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  timestamp: {
    color: '#999999',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    color: '#b3b3b3',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Inter-Bold',
  },
});

export default ChatListScreen;