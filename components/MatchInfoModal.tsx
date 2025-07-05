import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X, Circle, Users, Target, TrendingUp, Flag } from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  scheduledDate: string;
  status: string;
  tournamentId: string;
}

interface MatchInfoModalProps {
  match: Match | null;
  userTeam: string;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data
const mockTournaments = [
  {
    id: 'tournament-1',
    name: 'Champions Elite League',
  },
];

const mockUsers = [
  {
    username: 'google_user',
    teamName: 'Barcelona FC',
    totalGoals: 15,
    totalMatches: 12,
    winRate: 75,
    totalAssists: 8,
  },
  {
    username: 'real_madrid_fan',
    teamName: 'Real Madrid',
    totalGoals: 12,
    totalMatches: 10,
    winRate: 80,
    totalAssists: 6,
  },
];

export const MatchInfoModal: React.FC<MatchInfoModalProps> = ({ 
  match, 
  userTeam, 
  isOpen, 
  onClose 
}) => {
  if (!match) return null;

  const isHomeTeam = match.homeTeam === userTeam;
  const opponentTeam = isHomeTeam ? match.awayTeam : match.homeTeam;
  const tournament = mockTournaments.find(t => t.id === match.tournamentId);
  const opponentUser = mockUsers.find(user => user.teamName === opponentTeam);
  const currentUserData = mockUsers.find(user => user.teamName === userTeam);

  // Mock head-to-head stats
  const h2hStats = {
    wins: 2,
    draws: 1,
    losses: 1,
    goalsFor: 6,
    goalsAgainst: 4,
    totalMatches: 4,
  };

  // Mock recent form
  const opponentForm = ['W', 'L', 'D', 'W', 'L'];

  const getPlayerAvatar = (username: string) => {
    const initial = username.charAt(0).toUpperCase();
    return (
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
    );
  };

  const getFormIcon = (result: string) => {
    const styles_form = {
      W: { backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' },
      L: { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' },
      D: { backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' },
    };
    const style = styles_form[result as keyof typeof styles_form];
    
    return (
      <View style={[styles.formIcon, { backgroundColor: style.backgroundColor }]}>
        <Text style={[styles.formIconText, { color: style.color }]}>{result}</Text>
      </View>
    );
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Circle color="#22c55e" size={20} />
              <Text style={styles.title}>Match Details</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Tournament Badge */}
            {tournament && (
              <View style={styles.tournamentBadgeContainer}>
                <Badge variant="outline" style={styles.tournamentBadge}>
                  {tournament.name}
                </Badge>
              </View>
            )}

            {/* Players Section */}
            <View style={styles.playersSection}>
              <View style={styles.playerContainer}>
                {currentUserData && getPlayerAvatar(currentUserData.username)}
                <View>
                  <Text style={styles.playerName}>
                    {isHomeTeam ? currentUserData?.username : opponentUser?.username}
                  </Text>
                  <Text style={styles.playerRole}>
                    {isHomeTeam ? 'You (Home)' : 'Opponent (Home)'}
                  </Text>
                </View>
              </View>

              <Text style={styles.vsText}>VS</Text>

              <View style={styles.playerContainer}>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>
                    {isHomeTeam ? opponentUser?.username : currentUserData?.username}
                  </Text>
                  <Text style={styles.playerRole}>
                    {isHomeTeam ? 'Opponent (Away)' : 'You (Away)'}
                  </Text>
                </View>
                {isHomeTeam ? 
                  (opponentUser && getPlayerAvatar(opponentUser.username)) : 
                  (currentUserData && getPlayerAvatar(currentUserData.username))
                }
              </View>
            </View>

            {/* Match Date */}
            <View style={styles.dateSection}>
              <Text style={styles.matchDate}>
                {new Date(match.scheduledDate).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </View>

            {/* Opponent Stats Section */}
            {opponentUser && (
              <>
                <View style={styles.separator} />
                
                {/* Head-to-Head Record */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Flag color="#f59e0b" size={16} />
                    <Text style={styles.sectionTitle}>Head-to-Head Record</Text>
                  </View>
                  {h2hStats.totalMatches > 0 ? (
                    <View>
                      <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                          <Text style={styles.statValue}>{h2hStats.wins}</Text>
                          <Text style={styles.statLabel}>Wins</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Text style={[styles.statValue, { color: '#f59e0b' }]}>{h2hStats.draws}</Text>
                          <Text style={styles.statLabel}>Draws</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Text style={[styles.statValue, { color: '#ef4444' }]}>{h2hStats.losses}</Text>
                          <Text style={styles.statLabel}>Losses</Text>
                        </View>
                      </View>
                      <Text style={styles.goalsText}>
                        Goals: {h2hStats.goalsFor} - {h2hStats.goalsAgainst} ({h2hStats.totalMatches} matches)
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.noDataText}>No previous matches</Text>
                  )}
                </View>

                <View style={styles.separator} />

                {/* Season Stats */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Target color="#3b82f6" size={16} />
                    <Text style={styles.sectionTitle}>Season Stats</Text>
                  </View>
                  <View style={styles.statsList}>
                    <View style={styles.statsRow}>
                      <Text style={styles.statsLabel}>Goals:</Text>
                      <Text style={styles.statsValue}>{opponentUser.totalGoals}</Text>
                    </View>
                    <View style={styles.statsRow}>
                      <Text style={styles.statsLabel}>Matches:</Text>
                      <Text style={styles.statsValue}>{opponentUser.totalMatches}</Text>
                    </View>
                    <View style={styles.statsRow}>
                      <Text style={styles.statsLabel}>Win Rate:</Text>
                      <Text style={styles.statsValue}>{opponentUser.winRate}%</Text>
                    </View>
                    <View style={styles.statsRow}>
                      <Text style={styles.statsLabel}>Assists:</Text>
                      <Text style={styles.statsValue}>{opponentUser.totalAssists}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.separator} />

                {/* Recent Form */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <TrendingUp color="#8b5cf6" size={16} />
                    <Text style={styles.sectionTitle}>Recent Form</Text>
                  </View>
                  <View style={styles.formContainer}>
                    {opponentForm.map((result, index) => (
                      <View key={index}>
                        {getFormIcon(result)}
                      </View>
                    ))}
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    margin: 20,
    maxWidth: 350,
    width: '90%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  tournamentBadgeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tournamentBadge: {
    backgroundColor: 'transparent',
    borderColor: '#6b7280',
  },
  playersSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playerInfo: {
    alignItems: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  playerName: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  playerRole: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  vsText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  dateSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  matchDate: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  separator: {
    height: 1,
    backgroundColor: '#374151',
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#22c55e',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  goalsText: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  noDataText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  statsList: {
    gap: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsLabel: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  statsValue: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  formIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formIconText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
});