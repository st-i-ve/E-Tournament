import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import {
  currentUser,
  mockTournaments,
  recentMatches,
} from '@/data/enhancedMockData';
import { Separator } from '@/trash/components/ui/separator';
import TournamentCard from '@/trash/components/TournamentCard';
import QuickActionButton from '@/trash/components/QuickActionButton';
import RecentMatchCard from '@/trash/components/RecentMatchCard';
import CreateTournamentModal from '@/trash/components/CreateTournamentModal';
import JoinTournamentModal from '@/trash/components/JoinTournamentModal';
import DecryptedText from '@/trash/components/DecryptedText';
import MinimalTournamentCard from '@/trash/components/MinimalTournamentCard';
import {
  Calendar,
  Plus,
  Star,
  Target,
  Trophy,
  Users,
} from 'lucide-react-native';

const HomePage = () => {
  const navigation = useNavigation();
  const { user, isAuthenticated } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  const userTournaments = mockTournaments.filter(
    (t) => t.participants.includes(currentUser.id) && t.status === 'active'
  );

  const userRecentMatches = recentMatches.slice(0, 3);

  const handleCreateTournament = () => {
    setIsCreateModalOpen(true);
  };

  const handleJoinTournament = () => {
    setIsJoinModalOpen(true);
  };

  const handleViewLeaderboards = () => {
    navigation.navigate('Leaderboard');
  };

  const handleViewFixtures = () => {
    navigation.navigate('Fixtures');
  };

  const handleTournamentCreated = (tournamentData: any) => {
    console.log('Tournament created:', tournamentData);
    // TODO: Add tournament to state/database
  };

  const handleTournamentJoined = (tournamentId: string) => {
    console.log('Joined tournament:', tournamentId);
    // TODO: Add user to tournament participants
  };

  if (!isAuthenticated) {
    return null; // or loading spinner
  }

  // Use currentUser for display since AuthContext user doesn't have all properties yet
  const displayUser = currentUser;

  // Get initials from username
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.container}>
      {/* Background shapes */}
      <View style={styles.backgroundShapes}>
        {/* Triangles */}
        <View style={[styles.triangle, styles.triangle1]} />
        <View style={[styles.triangle, styles.triangle2]} />
        <View style={[styles.triangle, styles.triangle3]} />

        {/* Circles */}
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />

        {/* Rectangles */}
        <View style={[styles.rectangle, styles.rectangle1]} />
        <View style={[styles.rectangle, styles.rectangle2]} />

        {/* Lines */}
        <View style={[styles.line, styles.line1]} />
        <View style={[styles.line, styles.line2]} />
        <View style={[styles.line, styles.line3]} />
      </View>

      {/* Header */}
      <ImageBackground
        style={styles.header}
        source={require('@/assets/images/abstract-bg.png')} // You'll need to create this image
      >
        <View style={styles.headerContent}>
          <View style={styles.userInfoContainer}>
            <View style={styles.avatarContainer}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: displayUser.teamColor },
                ]}
              >
                <Text style={styles.avatarText}>F</Text>
              </View>
              <View style={styles.badge}>
                <Star size={12} color="white" />
              </View>
            </View>
            <View style={styles.userTextContainer}>
              <DecryptedText
                text="Welcome back,"
                style={styles.welcomeText}
                interval={30}
              />
              <DecryptedText
                text={user?.username || displayUser.username}
                style={styles.usernameText}
                interval={30}
              />
              <Text style={styles.teamName}>
                {user?.teamName || displayUser.teamName}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={16} color="#4ADE80" />
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.quickActionsGrid}>
            <QuickActionButton
              icon={Plus}
              title="Create Tournament"
              description="Start your own league"
              onPress={handleCreateTournament}
              variant="primary"
            />
            <QuickActionButton
              icon={Users}
              title="Join Tournament"
              description="Find tournaments"
              onPress={handleJoinTournament}
              variant="secondary"
            />
            <QuickActionButton
              icon={Trophy}
              title="Leaderboards"
              description="Check rankings"
              onPress={handleViewLeaderboards}
              variant="secondary"
            />
            <QuickActionButton
              icon={Calendar}
              title="Fixtures"
              description="View matches"
              onPress={handleViewFixtures}
              variant="secondary"
            />
          </View>
        </View>

        <Separator style={styles.separator} />

        {/* My Tournaments */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithCount}>
            <View style={styles.sectionHeader}>
              <Trophy size={16} color="#4ADE80" />
              <Text style={styles.sectionTitle}>My Tournaments</Text>
            </View>
            <Text style={styles.countText}>{userTournaments.length}/5</Text>
          </View>

          {userTournaments.length > 0 ? (
            <View style={styles.tournamentsList}>
              {userTournaments.map((tournament) => (
                <MinimalTournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  isAdmin={tournament.adminId === currentUser.id}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Target size={20} color="#6B7280" style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>No Active Tournaments</Text>
              <Text style={styles.emptyDescription}>
                Join or create a tournament to start playing
              </Text>
              <View style={styles.emptyButtons}>
                <TouchableOpacity
                  onPress={handleCreateTournament}
                  style={styles.primaryButton}
                >
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleJoinTournament}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.buttonText}>Join</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <Separator style={styles.separator} />

        {/* Recent Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={16} color="#4ADE80" />
            <Text style={styles.sectionTitle}>Recent Matches</Text>
          </View>
          <View style={styles.matchesList}>
            {userRecentMatches.map((match) => (
              <RecentMatchCard
                key={match.id}
                match={match}
                userTeam={displayUser.teamName}
              />
            ))}
          </View>

          {userRecentMatches.length === 0 && (
            <View style={styles.emptyState}>
              <Calendar size={24} color="#6B7280" style={styles.emptyIcon} />
              <Text style={styles.emptyDescription}>No recent matches</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modals */}
      <CreateTournamentModal
        isVisible={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTournament={handleTournamentCreated}
      />

      <JoinTournamentModal
        isVisible={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoinTournament={handleTournamentJoined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  triangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  triangle1: {
    top: 80,
    left: 40,
    width: 32,
    height: 32,
  },
  triangle2: {
    top: '33%',
    right: 80,
    width: 24,
    height: 24,
    transform: [{ rotate: '12deg' }],
  },
  triangle3: {
    bottom: '25%',
    left: '25%',
    width: 40,
    height: 40,
  },
  circle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.1)',
    borderRadius: 9999,
  },
  circle1: {
    top: '25%',
    left: '33%',
    width: 48,
    height: 48,
  },
  circle2: {
    bottom: '33%',
    right: '25%',
    width: 32,
    height: 32,
  },
  circle3: {
    top: '66%',
    left: 80,
    width: 24,
    height: 24,
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.1)',
  },
  rectangle1: {
    top: '50%',
    right: 40,
    width: 48,
    height: 32,
  },
  rectangle2: {
    bottom: 80,
    left: '50%',
    width: 32,
    height: 48,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'rgba(74, 222, 128, 0.05)',
  },
  line1: {
    top: 0,
    left: '25%',
    width: 1,
    height: '100%',
  },
  line2: {
    top: '33%',
    left: 0,
    width: '100%',
    height: 1,
  },
  line3: {
    top: '66%',
    left: 0,
    width: '100%',
    height: 1,
  },
  header: {
    width: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  headerContent: {
    padding: 24,
    paddingBottom: 32,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#4ADE80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: '#4ADE80',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'monospace',
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'monospace',
  },
  teamName: {
    color: '#4ADE80',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionHeaderWithCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  countText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  separator: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    marginVertical: 24,
  },
  tournamentsList: {
    gap: 8,
  },
  matchesList: {
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyIcon: {
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  emptyDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  emptyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#16A34A',
    borderRadius: 8,
  },
  secondaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#1F2937',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
});

export default HomePage;
