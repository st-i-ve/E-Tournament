import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Users, Trophy, Calendar, Target, Star } from 'lucide-react-native';

export default function HomeTab() {
  const quickActions = [
    {
      id: 1,
      title: 'Create Tournament',
      subtitle: 'Start your own league',
      icon: Plus,
      color: '#22c55e',
    },
    {
      id: 2,
      title: 'Join Tournament',
      subtitle: 'Find tournaments',
      icon: Users,
      color: '#374151',
    },
    {
      id: 3,
      title: 'Leaderboards',
      subtitle: 'Check rankings',
      icon: Trophy,
      color: '#374151',
    },
    {
      id: 4,
      title: 'Fixtures',
      subtitle: 'View matches',
      icon: Calendar,
      color: '#374151',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>F</Text>
              <View style={styles.starBadge}>
                <Star color="#22c55e" size={10} fill="#22c55e" />
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>google_user</Text>
              <Text style={styles.userTeam}>Barcelona</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={[styles.actionCard, { backgroundColor: action.color }]}>
                <action.icon color="#ffffff" size={20} />
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* My Tournaments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy color="#22c55e" size={16} />
            <Text style={styles.sectionTitle}>My Tournaments</Text>
            <Text style={styles.sectionBadge}>4/5</Text>
          </View>
          <View style={styles.tournamentCard}>
            <View style={styles.tournamentHeader}>
              <View>
                <Text style={styles.tournamentTitle}>Premier League Champions</Text>
                <Text style={styles.tournamentType}>LEAGUE</Text>
              </View>
              <View style={styles.positionBadge}>
                <Text style={styles.positionText}>#2</Text>
              </View>
            </View>
            <View style={styles.tournamentStats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Games</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Wins</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>21</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
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
    padding: 16,
    paddingTop: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  starBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    padding: 2,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  welcomeText: {
    color: '#9ca3af',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  userName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginTop: 2,
  },
  userTeam: {
    color: '#22c55e',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },
  section: {
    padding: 16,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 6,
    flex: 1,
  },
  sectionBadge: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  actionTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    marginTop: 8,
    textAlign: 'center',
  },
  actionSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
    textAlign: 'center',
  },
  tournamentCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tournamentTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  tournamentType: {
    color: '#22c55e',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },
  positionBadge: {
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  positionText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  tournamentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#22c55e',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
});