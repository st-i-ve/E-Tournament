import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, Target, Trophy, TrendingUp, Award, ChevronRight } from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CountUp from '@/components/CountUp';
import { router } from 'expo-router';
import { Link } from 'expo-router';


export default function ProfileTab() {
  // Mock data for demonstration
  const userStats = {
    totalGoals: 10,
    tournaments: 4,
    winRate: 100,
  };

  const tournaments = [
    {
      id: 1,
      name: 'Premier League Champions',
      type: 'league',
      players: 8,
      position: 2,
      status: 'active',
    },
    {
      id: 2,
      name: 'Weekend Warriors Cup',
      type: 'knockout',
      players: 6,
      position: 1,
      status: 'active',
    },
  ];

  const achievements = [
    { id: 1, title: 'Top Scorer', description: 'Scored 10+ goals in a tournament', icon: Target },
    { id: 2, title: 'Undefeated', description: 'Won 5 matches in a row', icon: Award },
    { id: 3, title: 'League Champion', description: 'Won a league tournament', icon: Trophy },
  ];

  const strengths = [
    { name: 'Ball Control', value: '85%' },
    { name: 'Passing Accuracy', value: '92%' },
    { name: 'Shot Accuracy', value: '78%' },
  ];

  const weaknesses = [
    { name: 'Defensive Work', value: '6 tackles/game' },
  ];

  const pendingCount = 3;





  return (
    <SafeAreaView style={styles.container}>
      {/* Geometric background elements */}
      <View style={styles.backgroundElements}>
        {/* Triangles */}
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View
          style={[
            styles.triangle,
            { top: 200, right: 80, transform: [{ rotate: '12deg' }] },
          ]}
        />
        <View style={[styles.triangle, { bottom: 200, left: 100 }]} />

        {/* Circles */}
        <View
          style={[
            styles.circle,
            { top: 150, left: 120, width: 48, height: 48 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { bottom: 250, right: 100, width: 32, height: 32 },
          ]}
        />
        <View
          style={[styles.circle, { top: 400, left: 80, width: 24, height: 24 }]}
        />

        {/* Rectangles */}
        <View
          style={[
            styles.rectangle,
            { top: 300, right: 40, width: 48, height: 32 },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            { bottom: 80, left: 200, width: 32, height: 48 },
          ]}
        />

        {/* Lines */}
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.profileIcon}>
              <View style={[styles.intersectingCircle, styles.circle1]} />
              <View style={[styles.intersectingCircle, styles.circle2]} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Profile</Text>
              <Text style={styles.headerSubtitle}>
                Your tournament stats and performance
              </Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <Link href="/profile/pending-actions" asChild>
              <TouchableOpacity
                style={styles.actionButton}            >
                <Bell color="#9ca3af" size={18} />
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>{pendingCount}</Text>
                </View>
              </TouchableOpacity>
            </Link>
            
            <Link href="/profile/settings" asChild>
              <TouchableOpacity style={styles.actionButton}>
                <Settings color="#9ca3af" size={18} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>G</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>google_user</Text>
            <Text style={styles.userTeam}>PSG</Text>
          </View>
        </View>

        {/* Overview Stats */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Overview</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <CountUp
                end={userStats.totalGoals}
                duration={1500}
                style={styles.statValue}
              />
              <Text style={styles.statLabel}>Total Goals</Text>
            </View>
            <View style={styles.statCard}>
              <CountUp
                end={userStats.tournaments}
                duration={1500}
                style={styles.statValue}
              />
              <Text style={styles.statLabel}>Tournaments</Text>
            </View>
            <View style={styles.statCard}>
              <CountUp
                end={userStats.winRate}
                duration={1500}
                suffix="%"
                style={styles.statValue}
              />
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
          </View>
        </View>

        {/* Line separator */}
        <View style={styles.lineSeparator} />

        {/* Tournaments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Tournaments</Text>
          </View>
          <View style={styles.tournamentsList}>
            {tournaments.map((tournament) => (
              <View key={tournament.id} style={styles.tournamentCard}>
                <View style={styles.tournamentInfo}>
                  <Text style={styles.tournamentName}>{tournament.name}</Text>
                  <Text style={styles.tournamentType}>
                    {tournament.type} • {tournament.players} players
                  </Text>
                </View>
                <View style={styles.tournamentBadges}>
                  <Badge
                    variant="outline"
                    style={[
                      styles.positionBadge,
                      tournament.position === 1 && styles.goldBadge,
                      tournament.position <= 3 &&
                        tournament.position > 1 &&
                        styles.greenBadge,
                    ]}
                    textStyle={[
                      tournament.position === 1 && styles.goldText,
                      tournament.position <= 3 &&
                        tournament.position > 1 &&
                        styles.greenText,
                    ]}
                  >
                    {tournament.position === 1
                      ? '1st'
                      : tournament.position === 2
                      ? '2nd'
                      : tournament.position === 3
                      ? '3rd'
                      : `${tournament.position}th`}
                  </Badge>
                  <Badge style={styles.statusBadge}>{tournament.status}</Badge>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Line separator */}
        <View style={styles.lineSeparator} />

        {/* Performance Analysis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Performance Analysis</Text>
          </View>

          {/* Strengths */}
          <View style={styles.performanceSection}>
            <View style={styles.performanceHeader}>
              <TrendingUp color="#22c55e" size={12} />
              <Text style={styles.performanceTitle}>Strengths</Text>
            </View>
            <View style={styles.performanceList}>
              {strengths.map((strength, index) => (
                <View key={index} style={styles.performanceItem}>
                  <Text style={styles.performanceLabel}>{strength.name}</Text>
                  <Text style={styles.strengthValue}>{strength.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Mini separator */}
          <View style={styles.miniSeparator} />

          {/* Areas for Improvement */}
          <View style={styles.performanceSection}>
            <View style={styles.performanceHeader}>
              <Award color="#f97316" size={12} />
              <Text style={[styles.performanceTitle, { color: '#f97316' }]}>
                Areas for Improvement
              </Text>
            </View>
            <View style={styles.performanceList}>
              {weaknesses.map((weakness, index) => (
                <View key={index} style={styles.performanceItem}>
                  <Text style={styles.performanceLabel}>{weakness.name}</Text>
                  <Text style={styles.weaknessValue}>{weakness.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Line separator */}
        <View style={styles.lineSeparator} />

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Achievements</Text>
          </View>
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <achievement.icon color="#22c55e" size={16} />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 8,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 16,
  },
  profileIcon: {
    width: 32,
    height: 32,
    marginTop: 4,
    position: 'relative',
  },
  intersectingCircle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#22c55e',
    borderRadius: 12,
  },
  circle1: {
    top: 0,
    left: 0,
  },
  circle2: {
    top: 8,
    left: 8,
  },
  headerInfo: {
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontFamily: 'Inter-Bold',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    zIndex: 10,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  userTeam: {
    color: '#22c55e',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },
  navigationSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    zIndex: 10,
  },
  navigationCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  navigationCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  navigationCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  navigationCardIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationCardInfo: {
    flex: 1,
  },
  navigationCardTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  navigationCardSubtitle: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  navigationCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navigationCardBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#22c55e',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
    textAlign: 'center',
  },
  lineSeparator: {
    height: 1,
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
  },
  tournamentsList: {
    gap: 12,
  },
  tournamentCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  tournamentInfo: {
    flex: 1,
  },
  tournamentName: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  tournamentType: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  tournamentBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  positionBadge: {
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
    borderColor: 'rgba(156, 163, 175, 0.3)',
  },
  goldBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  greenBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  goldText: {
    color: '#ffd700',
  },
  greenText: {
    color: '#22c55e',
  },
  statusBadge: {
    backgroundColor: '#22c55e',
  },
  performanceSection: {
    marginBottom: 16,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  performanceTitle: {
    color: '#22c55e',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  performanceList: {
    gap: 8,
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  performanceLabel: {
    color: '#e5e7eb',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  strengthValue: {
    color: '#22c55e',
    fontSize: 11,
    fontFamily: 'Inter-Medium',
  },
  weaknessValue: {
    color: '#f97316',
    fontSize: 11,
    fontFamily: 'Inter-Medium',
  },
  miniSeparator: {
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    marginVertical: 12,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  achievementIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementInfo: {
    marginLeft: 12,
    flex: 1,
  },
  achievementTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  achievementDescription: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  bottomSpacing: {
    height: 80,
  },
});