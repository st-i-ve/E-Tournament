import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Send } from 'lucide-react-native';

// Mock chat data
const mockMessages = [
  {
    id: '1',
    text: "Hey everyone! Ready for tonight's match?",
    sender: 'Phoenix_Rising',
    timestamp: '2:30 PM',
    isUser: false,
  },
  {
    id: '2',
    text: "Absolutely! Let's dominate the field 🔥",
    sender: 'You',
    timestamp: '2:32 PM',
    isUser: true,
  },
  {
    id: '3',
    text: 'What formation are we running today?',
    sender: 'Lightning_Striker',
    timestamp: '2:35 PM',
    isUser: false,
  },
  {
    id: '4',
    text: 'Coach mentioned 4-3-3, aggressive attacking',
    sender: 'You',
    timestamp: '2:36 PM',
    isUser: true,
  },
  {
    id: '5',
    text: "Perfect! I've been practicing my headers all week",
    sender: 'Desert_Eagle',
    timestamp: '2:38 PM',
    isUser: false,
  },
];

const ChatPage = () => {
  const navigation = useNavigation();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft color="#4ade80" size={20} />
        </TouchableOpacity>

        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Tournament Chat</Text>
          <Text style={styles.headerSubtitle}>Champions Elite League</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {mockMessages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isUser
                ? styles.messageWrapperRight
                : styles.messageWrapperLeft,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.isUser
                  ? styles.userMessageBubble
                  : styles.otherMessageBubble,
              ]}
            >
              {!message.isUser && (
                <Text style={styles.messageSender}>{message.sender}</Text>
              )}
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            placeholderTextColor="#9ca3af"
            style={styles.textInput}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}
          >
            <Send color="white" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(74, 222, 128, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4ade80',
    shadowColor: 'rgba(74, 222, 128, 0.2)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  headerTextContainer: {
    flexDirection: 'column',
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageWrapperLeft: {
    alignItems: 'flex-start',
  },
  messageWrapperRight: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
  },
  userMessageBubble: {
    backgroundColor: 'rgba(22, 163, 74, 0.2)',
    borderColor: 'rgba(74, 222, 128, 0.3)',
  },
  otherMessageBubble: {
    backgroundColor: 'rgba(31, 41, 55, 0.4)',
    borderColor: 'rgba(55, 65, 81, 0.3)',
  },
  messageSender: {
    fontSize: 12,
    color: '#4ade80',
    marginBottom: 4,
    fontWeight: '500',
  },
  messageText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  inputContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  inputWrapper: {
    backgroundColor: 'rgba(31, 41, 55, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.3)',
    borderRadius: 24,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(31, 41, 55, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: 'white',
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#16a34a',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default ChatPage;
