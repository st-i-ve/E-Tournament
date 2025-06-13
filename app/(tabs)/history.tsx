import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassCard from '../../components/GlassCard';
import { Calendar, MapPin, Target, Users } from 'lucide-react-native';
import { MotiView } from 'moti';

interface HistoricalMatch {
  id: string;
  opponent: string;
  date: string;
  score: string;
  result: 'win' | 'draw' | 'loss';
  venue: string;
  isHome: boolean;
  goals: number;
  assists: number;
  rating: number;
}

const mockHistory: HistoricalMatch[] = [
  {
    id: '1',
    opponent: 'Real Madrid',
    date: 'March 10, 2024',
    score: '2-1',
    result: 'win',
    venue: 'Santiago Bernabeu',
    isHome: false,
    goals: 1,
    assists: 1,
    rating: 8.5,
  },
  {
    id: '2',
    opponent: 'Chelsea FC',
    date: 'March 7, 2024',
    score: '1-1',
    result: 'draw',
    venue: 'Emirates Stadium',
    isHome: true,
    goals: 0,
    assists: 1,
    rating: 7.2,
  },
  {
    id: '3',
    opponent: 'Manchester City',
    date: 'March 3, 2024',
    score: '0-3',
    result: 'loss',
    venue: 'Etihad Stadium',
    isHome: false,
    goals: 0,
    assists: 0,
    rating: 6.0,
  },
];

export default function HistoryScreen() {
  const getResultColor = (result: string) => {
    switch (result) {
      case 'win':
        return '#00FF88';
      case 'loss':
        return '#FF4444';
      default:
        return '#FFAA00';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return '#00FF88';
    if (rating >= 7) return '#FFAA00';
    return '#FF4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Match History</Text>
          <Text style={styles.subtitle}>Recent Performances</Text>
        </View>

        {mockHistory.map((match, index) => (
          <MotiView
            key={match.id}
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 150 }}
          >
            <GlassCard style={styles.matchCard} sliced>
              <View style={styles.matchHeader}>
                <View style={styles.matchInfo}>
                  <Text style={styles.opponent}>{match.opponent}</Text>
                  <Text style={[styles.score, { color: getResultColor(match.result) }]}>
                    {match.score}
                  </Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingLabel}>Rating</Text>
                  <Text style={[styles.rating, { color: getRatingColor(match.rating) }]}>
                    {match.rating}
                  </Text>
                </View>
              </View>

              <View style={styles.matchDetails}>
                <View style={styles.detailRow}>
                  <Calendar size={16} color="#00FF88" />
                  <Text style={styles.detailText}>{match.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#00FF88" />
                  <Text style={styles.detailText}>
                    {match.venue} ({match.isHome ? 'Home' : 'Away'})
                  </Text>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Target size={16} color="#00FF88" />
                  <Text style={styles.statText}>{match.goals} Goals</Text>
                </View>
                <View style={styles.statItem}>
                  <Users size={16} color="#00AAFF" />
                  <Text style={styles.statText}>{match.assists} Assists</Text>
                </View>
              </View>
            </GlassCard>
          </MotiView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
  },
  matchCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  matchInfo: {
    flex: 1,
  },
  opponent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 4,
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  matchDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#cccccc',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
});