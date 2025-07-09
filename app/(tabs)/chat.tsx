import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, Send, Smile, Paperclip, MoveVertical as MoreVertical, Users, Clock, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Mock chat list data with user avatars and online status
const mockChats = [
  {
    id: '1',
    name: 'Champions Elite League',
    lastMessage: 'Perfect! I\'ve been practicing my headers all week',
    lastMessageTime: '2:38 PM',
    unreadCount: 3,
    participants: 8,
    type: 'tournament',
    avatar: 'CE',
    color: '#00d4ff',
    isOnline: true
  },
  {
    id: '2',
    name: 'Phoenix Strikers Team',
    lastMessage: 'Great match today everyone!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    participants: 12,
    type: 'team',
    avatar: 'PS',
    color: '#ff6b35',
    isOnline: true
  },
  {
    id: '3',
    name: 'Summer League 2024',
    lastMessage: 'When is the next fixture?',
    lastMessageTime: '2 days ago',
    unreadCount: 1,
    participants: 16,
    type: 'tournament',
    avatar: 'SL',
    color: '#7c3aed',
    isOnline: false
  }
];

export default function ChatTab() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Mock messages for individual chat with avatars and colors
  const mockMessages = [
    {
      id: '1',
      user: 'Phoenix_Rising',
      message: 'Hey everyone! Ready for tonight\'s match?',
      time: '2:30 PM',
      isOwn: false,
      avatar: 'PR',
      color: '#ff6b35',
      isOnline: true
    },
    {
      id: '2',
      user: 'google_user',
      message: 'Absolutely! Let\'s dominate the field 🔥',
      time: '2:32 PM',
      isOwn: true,
      avatar: 'GU',
      color: '#00d4ff',
      isOnline: true
    },
    {
      id: '3',
      user: 'Lightning_Striker',
      message: 'What formation are we running today?',
      time: '2:35 PM',
      isOwn: false,
      avatar: 'LS',
      color: '#7c3aed',
      isOnline: true
    },
    {
      id: '4',
      user: 'google_user',
      message: 'Coach mentioned 4-3-3, aggressive attacking',
      time: '2:36 PM',
      isOwn: true,
      avatar: 'GU',
      color: '#00d4ff',
      isOnline: true
    },
    {
      id: '5',
      user: 'Desert_Eagle',
      message: 'Perfect! I\'ve been practicing my headers all week',
      time: '2:38 PM',
      isOwn: false,
      avatar: 'DE',
      color: '#22c55e',
      isOnline: false
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
                <View style={styles.avatarContainer}>
                  <LinearGradient
                    colors={[msg.color, `${msg.color}80`]}
                    style={styles.avatar}
                  >
                    <Text style={styles.avatarText}>{msg.avatar}</Text>
                  </LinearGradient>
                  {msg.isOnline && <View style={styles.onlineIndicator} />}
                </View>
              )}
              <LinearGradient
                colors={msg.isOwn ? ['#00d4ff', '#0ea5e9'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={[styles.messageBubble, msg.isOwn && styles.ownMessageBubble]}
              >
                {!msg.isOwn && <Text style={styles.userName}>{msg.user}</Text>}
                <Text style={[styles.messageText, msg.isOwn && styles.ownMessageText]}>
                  {msg.message}
                </Text>
                <Text style={[styles.messageTime, msg.isOwn && styles.ownMessageTime]}>
                  {msg.time}
                </Text>
              </LinearGradient>
              {msg.isOwn && (
                <View style={styles.avatarContainer}>
                  <LinearGradient
                    colors={[msg.color, `${msg.color}80`]}
                    style={[styles.avatar, styles.ownAvatar]}
                  >
                    <Text style={styles.avatarText}>{msg.avatar}</Text>
                  </LinearGradient>
                  {msg.isOnline && <View style={styles.onlineIndicator} />}
                </View>
              )}
            </View>
          ))}
          
          {/* Typing indicator */}
          <View style={styles.typingIndicator}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#ff6b35', '#ff6b3580']}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>PR</Text>
              </LinearGradient>
              <View style={styles.onlineIndicator} />
            </View>
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
              style={styles.typingBubble}
            >
              <View style={styles.typingDots}>
                <View style={[styles.typingDot, { animationDelay: '0ms' }]} />
                <View style={[styles.typingDot, { animationDelay: '150ms' }]} />
                <View style={[styles.typingDot, { animationDelay: '300ms' }]} />
              </View>
              <Text style={styles.typingText}>Phoenix_Rising is typing...</Text>
            </LinearGradient>
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
                <LinearGradient
                  colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
                  style={styles.chatItemContent}
                >
                  <View style={styles.chatAvatarContainer}>
                    <LinearGradient
                      colors={[chat.color, `${chat.color}80`]}
                      style={styles.chatAvatar}
                    >
                      <Text style={styles.chatAvatarText}>{chat.avatar}</Text>
                    </LinearGradient>
                    {chat.isOnline && <View style={styles.chatOnlineIndicator} />}
                    {chat.unreadCount > 0 && (
                      <LinearGradient
                        colors={['#00ff88', '#00d4ff']}
                        style={styles.unreadBadge}
                      >
                        <Text style={styles.unreadBadgeText}>{chat.unreadCount}</Text>
                      </LinearGradient>
                    )}
                  </View>
                  
                  <View style={styles.chatDetails}>
                    <View style={styles.chatHeaderRow}>
                      <Text style={styles.chatName}>{chat.name}</Text>
                      <Text style={styles.chatTime}>{chat.lastMessageTime}</Text>
                    </View>
                    
                    <Text style={styles.lastMessage} numberOfLines={1}>
                      {chat.lastMessage}
                    </Text>
                    
                    <View style={styles.chatMeta}>
                      <Users color="#00d4ff" size={12} />
                      <Text style={styles.participantCount}>{chat.participants} members</Text>
                      <LinearGradient
                        colors={chat.type === 'tournament' ? ['#7c3aed', '#a855f7'] : ['#ff6b35', '#f97316']}
                        style={styles.chatTypeBadge}
                      >
                        <Text style={styles.chatTypeText}>{chat.type}</Text>
                      </LinearGradient>
                      {chat.type === 'tournament' && <Zap color="#fbbf24" size={10} />}
                    </View>
                  </View>
                </LinearGradient>
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
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  chatItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  chatAvatarContainer: {
    position: 'relative',
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  chatAvatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  chatOnlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00ff88',
    borderWidth: 2,
    borderColor: '#0a0a0a',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0a0a0a',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
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
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    flex: 1,
    textShadowColor: 'rgba(0,212,255,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  chatTime: {
    color: '#00d4ff',
    fontSize: 11,
    fontFamily: 'Inter-Medium',
  },
  lastMessage: {
    color: '#d1d5db',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 6,
    opacity: 0.8,
  },
  chatMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  participantCount: {
    color: '#00d4ff',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  chatTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatTypeText: {
    color: '#ffffff',
    fontSize: 9,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
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
  avatarContainer: {
    position: 'relative',
    marginHorizontal: 6,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  ownAvatar: {
    // No additional styles needed as gradient handles the appearance
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00ff88',
    borderWidth: 2,
    borderColor: '#0a0a0a',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  messageBubble: {
    maxWidth: '70%',
    borderRadius: 16,
    padding: 12,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  ownMessageBubble: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#00d4ff',
    shadowOpacity: 0.3,
  },
  userName: {
    color: '#00d4ff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  messageText: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  ownMessageText: {
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  messageTime: {
    color: '#9ca3af',
    fontSize: 9,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
    alignSelf: 'flex-start',
    opacity: 0.8,
  },
  ownMessageTime: {
    color: 'rgba(255,255,255,0.8)',
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
    opacity: 0.7,
  },
  typingBubble: {
    borderRadius: 16,
    padding: 12,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00d4ff',
    opacity: 0.6,
  },
  typingText: {
    color: '#d1d5db',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
    opacity: 0.8,
  },
  inputContainer: {
    padding: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(17, 24, 39, 0.95)',
    backdropFilter: 'blur(10px)',
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
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    maxHeight: 80,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 8,
  },
  emojiButton: {
    padding: 6,
  },
  sendButton: {
    backgroundColor: '#374151',
    borderRadius: 24,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonActive: {
    backgroundColor: '#22c55e',
    shadowColor: '#00d4ff',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
});