import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';

interface MatchResult {
  id: string;
  opponent: string;
  score: string;
  result: 'win' | 'draw' | 'loss';
  date: string;
  isHome: boolean;
}

interface RecentResultsCarouselProps {
  results: MatchResult[];
}

export default function RecentResultsCarousel({
  results,
}: RecentResultsCarouselProps) {
  const getResultIcon = (result: string) => {
    switch (result) {
      case 'win':
        return <TrendingUp size={20} color="#00FF88" />;
      case 'loss':
        return <TrendingDown size={20} color="#FF4444" />;
      default:
        return <Minus size={20} color="#FFAA00" />;
    }
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Results</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {results.map((result, index) => (
          <MotiView
            key={result.id}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 100 }}
          >
            <GlassCard style={styles.resultCard}>
              <View style={styles.resultHeader}>
                {getResultIcon(result.result)}
                <Text
                  style={[
                    styles.resultText,
                    { color: getResultColor(result.result) },
                  ]}
                >
                  {result.result.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.opponent}>{result.opponent}</Text>
              <Text style={styles.score}>{result.score}</Text>
              <Text style={styles.date}>{result.date}</Text>
              <Text style={styles.venue}>
                {result.isHome ? 'Home' : 'Away'}
              </Text>
            </GlassCard>
          </MotiView>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  resultCard: {
    width: 160,
    minHeight: 140,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  resultText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  opponent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00FF88',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 4,
  },
  venue: {
    fontSize: 12,
    color: '#999999',
  },
});
