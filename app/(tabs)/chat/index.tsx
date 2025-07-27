import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { ChatListItem } from '../../../components/ChatListItem';

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
      '#ff6b6b',
      '#4ecdc4', 
      '#45b7d1',
      '#96ceb4',
      '#feca57',
      '#ff9ff3',
      '#54a0ff',
      '#5f27cd',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleChatPress = (chatId: string) => {
    router.push({
      pathname: '/chat',
      params: { chatId },
    });
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <ChatListItem
      avatar={
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: getAvatarColor(item.name),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>{getInitials(item.name)}</Text>
        </View>
      }
      name={item.name}
      lastMessage={item.lastMessage}
      timestamp={item.timestamp}
      unreadCount={item.unreadCount}
      isOnline={item.isOnline}
      onPress={() => handleChatPress(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Chat List */}
        <FlatList
          data={mockChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Floating New Chat Button */}
        <TouchableOpacity style={styles.fab} onPress={() => {}}>
          <Plus color="#fff" size={24} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  chatList: {
    flex: 1,
    backgroundColor: '#000',
  },
  chatListContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default ChatListScreen;