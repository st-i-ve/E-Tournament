import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Search, QrCode, UserPlus, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { User } from '@/types/firebase';

// TODO: Firebase - Replace with real user search
const mockSearchResults: User[] = [
  {
    uid: 'user1',
    email: 'john.doe@example.com',
    displayName: 'John Doe',
    username: 'johndoe',
    profilePicture: null,
    isOnline: true,
    lastSeen: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    friends: [],
    blockedUsers: [],
    gameStats: {
      gamesPlayed: 25,
      gamesWon: 18,
      winRate: 72,
      currentStreak: 3,
      bestStreak: 8,
    },
  },
  {
    uid: 'user2',
    email: 'jane.smith@example.com',
    displayName: 'Jane Smith',
    username: 'janesmith',
    profilePicture: null,
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    createdAt: new Date(),
    updatedAt: new Date(),
    friends: [],
    blockedUsers: [],
    gameStats: {
      gamesPlayed: 15,
      gamesWon: 12,
      winRate: 80,
      currentStreak: 5,
      bestStreak: 7,
    },
  },
];

export default function AddFriendPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // TODO: Firebase - Implement real user search
  const handleSearch = async (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    // simulate api delay
    setTimeout(() => {
      const filtered = mockSearchResults.filter(
        (user) =>
          user.displayName.toLowerCase().includes(query.toLowerCase()) ||
          user.username.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  // TODO: Firebase - Implement friend request sending
  const handleSendFriendRequest = async (userId: string) => {
    Alert.alert(
      'Friend Request Sent',
      'Your friend request has been sent successfully!',
      [{ text: 'OK' }]
    );
    // remove from search results after sending request
    setSearchResults(prev => prev.filter(user => user.uid !== userId));
  };

  // TODO: Implement QR code scanning
  const handleQRScan = () => {
    Alert.alert(
      'QR Scanner',
      'QR code scanning feature will be implemented here',
      [{ text: 'OK' }]
    );
  };

  const renderUserCard = (user: User) => (
    <View key={user.uid} style={styles.userCard}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: user.isOnline ? '#22c55e' : '#6b7280' }]}>
            <Text style={styles.avatarText}>
              {user.displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          {user.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{user.displayName}</Text>
          <Text style={styles.userUsername}>@{user.username}</Text>
          <Text style={styles.userStats}>
            {user.gameStats.gamesPlayed} games • {user.gameStats.winRate}% win rate
          </Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleSendFriendRequest(user.uid)}
      >
        <UserPlus color="#ffffff" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <X color="#ffffff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Friends</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search color="#6b7280" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by username or name"
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                handleSearch(text);
              }}
            />
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <TouchableOpacity style={styles.qrButton} onPress={handleQRScan}>
            <QrCode color="#22c55e" size={24} />
            <Text style={styles.qrButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
          <Text style={styles.qrDescription}>
            Scan a friend's QR code to add them instantly
          </Text>
        </View>

        {/* Search Results */}
        {searchQuery.length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>
              {isSearching ? 'Searching...' : `Results for "${searchQuery}"`}
            </Text>
            
            {searchResults.length > 0 ? (
              searchResults.map(renderUserCard)
            ) : (
              !isSearching && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>No users found</Text>
                  <Text style={styles.noResultsSubtext}>
                    Try searching with a different username or name
                  </Text>
                </View>
              )
            )}
          </View>
        )}

        {/* Tips Section */}
        {searchQuery.length === 0 && (
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Tips</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>• Search by exact username or display name</Text>
              <Text style={styles.tipText}>• Use QR codes for quick friend adding</Text>
              <Text style={styles.tipText}>• Check your friend requests in the Requests tab</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchSection: {
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  qrSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    paddingHorizontal: 24,
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
  resultsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
  noResults: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  noResultsSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  tipsSection: {
    marginTop: 24,
  },
  tipCard: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 8,
  },
});