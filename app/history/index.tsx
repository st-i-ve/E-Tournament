import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Target, Users, Shield } from 'lucide-react-native';
import MatchCard from '@/components/MatchCard';

const matchesData = [
  {
    id: '1',
    opponent: 'Peaky Blinders',
    score: '2-4',
    date: '2024-01-15',
    time: '19:30',
    possession: 65,
    shots: 12,
    shotsOnTarget: 8,
    passes: 456,
    tackles: 23,
    saves: 5,
    result: 'loss',
  },
  {
    id: '2',
    opponent: 'Thunder Wolves',
    score: '3-1',
    date: '2024-01-12',
    time: '20:00',
    possession: 72,
    shots: 15,
    shotsOnTarget: 11,
    passes: 523,
    tackles: 18,
    saves: 3,
    result: 'win',
  },
  {
    id: '3',
    opponent: 'Steel Dragons',
    score: '1-1',
    date: '2024-01-08',
    time: '18:45',
    possession: 58,
    shots: 9,
    shotsOnTarget: 6,
    passes: 398,
    tackles: 27,
    saves: 7,
    result: 'draw',
  },
  {
    id: '4',
    opponent: 'Phoenix Rising',
    score: '4-2',
    date: '2024-01-05',
    time: '19:15',
    possession: 68,
    shots: 18,
    shotsOnTarget: 13,
    passes: 487,
    tackles: 21,
    saves: 4,
    result: 'win',
  },
  {
    id: '5',
    opponent: 'Shadow Hawks',
    score: '0-2',
    date: '2024-01-01',
    time: '16:30',
    possession: 45,
    shots: 7,
    shotsOnTarget: 3,
    passes: 312,
    tackles: 31,
    saves: 8,
    result: 'loss',
  },
];

export default function MatchHistoryScreen() {
  const fadeAnims = useRef(matchesData.map(() => new Animated.Value(0))).current;
  const slideAnims = useRef(matchesData.map(() => new Animated.Value(50))).current;

  useEffect(() => {
    const animations = matchesData.map((_, index) =>
      Animated.parallel([
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: 600,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[index], {
          toValue: 0,
          duration: 600,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(50, animations).start();
  }, [fadeAnims, slideAnims]);

  const handleBack = () => {
    router.back();
  };

  const handleMatchPress = (matchId: string) => {
    router.push(`/history/${matchId}`);
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
          <Text style={styles.title}>Match History</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Stats Overview */}
        <View style={styles.statsOverview}>
          <BlurView intensity={20} style={styles.statsBlur}>
            <View style={styles.statsContent}>
              <View style={styles.statItem}>
                <Target color="#00FF88" size={20} />
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Matches</Text>
              </View>
              <View style={styles.statItem}>
                <Shield color="#4A90E2" size={20} />
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Wins</Text>
              </View>
              <View style={styles.statItem}>
                <Users color="#FF6B6B" size={20} />
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Draws</Text>
              </View>
              <View style={styles.statItem}>
                <Calendar color="#888888" size={20} />
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Losses</Text>
              </View>
            </View>
          </BlurView>
        </View>

        {/* Matches List */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.matchesList}>
            {matchesData.map((match, index) => (
              <Animated.View
                key={match.id}
                style={[
                  styles.matchCardContainer,
                  {
                    opacity: fadeAnims[index],
                    transform: [{ translateY: slideAnims[index] }],
                  },
                ]}
              >
                <MatchCard
                  match={match}
                  onPress={() => handleMatchPress(match.id)}
                />
              </Animated.View>
            ))}
          </View>
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
  statsOverview: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statsBlur: {
    borderRadius: 16,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
  },
  scrollView: {
    flex: 1,
  },
  matchesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  matchCardContainer: {
    marginBottom: 12,
  },
});