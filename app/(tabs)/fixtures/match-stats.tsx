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
      {/* Geometric background elements */}
      <View style={styles.backgroundElements}>
        {/* Triangles */}
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View style={[styles.triangle, { top: 200, right: 80, transform: [{ rotate: '12deg' }] }]} />
        <View style={[styles.triangle, { bottom: 200, left: 100 }]} />
        
        {/* Circles */}
        <View style={[styles.circle, { top: 150, left: 120, width: 48, height: 48 }]} />
        <View style={[styles.circle, { bottom: 250, right: 100, width: 32, height: 32 }]} />
        <View style={[styles.circle, { top: 400, left: 80, width: 24, height: 24 }]} />
        
        {/* Rectangles */}
        <View style={[styles.rectangle, { top: 300, right: 40, width: 48, height: 32 }]} />
        <View style={[styles.rectangle, { bottom: 80, left: 200, width: 32, height: 48 }]} />
        
        {/* Lines */}
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#22c55e" size={20} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Match Statistics</Text>
          </View>
        </View>

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
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  triangle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  circle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 50,
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  scrollView: {
    flex: 1,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  section: {
    margin:39,
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