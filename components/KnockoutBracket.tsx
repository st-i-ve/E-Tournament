import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Trophy, Users } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

// Mock data
const mockUsers = [
  { id: 1, username: 'Player1' },
  { id: 2, username: 'Player2' },
  { id: 3, username: 'Player3' },
  { id: 4, username: 'Player4' },
  { id: 5, username: 'Player5' },
  { id: 6, username: 'Player6' },
  { id: 7, username: 'Player7' },
  { id: 8, username: 'CurrentPlayer', isCurrent: true },
];

const currentUser = { id: 8 };

// Generate knockout bracket structure
const generateBracketData = () => {
  const participants = mockUsers.slice(0, 8); // 8 participants for clean bracket

  // Round of 8 (Quarterfinals)
  const quarterfinals = [
    {
      id: 'qf1',
      round: 'quarterfinal',
      player1: participants[0],
      player2: participants[7],
      winner: participants[0],
      score: '3-1',
    },
    {
      id: 'qf2',
      round: 'quarterfinal',
      player1: participants[1],
      player2: participants[6],
      winner: participants[1],
      score: '2-0',
    },
    {
      id: 'qf3',
      round: 'quarterfinal',
      player1: participants[2],
      player2: participants[5],
      winner: participants[2],
      score: '4-2',
    },
    {
      id: 'qf4',
      round: 'quarterfinal',
      player1: participants[3],
      player2: participants[4],
      winner: participants[3],
      score: '1-0',
    },
  ];

  // Semifinals
  const semifinals = [
    {
      id: 'sf1',
      round: 'semifinal',
      player1: quarterfinals[0].winner,
      player2: quarterfinals[1].winner,
      winner: quarterfinals[0].winner,
      score: '2-1',
    },
    {
      id: 'sf2',
      round: 'semifinal',
      player1: quarterfinals[2].winner,
      player2: quarterfinals[3].winner,
      winner: quarterfinals[2].winner,
      score: '3-0',
    },
  ];

  // Final
  const final = {
    id: 'final',
    round: 'final',
    player1: semifinals[0].winner,
    player2: semifinals[1].winner,
    winner: null, // Upcoming match
    score: null,
  };

  return { quarterfinals, semifinals, final };
};

