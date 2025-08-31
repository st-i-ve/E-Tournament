import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollArea } from './ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from './ui/tooltip';

// Mock tournament data
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
      score1: 4,
      score2: 1,
      winner: 'team1',
    },
    {
      id: 14,
      team1: 'Inter Milan',
      team2: 'Napoli',
      score1: 3,
      score2: 0,
      winner: 'team1',
    },
  ],
  final: [
    {
      id: 15,
      team1: 'Manchester City',
      team2: 'Inter Milan',
      score1: 1,
      score2: 0,
      winner: 'team1',
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
  const isDraw = !match.winner;

  return (
    <TooltipProvider>
      <View style={[styles.matchCard, isSmall && styles.matchCardSmall]}>
        <Tooltip>
          <TooltipTrigger asChild>
            <TouchableOpacity style={styles.matchContent}>
              <View style={styles.teamRow}>
                <Text
                  style={[
                    styles.teamName,
                    team1Won && styles.winnerText,
                    team2Won && styles.loserText,
                    isSmall && styles.teamNameSmall,
                  ]}
                >
                  {truncateName(match.team1, isSmall ? 8 : 12)}
                </Text>
                <View style={styles.scoreContainer}>
                  <Text
                    style={[
                      styles.score,
                      team1Won && styles.winnerScore,
                      team2Won && styles.loserScore,
                      isSmall && styles.scoreSmall,
                    ]}
                  >
                    {match.score1 !== undefined ? match.score1 : '-'}
                  </Text>
                </View>
              </View>

              <View style={styles.vsContainer}>
                <Text style={[styles.vsText, isSmall && styles.vsTextSmall]}>
                  vs
                </Text>
              </View>

              <View style={styles.teamRow}>
                <Text
                  style={[
                    styles.teamName,
                    team2Won && styles.winnerText,
                    team1Won && styles.loserText,
                    isSmall && styles.teamNameSmall,
                  ]}
                >
                  {truncateName(match.team2, isSmall ? 8 : 12)}
                </Text>
                <View style={styles.scoreContainer}>
                  <Text
                    style={[
                      styles.score,
                      team2Won && styles.winnerScore,
                      team1Won && styles.loserScore,
                      isSmall && styles.scoreSmall,
                    ]}
                  >
                    {match.score2 !== undefined ? match.score2 : '-'}
                  </Text>
                </View>
              </View>

              {match.aggregate && (
                <View style={styles.aggregateContainer}>
                  <Text style={styles.aggregateText}>
                    Agg: {match.aggregate}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </TooltipTrigger>
          <TooltipContent>
            <Text style={styles.tooltipText}>
              {match.team1} vs {match.team2}
              {match.score1 !== undefined &&
                ` (${match.score1}-${match.score2})`}
            </Text>
          </TooltipContent>
        </Tooltip>
      </View>
    </TooltipProvider>
  );
};

const BracketConnector = ({ height = 60, isVertical = false }) => (
  <View
    style={[
      styles.connector,
      isVertical ? { height, width: 2 } : { width: 20, height: 2 },
    ]}
  />
);

const RoundColumn = ({ title, matches, isSmall = false }) => (
  <View style={styles.roundColumn}>
    <Text style={[styles.roundTitle, isSmall && styles.roundTitleSmall]}>
      {title}
    </Text>
    <View style={styles.matchesContainer}>
      {matches.map((match, index) => (
        <View key={match.id} style={styles.matchWrapper}>
          <MatchCard match={match} isSmall={isSmall} />
          {index < matches.length - 1 && title !== 'Final' && (
            <View style={styles.matchSpacer} />
          )}
        </View>
      ))}
    </View>
  </View>
);

export const KnockoutTournament = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Champions League Knockout</Text>
        <Text style={styles.headerSubtitle}>Tournament Bracket</Text>
      </View>

      <ScrollArea horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.bracketContainer}>
          <RoundColumn
            title="Round of 16"
            matches={tournamentData.round16}
            isSmall={true}
          />

          <View style={styles.connectorColumn}>
            {Array.from({ length: 4 }).map((_, i) => (
              <View key={i} style={styles.connectorGroup}>
                <BracketConnector />
                <View style={styles.connectorVertical} />
                <BracketConnector />
              </View>
            ))}
          </View>

          <RoundColumn
            title="Quarter Finals"
            matches={tournamentData.quarterfinals}
          />

          <View style={styles.connectorColumn}>
            {Array.from({ length: 2 }).map((_, i) => (
              <View key={i} style={styles.connectorGroup}>
                <BracketConnector />
                <View style={styles.connectorVertical} />
                <BracketConnector />
              </View>
            ))}
          </View>

          <RoundColumn
            title="Semi Finals"
            matches={tournamentData.semifinals}
          />

          <View style={styles.connectorColumn}>
            <View style={styles.connectorGroup}>
              <BracketConnector />
              <View style={styles.connectorVertical} />
              <BracketConnector />
            </View>
          </View>

          <RoundColumn title="Final" matches={tournamentData.final} />
        </View>
      </ScrollArea>

      {/* Champion Section */}
      <View style={styles.championSection}>
        <Text style={styles.championTitle}>🏆 Champion</Text>
        <Text style={styles.championName}>Manchester City</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 12,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
  },
  bracketContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    minHeight: 400,
  },
  roundColumn: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  roundTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#22c55e',
    marginBottom: 16,
    textAlign: 'center',
    minWidth: 100,
  },
  roundTitleSmall: {
    fontSize: 12,
    minWidth: 80,
  },
  matchesContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  matchWrapper: {
    alignItems: 'center',
  },
  matchCard: {
    backgroundColor: 'rgba(55, 65, 81, 0.8)',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    minWidth: 120,
    borderWidth: 1,
    borderColor: 'rgba(75, 85, 99, 0.5)',
  },
  matchCardSmall: {
    padding: 8,
    minWidth: 100,
  },
  matchContent: {
    alignItems: 'center',
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 2,
  },
  teamName: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#e5e7eb',
    flex: 1,
  },
  teamNameSmall: {
    fontSize: 9,
  },
  scoreContainer: {
    marginLeft: 8,
    minWidth: 20,
    alignItems: 'center',
  },
  score: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#e5e7eb',
  },
  scoreSmall: {
    fontSize: 10,
  },
  winnerText: {
    color: '#22c55e',
  },
  loserText: {
    color: '#9ca3af',
  },
  winnerScore: {
    color: '#22c55e',
    fontFamily: 'Inter-Bold',
  },
  loserScore: {
    color: '#ef4444',
  },
  vsContainer: {
    marginVertical: 2,
  },
  vsText: {
    fontSize: 8,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  vsTextSmall: {
    fontSize: 7,
  },
  aggregateContainer: {
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(75, 85, 99, 0.3)',
  },
  aggregateText: {
    fontSize: 8,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
  },
  matchSpacer: {
    height: 20,
  },
  connectorColumn: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    marginHorizontal: 4,
  },
  connectorGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  connector: {
    backgroundColor: '#6b7280',
  },
  connectorVertical: {
    width: 2,
    height: 40,
    backgroundColor: '#6b7280',
  },
  championSection: {
    alignItems: 'center',
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  championTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#22c55e',
    marginBottom: 8,
  },
  championName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  tooltipText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});
