import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import GlassCard from './GlassCard';
import { MotiView } from 'moti';

interface CalendarMatch {
  date: number;
  opponent: string;
  isHome: boolean;
  time: string;
}

interface CalendarViewProps {
  matches: CalendarMatch[];
}

export default function CalendarView({ matches }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const hasMatch = (date: number) => {
    return matches.some(match => match.date === date);
  };

  const getMatch = (date: number) => {
    return matches.find(match => match.date === date);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth + firstDayOfMonth;

    for (let i = 0; i < totalDays; i++) {
      if (i < firstDayOfMonth) {
        days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
      } else {
        const date = i - firstDayOfMonth + 1;
        const match = getMatch(date);
        days.push(
          <TouchableOpacity
            key={date}
            style={[
              styles.day,
              hasMatch(date) && styles.matchDay
            ]}
          >
            <Text style={[
              styles.dayText,
              hasMatch(date) && styles.matchDayText
            ]}>
              {date}
            </Text>
            {hasMatch(date) && (
              <View style={styles.matchDot} />
            )}
          </TouchableOpacity>
        );
      }
    }

    return days;
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth('prev')}>
          <ChevronLeft size={24} color="#00FF88" />
        </TouchableOpacity>
        
        <Text style={styles.monthTitle}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        
        <TouchableOpacity onPress={() => navigateMonth('next')}>
          <ChevronRight size={24} color="#00FF88" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={index} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 300 }}
        style={styles.calendar}
      >
        {renderCalendarDays()}
      </MotiView>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cccccc',
    width: 35,
    textAlign: 'center',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
  },
  matchDay: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00FF88',
  },
  dayText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  matchDayText: {
    color: '#00FF88',
    fontWeight: 'bold',
  },
  matchDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00FF88',
  },
});