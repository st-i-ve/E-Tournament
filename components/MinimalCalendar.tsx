import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react-native';
import { MatchCard } from './MatchCard';
import { MatchInfoModal } from './MatchInfoModal';

// Mock data
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

const currentUser = {
  teamName: 'Barcelona FC',
};

export const MinimalCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // July 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Mock match data - days with matches
  const matchDays = [3, 5, 9, 12, 16, 18, 23, 26];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getMatchesForDate = (date: Date) => {
    return mockMatches.filter(match => {
      const matchDate = new Date(match.scheduledDate);
      return matchDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const hasMatch = (date: Date) => {
    return date.getMonth() === currentDate.getMonth() && 
           matchDays.includes(date.getDate());
  };

  const formatMonth = () => {
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <>
      <View style={styles.container}>
        {/* Calendar Navigation */}
        <View style={styles.calendarNavigation}>
          <Text style={styles.monthYear}>{formatMonth()}</Text>
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => navigateMonth('prev')}
            >
              <ChevronLeft color="#ffffff" size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.todayButton}>
              <Text style={styles.todayText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => navigateMonth('next')}
            >
              <ChevronRight color="#ffffff" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Week day headers */}
        <View style={styles.weekHeader}>
          {daysOfWeek.map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calendarGrid}>
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
            <View key={weekIndex} style={styles.weekRow}>
              {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date, dayIndex) => (
                <TouchableOpacity 
                  key={dayIndex} 
                  style={[
                    styles.dayCell,
                    date && isToday(date) && styles.todayCell,
                    date && hasMatch(date) && styles.matchCell,
                  ]}
                  onPress={() => date && hasMatch(date) && setSelectedDate(date)}
                >
                  {date && (
                    <>
                      <Text 
                        style={[
                          styles.dayText,
                          date.getMonth() !== currentDate.getMonth() && styles.otherMonthText,
                          isToday(date) && styles.todayText,
                        ]}
                      >
                        {date.getDate()}
                      </Text>
                      {hasMatch(date) && <View style={styles.matchIndicator} />}
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Match Details Modal */}
      <Modal
        visible={!!selectedDate}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedDate(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedDate?.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedDate(null)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.matchesList}>
              {selectedDate && getMatchesForDate(selectedDate).map((match, index) => (
                <MatchCard
                  key={`${match.homeTeam}-${match.awayTeam}-${index}`}
                  match={match}
                  userTeam={currentUser.teamName}
                  onInfoClick={setSelectedMatch}
                  compact
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Match Info Modal */}
      <MatchInfoModal
        match={selectedMatch}
        userTeam={currentUser.teamName}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYear: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navButton: {
    padding: 6,
  },
  todayButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  todayText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  calendarGrid: {
    gap: 4,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dayCell: {
    flex: 1,
    minHeight: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    borderRadius: 6,
    margin: 1,
    padding: 4,
  },
  todayCell: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  matchCell: {
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  dayText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  otherMonthText: {
    color: '#4b5563',
  },
  todayText: {
    color: '#22c55e',
    fontFamily: 'Inter-Bold',
  },
  matchIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    maxWidth: 350,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#22c55e',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    color: '#9ca3af',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  matchesList: {
    gap: 12,
  },
});