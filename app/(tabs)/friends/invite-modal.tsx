import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Gamepad2, Trophy, Users, Send, ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { FriendUser } from '@/types/firebase';

// TODO: Firebase - Replace with real friends data
const mockFriends: FriendUser[] = [
  {
    uid: 'friend1',
    displayName: 'Alex Johnson',
    username: 'alexj',
    profilePicture: null,
    isOnline: true,
    lastSeen: new Date(),
    gameStats: {
      gamesPlayed: 42,
      gamesWon: 28,
      winRate: 67,
      currentStreak: 2,
      bestStreak: 9,
    },
  },
  {
    uid: 'friend2',
    displayName: 'Sarah Wilson',
    username: 'sarahw',
    profilePicture: null,
    isOnline: true,
    lastSeen: new Date(),
    gameStats: {
      gamesPlayed: 18,
      gamesWon: 15,
      winRate: 83,
      currentStreak: 6,
      bestStreak: 8,
    },
  },
  {
    uid: 'friend3',
    displayName: 'Mike Brown',
    username: 'mikeb',
    profilePicture: null,
    isOnline: false,
    lastSeen: new Date(Date.now() - 300000), // 5 min ago
    gameStats: {
      gamesPlayed: 31,
      gamesWon: 19,
      winRate: 61,
      currentStreak: 1,
      bestStreak: 5,
    },
  },
  {
    uid: 'friend4',
    displayName: 'Emma Davis',
    username: 'emmad',
    profilePicture: null,
    isOnline: true,
    lastSeen: new Date(),
    gameStats: {
      gamesPlayed: 25,
      gamesWon: 20,
      winRate: 80,
      currentStreak: 4,
      bestStreak: 7,
    },
  },
];

const gameTypes = [
  'FIFA 24',
  'Call of Duty',
  'Rocket League',
  'Fortnite',
  'Apex Legends',
  'Valorant',
];

