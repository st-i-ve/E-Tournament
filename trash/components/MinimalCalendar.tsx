import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { currentUser, mockMatches, Match } from '@/data/enhancedMockData';
import MatchCard from './MatchCard';
import MatchInfoModal from './MatchInfoModal';

const MinimalCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const userMatches = mockMatches.filter(
    (match) =>
      (match.homeTeam === currentUser.teamName ||
        match.awayTeam === currentUser.teamName) &&
      match.status === 'upcoming'
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getMatchesForDate = (date: Date) => {
    return userMatches.filter((match) => {
      const matchDate = new Date(match.scheduledDate);
      return date.toDateString() === matchDate.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const formatMonth = () => {
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.monthTitle}>{formatMonth()}</Text>
        <View style={styles.headerControls}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth('prev')}
          >
            <ChevronLeft size={16} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.todayButton}
            onPress={() => setCurrentDate(new Date())}
          >
            <Text style={styles.todayButtonText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth('next')}
          >
            <ChevronRight size={16} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Week day headers */}
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day) => (
          <View key={day} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar days */}
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          if (!day)
            return <View key={`empty-${index}`} style={styles.emptyDay} />;

          const matches = getMatchesForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();
          const hasMatches = matches.length > 0;

          return (
            <TouchableOpacity
              key={day.toDateString()}
              style={[
                styles.day,
                isToday && styles.todayDay,
                hasMatches && styles.hasMatchesDay,
              ]}
              onPress={() => hasMatches && setSelectedDate(day)}
              disabled={!hasMatches}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.dayNumber, isToday && styles.todayDayNumber]}
              >
                {day.getDate()}
              </Text>
              {hasMatches && <View style={styles.matchIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Match Details Modal */}
      <Modal
        visible={!!selectedDate}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedDate(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedDate?.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
            <ScrollView>
              {selectedDate &&
                getMatchesForDate(selectedDate).map((match, index) => (
                  <MatchCard
                    key={`${match.homeTeam}-${match.awayTeam}-${index}`}
                    match={match}
                    userTeam={currentUser.teamName}
                    onInfoClick={setSelectedMatch}
                    compact
                  />
                ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedDate(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  todayButton: {
    paddingHorizontal: 8,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  todayButtonText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '500',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 4,
  },
  day: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 6,
  },
  todayDay: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  hasMatchesDay: {
    // Additional styles if needed
  },
  dayNumber: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '500',
  },
  todayDayNumber: {
    color: '#34d399',
  },
  matchIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  modalTitle: {
    color: '#34d399',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#374151',
    borderRadius: 6,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default MinimalCalendar;
