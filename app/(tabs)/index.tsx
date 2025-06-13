import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextMatchCard from '../../components/NextMatchCard';
import RecentResultsCarousel from '../../components/RecentResultsCarousel';
import QuickActions from '../../components/QuickActions';

const mockNextMatch = {
  opponent: 'FC Barcelona',
  date: 'March 15, 2024',
  time: '18:30',
  venue: 'Emirates Stadium',
  isHome: true,
};

const mockRecentResults = [
  {
    id: '1',
    opponent: 'Real Madrid',
    score: '2-1',
    result: 'win' as const,
    date: 'Mar 10',
    isHome: false,
  },
  {
    id: '2',
    opponent: 'Chelsea FC',
    score: '1-1',
    result: 'draw' as const,
    date: 'Mar 7',
    isHome: true,
  },
  {
    id: '3',
    opponent: 'Manchester City',
    score: '0-3',
    result: 'loss' as const,
    date: 'Mar 3',
    isHome: false,
  },
  {
    id: '4',
    opponent: 'Liverpool FC',
    score: '4-2',
    result: 'win' as const,
    date: 'Feb 28',
    isHome: true,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <NextMatchCard {...mockNextMatch} />
        <RecentResultsCarousel results={mockRecentResults} />
        <QuickActions />
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
});