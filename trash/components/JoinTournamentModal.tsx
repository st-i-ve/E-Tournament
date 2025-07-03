import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Search, Users, Trophy, Calendar, MapPin } from 'lucide-react-native';

interface JoinTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinTournament: (tournamentId: string) => void;
}

const JoinTournamentModal = ({
  isOpen,
  onClose,
  onJoinTournament,
}: JoinTournamentModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock available tournaments
  const availableTournaments = [
    {
      id: 'tour-4',
      name: 'Summer Championship',
      type: 'league',
      totalParticipants: 6,
      maxParticipants: 12,
      adminName: 'striker_pro',
      matchDays: ['Monday', 'Wednesday', 'Friday'],
      status: 'recruiting',
    },
    {
      id: 'tour-5',
      name: 'Quick Fire Cup',
      type: 'knockout',
      totalParticipants: 4,
      maxParticipants: 8,
      adminName: 'midfield_master',
      matchDays: ['Saturday', 'Sunday'],
      status: 'recruiting',
    },
    {
      id: 'tour-6',
      name: 'Legends League',
      type: 'league',
      totalParticipants: 8,
      maxParticipants: 10,
      adminName: 'defense_king',
      matchDays: ['Tuesday', 'Thursday'],
      status: 'recruiting',
    },
  ];

  const filteredTournaments = availableTournaments.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.adminName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoin = (tournamentId: string) => {
    onJoinTournament(tournamentId);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Users size={20} color="#34D399" />
              <Text style={styles.title}>Join Tournament</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Search size={16} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search tournaments..."
              placeholderTextColor="#6B7280"
              style={styles.searchInput}
            />
          </View>

          {/* Tournament List */}
          <ScrollView style={styles.scrollContainer}>
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map((tournament) => (
                <View key={tournament.id} style={styles.card}>
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <View style={styles.tournamentInfo}>
                        <View style={styles.tournamentTitle}>
                          <View style={styles.trophyIcon}>
                            <Trophy size={12} color="#34D399" />
                          </View>
                          <Text style={styles.tournamentName}>
                            {tournament.name}
                          </Text>
                        </View>

                        <View style={styles.badgeContainer}>
                          <View
                            style={[
                              styles.badge,
                              tournament.type === 'league'
                                ? styles.leagueBadge
                                : styles.knockoutBadge,
                            ]}
                          >
                            <Text
                              style={[
                                styles.badgeText,
                                tournament.type === 'league'
                                  ? styles.leagueBadgeText
                                  : styles.knockoutBadgeText,
                              ]}
                            >
                              {tournament.type.toUpperCase()}
                            </Text>
                          </View>
                          <View style={styles.recruitingBadge}>
                            <Text style={styles.recruitingBadgeText}>
                              RECRUITING
                            </Text>
                          </View>
                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() => handleJoin(tournament.id)}
                        style={styles.joinButton}
                      >
                        <Text style={styles.joinButtonText}>Join</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.tournamentDetails}>
                      <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                          <Users size={12} color="#9CA3AF" />
                          <Text style={styles.detailText}>
                            {tournament.totalParticipants}/
                            {tournament.maxParticipants} players
                          </Text>
                        </View>
                        <View style={styles.detailItem}>
                          <MapPin size={12} color="#9CA3AF" />
                          <Text style={styles.detailText}>
                            by {tournament.adminName}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.detailItem}>
                        <Calendar size={12} color="#9CA3AF" />
                        <Text style={styles.detailText}>
                          {tournament.matchDays.join(', ')}
                        </Text>
                      </View>
                    </View>

                    {/* Progress bar */}
                    <View style={styles.progressBarContainer}>
                      <View style={styles.progressBarBackground}>
                        <View
                          style={[
                            styles.progressBarFill,
                            {
                              width: `${
                                (tournament.totalParticipants /
                                  tournament.maxParticipants) *
                                100
                              }%`,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <Search size={32} color="#6B7280" />
                </View>
                <Text style={styles.emptyTitle}>No tournaments found</Text>
                <Text style={styles.emptyText}>
                  Try adjusting your search or check back later
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Can't find what you're looking for? Create your own tournament!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#3A3A3C',
    color: 'white',
    borderRadius: 8,
    paddingLeft: 40,
    paddingVertical: 12,
    fontSize: 14,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A3C',
    marginBottom: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tournamentInfo: {
    flex: 1,
  },
  tournamentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  trophyIcon: {
    width: 24,
    height: 24,
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tournamentName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  leagueBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  leagueBadgeText: {
    color: '#60A5FA',
  },
  knockoutBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
  },
  knockoutBadgeText: {
    color: '#A78BFA',
  },
  recruitingBadge: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  recruitingBadgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: '#34D399',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  tournamentDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  progressBarContainer: {
    marginTop: 12,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#3A3A3C',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#34D399',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#3A3A3C',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#3A3A3C',
  },
  footerText: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default JoinTournamentModal;
