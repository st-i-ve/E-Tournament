import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy, Users, Calendar, Target } from 'lucide-react-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export default function QuickActions() {
  const actions: QuickAction[] = [
    {
      id: '1',
      title: 'Join Tournament',
      icon: <Trophy size={24} color="#00FF88" />,
      onPress: () => console.log('Join Tournament'),
    },
    {
      id: '2',
      title: 'View Leaderboard',
      icon: <Users size={24} color="#00FF88" />,
      onPress: () => console.log('View Leaderboard'),
    },
    {
      id: '3',
      title: 'View Calendar',
      icon: <Calendar size={24} color="#00FF88" />,
      onPress: () => console.log('View Calendar'),
    },
    {
      id: '4',
      title: 'Training Mode',
      icon: <Target size={24} color="#00FF88" />,
      onPress: () => console.log('Training Mode'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <MotiView
            key={action.id}
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 100 }}
            style={styles.actionContainer}
          >
            <GlassCard 
              style={styles.actionCard}
              pressable
              onPress={action.onPress}
            >
              <View style={styles.actionContent}>
                {action.icon}
                <Text style={styles.actionText}>{action.title}</Text>
              </View>
            </GlassCard>
          </MotiView>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionContainer: {
    width: '48%',
  },
  actionCard: {
    height: 100,
  },
  actionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});