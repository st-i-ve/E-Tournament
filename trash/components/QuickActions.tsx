import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Trophy,
  Users,
  Calendar,
  Target,
  ChevronRight,
} from 'lucide-react-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface QuickAction {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  color?: string;
  onPress: () => void;
}

export default function QuickActions() {
  const actions: QuickAction[] = [
    {
      id: '1',
      title: 'Join Tournament',
      description: 'Compete for prizes',
      icon: <Trophy size={28} color="#00FF88" />,
      color: '#00FF88',
      onPress: () => console.log('Join Tournament'),
    },
    {
      id: '2',
      title: 'Leaderboard',
      description: 'See top players',
      icon: <Users size={28} color="#00B4FF" />,
      color: '#00B4FF',
      onPress: () => console.log('View Leaderboard'),
    },
    {
      id: '3',
      title: 'Schedule',
      description: 'Upcoming matches',
      icon: <Calendar size={28} color="#FF6B00" />,
      color: '#FF6B00',
      onPress: () => console.log('View Calendar'),
    },
    {
      id: '4',
      title: 'Training',
      description: 'Practice mode',
      icon: <Target size={28} color="#FF00E5" />,
      color: '#FF00E5',
      onPress: () => console.log('Training Mode'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quick Actions</Text>
        <TouchableWithoutFeedback
          onPress={() => console.log('View all actions')}
        >
          <View style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={16} color="#00FF88" />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <MotiView
            key={action.id}
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 80, type: 'spring' }}
            style={styles.actionContainer}
          >
            <GlassCard style={styles.actionCard} onPress={action.onPress}>
              <LinearGradient
                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.gradientBackground}
              />

              <View style={styles.actionContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: `${action.color}20` },
                  ]}
                >
                  {action.icon}
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                {action.description && (
                  <Text style={styles.actionDescription}>
                    {action.description}
                  </Text>
                )}
              </View>
            </GlassCard>
          </MotiView>
        ))}
      </View>
    </View>
  );
}

const CARD_WIDTH = (SCREEN_WIDTH - 40 - 12) / 2; // Screen width minus padding and gap

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionContainer: {
    width: CARD_WIDTH,
  },
  actionCard: {
    height: 140,
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  actionContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  actionDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
