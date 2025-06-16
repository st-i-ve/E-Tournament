import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {
  Clock,
  Trophy,
  Calendar,
  Filter,
  CheckCircle2,
  Circle,
  X,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import MatchCard from '@/components/MatchCard';
import MatchInfoModal from '@/components/MatchInfoModal';
import DetailedMatchCard from '@/components/DetailedMatchCard';
import {
  currentUser,
  mockMatches,
  mockTournaments,
  Match,
} from '@/data/enhancedMockData';
import { detailedMatches } from '@/data/matchStats';

const SchedulePage = () => {
  const [selectedTournament, setSelectedTournament] = useState<string>('all');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showTournamentSelect, setShowTournamentSelect] = useState(false);
  const navigation = useNavigation();

  // Get all user's matches (both upcoming and completed)
  const upcomingMatches = mockMatches.filter(
    (match) =>
      (match.homeTeam === currentUser.teamName ||
        match.awayTeam === currentUser.teamName) &&
      match.status === 'upcoming'
  );

  const completedMatches = detailedMatches.filter(
    (match) =>
      match.team_home.name === currentUser.teamName ||
      match.team_away.name === currentUser.teamName
  );

  // Get user's tournaments
  const userTournaments = mockTournaments.filter((t) =>
    t.participants.includes(currentUser.id)
  );

  // Group matches by month
  const groupedMatches = useMemo(() => {
    const groups: { [key: string]: { upcoming: Match[]; completed: any[] } } =
      {};

    // Process upcoming matches
    upcomingMatches.forEach((match) => {
      if (
        selectedTournament !== 'all' &&
        match.tournamentId !== selectedTournament
      )
        return;

      const date = new Date(match.scheduledDate);
      const monthKey = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      if (!groups[monthKey]) {
        groups[monthKey] = { upcoming: [], completed: [] };
      }
      groups[monthKey].upcoming.push(match);
    });

    // Process completed matches - use timestamp instead of scheduled_date
    completedMatches.forEach((match) => {
      if (
        selectedTournament !== 'all' &&
        match.tournament_name !== selectedTournament
      )
        return;

      const date = new Date(match.timestamp);
      const monthKey = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      if (!groups[monthKey]) {
        groups[monthKey] = { upcoming: [], completed: [] };
      }
      groups[monthKey].completed.push(match);
    });

    // Sort months
    return Object.keys(groups)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .reduce((acc, key) => {
        acc[key] = groups[key];
        return acc;
      }, {} as typeof groups);
  }, [selectedTournament, upcomingMatches, completedMatches]);

  const handleViewDetails = (match: any) => {
    navigation.navigate('MatchStats', { matchId: match.match_id });
  };

  return (
    <View style={styles.container}>
      {/* Background shapes would be implemented differently in React Native */}
      {/* You might use absolute positioned Views or a background image */}

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <View style={styles.circleIcon}>
              <View style={styles.crossLine} />
            </View>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Schedule</Text>
            <Text style={styles.subtitle}>
              All your matches - upcoming and completed
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Fixtures')}
          >
            <Text style={styles.backButtonText}>Back to Fixtures</Text>
            <View style={styles.buttonOverlay} />
          </TouchableOpacity>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <Circle size={16} color="#60a5fa" />
            <Text style={styles.legendText}>Upcoming</Text>
          </View>
          <View style={styles.legendItem}>
            <CheckCircle2 size={16} color="#34d399" />
            <Text style={styles.legendText}>Completed</Text>
          </View>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <View style={styles.filterContent}>
          <Filter size={16} color="#9ca3af" />
          <TouchableOpacity
            style={styles.selectTrigger}
            onPress={() => setShowTournamentSelect(true)}
          >
            <Text style={styles.selectValue}>
              {selectedTournament === 'all'
                ? 'All Tournaments'
                : userTournaments.find((t) => t.id === selectedTournament)
                    ?.name}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tournament selection modal */}
        <Modal
          visible={showTournamentSelect}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Pressable
                style={styles.modalClose}
                onPress={() => setShowTournamentSelect(false)}
              >
                <X size={24} color="#fff" />
              </Pressable>
              <Text style={styles.modalTitle}>Select Tournament</Text>
              <TouchableOpacity
                style={styles.selectItem}
                onPress={() => {
                  setSelectedTournament('all');
                  setShowTournamentSelect(false);
                }}
              >
                <Text style={styles.selectItemText}>All Tournaments</Text>
              </TouchableOpacity>
              {userTournaments.map((tournament) => (
                <TouchableOpacity
                  key={tournament.id}
                  style={styles.selectItem}
                  onPress={() => {
                    setSelectedTournament(tournament.id);
                    setShowTournamentSelect(false);
                  }}
                >
                  <Text style={styles.selectItemText}>{tournament.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>

      {/* Grouped Matches */}
      <ScrollView style={styles.matchesContainer}>
        {Object.entries(groupedMatches).map(([month, matches]) => (
          <View key={month} style={styles.monthGroup}>
            <View style={styles.monthHeader}>
              <Trophy size={20} color="#34d399" />
              <Text style={styles.monthTitle}>{month}</Text>
            </View>

            <View style={styles.matchesList}>
              {/* Upcoming matches */}
              {matches.upcoming.map((match, index) => (
                <View key={`upcoming-${index}`} style={styles.matchItem}>
                  <Circle size={16} color="#60a5fa" style={styles.matchIcon} />
                  <View style={styles.matchCard}>
                    <MatchCard
                      match={match}
                      userTeam={currentUser.teamName}
                      onInfoClick={setSelectedMatch}
                    />
                  </View>
                </View>
              ))}

              {/* Completed matches */}
              {matches.completed.map((match, index) => (
                <View key={`completed-${index}`} style={styles.matchItem}>
                  <CheckCircle2
                    size={16}
                    color="#34d399"
                    style={styles.matchIcon}
                  />
                  <View style={styles.matchCard}>
                    <DetailedMatchCard
                      match={match}
                      userTeam={currentUser.teamName}
                      onViewDetails={handleViewDetails}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {Object.keys(groupedMatches).length === 0 && (
          <View style={styles.emptyState}>
            <Calendar size={64} color="#6b7280" />
            <Text style={styles.emptyTitle}>No matches found</Text>
            <Text style={styles.emptyText}>
              {selectedTournament === 'all'
                ? 'Join a tournament to start playing matches'
                : 'No matches found in the selected tournament'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Match Info Modal */}
      <MatchInfoModal
        match={selectedMatch}
        userTeam={currentUser.teamName}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 8,
    marginLeft: 8,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginTop: 4,
    flexShrink: 0,
    position: 'relative',
  },
  circleIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'rgba(74, 222, 128, 0.4)',
    borderRadius: 12,
    position: 'relative',
  },
  crossLine: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 32,
    height: 2,
    backgroundColor: 'rgba(74, 222, 128, 0.4)',
    transform: [{ translateX: -16 }, { translateY: -1 }, { rotate: '45deg' }],
  },
  headerText: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 16,
  },
  backButton: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    position: 'relative',
    zIndex: 10,
  },
  buttonOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(75, 85, 99, 0.3)',
    transform: [{ skewX: '-12deg' }, { translateX: -400 }],
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  filters: {
    marginBottom: 32,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  selectTrigger: {
    width: 192,
    backgroundColor: 'rgba(28, 28, 30, 0.5)',
    borderWidth: 0,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectValue: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    width: '80%',
    maxHeight: '60%',
  },
  modalClose: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectItemText: {
    color: '#fff',
  },
  matchesContainer: {
    flex: 1,
  },
  monthGroup: {
    marginBottom: 32,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  matchesList: {
    gap: 16,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  matchIcon: {
    marginTop: 16,
    flexShrink: 0,
  },
  matchCard: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 8,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default SchedulePage;
