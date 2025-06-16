import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Calendar, Clock, MapPin, Bell } from 'lucide-react-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';

interface NextMatchProps {
  opponent: string;
  date: string;
  time: string;
  venue: string;
  isHome: boolean;
}

export default function NextMatchCard({
  opponent,
  date,
  time,
  venue,
  isHome,
}: NextMatchProps) {
  const [reminderEnabled, setReminderEnabled] = useState(false);

  return (
    <GlassCard style={styles.card} sliced>
      <View style={styles.header}>
        <Text style={styles.title}>Next Match</Text>
        <View style={styles.reminderContainer}>
          <Bell size={16} color={reminderEnabled ? '#00FF88' : '#666666'} />
          <Switch
            value={reminderEnabled}
            onValueChange={setReminderEnabled}
            trackColor={{ false: '#333333', true: '#00FF88' }}
            thumbColor={reminderEnabled ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#333333"
          />
        </View>
      </View>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200 }}
        style={styles.matchDetails}
      >
        <View style={styles.teams}>
          <Text style={styles.teamText}>{isHome ? 'You' : opponent}</Text>
          <Text style={styles.vs}>vs</Text>
          <Text style={styles.teamText}>{isHome ? opponent : 'You'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Calendar size={16} color="#00FF88" />
          <Text style={styles.infoText}>{date}</Text>
        </View>

        <View style={styles.infoRow}>
          <Clock size={16} color="#00FF88" />
          <Text style={styles.infoText}>{time}</Text>
        </View>

        <View style={styles.infoRow}>
          <MapPin size={16} color="#00FF88" />
          <Text style={styles.infoText}>
            {venue} ({isHome ? 'Home' : 'Away'})
          </Text>
        </View>
      </MotiView>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  matchDetails: {
    gap: 12,
  },
  teams: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  vs: {
    fontSize: 14,
    color: '#00FF88',
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#cccccc',
  },
});
