import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MessageCircle, Users, Clock } from 'lucide-react-native';

// Mock chat list data
const mockChats = [
  {
    id: '1',
    name: 'Champions Elite League',
    lastMessage: "Perfect! I've been practicing my headers all week",
    lastMessageTime: '2:38 PM',
    unreadCount: 3,
    participants: 8,
    type: 'tournament',
  },
  {
    id: '2',
    name: 'Phoenix Strikers Team',
    lastMessage: 'Great match today everyone!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    participants: 12,
    type: 'team',
  },
  {
    id: '3',
    name: 'Summer League 2024',
    lastMessage: 'When is the next fixture?',
    lastMessageTime: '2 days ago',
    unreadCount: 1,
    participants: 16,
    type: 'tournament',
  },
];

const ChatListPage = () => {
  const navigation = useNavigation();

  const handleChatClick = (chatId: string) => {
    navigation.navigate('Chat');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <MessageCircle color="#4ade80" size={20} />
          </View>
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Team Chats</Text>
          <Text style={styles.headerSubtitle}>
            Stay connected with your teams
          </Text>
        </View>
      </View>

      {/* Chat List */}
      <ScrollView style={styles.chatList}>
        {mockChats.map((chat) => (
          <View key={chat.id} style={styles.chatItemContainer}>
            <TouchableOpacity
              onPress={() => handleChatClick(chat.id)}
              style={styles.chatButton}
            >
              <View style={styles.chatContent}>
                <View style={styles.chatIconContainer}>
                  <View style={styles.chatIcon}>
                    <MessageCircle color="#4ade80" size={20} />
                  </View>
                  {chat.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.chatDetails}>
                  <View style={styles.chatHeader}>
                    <Text style={styles.chatName} numberOfLines={1}>
                      {chat.name}
                    </Text>
                    <Text style={styles.chatTime}>{chat.lastMessageTime}</Text>
                  </View>

                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {chat.lastMessage}
                  </Text>

                  <View style={styles.chatFooter}>
                    <Users color="#6b7280" size={12} />
                    <Text style={styles.participantsCount}>
                      {chat.participants} members
                    </Text>
                    <Text style={styles.chatType}>{chat.type}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Separator */}
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(74, 222, 128, 0.5)',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(74, 222, 128, 0.2)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  chatList: {
    paddingHorizontal: 24,
  },
  chatItemContainer: {
    marginBottom: 8,
  },
  chatButton: {
    width: '100%',
    padding: 16,
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatIconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  chatIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(74, 222, 128, 0.5)',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: '#22c55e',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  chatDetails: {
    flex: 1,
    minWidth: 0,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    flex: 1,
    marginRight: 8,
  },
  chatTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  lastMessage: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 4,
  },
  chatFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  participantsCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  chatType: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    marginVertical: 8,
  },
});

export default ChatListPage;
