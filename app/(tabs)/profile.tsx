import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../../components/ProfileHeader';
import StatsGrid from '../../components/StatsGrid';

const mockProfile = {
  username: 'Alex Morgan',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  rating: 1847,
  peerRating: 4.2,
};

const mockStats = [
  { label: 'Wins', value: 23, color: '#00FF88' },
  { label: 'Draws', value: 8, color: '#FFAA00' },
  { label: 'Losses', value: 5, color: '#FF4444' },
  { label: 'Goals', value: 34, color: '#00FF88' },
  { label: 'Assists', value: 12, color: '#00AAFF' },
  { label: 'Clean Sheets', value: 15, color: '#FF88AA' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader {...mockProfile} />
        <StatsGrid stats={mockStats} />
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