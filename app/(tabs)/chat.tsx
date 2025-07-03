import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, Send, Smile, Paperclip, MoveVertical as MoreVertical } from 'lucide-react-native';

export default function ChatTab() {
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      user: 'striker_pro',
      message: 'Great match today everyone! 🔥',
      time: '2:30 PM',
      isOwn: false,
    },
    {
      id: 2,
      user: 'google_user',
      message: 'Thanks! That winning goal was incredible',
      time: '2:32 PM',
      isOwn: true,
    },
    {
      id: 3,
      user: 'midfielder_king',
      message: 'Team work makes the dream work 💪',
      time: '2:35 PM',
      isOwn: false,
    },
    {
      id: 4,
      user: 'goalkeeper_ace',
      message: 'Next match is going to be tough against Real Madrid',
      time: '2:40 PM',
      isOwn: false,
    },
    {
      id: 5,
      user: 'google_user',
      message: "We've got this! Let's keep training hard 🏆",
      time: '2:42 PM',
      isOwn: true,
    },
  ];

  const sendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MessageSquare color="#22c55e" size={20} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Team Chat</Text>
            <Text style={styles.headerSubtitle}>Barcelona FC • 8 members online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical color="#9ca3af" size={16} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
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
            <Text style={styles.avatarText}>M</Text>
          </View>
          <View style={styles.typingBubble}>
            <Text style={styles.typingText}>midfielder_king is typing...</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerInfo: {
    marginLeft: 10,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
  },
  headerSubtitle: {
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