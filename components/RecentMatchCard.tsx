import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  status: string;
}

interface RecentMatchCardProps {
  match: Match;
  userTeam: string;
}

export const RecentMatchCard: React.FC<RecentMatchCardProps> = ({
  match,
  userTeam,
}) => {
  const isUserHome = match.homeTeam === userTeam;
  const userScore = isUserHome ? match.homeScore : match.awayScore;
  const opponentScore = isUserHome ? match.awayScore : match.homeScore;
  const opponent = isUserHome ? match.awayTeam : match.homeTeam;
  
  const result = userScore > opponentScore ? 'W' : userScore < opponentScore ? 'L' : 'D';
  
  const getResultColor = () => {
    switch (result) {
      case 'W': return '#22c55e';
      case 'L': return '#ef4444';
      case 'D': return '#f59e0b';
      default: return '#9ca3af';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.content}>
        <View style={[styles.resultIndicator, { backgroundColor: getResultColor() }]}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
        <View style={styles.matchInfo}>
          <Text style={styles.opponent}>{opponent}</Text>
          <Text style={styles.score}>
            {userScore} - {opponentScore}
          </Text>
          <Text style={styles.date}>{formatDate(match.date)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2937',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#374151',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  resultIndicator: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Inter-Bold',
  },
  matchInfo: {
    flex: 1,
  },
  opponent: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  score: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  date: {
    color: '#6b7280',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
});