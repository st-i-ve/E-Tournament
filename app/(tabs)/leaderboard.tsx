import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, ChevronDown, Info } from 'lucide-react-native';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { Background } from '@/components/Background';

export default function LeaderboardTab() {
  const [selectedLeague, setSelectedLeague] = useState('Premier League Champions');

  return (
    <SafeAreaView style={styles.container}>
      {/* Geometric background elements */}
      <Background 
        triangleCount={2}
        circleCount={3}
        rectangleCount={2}
        borderOpacity={0.1}
        lineOpacity={0.05}
        color="#22c55e"
        seed={42} // Fixed seed for consistent layout
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>

        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.leaderboardIcon}>
              <View style={styles.xShape}>
                <View style={styles.xLine1} />
                <View style={styles.xLine2} />
              </View>
              <View style={styles.oShape} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Leaderboard</Text>
              <Text style={styles.headerSubtitle}>See who's the best</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Info color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* League Selector */}
        <View style={styles.selectorContainer}>
          <TouchableOpacity style={styles.leagueSelector}>
            <Trophy color="#22c55e" size={16} />
            <Text style={styles.leagueName}>{selectedLeague}</Text>
            <ChevronDown color="#9ca3af" size={16} />
          </TouchableOpacity>
        </View>

        {/* Enhanced Leaderboard Table */}
        <View style={styles.tableSection}>
          <LeaderboardTable />
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Competition Qualification</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#ffd700' }]} />
              <Text style={styles.legendText}>1st - Champion</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#22c55e' }]} />
              <Text style={styles.legendText}>2-4 - Champions League</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#f97316' }]} />
              <Text style={styles.legendText}>5-6 - Europa League</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.legendText}>7-8 - Relegation</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leaderboardIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xShape: {
    position: 'absolute',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xLine1: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: '#22c55e',
    transform: [{ rotate: '45deg' }],
    right: 0,
  },
  xLine2: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: '#22c55e',
    transform: [{ rotate: '-45deg' }],
    right: 0,
  },
  oShape: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22c55e',
    backgroundColor: 'transparent',
    left: 0,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  headerSubtitle: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    backgroundColor: 'transparent',
  },
  selectorContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  leagueSelector: {
    backgroundColor: '#1f2937',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#374151',
  },
  leagueName: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
    marginRight: 6,
    flex: 1,
  },
  tableSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  legend: {
    padding: 16,
    marginTop: 16,
  },
  legendTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
  },
  legendItems: {
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
});