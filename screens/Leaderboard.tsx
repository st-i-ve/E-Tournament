import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Triangle, Users, Target, Info } from 'lucide-react-native';
import { Badge } from '@/trash/components/ui/badge';
import { Select } from '@/trash/components/ui/select';
import { Tabs } from '@/trash/components/ui/tabs';
import { Dialog } from '@/trash/components/ui/dialog';
import { currentUser, mockTournaments } from '@/data/enhancedMockData';
import LeagueLeaderboardTable from '@/trash/components/LeagueLeaderboardTable';
import KnockoutBracket from '@/trash/components/KnockoutBracket';

const LeaderboardPage = () => {
  const [selectedTournament, setSelectedTournament] = useState<string>(
    mockTournaments[0]?.id || ''
  );

  // Get user's active tournaments for the selector
  const userTournaments = mockTournaments.filter(
    (t) => t.participants.includes(currentUser.id) && t.status === 'active'
  );

  const selectedTournamentData = mockTournaments.find(
    (t) => t.id === selectedTournament
  );

  return (
    <View style={styles.container}>
      {/* Background shapes */}
      <View style={styles.backgroundShapes}>
        {/* Triangles */}
        <View style={[styles.triangle, styles.triangle1]} />
        <View style={[styles.triangle, styles.triangle2]} />
        <View style={[styles.triangle, styles.triangle3]} />

        {/* Circles */}
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />

        {/* Rectangles */}
        <View style={[styles.rectangle, styles.rectangle1]} />
        <View style={[styles.rectangle, styles.rectangle2]} />

        {/* Lines */}
        <View style={[styles.line, styles.line1]} />
        <View style={[styles.line, styles.line2]} />
        <View style={[styles.line, styles.line3]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Triangle size={24} color="#4ADE80" style={styles.headerIcon} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Tournament Leaderboards</Text>
            <Text style={styles.subtitle}>
              Track your performance and rankings
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Tournament Selector and Legend */}
        <View style={styles.selectorContainer}>
          <View style={styles.selectWrapper}>
            <Select
              value={selectedTournament}
              onValueChange={setSelectedTournament}
              items={userTournaments.map((tournament) => ({
                value: tournament.id,
                label: tournament.name,
                icon:
                  tournament.type === 'league' ? (
                    <Users size={16} color="#3B82F6" />
                  ) : (
                    <Target size={16} color="#A855F7" />
                  ),
              }))}
              placeholder="Choose a tournament"
              style={styles.select}
            />
          </View>

          {/* Legend info modal beside dropdown */}
          {selectedTournamentData?.type === 'league' && (
            <Dialog>
              <Dialog.Trigger>
                <TouchableOpacity style={styles.infoButton}>
                  <Info size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </Dialog.Trigger>
              <Dialog.Content style={styles.dialogContent}>
                <Dialog.Header>
                  <Dialog.Title style={styles.dialogTitle}>
                    Match Result Legend
                  </Dialog.Title>
                </Dialog.Header>
                <View style={styles.legendContainer}>
                  <View style={styles.legendItem}>
                    <View style={styles.winIndicator}>
                      <View style={styles.winDot} />
                    </View>
                    <Text style={styles.legendText}>Win</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={styles.drawIndicator}>
                      <View style={styles.drawDot} />
                    </View>
                    <Text style={styles.legendText}>Draw</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={styles.lossIndicator}>
                      <View style={styles.lossDot} />
                    </View>
                    <Text style={styles.legendText}>Loss</Text>
                  </View>
                </View>
              </Dialog.Content>
            </Dialog>
          )}
        </View>

        {/* Tournament Type Based Display */}
        {selectedTournamentData && (
          <View style={styles.tournamentContent}>
            {selectedTournamentData.type === 'league' ? (
              <View>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>League Table</Text>
                </View>
                <LeagueLeaderboardTable />
              </View>
            ) : (
              <View>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Tournament Bracket</Text>
                </View>
                <KnockoutBracket />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  triangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  triangle1: {
    top: 80,
    left: 40,
    width: 32,
    height: 32,
  },
  triangle2: {
    top: '33%',
    right: 80,
    width: 24,
    height: 24,
    transform: [{ rotate: '12deg' }],
  },
  triangle3: {
    bottom: '25%',
    left: '25%',
    width: 40,
    height: 40,
  },
  circle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.1)',
    borderRadius: 9999,
  },
  circle1: {
    top: '25%',
    left: '33%',
    width: 48,
    height: 48,
  },
  circle2: {
    bottom: '33%',
    right: '25%',
    width: 32,
    height: 32,
  },
  circle3: {
    top: '66%',
    left: 80,
    width: 24,
    height: 24,
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.1)',
  },
  rectangle1: {
    top: '50%',
    right: 40,
    width: 48,
    height: 32,
  },
  rectangle2: {
    bottom: 80,
    left: '50%',
    width: 32,
    height: 48,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'rgba(74, 222, 128, 0.05)',
  },
  line1: {
    top: 0,
    left: '25%',
    width: 1,
    height: '100%',
  },
  line2: {
    top: '33%',
    left: 0,
    width: '100%',
    height: 1,
  },
  line3: {
    top: '66%',
    left: 0,
    width: '100%',
    height: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerIcon: {
    marginTop: 4,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
    // Gradient text effect
    backgroundColor: '#4ADE80',
    backgroundImage: 'linear-gradient(to right, white, #4ADE80)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    // Shimmer effect would need additional animation components
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  selectWrapper: {
    flex: 1,
  },
  select: {
    backgroundColor: 'rgba(28, 28, 30, 0.5)',
    borderColor: 'rgba(55, 65, 81, 0.5)',
    color: 'white',
  },
  infoButton: {
    padding: 8,
  },
  dialogContent: {
    backgroundColor: '#1C1C1E',
    borderColor: '#374151',
  },
  dialogTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  legendContainer: {
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  winIndicator: {
    width: 16,
    height: 16,
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winDot: {
    width: 8,
    height: 8,
    backgroundColor: '#4ADE80',
    borderRadius: 4,
  },
  drawIndicator: {
    width: 16,
    height: 16,
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawDot: {
    width: 8,
    height: 8,
    backgroundColor: '#EAB308',
    borderRadius: 4,
  },
  lossIndicator: {
    width: 16,
    height: 16,
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lossDot: {
    width: 8,
    height: 8,
    backgroundColor: '#F87171',
    borderRadius: 4,
  },
  legendText: {
    color: 'white',
    fontSize: 14,
  },
  tournamentContent: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});

export default LeaderboardPage;
