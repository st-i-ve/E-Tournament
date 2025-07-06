import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Trophy, Calendar, Filter, CircleCheck as CheckCircle2, Circle, X, ChevronLeft } from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MatchCard } from '@/components/MatchCard';
import { MatchInfoModal } from '@/components/MatchInfoModal';
import { DetailedMatchCard } from '@/components/DetailedMatchCard';
import { router } from 'expo-router';

// Mock data
const currentUser = {
  id: 'user-1',
  teamName: 'Barcelona FC',
};

const mockMatches = [
  {
    id: '1',
    homeTeam: 'Barcelona FC',
    awayTeam: 'Real Madrid',
    scheduledDate: '2025-07-03T19:30:00Z',
    status: 'upcoming',
    tournamentId: 'tournament-1',
  },
  {
    id: '2',
    homeTeam: 'Manchester City',
    awayTeam: 'Barcelona FC',
    scheduledDate: '2025-07-05T20:00:00Z',
    status: 'upcoming',
    tournamentId: 'tournament-1',
  },
];

const detailedMatches = [
  {
    match_id: 'match-1',
    team_home: {
      name: 'Barcelona FC',
      score: 2,
    },
    team_away: {
      name: 'Real Madrid',
      score: 1,
    },
    timestamp: '2025-06-15T19:30:00Z',
    tournament_name: 'Champions Elite League',
  },
  {
    match_id: 'match-2',
    team_home: {
      name: 'Manchester City',
      score: 1,
    },
    team_away: {
      name: 'Barcelona FC',
      score: 3,
    },
    timestamp: '2025-06-12T20:00:00Z',
    tournament_name: 'Champions Elite League',
  },
];

const mockTournaments = [
  {
    id: 'tournament-1',
    name: 'Champions Elite League',
    participants: ['user-1'],
  },
];
const handleViewMatchStats = (match: any) => {

    router.push('/fixtures/match-stats');

    // params: {
    //   matchId: match.match_id,
    // },
};

export default function SchedulePage() {
  const [selectedTournament, setSelectedTournament] = useState<string>('all');
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  // Get all user's matches (both upcoming and completed)
  const upcomingMatches = mockMatches.filter(match => 
    (match.homeTeam === currentUser.teamName || match.awayTeam === currentUser.teamName) &&
    match.status === 'upcoming'
  );

  const completedMatches = detailedMatches.filter(match => 
    match.team_home.name === currentUser.teamName || match.team_away.name === currentUser.teamName
  );

  // Get user's tournaments
  const userTournaments = mockTournaments.filter(t => 
    t.participants.includes(currentUser.id)
  );

  // Group matches by month
  const groupedMatches = useMemo(() => {
    const groups: { [key: string]: { upcoming: any[], completed: any[] } } = {};

    // Process upcoming matches
    upcomingMatches.forEach(match => {
      if (selectedTournament !== 'all' && match.tournamentId !== selectedTournament) return;
      
      const date = new Date(match.scheduledDate);
      const monthKey = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      if (!groups[monthKey]) {
        groups[monthKey] = { upcoming: [], completed: [] };
      }
      groups[monthKey].upcoming.push(match);
    });

    // Process completed matches
    completedMatches.forEach(match => {
      if (selectedTournament !== 'all' && match.tournament_name !== selectedTournament) return;
      
      const date = new Date(match.timestamp);
      const monthKey = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      if (!groups[monthKey]) {
        groups[monthKey] = { upcoming: [], completed: [] };
      }
      groups[monthKey].completed.push(match);
    });

    // Sort months
    return Object.keys(groups)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .reduce((acc, key) => {
        acc[key] = groups[key];
        return acc;
      }, {} as typeof groups);
  }, [selectedTournament, upcomingMatches, completedMatches]);

  const handleViewDetails = (match: any) => {
    // Navigate to match stats page
    console.log('View details for match:', match.match_id);
  };

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
            <Text style={styles.headerTitle}>Schedule</Text>
            <Text style={styles.headerSubtitle}>All your matches - upcoming and completed</Text>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <Circle color="#3b82f6" size={16} />
            <Text style={styles.legendText}>Upcoming</Text>
          </View>
          <View style={styles.legendItem}>
            <CheckCircle2 color="#22c55e" size={16} />
            <Text style={styles.legendText}>Completed</Text>
          </View>
        </View>

        {/* Grouped Matches */}
        <View style={styles.matchesContainer}>
          {Object.entries(groupedMatches).map(([month, matches]) => (
            <View key={month} style={styles.monthSection}>
              <View style={styles.monthHeader}>
                <Trophy color="#22c55e" size={20} />
                <Text style={styles.monthTitle}>{month}</Text>
              </View>
              
              <View style={styles.matchesList}>
                {/* Upcoming matches */}
                {matches.upcoming.map((match, index) => (
                  <View key={`upcoming-${index}`} style={styles.matchRow}>
                    <Circle color="#3b82f6" size={16} style={styles.matchIcon} />
                    <View style={styles.matchCardContainer}>
                      <MatchCard
                        match={match}
                        userTeam={currentUser.teamName}
                        onInfoClick={setSelectedMatch}
                      />
                    </View>
                  </View>
                ))}
                
                {/* Completed matches */}
                {matches.completed.map((match, index) => (
                  <View key={`completed-${index}`} style={styles.matchRow}>
                    
                    <CheckCircle2 color="#22c55e" size={16} style={styles.matchIcon} />
                    <View style={styles.matchCardContainer}>
                      <DetailedMatchCard
                        match={match}
                        userTeam={currentUser.teamName}
                        onViewDetails={handleViewDetails}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}

          {Object.keys(groupedMatches).length === 0 ? (
            <View style={styles.emptyState}>
              <Calendar color="#6b7280" size={64} />
              <Text style={styles.emptyStateTitle}>No matches found</Text>
              <Text style={styles.emptyStateText}>
                {selectedTournament === 'all' 
                  ? 'Join a tournament to start playing matches'
                  : 'No matches found in the selected tournament'
                }
              </Text>
            </View>
          ) : null}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Match Info Modal */}
      <MatchInfoModal
        match={selectedMatch}
        userTeam={currentUser.teamName}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
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
    flex: 1,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    lineHeight: 20,
  },
  headerSubtitle: {
    color: '#6b7280',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
    lineHeight: 14,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  matchesContainer: {
    paddingHorizontal: 16,
  },
  monthSection: {
    marginBottom: 32,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  monthTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  matchesList: {
    gap: 12,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  matchIcon: {
    marginTop: 12,
    flexShrink: 0,
  },
  matchCardContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    color: '#9ca3af',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#6b7280',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 80,
  },
});