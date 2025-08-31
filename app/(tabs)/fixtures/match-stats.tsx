import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Target, Activity, Users, TrendingUp, Zap, Shield, Crosshair, ChevronLeft, Trophy } from 'lucide-react-native';
import { router } from 'expo-router';
import { Badge } from '@/components/ui/badge';
import {
  SimpleBarChart,
  PossessionCircle,
  RadarChart,
  StatRow,
  MatchHeader,
  TeamLegend,
  TabNavigation,
  GeometricBackground,
  type MatchStats
} from '@/components/match-stats';

// Mock match statistics data
const mockMatchStats: MatchStats & {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  tournament: string;
} = {
  homeTeam: 'Paris FC',
  awayTeam: 'Jeshi ya South C',
  homeScore: 2,
  awayScore: 1,
  date: '2025-01-15',
  tournament: 'Champions Elite League',
  stats: {
    possession: { home: 53, away: 47 },
    shots: { home: 20, away: 5 },
    shotsOnTarget: { home: 17, away: 5 },
    fouls: { home: 2, away: 1 },
    offsides: { home: 2, away: 1 },
    cornerKicks: { home: 2, away: 0 },
    freeKicks: { home: 1, away: 2 },
    passes: { home: 181, away: 197 },
    successfulPasses: { home: 132, away: 132 },
    crosses: { home: 3, away: 1 },
    interceptions: { home: 55, away: 38 },
    tackles: { home: 9, away: 16 },
    saves: { home: 2, away: 7 }
  }
};









export default function MatchStatsPage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'detailed'>('overview');
  const [headerAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(headerAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const overviewStats = [
    { icon: Activity, label: 'Possession', home: mockMatchStats.stats.possession.home, away: mockMatchStats.stats.possession.away, unit: '%' },
    { icon: Target, label: 'Shots', home: mockMatchStats.stats.shots.home, away: mockMatchStats.stats.shots.away },
    { icon: Crosshair, label: 'Shots on Target', home: mockMatchStats.stats.shotsOnTarget.home, away: mockMatchStats.stats.shotsOnTarget.away },
    { icon: TrendingUp, label: 'Passes', home: mockMatchStats.stats.passes.home, away: mockMatchStats.stats.passes.away },
  ];

  const detailedStats = [
    { icon: Shield, label: 'Fouls', home: mockMatchStats.stats.fouls.home, away: mockMatchStats.stats.fouls.away },
    { icon: Target, label: 'Offsides', home: mockMatchStats.stats.offsides.home, away: mockMatchStats.stats.offsides.away },
    { icon: Activity, label: 'Corner Kicks', home: mockMatchStats.stats.cornerKicks.home, away: mockMatchStats.stats.cornerKicks.away },
    { icon: Zap, label: 'Free Kicks', home: mockMatchStats.stats.freeKicks.home, away: mockMatchStats.stats.freeKicks.away },
    { icon: TrendingUp, label: 'Successful Passes', home: mockMatchStats.stats.successfulPasses.home, away: mockMatchStats.stats.successfulPasses.away },
    { icon: Activity, label: 'Crosses', home: mockMatchStats.stats.crosses.home, away: mockMatchStats.stats.crosses.away },
    { icon: Shield, label: 'Interceptions', home: mockMatchStats.stats.interceptions.home, away: mockMatchStats.stats.interceptions.away },
    { icon: Target, label: 'Tackles', home: mockMatchStats.stats.tackles.home, away: mockMatchStats.stats.tackles.away },
    { icon: Zap, label: 'Saves', home: mockMatchStats.stats.saves.home, away: mockMatchStats.stats.saves.away },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <GeometricBackground />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <MatchHeader
          homeTeam={mockMatchStats.homeTeam}
          awayTeam={mockMatchStats.awayTeam}
          homeScore={mockMatchStats.homeScore}
          awayScore={mockMatchStats.awayScore}
          date={mockMatchStats.date}
          tournament={mockMatchStats.tournament}
          animation={headerAnimation}
        />

        <TeamLegend
          homeTeam={mockMatchStats.homeTeam}
          awayTeam={mockMatchStats.awayTeam}
        />

        {/* Possession Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity color="#22c55e" size={18} />
            <Text style={styles.sectionTitle}>Ball Possession</Text>
          </View>
          <PossessionCircle 
            homePercentage={mockMatchStats.stats.possession.home}
            awayPercentage={mockMatchStats.stats.possession.away}
          />
        </View>

        {/* Tab Navigation */}
        <TabNavigation 
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />

        {/* Statistics */}
        <View style={styles.statsContainer}>
          {(selectedTab === 'overview' ? overviewStats : detailedStats).map((stat, index) => (
            <StatRow
              key={stat.label}
              icon={stat.icon}
              title={stat.label}
              homeValue={stat.home}
              awayValue={stat.away}
              unit={stat.unit}
              delay={index * 100}
            />
          ))}
        </View>

        {/* Performance Radar */}
        {selectedTab === 'overview' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Users color="#22c55e" size={18} />
              <Text style={styles.sectionTitle}>Performance Radar</Text>
            </View>
            <RadarChart stats={mockMatchStats.stats} />
          </View>
        )}

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
    zIndex: 10,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
  },
  statsContainer: {
    paddingHorizontal: 16,
    gap: 20,
  },
  bottomSpacing: {
    height: 80,
  },
});