const MatchCard = ({
  match,
  isUpcoming = false,
}: {
  match: any;
  isUpcoming?: boolean;
}) => {
  const isCurrentUserMatch =
    match.player1?.id === currentUser.id ||
    match.player2?.id === currentUser.id;

  return (
    <TouchableOpacity
      style={[
        styles.matchCard,
        isCurrentUserMatch && styles.currentUserMatchCard,
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.matchContent}>
        {/* Player 1 */}
        <View style={styles.playerRow}>
          <Text
            style={[
              styles.playerText,
              match.winner?.id === match.player1?.id && styles.winnerText,
              isUpcoming && !match.winner && styles.upcomingPlayerText,
            ]}
            numberOfLines={1}
          >
            {match.player1?.username.substring(0, 6)}
          </Text>
          {match.score && !isUpcoming && (
            <Text style={styles.scoreText}>{match.score.split('-')[0]}</Text>
          )}
        </View>

        {/* VS or Score */}
        <View style={styles.vsContainer}>
          {isUpcoming ? (
            <Text style={styles.vsText}>VS</Text>
          ) : (
            <View style={styles.scoreLine} />
          )}
        </View>

        {/* Player 2 */}
        <View style={styles.playerRow}>
          <Text
            style={[
              styles.playerText,
              match.winner?.id === match.player2?.id && styles.winnerText,
              isUpcoming && !match.winner && styles.upcomingPlayerText,
            ]}
            numberOfLines={1}
          >
            {match.player2?.username.substring(0, 6)}
          </Text>
          {match.score && !isUpcoming && (
            <Text style={styles.scoreText}>{match.score.split('-')[1]}</Text>
          )}
        </View>
      </View>

      {isUpcoming && (
        <View style={styles.upcomingBadge}>
          <Text style={styles.upcomingBadgeText}>UP</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const KnockoutBracket = () => {
  const navigation = useNavigation();
  const { quarterfinals, semifinals, final } = generateBracketData();

  return (
    <View style={styles.container}>
      {/* Bracket Container */}
      <ScrollView horizontal style={styles.scrollContainer}>
        <View style={styles.bracketContainer}>
          {/* Quarterfinals */}
          <View style={styles.roundContainer}>
            <Text style={styles.roundTitle}>Quarterfinals</Text>
            <View style={styles.matchesContainer}>
              {quarterfinals.map((match) => (
                <View key={match.id} style={styles.matchWrapper}>
                  <MatchCard match={match} />
                </View>
              ))}
            </View>
          </View>

          {/* Connection Lines */}
          <View style={styles.connectionsContainer}>
            <View style={styles.connectionsColumn}>
              {[0, 1].map((i) => (
                <View key={i} style={styles.connectionGroup}>
                  <View style={styles.connectionLine} />
                  <View style={styles.connectionBracket} />
                  <View style={styles.connectionLine} />
                </View>
              ))}
            </View>
          </View>

          {/* Semifinals */}
          <View style={styles.roundContainer}>
            <Text style={styles.roundTitle}>Semifinals</Text>
            <View style={styles.matchesContainer}>
              {semifinals.map((match) => (
                <View key={match.id} style={styles.semifinalMatchWrapper}>
                  <MatchCard match={match} />
                </View>
              ))}
            </View>
          </View>

          {/* Connection Lines to Final */}
          <View style={styles.finalConnectionsContainer}>
            <View style={styles.connectionGroup}>
              <View style={styles.connectionLine} />
              <View style={styles.finalConnectionBracket} />
              <View style={styles.connectionLine} />
            </View>
          </View>

          {/* Final */}
          <View style={styles.finalContainer}>
            <Text style={styles.roundTitle}>Final</Text>
            <View style={styles.matchWrapper}>
              <MatchCard match={final} isUpcoming={true} />
            </View>
            <View style={styles.trophyContainer}>
              <Trophy size={20} color="#f59e0b" />
              <Text style={styles.trophyText}>Champion</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Tournament Info */}
      <View style={styles.tournamentInfo}>
        <Users size={12} color="#9CA3AF" />
        <Text style={styles.tournamentInfoText}>
          8 players • Single elimination
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  bracketContainer: {
    flexDirection: 'row',
    minWidth: 500,
    paddingVertical: 16,
  },
  roundContainer: {
    justifyContent: 'center',
  },
  roundTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 8,
  },
  matchesContainer: {
    justifyContent: 'space-around',
  },
  matchWrapper: {
    marginBottom: 12,
  },
  semifinalMatchWrapper: {
    marginBottom: 48,
  },
  matchCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
    width: 96,
  },
  currentUserMatchCard: {
    borderColor: 'rgba(16, 185, 129, 0.5)',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  matchContent: {
    gap: 4,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerText: {
    fontSize: 10,
    color: '#9CA3AF',
    maxWidth: 50,
  },
  upcomingPlayerText: {
    color: '#FFFFFF',
  },
  winnerText: {
    color: '#4ADE80',
    fontWeight: '500',
  },
  scoreText: {
    fontSize: 9,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  vsContainer: {
    alignItems: 'center',
  },
  vsText: {
    fontSize: 8,
    color: '#6B7280',
  },
  scoreLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#6B7280',
  },
  upcomingBadge: {
    marginTop: 4,
    alignSelf: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.3)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  upcomingBadgeText: {
    fontSize: 8,
    color: '#F59E0B',
  },
  connectionsContainer: {
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  connectionsColumn: {
    justifyContent: 'space-around',
    height: '100%',
    gap: 48,
  },
  connectionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionLine: {
    width: 24,
    height: 1,
    backgroundColor: '#4B5563',
  },
  connectionBracket: {
    width: 8,
    height: 48,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#4B5563',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  finalConnectionsContainer: {
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  finalConnectionBracket: {
    width: 8,
    height: 96,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#4B5563',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  finalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  trophyText: {
    fontSize: 9,
    color: '#9CA3AF',
    marginTop: 4,
  },
  tournamentInfo: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  tournamentInfoText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default KnockoutBracket;
