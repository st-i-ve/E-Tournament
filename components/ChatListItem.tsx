import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ChatListItemProps {
  avatar: React.ReactNode;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  pinned?: boolean;
  onPress?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  avatar,
  name,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isOnline = false,
  pinned = false,
  onPress,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const renderRightActions = () => (
    <View style={styles.swipeActionRight}>
      <MaterialCommunityIcons name="archive-outline" size={24} color="#fff" />
      <Text style={styles.swipeActionText}>Archive</Text>
    </View>
  );
  const renderLeftActions = () => (
    <View style={styles.swipeActionLeft}>
      <MaterialCommunityIcons name="volume-mute" size={24} color="#fff" />
      <Text style={styles.swipeActionText}>Mute</Text>
    </View>
  );

  return (
    <Swipeable
      renderRightActions={onSwipeLeft ? renderRightActions : undefined}
      renderLeftActions={onSwipeRight ? renderLeftActions : undefined}
      onSwipeableRightOpen={onSwipeLeft}
      onSwipeableLeftOpen={onSwipeRight}
      overshootRight={false}
      overshootLeft={false}
    >
      <Pressable style={[styles.container, pinned && styles.pinned]} onPress={onPress}>
        <View style={styles.avatarContainer}>
          {avatar}
          {isOnline && <View style={styles.onlineDot} />}
        </View>
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
          <View style={styles.messageRow}>
            <Text style={styles.lastMessage} numberOfLines={1}>{lastMessage}</Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 6,
    minHeight: 64,
  },
  pinned: {
    borderColor: '#25D366',
    borderWidth: 1.5,
    shadowColor: '#25D366',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#23232b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    position: 'relative',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#25D366',
    borderWidth: 2,
    borderColor: '#18181b',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  name: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 8,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  swipeActionRight: {
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '90%',
    borderRadius: 14,
    marginVertical: 4,
    flexDirection: 'column',
  },
  swipeActionLeft: {
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '90%',
    borderRadius: 14,
    marginVertical: 4,
    flexDirection: 'column',
  },
  swipeActionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ChatListItem;