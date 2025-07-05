import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { X, Search, Trophy, Users } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JoinTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinTournament: (tournamentId: string) => void;
}

export const JoinTournamentModal: React.FC<JoinTournamentModalProps> = ({
  isOpen,
  onClose,
  onJoinTournament,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock tournaments
  const availableTournaments = [
    {
      id: 'tournament-1',
      name: 'Weekend Warriors Cup',
      type: 'knockout',
      participants: 6,
      maxParticipants: 8,
      status: 'open',
    },
    {
      id: 'tournament-2',
      name: 'Elite Champions League',
      type: 'league',
      participants: 4,
      maxParticipants: 6,
      status: 'open',
    },
    {
      id: 'tournament-3',
      name: 'Summer Tournament',
      type: 'league',
      participants: 8,
      maxParticipants: 8,
      status: 'full',
    },
  ];

  const filteredTournaments = availableTournaments.filter(tournament =>
    tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoin = (tournamentId: string) => {
    onJoinTournament(tournamentId);
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
              <Users color="#22c55e" size={20} />
              <Text style={styles.title}>Join Tournament</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search color="#9ca3af" size={16} />
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search tournaments..."
                placeholderTextColor="#6b7280"
              />
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {filteredTournaments.map((tournament) => (
              <View key={tournament.id} style={styles.tournamentCard}>
                <View style={styles.tournamentInfo}>
                  <Text style={styles.tournamentName}>{tournament.name}</Text>
                  <Text style={styles.tournamentDetails}>
                    {tournament.type} • {tournament.participants}/{tournament.maxParticipants} players
                  </Text>
                </View>
                <View style={styles.tournamentActions}>
                  <Badge 
                    variant={tournament.status === 'open' ? 'default' : 'outline'}
                    style={tournament.status === 'full' ? styles.fullBadge : undefined}
                  >
                    {tournament.status}
                  </Badge>
                  <Button
                    onPress={() => handleJoin(tournament.id)}
                    disabled={tournament.status === 'full'}
                    size="sm"
                    style={[
                      styles.joinButton,
                      tournament.status === 'full' && styles.joinButtonDisabled,
                    ]}
                  >
                    Join
                  </Button>
                </View>
              </View>
            ))}

            {filteredTournaments.length === 0 && (
              <View style={styles.emptyState}>
                <Trophy color="#6b7280" size={32} />
                <Text style={styles.emptyStateText}>No tournaments found</Text>
                <Text style={styles.emptyStateSubtext}>
                  {searchQuery ? 'Try a different search term' : 'No tournaments available to join'}
                </Text>
              </View>
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
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#1f2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  searchContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
  content: {
    padding: 20,
  },
  tournamentCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tournamentInfo: {
    flex: 1,
  },
  tournamentName: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  tournamentDetails: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  tournamentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fullBadge: {
    backgroundColor: '#ef4444',
  },
  joinButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
  },
  joinButtonDisabled: {
    backgroundColor: '#6b7280',
    opacity: 0.5,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginTop: 12,
  },
  emptyStateSubtext: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
    textAlign: 'center',
  },
});