import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Target, Users, Shield, Save } from 'lucide-react-native';
import StatsChart from '@/components/StatsChart';

const { width } = Dimensions.get('window');

// Mock data - in a real app, this would come from an API
const getMatchData = (matchId: string) => {
  const matches = {
    '1': {
      id: '1',
      opponent: 'Peaky Blinders',
      opponentLogo: '🏴‍☠️',
      score: '2-4',
      date: '2024-01-15',
      time: '19:30',
      possession: { home: 65, away: 35 },
      shots: { home: 12, away: 8 },
      shotsOnTarget: { home: 8, away: 6 },
      passes: { home: 456, away: 312 },
      tackles: { home: 23, away: 18 },
      saves: { home: 5, away: 3 },
      result: 'loss',
      timeline: [
        { minute: 15, home: 23, away: 18 },
        { minute: 30, home: 25, away: 22 },
        { minute: 45, home: 28, away: 24 },
        { minute: 60, home: 31, away: 27 },
        { minute: 75, home: 33, away: 29 },
        { minute: 90, home: 35, away: 31 },
      ],
    },
    // Add more matches as needed
  };
  
  return matches[matchId] || matches['1'];
};

export default function MatchDetailScreen() {
  const { matchId } = useLocalSearchParams();
  const match = getMatchData(matchId as string);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0c0c0c', '#1a1a1a', '#0c0c0c']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft color="#FFFFFF" size={24} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.title}>Match Stats</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Match Header */}
            <View style={styles.matchHeader}>
              <BlurView intensity={20} style={styles.matchHeaderBlur}>
                <View style={styles.matchHeaderContent}>
                  <View style={styles.teamContainer}>
                    <Text style={styles.teamLogo}>⚡</Text>
                    <Text style={styles.teamName}>H67</Text>
                  </View>
                  
                  <View style={styles.scoreContainer}>
                    <Text style={styles.score}>{match.score}</Text>
                    <Text style={styles.matchDate}>
                      {new Date(match.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </Text>
                  </View>
                  
                  <View style={styles.teamContainer}>
                    <Text style={styles.teamLogo}>{match.opponentLogo}</Text>
                    <Text style={styles.teamName}>{match.opponent}</Text>
                  </View>
                </View>
              </BlurView>
            </View>

            {/* Possession Chart */}
            <View style={styles.chartContainer}>
              <BlurView intensity={20} style={styles.chartBlur}>
                <View style={styles.chartContent}>
                  <Text style={styles.chartTitle}>Possession</Text>
                  <StatsChart
                    type="pie"
                    data={[
                      { label: 'H67', value: match.possession.home, color: '#00FF88' },
                      { label: match.opponent, value: match.possession.away, color: '#FF6B6B' },
                    ]}
                  />
                </View>
              </BlurView>
            </View>

            {/* Shots Comparison */}
            <View style={styles.chartContainer}>
              <BlurView intensity={20} style={styles.chartBlur}>
                <View style={styles.chartContent}>
                  <Text style={styles.chartTitle}>Shots Comparison</Text>
                  <StatsChart
                    type="bar"
                    data={[
                      { label: 'Shots', home: match.shots.home, away: match.shots.away },
                      { label: 'On Target', home: match.shotsOnTarget.home, away: match.shotsOnTarget.away },
                    ]}
                  />
                </View>
              </BlurView>
            </View>

            {/* Key Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <BlurView intensity={20} style={styles.statCardBlur}>
                  <View style={styles.statCardContent}>
                    <Users color="#4A90E2" size={24} />
                    <Text style={styles.statCardValue}>{match.passes.home}</Text>
                    <Text style={styles.statCardLabel}>Passes</Text>
                  </View>
                </BlurView>
              </View>

              <View style={styles.statCard}>
                <BlurView intensity={20} style={styles.statCardBlur}>
                  <View style={styles.statCardContent}>
                    <Shield color="#FF6B6B" size={24} />
                    <Text style={styles.statCardValue}>{match.tackles.home}</Text>
                    <Text style={styles.statCardLabel}>Tackles</Text>
                  </View>
                </BlurView>
              </View>

              <View style={styles.statCard}>
                <BlurView intensity={20} style={styles.statCardBlur}>
                  <View style={styles.statCardContent}>
                    <Save color="#FFB800" size={24} />
                    <Text style={styles.statCardValue}>{match.saves.home}</Text>
                    <Text style={styles.statCardLabel}>Saves</Text>
                  </View>
                </BlurView>
              </View>

              <View style={styles.statCard}>
                <BlurView intensity={20} style={styles.statCardBlur}>
                  <View style={styles.statCardContent}>
                    <Target color="#00FF88" size={24} />
                    <Text style={styles.statCardValue}>
                      {Math.round((match.shotsOnTarget.home / match.shots.home) * 100)}%
                    </Text>
                    <Text style={styles.statCardLabel}>Accuracy</Text>
                  </View>
                </BlurView>
              </View>
            </View>

            {/* Timeline Chart */}
            <View style={styles.chartContainer}>
              <BlurView intensity={20} style={styles.chartBlur}>
                <View style={styles.chartContent}>
                  <Text style={styles.chartTitle}>Match Timeline</Text>
                  <StatsChart
                    type="line"
                    data={match.timeline}
                  />
                </View>
              </BlurView>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  matchHeader: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  matchHeaderBlur: {
    borderRadius: 20,
  },
  matchHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    fontSize: 32,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  scoreContainer: {
    alignItems: 'center',
    flex: 1,
  },
  score: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#00FF88',
    marginBottom: 4,
  },
  matchDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
  },
  chartContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  chartBlur: {
    borderRadius: 16,
  },
  chartContent: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 56) / 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statCardBlur: {
    borderRadius: 12,
  },
  statCardContent: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statCardValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
  },
});