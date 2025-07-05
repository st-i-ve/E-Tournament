import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Trophy, Users, Calendar, Target, Star } from 'lucide-react-native';
import { QuickActionButton } from '@/components/QuickActionButton';
import { MinimalTournamentCard } from '@/components/MinimalTournamentCard';
import { RecentMatchCard } from '@/components/RecentMatchCard';
import { CreateTournamentModal } from '@/components/CreateTournamentModal';
import { JoinTournamentModal } from '@/components/JoinTournamentModal';
import { DecryptedText } from '@/components/DecryptedText';
import { Separator } from '@/components/ui/separator';

export default function HomeTab() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Mock data
  const displayUser = {
    username: 'google_user',
    teamName: 'Barcelona FC',
    teamColor: '#22c55e',
  };

  const userTournaments = [
    {
      id: 1,
      name: 'Premier League Champions',
      type: 'league',
      participants: 8,
      position: 2,
      status: 'active',
      adminId: 'user-1',
    },
  ];

  const userRecentMatches = [
    {
      id: 1,
      homeTeam: 'Barcelona FC',
      awayTeam: 'Real Madrid',
      homeScore: 2,
      awayScore: 1,
      date: '2025-01-15',
      status: 'completed',
    },
    {
      id: 2,
      homeTeam: 'Manchester City',
      awayTeam: 'Barcelona FC',
      homeScore: 1,
      awayScore: 3,
      date: '2025-01-12',
      status: 'completed',
    },
  ];

  const handleCreateTournament = () => {
    setIsCreateModalOpen(true);
  };

  const handleJoinTournament = () => {
    setIsJoinModalOpen(true);
  };

  const handleTournamentCreated = (tournamentData: any) => {
    console.log('Tournament created:', tournamentData);
    setIsCreateModalOpen(false);
  };

  const handleTournamentJoined = (tournamentId: string) => {
    console.log('Joined tournament:', tournamentId);
    setIsJoinModalOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Geometric background */}
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
          <View style={styles.headerBackground}>
            {/* Abstract geometric background shapes */}
            <View style={styles.headerShapes}>
              <View style={[styles.headerTriangle, { top: 16, left: 32 }]} />
              <View style={[styles.headerTriangle, { top: 48, right: 48, transform: [{ rotate: '12deg' }] }]} />
              <View style={[styles.headerCircle, { top: 32, left: '50%', width: 80, height: 80 }]} />
              <View style={[styles.headerCircle, { bottom: 16, right: 32, width: 56, height: 56 }]} />
              <View style={[styles.headerLine, { top: 0, left: '33%' }]} />
              <View style={[styles.headerHorizontalLine, { top: '50%' }]} />
            </View>
            
            <View style={styles.headerContent}>
              <View style={styles.userContainer}>
                <View style={styles.avatarContainer}>
                  <View style={[styles.avatar, { backgroundColor: displayUser.teamColor }]}>
                    <Text style={styles.avatarText}>F</Text>
                  </View>
                  <View style={styles.starBadge}>
                    <Star color="#22c55e" size={12} fill="#22c55e" />
                  </View>
                </View>
                <View style={styles.userInfo}>
                  <DecryptedText
                    text="Welcome back,"
                    style={styles.welcomeText}
                    interval={30}
                  />
                  <DecryptedText
                    text={displayUser.username}
                    style={styles.userName}
                    interval={30}
                  />
                  <Text style={styles.userTeam}>{displayUser.teamName}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Quick Actions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Target color="#22c55e" size={16} />
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>
            <View style={styles.actionsGrid}>
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
                onPress={() => {}}
                variant="secondary"
              />
              <QuickActionButton
                icon={Calendar}
                title="Fixtures"
                description="View matches"
                onPress={() => {}}
                variant="secondary"
              />
            </View>
          </View>

          <Separator style={styles.separator} />

          {/* My Tournaments */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderWithBadge}>
              <View style={styles.sectionHeader}>
                <Trophy color="#22c55e" size={16} />
                <Text style={styles.sectionTitle}>My Tournaments</Text>
              </View>
              <Text style={styles.sectionBadge}>{userTournaments.length}/5</Text>
            </View>
            
            {userTournaments.length > 0 ? (
              <View style={styles.tournamentsList}>
                {userTournaments.map((tournament) => (
                  <MinimalTournamentCard
                    key={tournament.id}
                    tournament={tournament}
                    isAdmin={tournament.adminId === 'user-1'}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Target color="#6b7280" size={20} />
                <Text style={styles.emptyStateTitle}>No Active Tournaments</Text>
                <Text style={styles.emptyStateDescription}>Join or create a tournament to start playing</Text>
                <View style={styles.emptyStateActions}>
                  <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={handleCreateTournament}
                  >
                    <Text style={styles.primaryButtonText}>Create</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={handleJoinTournament}
                  >
                    <Text style={styles.secondaryButtonText}>Join</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <Separator style={styles.separator} />

          {/* Recent Matches */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Calendar color="#22c55e" size={16} />
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
                <Calendar color="#6b7280" size={24} />
                <Text style={styles.emptyStateDescription}>No recent matches</Text>
              </View>
            )}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Modals */}
      <CreateTournamentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTournament={handleTournamentCreated}
      />
      
      <JoinTournamentModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoinTournament={handleTournamentJoined}
      />
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
    marginBottom: 8,
  },
  headerBackground: {
    backgroundColor: '#0a0a0a',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  headerShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  headerTriangle: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    transform: [{ rotate: '45deg' }],
  },
  headerCircle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.15)',
    borderRadius: 50,
  },
  headerLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  headerHorizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  headerContent: {
    padding: 24,
    paddingBottom: 32,
    zIndex: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  starBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#0a0a0a',
    borderRadius: 10,
    padding: 4,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  userName: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  userTeam: {
    color: '#22c55e',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginTop: 4,
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderWithBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  sectionBadge: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  separator: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
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
  emptyStateTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    marginTop: 8,
    marginBottom: 4,
  },
  emptyStateDescription: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyStateActions: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Inter-Medium',
  },
  secondaryButton: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Inter-Medium',
  },
  bottomSpacing: {
    height: 80,
  },
});