export default function InviteModal() {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [inviteType, setInviteType] = useState<'casual' | 'tournament'>(
    'casual'
  );
  const [step, setStep] = useState<'friends' | 'game' | 'type'>('friends');

  const handleFriendToggle = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleNext = () => {
    if (step === 'friends' && selectedFriends.length > 0) {
      setStep('game');
    } else if (step === 'game' && selectedGame) {
      setStep('type');
    }
  };

  const handleBack = () => {
    if (step === 'game') {
      setStep('friends');
    } else if (step === 'type') {
      setStep('game');
    }
  };

  // TODO: Firebase - Implement send game invite
  const handleSendInvite = async () => {
    const friendNames = selectedFriends
      .map((id) => mockFriends.find((f) => f.uid === id)?.displayName)
      .filter(Boolean)
      .join(', ');

    Alert.alert(
      'Invites Sent!',
      `Game invites for ${selectedGame} (${inviteType}) sent to ${friendNames}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // reset modal state
            setSelectedFriends([]);
            setSelectedGame('');
            setInviteType('casual');
            setStep('friends');
            onClose();
          },
        },
      ]
    );
  };

  const handleClose = () => {
    // reset modal state
    setSelectedFriends([]);
    setSelectedGame('');
    setInviteType('casual');
    setStep('friends');
    router.back();
  };

  const renderFriendSelection = () => (
    <>
      <Text style={styles.stepTitle}>Select Friends</Text>
      <Text style={styles.stepSubtitle}>Choose who you want to invite</Text>

      <ScrollView
        style={styles.friendsList}
        showsVerticalScrollIndicator={false}
      >
        {mockFriends.map((friend) => (
          <TouchableOpacity
            key={friend.uid}
            style={[
              styles.friendCard,
              selectedFriends.includes(friend.uid) && styles.selectedFriendCard,
            ]}
            onPress={() => handleFriendToggle(friend.uid)}
          >
            <View style={styles.friendInfo}>
              <View style={styles.avatarContainer}>
                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor: friend.isOnline ? '#22c55e' : '#6b7280',
                    },
                  ]}
                >
                  <Text style={styles.avatarText}>
                    {friend.displayName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                {friend.isOnline && <View style={styles.onlineIndicator} />}
              </View>

              <View style={styles.friendDetails}>
                <Text style={styles.friendName}>{friend.displayName}</Text>
                <Text style={styles.friendUsername}>@{friend.username}</Text>
                <Text style={styles.friendStats}>
                  {friend.gameStats.winRate}% win rate •{' '}
                  {friend.isOnline ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.checkbox,
                selectedFriends.includes(friend.uid) && styles.checkedBox,
              ]}
            >
              {selectedFriends.includes(friend.uid) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  const renderGameSelection = () => (
    <>
      <Text style={styles.stepTitle}>Choose Game</Text>
      <Text style={styles.stepSubtitle}>What do you want to play?</Text>

      <ScrollView style={styles.gamesList} showsVerticalScrollIndicator={false}>
        {gameTypes.map((game) => (
          <TouchableOpacity
            key={game}
            style={[
              styles.gameCard,
              selectedGame === game && styles.selectedGameCard,
            ]}
            onPress={() => setSelectedGame(game)}
          >
            <Gamepad2
              color={selectedGame === game ? '#ffffff' : '#22c55e'}
              size={24}
            />
            <Text
              style={[
                styles.gameText,
                selectedGame === game && styles.selectedGameText,
              ]}
            >
              {game}
            </Text>
            <View
              style={[
                styles.radioButton,
                selectedGame === game && styles.selectedRadio,
              ]}
            >
              {selectedGame === game && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  const renderTypeSelection = () => (
    <>
      <Text style={styles.stepTitle}>Game Type</Text>
      <Text style={styles.stepSubtitle}>Choose the type of game</Text>

      <View style={styles.typeOptions}>
        <TouchableOpacity
          style={[
            styles.typeCard,
            inviteType === 'casual' && styles.selectedTypeCard,
          ]}
          onPress={() => setInviteType('casual')}
        >
          <Users
            color={inviteType === 'casual' ? '#ffffff' : '#6b7280'}
            size={32}
          />
          <Text
            style={[
              styles.typeTitle,
              inviteType === 'casual' && styles.selectedTypeTitle,
            ]}
          >
            Casual Game
          </Text>
          <Text
            style={[
              styles.typeDescription,
              inviteType === 'casual' && styles.selectedTypeDescription,
            ]}
          >
            Just for fun, no ranking points
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeCard,
            inviteType === 'tournament' && styles.selectedTypeCard,
          ]}
          onPress={() => setInviteType('tournament')}
        >
          <Trophy
            color={inviteType === 'tournament' ? '#ffffff' : '#f59e0b'}
            size={32}
          />
          <Text
            style={[
              styles.typeTitle,
              inviteType === 'tournament' && styles.selectedTypeTitle,
            ]}
          >
            Tournament
          </Text>
          <Text
            style={[
              styles.typeDescription,
              inviteType === 'tournament' && styles.selectedTypeDescription,
            ]}
          >
            Competitive match with ranking points
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.triangle, { top: 60, left: 30, width: 20, height: 20 }]} />
        <View style={[styles.circle, { top: 120, right: 40, width: 16, height: 16 }]} />
        <View style={[styles.rectangle, { top: 200, left: 20, width: 24, height: 12 }]} />
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '30%' }]} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleClose}>
            <ChevronLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Invite Friends</Text>
          </View>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.activeStep]} />
          <View
            style={[
              styles.progressStep,
              step !== 'friends' && styles.activeStep,
            ]}
          />
          <View
            style={[styles.progressStep, step === 'type' && styles.activeStep]}
          />
        </View>
      </View>

        {/* Content */}
        <View style={styles.content}>
          {step === 'friends' && renderFriendSelection()}
          {step === 'game' && renderGameSelection()}
          {step === 'type' && renderTypeSelection()}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {step === 'type' ? (
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendInvite}
          >
            <Send color="#ffffff" size={20} />
            <Text style={styles.sendButtonText}>
              Send to {selectedFriends.length} friend
              {selectedFriends.length !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.nextButton,
              (step === 'friends' && selectedFriends.length === 0) ||
              (step === 'game' && !selectedGame)
                ? styles.disabledButton
                : null,
            ]}
            onPress={handleNext}
            disabled={
              (step === 'friends' && selectedFriends.length === 0) ||
              (step === 'game' && !selectedGame)
            }
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },

  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
  },
  activeStep: {
    backgroundColor: '#22c55e',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  stepSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 16,
  },
  friendsList: {
    flex: 1,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1f2937',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  selectedFriendCard: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  friendDetails: {
    marginLeft: 8,
    flex: 1,
  },
  friendName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  friendUsername: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 1,
  },
  friendStats: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 2,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  gamesList: {
    flex: 1,
  },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  selectedGameCard: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  gameText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
    flex: 1,
  },
  selectedGameText: {
    color: '#ffffff',
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    borderColor: '#22c55e',
  },
  radioDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
  typeOptions: {
    gap: 16,
  },
  typeCard: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  selectedTypeCard: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  typeTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginTop: 8,
  },
  selectedTypeTitle: {
    color: '#ffffff',
  },
  typeDescription: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'center',
  },
  selectedTypeDescription: {
    color: '#d1d5db',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  },
  nextButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#374151',
  },
  nextButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 6,
  },
});
