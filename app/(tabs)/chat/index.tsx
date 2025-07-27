import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { MessageCircle, Plus, Archive, Pin } from 'lucide-react-native';
import { ChatListItem } from '../../../components/ChatListItem';
import { Button } from '../../../components/ui/button';

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
  const [search, setSearch] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [archivedChats, setArchivedChats] = useState<Chat[]>([]);
  const [pinnedChats, setPinnedChats] = useState<string[]>(['1']); // Example: pin chat with id '1'

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

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );
  const pinned = filteredChats.filter((c) => pinnedChats.includes(c.id));
  const regular = filteredChats.filter((c) => !pinnedChats.includes(c.id));

  const handleChatPress = (chatId: string) => {
    router.push({
      pathname: '/chat',
      params: { chatId },
    });
  };

  const handleArchive = (chatId: string) => {
    const chat = mockChats.find((c) => c.id === chatId);
    if (chat) {
      setArchivedChats((prev) => [...prev, chat]);
    }
  };

  const handlePin = (chatId: string) => {
    setPinnedChats((prev) =>
      prev.includes(chatId) ? prev.filter((id) => id !== chatId) : [chatId, ...prev]
    );
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <ChatListItem
      avatar={
        <View style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: '#23232b',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>{getInitials(item.name)}</Text>
        </View>
      }
      name={item.name}
      lastMessage={item.lastMessage}
      timestamp={item.timestamp}
      unreadCount={item.unreadCount}
      isOnline={item.isOnline}
      pinned={pinnedChats.includes(item.id)}
      onPress={() => handleChatPress(item.id)}
      onSwipeLeft={() => handleArchive(item.id)}
      onSwipeRight={() => handlePin(item.id)}
    />
  );

  return (
    <LinearGradient
      colors={['#0a0a0a', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MessageCircle size={24} color="#25D366" />
            <Text style={styles.headerTitle}>Chats</Text>
          </View>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor="#a1a1aa"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        {/* Archived Section */}
        {archivedChats.length > 0 && !showArchived && (
          <TouchableOpacity style={styles.archivedBar} onPress={() => setShowArchived(true)}>
            <Archive color="#25D366" size={18} />
            <Text style={styles.archivedText}>Archived Chats ({archivedChats.length})</Text>
          </TouchableOpacity>
        )}
        {showArchived && (
          <View style={styles.archivedSection}>
            <View style={styles.archivedHeader}>
              <Text style={styles.archivedTitle}>Archived</Text>
              <Button variant="ghost" size="sm" onPress={() => setShowArchived(false)}>Hide</Button>
            </View>
            <FlatList
              data={archivedChats}
              renderItem={renderChatItem}
              keyExtractor={(item) => item.id}
              style={styles.chatList}
              contentContainerStyle={styles.chatListContent}
            />
          </View>
        )}
        {/* Pinned Chats */}
        {pinned.length > 0 && (
          <FlatList
            data={pinned}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            style={styles.chatList}
            contentContainerStyle={styles.chatListContent}
          />
        )}
        {/* Regular Chats */}
        <FlatList
          data={regular}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
        />
        {/* Floating New Chat Button */}
        <TouchableOpacity style={styles.fab} onPress={() => {}}>
          <LinearGradient colors={["#25D366", "#128C7E"]} style={styles.fabInner}>
            <Plus color="#fff" size={28} />
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  chatItemMinimal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    minHeight: 64,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarContainerMinimal: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#23232b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  avatarTextMinimal: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  onlineIndicatorMinimal: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#18181b',
  },
  chatContentMinimal: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  chatHeaderMinimal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  chatNameMinimal: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  timestampMinimal: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '400',
    marginLeft: 8,
  },
  lastMessageMinimal: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '400',
    flexShrink: 1,
  },
  unreadBadgeMinimal: {
    backgroundColor: '#22c55e',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  unreadCountMinimal: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
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
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    textShadowColor: 'rgba(0, 255, 136, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginLeft: 12,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    padding: 16,
  },
  chatItem: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
  },
  chatItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
    marginLeft: 12,
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
    marginLeft: 8,
  },
  participantCount: {
    color: '#00ff88',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    marginLeft: 2,
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
  searchBar: {
    backgroundColor: '#27272a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
  },
  archivedBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(37, 211, 102, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  archivedText: {
    color: '#25D366',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  archivedSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 8,
  },
  archivedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  archivedTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabInner: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatListScreen;