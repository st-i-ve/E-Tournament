import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarView from '../../components/CalendarView';

const mockMatches = [
  { date: 5, opponent: 'Chelsea FC', isHome: true, time: '15:00' },
  { date: 12, opponent: 'Liverpool FC', isHome: false, time: '17:30' },
  { date: 18, opponent: 'Manchester United', isHome: true, time: '14:00' },
  { date: 25, opponent: 'Arsenal FC', isHome: false, time: '16:00' },
];

export default function CalendarScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Fixtures Calendar</Text>
          <Text style={styles.subtitle}>March 2024</Text>
        </View>
        <CalendarView matches={mockMatches} />
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