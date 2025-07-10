import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { Send, Users } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  isOwn: boolean;
}

interface ChatData {
  id: string;
  name: string;
  type: 'direct' | 'tournament';
  participantCount?: number;
  participants?: string[];
}

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      text: 'Hey! Ready for the tournament today?',
      timestamp: '10:30 AM',
      senderId: 'alex_johnson',
      senderName: 'Alex Johnson',
      isOwn: false,
    },
    {
      id: '2',
      text: 'Absolutely! I\'ve been practicing all week',
      timestamp: '10:32 AM',
      senderId: 'current_user',
      senderName: 'You',
      isOwn: true,
    },
    {
      id: '3',
      text: 'Good game! Ready for the next match?',
      timestamp: '2:15 PM',
      senderId: 'alex_johnson',
      senderName: 'Alex Johnson',
      isOwn: false,
    },
  ],
  '2': [
    {
      id: '1',
      text: 'Welcome to the FIFA Championship! 🏆',
      timestamp: '9:00 AM',
      senderId: 'tournament_admin',
      senderName: 'Tournament Admin',
      isOwn: false,
    },
    {
      id: '2',
      text: 'Tournament starts in 30 minutes',
      timestamp: '9:30 AM',
      senderId: 'tournament_admin',
      senderName: 'Tournament Admin',
      isOwn: false,
    },
  ],
};

const mockChatData: { [key: string]: ChatData } = {
  '1': {
    id: '1',
    name: 'Alex Johnson',
    type: 'direct',
  },
  '2': {
    id: '2',
    name: 'FIFA Championship',
    type: 'tournament',
    participantCount: 16,
    participants: ['Alex Johnson', 'Maria Santos', 'David Kim', 'You'],
  },
};

const ChatScreen = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages[chatId] || []);
  const flatListRef = useRef<FlatList>(null);
  
  const chatData = mockChatData[chatId];

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

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderId: 'current_user',
        senderName: 'You',
        isOwn: true,
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const avatarColors = getAvatarColor(item.senderName);
    
    return (
      <View style={[
        styles.messageContainer,
        item.isOwn ? styles.ownMessageContainer : styles.otherMessageContainer,
      ]}>
        {!item.isOwn && (
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={avatarColors}
              style={styles.messageAvatar}
            >
              <Text style={styles.avatarText}>
                {getInitials(item.senderName)}
              </Text>
            </LinearGradient>
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          item.isOwn ? styles.ownMessageBubble : styles.otherMessageBubble,
        ]}>
          <LinearGradient
            colors={
              item.isOwn
                ? ['#00ff88', '#00d4ff']
                : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
            }
            style={styles.messageBubbleGradient}
          >
            {!item.isOwn && chatData?.type === 'tournament' && (
              <Text style={styles.senderName}>{item.senderName}</Text>
            )}
            <Text style={[
              styles.messageText,
              item.isOwn ? styles.ownMessageText : styles.otherMessageText,
            ]}>
              {item.text}
            </Text>
            <Text style={[
              styles.messageTime,
              item.isOwn ? styles.ownMessageTime : styles.otherMessageTime,
            ]}>
              {item.timestamp}
            </Text>
          </LinearGradient>
        </View>
      </View>
    );
  };

  if (!chatData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Chat not found</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#0a0a0a', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Chat Header */}
          <View style={styles.chatHeader}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
              style={styles.chatHeaderGradient}
            >
              <Text style={styles.chatTitle}>{chatData.name}</Text>
              {chatData.type === 'tournament' && (
                <View style={styles.participantInfo}>
                  <Users size={14} color="#00ff88" />
                  <Text style={styles.participantText}>
                    {chatData.participantCount} participants
                  </Text>
                </View>
              )}
            </LinearGradient>
          </View>

          {/* Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {/* Input */}
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.inputGradient}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor="#666666"
                value={message}
                onChangeText={setMessage}
                multiline
                maxLength={500}
              />
              <Pressable
                style={[
                  styles.sendButton,
                  !message.trim() && styles.sendButtonDisabled,
                ]}
                onPress={handleSendMessage}
                disabled={!message.trim()}
              >
                <LinearGradient
                  colors={
                    message.trim()
                      ? ['#00ff88', '#00d4ff']
                      : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)']
                  }
                  style={styles.sendButtonGradient}
                >
                  <Send 
                    size={18} 
                    color={message.trim() ? '#ffffff' : '#666666'} 
                  />
                </LinearGradient>
              </Pressable>
            </LinearGradient>
          </View>
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  chatHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  chatHeaderGradient: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  chatTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  participantText: {
    color: '#00ff88',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  ownMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginBottom: 4,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  ownMessageBubble: {
    alignSelf: 'flex-end',
  },
  otherMessageBubble: {
    alignSelf: 'flex-start',
  },
  messageBubbleGradient: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  senderName: {
    color: '#00ff88',
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  ownMessageText: {
    color: '#ffffff',
  },
  otherMessageText: {
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherMessageTime: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputGradient: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;