import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LeaderboardTable from '../../trash/components/LeaderboardTable';

const mockTeams = [
  {
    rank: 1,
    name: 'Arsenal FC',
    played: 28,
    wins: 20,
    draws: 5,
    losses: 3,
    goalsFor: 65,
    goalsAgainst: 25,
    points: 65,
  },
  {
    rank: 2,
    name: 'Manchester City',
    played: 28,
    wins: 19,
    draws: 6,
    losses: 3,
    goalsFor: 70,
    goalsAgainst: 28,
    points: 63,
  },
  {
    rank: 3,
    name: 'Alex Morgan',
    played: 28,
    wins: 18,
    draws: 4,
    losses: 6,
    goalsFor: 58,
    goalsAgainst: 32,
    points: 58,
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: 'Liverpool FC',
    played: 28,
    wins: 16,
    draws: 8,
    losses: 4,
    goalsFor: 55,
    goalsAgainst: 30,
    points: 56,
  },
  {
    rank: 5,
    name: 'Chelsea FC',
    played: 28,
    wins: 15,
    draws: 7,
    losses: 6,
    goalsFor: 48,
    goalsAgainst: 35,
    points: 52,
  },
  {
    rank: 6,
    name: 'Newcastle United',
    played: 28,
    wins: 14,
    draws: 9,
    losses: 5,
    goalsFor: 45,
    goalsAgainst: 33,
    points: 51,
  },
];

export default function LeaderboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Premier League</Text>
          <Text style={styles.subtitle}>Season 2023/24</Text>
        </View>
        <LeaderboardTable teams={mockTeams} />
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
});
