import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, Send, Smile, Paperclip, MoveVertical as MoreVertical, Users, Clock } from 'lucide-react-native';

// Mock chat list data
const mockChats = [
  {
    id: '1',
    name: 'Champions Elite League',
    lastMessage: 'Perfect! I\'ve been practicing my headers all week',
    lastMessageTime: '2:38 PM',
    unreadCount: 3,
    participants: 8,
    type: 'tournament'
  },
  {
    id: '2',
    name: 'Phoenix Strikers Team',
    lastMessage: 'Great match today everyone!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    participants: 12,
    type: 'team'
  },
  {
    id: '3',
    name: 'Summer League 2024',
    lastMessage: 'When is the next fixture?',
    lastMessageTime: '2 days ago',
    unreadCount: 1,
    participants: 16,
    type: 'tournament'
  }
];

export default function ChatTab() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Mock messages for individual chat
  const mockMessages = [
    {
      id: '1',
      user: 'Phoenix_Rising',
      message: 'Hey everyone! Ready for tonight\'s match?',
      time: '2:30 PM',
      isOwn: false,
    },
    {
      id: '2',
      user: 'google_user',
      message: 'Absolutely! Let\'s dominate the field 🔥',
      time: '2:32 PM',
      isOwn: true,
    },
    {
      id: '3',
      user: 'Lightning_Striker',
      message: 'What formation are we running today?',
      time: '2:35 PM',
      isOwn: false,
    },
    {
      id: '4',
      user: 'google_user',
      message: 'Coach mentioned 4-3-3, aggressive attacking',
      time: '2:36 PM',
      isOwn: true,
    },
    {
      id: '5',
      user: 'Desert_Eagle',
      message: 'Perfect! I\'ve been practicing my headers all week',
      time: '2:38 PM',
      isOwn: false,
    },
  ];

  const sendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const selectedChatData = mockChats.find(chat => chat.id === selectedChat);

  if (selectedChat) {
    // Individual Chat View
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={handleBackToList} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <View style={styles.chatIcon}>
              <MessageSquare color="#22c55e" size={16} />
            </View>
            <View style={styles.chatHeaderText}>
              <Text style={styles.chatHeaderTitle}>{selectedChatData?.name}</Text>
              <Text style={styles.chatHeaderSubtitle}>
                {selectedChatData?.participants} members • {selectedChatData?.type}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical color="#9ca3af" size={16} />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {mockMessages.map((msg) => (
            <View key={msg.id} style={[styles.messageRow, msg.isOwn && styles.ownMessageRow]}>
              {!msg.isOwn && (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{msg.user.charAt(0).toUpperCase()}</Text>
                </View>
              )}
              <View style={[styles.messageBubble, msg.isOwn && styles.ownMessageBubble]}>
                {!msg.isOwn && <Text style={styles.userName}>{msg.user}</Text>}
                <Text style={[styles.messageText, msg.isOwn && styles.ownMessageText]}>
                  {msg.message}
                </Text>
                <Text style={[styles.messageTime, msg.isOwn && styles.ownMessageTime]}>
                  {msg.time}
                </Text>
              </View>
              {msg.isOwn && (
                <View style={[styles.avatar, styles.ownAvatar]}>
                  <Text style={styles.avatarText}>G</Text>
                </View>
              )}
            </View>
          ))}
          
          {/* Typing indicator */}
          <View style={styles.typingIndicator}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>P</Text>
            </View>
            <View style={styles.typingBubble}>
              <Text style={styles.typingText}>Phoenix_Rising is typing...</Text>
            </View>
          </View>
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachButton}>
              <Paperclip color="#9ca3af" size={16} />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#6b7280"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Smile color="#9ca3af" size={16} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sendButton, message.trim() && styles.sendButtonActive]} 
              onPress={sendMessage}
            >
              <Send color={message.trim() ? "#ffffff" : "#6b7280"} size={14} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Chat List View
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
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <View style={styles.chatListIcon}>
                <View style={styles.chatListIconBorder} />
              </View>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Team Chats</Text>
              <Text style={styles.headerSubtitle}>Stay connected with your teams</Text>
            </View>
          </View>
        </View>

        {/* Chat List */}
        <View style={styles.chatList}>
          {mockChats.map((chat, index) => (
            <View key={chat.id}>
              <TouchableOpacity
                style={styles.chatItem}
                onPress={() => handleChatSelect(chat.id)}
                activeOpacity={0.7}
              >
                <View style={styles.chatItemContent}>
                  <View style={styles.chatAvatarContainer}>
                    <View style={styles.chatAvatar}>
                      <MessageSquare color="#22c55e" size={20} />
                    </View>
                    {chat.unreadCount > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>{chat.unreadCount}</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.chatDetails}>
                    <View style={styles.chatHeader}>
                      <Text style={styles.chatName}>{chat.name}</Text>
                      <Text style={styles.chatTime}>{chat.lastMessageTime}</Text>
                    </View>
                    
                    <Text style={styles.lastMessage} numberOfLines={1}>
                      {chat.lastMessage}
                    </Text>
                    
                    <View style={styles.chatMeta}>
                      <Users color="#6b7280" size={12} />
                      <Text style={styles.participantCount}>{chat.participants} members</Text>
                      <View style={styles.chatTypeBadge}>
                        <Text style={styles.chatTypeText}>{chat.type}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              
              {index < mockChats.length - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
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
    padding: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginTop: 4,
  },
  chatListIcon: {
    width: 24,
    height: 24,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatListIconBorder: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#22c55e',
    borderRadius: 12,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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
  chatList: {
    paddingHorizontal: 16,
  },
  chatItem: {
    paddingVertical: 12,
  },
  chatItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chatAvatarContainer: {
    position: 'relative',
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.5)',
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#22c55e',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  chatDetails: {
    flex: 1,
    minWidth: 0,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  chatTime: {
    color: '#6b7280',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  lastMessage: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  chatMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  participantCount: {
    color: '#6b7280',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  chatTypeBadge: {
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
  },
  chatTypeText: {
    color: '#6b7280',
    fontSize: 9,
    fontFamily: 'Inter-Regular',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    marginVertical: 8,
  },
  bottomSpacing: {
    height: 80,
  },
  // Individual Chat Styles
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backButtonText: {
    color: '#22c55e',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  chatHeaderText: {
    flex: 1,
  },
  chatHeaderTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  chatHeaderSubtitle: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 1,
  },
  moreButton: {
    padding: 6,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  ownMessageRow: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  ownAvatar: {
    backgroundColor: '#22c55e',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  messageBubble: {
    maxWidth: '70%',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 10,
    borderBottomLeftRadius: 3,
  },
  ownMessageBubble: {
    backgroundColor: '#22c55e',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 3,
  },
  userName: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 3,
  },
  messageText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    lineHeight: 16,
  },
  ownMessageText: {
    color: '#ffffff',
  },
  messageTime: {
    color: '#6b7280',
    fontSize: 9,
    fontFamily: 'Inter-Regular',
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  ownMessageTime: {
    color: 'rgba(255,255,255,0.7)',
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
    opacity: 0.7,
  },
  typingBubble: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 10,
    borderBottomLeftRadius: 3,
  },
  typingText: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
  },
  inputContainer: {
    padding: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#1f2937',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  attachButton: {
    padding: 6,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    maxHeight: 80,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  emojiButton: {
    padding: 6,
  },
  sendButton: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 6,
    marginLeft: 6,
  },
  sendButtonActive: {
    backgroundColor: '#22c55e',
  },
});