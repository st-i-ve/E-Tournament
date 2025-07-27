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
import { Background } from '../../../components/Background';

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
    // Always return black background for consistent theming
    return '#000';
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
          width: "100%",
          height: "100%",
          borderRadius: 25,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.8,
          borderColor: '#25D366',
        }}>
          <Text style={{ color: '#25D366', fontWeight: '600', fontSize: 14 }}>{getInitials(item.name)}</Text>
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
      <View style={styles.backgroundElements}>
        {/* Triangles */}
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View
          style={[
            styles.triangle,
            { top: 200, right: 80, transform: [{ rotate: '12deg' }] },
          ]}
        />
        <View style={[styles.triangle, { bottom: 200, left: 100 }]} />

        {/* Circles */}
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

        {/* Rectangles */}
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

        {/* Lines */}
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>
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
    backgroundColor: '#0A0A0AFF',
  },
  safeArea: {
    flex: 1,
  },
  chatList: {
    flex: 1,
    backgroundColor: '#0A0A0A25',
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
});

export default ChatListScreen;