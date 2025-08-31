import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Mock tournament data - i updated to show group stages without final winner
const tournamentData = {
  round16: [
    {
      id: 1,
      team1: 'Manchester City',
      team2: 'Real Sociedad',
      score1: 3,
      score2: 1,
      winner: 'team1',
    },
    {
      id: 2,
      team1: 'RB Leipzig',
      team2: 'Liverpool',
      score1: 0,
      score2: 2,
      winner: 'team2',
    },
    {
      id: 3,
      team1: 'Club Brugge',
      team2: 'Benfica',
      score1: 1,
      score2: 2,
      winner: 'team2',
    },
    {
      id: 4,
      team1: 'Dortmund',
      team2: 'Chelsea',
      score1: 2,
      score2: 0,
      winner: 'team1',
    },
    {
      id: 5,
      team1: 'Inter Milan',
      team2: 'Porto',
      score1: 1,
      score2: 0,
      winner: 'team1',
    },
    {
      id: 6,
      team1: 'Bayern Munich',
      team2: 'PSG',
      score1: 3,
      score2: 0,
      winner: 'team1',
    },
    {
      id: 7,
      team1: 'Tottenham',
      team2: 'AC Milan',
      score1: 1,
      score2: 1,
      winner: 'team2',
      aggregate: '1-2',
    },
    {
      id: 8,
      team1: 'Eintracht',
      team2: 'Napoli',
      score1: 0,
      score2: 3,
      winner: 'team2',
    },
  ],
  quarterfinals: [
    {
      id: 9,
      team1: 'Manchester City',
      team2: 'Liverpool',
      score1: 2,
      score2: 1,
      winner: 'team1',
    },
    {
      id: 10,
      team1: 'Benfica',
      team2: 'Dortmund',
      score1: 0,
      score2: 1,
      winner: 'team2',
    },
    {
      id: 11,
      team1: 'Inter Milan',
      team2: 'Bayern Munich',
      score1: 2,
      score2: 0,
      winner: 'team1',
    },
    {
      id: 12,
      team1: 'AC Milan',
      team2: 'Napoli',
      score1: 1,
      score2: 2,
      winner: 'team2',
    },
  ],
  semifinals: [
    {
      id: 13,
      team1: 'Manchester City',
      team2: 'Dortmund',
      // i removed scores to show pending matches
    },
    {
      id: 14,
      team1: 'Inter Milan',
      team2: 'Napoli',
      // i removed scores to show pending matches
    },
  ],
  final: [
    {
      id: 15,
      team1: 'TBD',
      team2: 'TBD',
      // i set teams as TBD since semifinals haven't been decided
    },
  ],
};

const truncateName = (name, maxLength = 12) => {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength - 3) + '...';
};

