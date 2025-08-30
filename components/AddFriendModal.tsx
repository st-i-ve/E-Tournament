import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Search, QrCode, UserPlus, X } from 'lucide-react-native';
import { FriendUser } from '@/types/firebase';

interface AddFriendModalProps {
  visible: boolean;
  onClose: () => void;
}

// mock search results for now
const mockSearchResults: FriendUser[] = [
  {
    id: 'user1',
    username: 'johndoe',
    userCode: '123456',
    email: 'john.doe@example.com',
    displayName: 'John Doe',
    isOnline: true,
    lastSeen: new Date(),
    friends: [],
    incomingFriendRequests: [],
    outgoingFriendRequests: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    gameStatus: 'available',
  },
];

export function AddFriendModal({ visible, onClose }: AddFriendModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FriendUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 2) {
      setIsSearching(true);
      // simulate search delay
      setTimeout(() => {
        const filtered = mockSearchResults.filter(user => 
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.displayName?.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const handleSendFriendRequest = (userId: string) => {
    // TODO: implement firebase friend request
    Alert.alert('Friend Request Sent', 'Your friend request has been sent!');
    onClose();
  };

  const handleQRScan = () => {
    // TODO: implement QR code scanning
    Alert.alert('QR Scanner', 'QR code scanner will be implemented soon!');
  };

  const resetModal = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>Add Friend</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* search section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search by Username</Text>
            <View style={styles.searchContainer}>
              <Search size={20} color="#6b7280" />
              <TextInput
                style={styles.searchInput}
                placeholder="Enter username or display name"
                placeholderTextColor="#6b7280"
                value={searchQuery}
                onChangeText={handleSearch}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* qr code section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scan QR Code</Text>
            <TouchableOpacity style={styles.qrButton} onPress={handleQRScan}>
              <QrCode size={24} color="#22c55e" />
              <Text style={styles.qrButtonText}>Scan QR Code</Text>
            </TouchableOpacity>
            <Text style={styles.qrDescription}>
              Ask your friend to show their QR code from their profile
            </Text>
          </View>

          {/* search results */}
          {searchResults.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Search Results</Text>
              {searchResults.map((user) => (
                <View key={user.id} style={styles.userCard}>
                  <View style={styles.userInfo}>
                    <View style={styles.avatarContainer}>
                      <View style={[styles.avatar, { backgroundColor: '#22c55e' }]}>
                        <Text style={styles.avatarText}>
                          {user.displayName?.charAt(0) || user.username.charAt(0)}
                        </Text>
                      </View>
                      {user.isOnline && <View style={styles.onlineIndicator} />}
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>{user.displayName || user.username}</Text>
                      <Text style={styles.userUsername}>@{user.username}</Text>
                      <Text style={styles.userStats}>
                        Status: {user.gameStatus || 'available'}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleSendFriendRequest(user.id)}
                  >
                    <UserPlus size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* tips section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tips</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>
                • Search by exact username for best results
              </Text>
              <Text style={styles.tipText}>
                • QR codes can be found in user profiles
              </Text>
              <Text style={styles.tipText}>
                • Friend requests expire after 7 days
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(34, 197, 94, 0.1)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f2937',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  qrButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#22c55e',
  },
  qrDescription: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#1f2937',
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  userUsername: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  userStats: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 8,
  },
  tipCard: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 8,
  },
});