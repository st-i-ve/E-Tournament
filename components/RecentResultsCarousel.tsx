import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Home,
  MapPin,
} from 'lucide-react-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MatchResult {
  id: string;
  opponent: string;
  score: string;
  result: 'win' | 'draw' | 'loss';
  date: string;
  isHome: boolean;
  competition?: string;
}

interface RecentResultsCarouselProps {
  results: MatchResult[];
  onPress?: (result: MatchResult) => void;
}

export default function RecentResultsCarousel({
  results,
  onPress,
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

  const getVenueIcon = (isHome: boolean) => {
    return isHome ? (
      <Home size={14} color="#999999" />
    ) : (
      <MapPin size={14} color="#999999" />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Results</Text>
        {results.length > 3 && <Text style={styles.viewAll}>View All</Text>}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={SCREEN_WIDTH * 0.45} // Snap to card width + gap
        decelerationRate="fast"
      >
        {results.map((result, index) => (
          <MotiView
            key={result.id}
            from={{ opacity: 0, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: index * 100, type: 'spring' }}
            style={styles.cardContainer}
          >
            <Pressable onPress={() => onPress?.(result)}>
              <GlassCard style={styles.resultCard}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={styles.gradientBackground}
                />

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

                <Text style={styles.opponent} numberOfLines={1}>
                  vs {result.opponent}
                </Text>

                {result.competition && (
                  <Text style={styles.competition} numberOfLines={1}>
                    {result.competition}
                  </Text>
                )}

                <Text style={styles.score}>{result.score}</Text>

                <View style={styles.footer}>
                  <View style={styles.venueContainer}>
                    {getVenueIcon(result.isHome)}
                    <Text style={styles.venue}>
                      {result.isHome ? 'Home' : 'Away'}
                    </Text>
                  </View>
                  <Text style={styles.date}>{result.date}</Text>
                </View>
              </GlassCard>
            </Pressable>
          </MotiView>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  viewAll: {
    fontSize: 14,
    color: '#00FF88',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 8,
  },
  cardContainer: {
    width: SCREEN_WIDTH * 0.4, // 40% of screen width
    marginRight: 16,
  },
  resultCard: {
    minHeight: 180,
    padding: 16,
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
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
    textTransform: 'uppercase',
  },
  opponent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  competition: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 8,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF88',
    marginVertical: 8,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  venueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  venue: {
    fontSize: 12,
    color: '#999999',
  },
  date: {
    fontSize: 12,
    color: '#cccccc',
  },
});
{/* <RecentResultsCarousel
  results={results}
  onPress={(result) =>
    navigation.navigate('MatchDetails', { matchId: result.id })
  }
/>; */}