const MatchCard = ({ match, isSmall = false }) => {
  const team1Won = match.winner === 'team1';
  const team2Won = match.winner === 'team2';
  const isPending = !match.score1 && !match.score2 && match.score1 !== 0 && match.score2 !== 0;

  return (
    <View style={[styles.matchCard, isSmall && styles.matchCardSmall]}>
      <View style={styles.teamContainer}>
        <View style={[styles.teamBox, team1Won && styles.winnerBox, isPending && styles.pendingBox]}>
          <Text style={[styles.teamName, team1Won && styles.winnerText, isPending && styles.pendingText]}>
            {truncateName(match.team1, isSmall ? 8 : 10)}
          </Text>
          <Text style={[styles.score, team1Won && styles.winnerScore]}>
            {match.score1 !== undefined ? match.score1 : ''}
          </Text>
        </View>
        <View style={[styles.teamBox, styles.lastTeamBox, team2Won && styles.winnerBox, isPending && styles.pendingBox]}>
          <Text style={[styles.teamName, team2Won && styles.winnerText, isPending && styles.pendingText]}>
            {truncateName(match.team2, isSmall ? 8 : 10)}
          </Text>
          <Text style={[styles.score, team2Won && styles.winnerScore]}>
            {match.score2 !== undefined ? match.score2 : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

const BracketLine = ({ style }) => (
  <View style={[styles.bracketLine, style]} />
);

const ConnectorGroup = ({ matches, nextMatches }) => {
  const matchHeight = 80; // i adjusted for match card height plus spacing
  const titleOffset = 52; // i added offset for round title height
  
  return (
    <View style={styles.connectorContainer}>
      {nextMatches && nextMatches.map((_, pairIndex) => {
        const topMatchIndex = pairIndex * 2;
        const bottomMatchIndex = topMatchIndex + 1;
        const topPosition = titleOffset + (topMatchIndex * matchHeight) + 35; // i centered on match cards
        const bottomPosition = titleOffset + (bottomMatchIndex * matchHeight) + 35;
        const middlePosition = (topPosition + bottomPosition) / 2;
        
        return (
          <View key={pairIndex}>
            {/* horizontal line from top match */}
            <BracketLine style={[styles.horizontalLine, { top: topPosition }]} />
            {/* horizontal line from bottom match */}
            <BracketLine style={[styles.horizontalLine, { top: bottomPosition }]} />
            {/* vertical connecting line */}
            <BracketLine style={[styles.verticalLine, { 
              top: topPosition, 
              height: bottomPosition - topPosition 
            }]} />
            {/* horizontal line to next round */}
            <BracketLine style={[styles.horizontalLine, { 
              top: middlePosition, 
              left: 0, 
              width: 30 
            }]} />
          </View>
        );
      })}
    </View>
  );
};

const RoundColumn = ({ title, matches, isSmall = false }) => (
  <View style={[styles.roundColumn, { position: 'relative' }]}>
    <Text style={[styles.roundTitle, isSmall && styles.roundTitleSmall]}>
      {title}
    </Text>
    <View style={styles.matchesContainer}>
      {matches.map((match, index) => (
        <View key={match.id} style={[styles.matchWrapper, { 
          marginBottom: 10 // i added consistent spacing between matches
        }]}>
          <MatchCard match={match} isSmall={isSmall} />
        </View>
      ))}
    </View>
  </View>
);

export const KnockoutTournament = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.bracketContainer}>
          {/* Round of 16 */}
          <View style={{ position: 'relative' }}>
            <RoundColumn
              title="Round of 16"
              matches={tournamentData.round16}
              isSmall={true}
            />
            {/* Connectors to Quarter Finals */}
            <ConnectorGroup 
              matches={tournamentData.round16} 
              nextMatches={tournamentData.quarterfinals}
            />
          </View>
          
          {/* Quarter Finals */}
          <View style={{ position: 'relative' }}>
            <RoundColumn
              title="Quarter Finals"
              matches={tournamentData.quarterfinals}
            />
            {/* Connectors to Semi Finals */}
            <ConnectorGroup 
              matches={tournamentData.quarterfinals} 
              nextMatches={tournamentData.semifinals}
            />
          </View>
          
          {/* Semi Finals */}
          <View style={{ position: 'relative' }}>
            <RoundColumn
              title="Semi Finals"
              matches={tournamentData.semifinals}
            />
            {/* Connectors to Final */}
            <ConnectorGroup 
              matches={tournamentData.semifinals} 
              nextMatches={tournamentData.final}
            />
          </View>
          
          {/* Final */}
          <RoundColumn 
            title="Final" 
            matches={tournamentData.final} 
            isSmall={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  bracketContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
    minHeight: 600,
  },
  roundColumn: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  roundTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
    minWidth: 120,
  },
  roundTitleSmall: {
    fontSize: 10,
    minWidth: 100,
  },
  matchesContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  matchWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  matchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    minWidth: 120,
    overflow: 'hidden',
  },
  matchCardSmall: {
    minWidth: 100,
  },
  teamContainer: {
    flexDirection: 'column',
  },
  teamBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
  },
  lastTeamBox: {
    borderBottomWidth: 0,
  },
  winnerBox: {
    backgroundColor: '#f0f0f0',
  },
  pendingBox: {
    backgroundColor: '#f8f8f8',
    opacity: 0.7,
  },
  pendingText: {
    color: '#666666',
    fontStyle: 'italic',
  },
  teamName: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#000000',
    flex: 1,
  },
  score: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    marginLeft: 8,
    minWidth: 15,
    textAlign: 'center',
  },
  winnerText: {
    fontFamily: 'Inter-SemiBold',
  },
  winnerScore: {
    fontFamily: 'Inter-Bold',
  },
  // i created connector styles to match traditional bracket layout
  connectorContainer: {
    position: 'absolute',
    right: -30,
    top: 0,
    width: 30,
    height: '100%',
    zIndex: 1,
  },
  bracketLine: {
    backgroundColor: '#000000',
    position: 'absolute',
  },
  horizontalLine: {
    height: 2,
    width: 15,
    right: 0,
  },
  verticalLine: {
    width: 2,
    right: 15,
  },
  // i added winner column styles for the champion display
  winnerColumn: {
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 40,
  },
  winnerTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    marginBottom: 20,
  },
  winnerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000000',
    padding: 15,
    alignItems: 'center',
    minWidth: 120,
  },
  winnerName: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 5,
  },
  championIcon: {
    fontSize: 20,
  },
});
