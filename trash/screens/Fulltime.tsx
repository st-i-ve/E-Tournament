import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Trophy, Calendar, Filter, Search } from 'lucide-react-native';
import Header from '../trash/components/Header';
import DetailedMatchCard from '../components/DetailedMatchCard';
import { detailedMatches, DetailedMatch } from '../../data/matchStats';
import { currentUser } from '../../data/enhancedMockData';
import { Picker } from '@react-native-picker/picker';

const FulltimePage = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTournament, setFilterTournament] = useState<string>('all');

  const userTeam = currentUser.teamName;

  // Get unique tournaments for filter
  const tournaments = Array.from(
    new Set(
      detailedMatches.map((match) => match.tournament_name).filter(Boolean)
    )
  );

  // Filter matches based on search and tournament filter
  const filteredMatches = detailedMatches.filter((match) => {
    const matchesSearch =
      searchTerm === '' ||
      match.team_home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team_away.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.tournament_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTournament =
      filterTournament === 'all' || match.tournament_name === filterTournament;

    return matchesSearch && matchesTournament;
  });

  // Calculate user's record
  const userMatches = detailedMatches.filter(
    (match) =>
      match.team_home.name === userTeam || match.team_away.name === userTeam
  );

  const wins = userMatches.filter((match) => {
    const isHome = match.team_home.name === userTeam;
    return (
      (isHome && match.team_home.score > match.team_away.score) ||
      (!isHome && match.team_away.score > match.team_home.score)
    );
  }).length;

  const draws = userMatches.filter(
    (match) => match.team_home.score === match.team_away.score
  ).length;
  const losses = userMatches.length - wins - draws;

  const handleViewDetails = (match: DetailedMatch) => {
    navigation.navigate('MatchStats', { matchId: match.match_id });
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* Page Header */}
      <View style={styles.pageHeader}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Trophy color="#4ade80" size={20} />
          </View>
          <View>
            <Text style={styles.pageTitle}>Match History</Text>
            <Text style={styles.pageSubtitle}>
              Completed matches and detailed statistics
            </Text>
          </View>
        </View>

        {/* User Record Summary */}
        <View style={styles.recordContainer}>
          <View style={styles.recordContent}>
            <Text style={styles.recordTitle}>Your Record</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.winStat}>{wins}</Text>
                <Text style={styles.statLabel}>Wins</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.drawStat}>{draws}</Text>
                <Text style={styles.statLabel}>Draws</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.lossStat}>{losses}</Text>
                <Text style={styles.statLabel}>Losses</Text>
              </View>
            </View>
          </View>
          <View style={styles.totalMatchesContainer}>
            <Text style={styles.totalMatches}>{userMatches.length}</Text>
            <Text style={styles.totalMatchesLabel}>Total Matches</Text>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.filterContainer}>
          <View style={styles.searchContainer}>
            <Search color="#9ca3af" size={16} style={styles.searchIcon} />
            <TextInput
              placeholder="Search matches or teams..."
              placeholderTextColor="#9ca3af"
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
            />
          </View>
          <View style={styles.tournamentFilter}>
            <Filter color="#9ca3af" size={16} />
            <Picker
              selectedValue={filterTournament}
              onValueChange={(itemValue) => setFilterTournament(itemValue)}
              style={styles.picker}
              dropdownIconColor="#9ca3af"
            >
              <Picker.Item label="All Tournaments" value="all" />
              {tournaments.map((tournament) => (
                <Picker.Item
                  key={tournament}
                  label={tournament}
                  value={tournament}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      {/* Match List */}
      <ScrollView style={styles.matchList}>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <DetailedMatchCard
              key={match.match_id}
              match={match}
              userTeam={userTeam}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Calendar color="#6b7280" size={48} />
            <Text style={styles.emptyStateTitle}>No Matches Found</Text>
            <Text style={styles.emptyStateText}>
              {searchTerm || filterTournament !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No completed matches available yet'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 96,
  },
  pageHeader: {
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  recordContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recordContent: {
    flex: 1,
  },
  recordTitle: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  winStat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4ade80',
    marginBottom: 4,
  },
  drawStat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#facc15',
    marginBottom: 4,
  },
  lossStat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f87171',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  totalMatchesContainer: {
    alignItems: 'flex-end',
  },
  totalMatches: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  totalMatchesLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
    paddingLeft: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: 'white',
    fontSize: 14,
  },
  tournamentFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
    paddingLeft: 12,
  },
  picker: {
    width: 150,
    height: 40,
    color: 'white',
  },
  matchList: {
    flex: 1,
  },
  emptyState: {
    backgroundColor: 'rgba(17, 24, 39, 0.3)',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FulltimePage;
