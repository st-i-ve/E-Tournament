import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Eye, Check, X } from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';
import { router } from 'expo-router';

interface DetailedMatch {
  match_id: string;
  team_home: {
    name: string;
    score: number;
  };
  team_away: {
    name: string;
    score: number;
  };
  timestamp: string;
  tournament_name?: string;
}

interface DetailedMatchCardProps {
  match: DetailedMatch;
  userTeam: string;
  onViewDetails: (match: DetailedMatch) => void;
}

export const DetailedMatchCard: React.FC<DetailedMatchCardProps> = ({ 
  match, 
  userTeam, 
  onViewDetails 
}) => {
  const isHomeTeam = match.team_home.name === userTeam;
  const isWin = (isHomeTeam && match.team_home.score > match.team_away.score) || 
    (!isHomeTeam && match.team_away.score > match.team_home.score);
  const isDraw = match.team_home.score === match.team_away.score;
  
  const getResultColor = () => {
    if (isWin) return styles.winBackground;
    if (isDraw) return styles.drawBackground;
    return styles.lossBackground;
  };

  const getResultBadge = () => {
    if (isWin) return { 
      text: '', 
      style: styles.winBadge,
      icon: Check
    };
    if (isDraw) return { 
      text: 'DRAW', 
      style: styles.drawBadge,
      icon: null
    };
    return { 
      text: 'LOSS', 
      style: styles.lossBadge,
      icon: X
    };
  };

  const result = getResultBadge();
  const ResultIcon = result.icon;
  const matchDate = new Date(match.timestamp);

  const handleViewStats = () => {
    router.push(`/fixtures/match-stats?matchId=${match.match_id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, getResultColor()]}
      onPress={handleViewStats}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.teamsContainer}>
          <Text style={[
            styles.teamName,
            match.team_home.name === userTeam && styles.userTeam
          ]}>
            {match.team_home.name}
          </Text>
          <Text style={styles.vs}>vs</Text>
          <Text style={[
            styles.teamName,
            match.team_away.name === userTeam && styles.userTeam
          ]}>
            {match.team_away.name}
          </Text>
        </View>
        
        <View style={styles.rightSection}>
          <Badge variant="outline" style={[styles.resultBadge, result.style]}>
            <View style={styles.badgeContent}>
              {ResultIcon && <ResultIcon color="currentColor" size={12} />}
              {result.text && <Text style={styles.badgeText}>{result.text}</Text>}
            </View>
          </Badge>
          <Eye color="#9ca3af" size={16} />
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Calendar color="#9ca3af" size={12} />
        <Text style={styles.dateText}>
          {matchDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.score}>
          {match.team_home.score} - {match.team_away.score}
        </Text>
        
        {match.tournament_name && (
          <Text style={styles.tournament}>{match.tournament_name}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  winBackground: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  drawBackground: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  lossBackground: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  teamName: {
    color: '#e5e7eb',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  userTeam: {
    color: '#22c55e',
    fontFamily: 'Inter-SemiBold',
  },
  vs: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginHorizontal: 8,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultBadge: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  winBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  drawBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  lossBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  dateText: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  score: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  tournament: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
});