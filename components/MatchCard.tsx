import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Calendar, Target, Users, Shield, ChevronRight } from 'lucide-react-native';

interface Match {
  id: string;
  opponent: string;
  score: string;
  date: string;
  time: string;
  possession: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  tackles: number;
  saves: number;
  result: 'win' | 'loss' | 'draw';
}

interface MatchCardProps {
  match: Match;
  onPress: () => void;
}

export default function MatchCard({ match, onPress }: MatchCardProps) {
  const getResultColor = () => {
    switch (match.result) {
      case 'win':
        return '#00FF88';
      case 'loss':
        return '#FF6B6B';
      case 'draw':
        return '#FFB800';
      default:
        return '#888888';
    }
  };

  const getResultBorderColor = () => {
    switch (match.result) {
      case 'win':
        return 'rgba(0, 255, 136, 0.3)';
      case 'loss':
        return 'rgba(255, 107, 107, 0.3)';
      case 'draw':
        return 'rgba(255, 184, 0, 0.3)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <BlurView intensity={20} style={styles.blur}>
        <View style={[
          styles.card,
          { borderColor: getResultBorderColor() }
        ]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.matchInfo}>
              <Text style={styles.opponent}>{match.opponent}</Text>
              <View style={styles.dateTimeContainer}>
                <Calendar color="#888888" size={12} />
                <Text style={styles.dateTime}>
                  {formatDate(match.date)} • {match.time}
                </Text>
              </View>
            </View>
            
            <View style={styles.scoreContainer}>
              <Text style={[styles.score, { color: getResultColor() }]}>
                {match.score}
              </Text>
              <ChevronRight color="#888888" size={16} />
            </View>
          </View>

          {/* Possession Bar */}
          <View style={styles.possessionContainer}>
            <Text style={styles.possessionLabel}>Possession</Text>
            <View style={styles.possessionBar}>
              <View 
                style={[
                  styles.possessionFill,
                  { width: `${match.possession}%` }
                ]} 
              />
            </View>
            <Text style={styles.possessionValue}>{match.possession}%</Text>
          </View>

          {/* Stats Preview */}
          <View style={styles.statsPreview}>
            <View style={styles.statItem}>
              <Target color="#00FF88" size={14} />
              <Text style={styles.statValue}>{match.shots}</Text>
              <Text style={styles.statLabel}>Shots</Text>
            </View>
            
            <View style={styles.statItem}>
              <Users color="#4A90E2" size={14} />
              <Text style={styles.statValue}>{match.passes}</Text>
              <Text style={styles.statLabel}>Passes</Text>
            </View>
            
            <View style={styles.statItem}>
              <Shield color="#FF6B6B" size={14} />
              <Text style={styles.statValue}>{match.tackles}</Text>
              <Text style={styles.statLabel}>Tackles</Text>
            </View>
          </View>

          {/* View Stats Button */}
          <View style={styles.viewStatsContainer}>
            <Text style={styles.viewStatsText}>View Stats</Text>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  blur: {
    borderRadius: 16,
  },
  card: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  matchInfo: {
    flex: 1,
  },
  opponent: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  score: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  possessionContainer: {
    marginBottom: 16,
  },
  possessionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
    marginBottom: 6,
  },
  possessionBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 4,
  },
  possessionFill: {
    height: '100%',
    backgroundColor: '#00FF88',
    borderRadius: 2,
  },
  possessionValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#00FF88',
    textAlign: 'right',
  },
  statsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#888888',
  },
  viewStatsContainer: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  viewStatsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#00FF88',
  },
});