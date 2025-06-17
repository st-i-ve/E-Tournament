import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import {
  Calendar,
  Clock,
  MapPin,
  Home,
  Users,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  List,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { currentUser, mockMatches, Match } from '@/data/enhancedMockData';
import MatchCard from './MatchCard';
import MatchInfoModal from './MatchInfoModal';

const CalendarView = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const userMatches = mockMatches.filter(
    (match) =>
      match.homeTeam === currentUser.teamName ||
      match.awayTeam === currentUser.teamName
  );

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
    return userMatches.filter((match) => {
      const matchDate = new Date(match.scheduledDate);
      return matchDate.toDateString() === date.toDateString();
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

  const renderCalendarGrid = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const screenWidth = Dimensions.get('window').width;
    const daySize = (screenWidth - 48) / 7; // 48 = padding * 2 (assuming 24 padding)

    return (
      <View style={styles.calendarContainer}>
        {/* Week day headers */}
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day) => (
            <View key={day} style={styles.weekDayHeader}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar days */}
        <View style={styles.daysContainer}>
          {days.map((day, index) => {
            if (!day)
              return (
                <View
                  key={index}
                  style={[styles.dayEmpty, { width: daySize, height: daySize }]}
                />
              );

            const matches = getMatchesForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected =
              selectedDate &&
              day.toDateString() === selectedDate.toDateString();
            const homeMatches = matches.filter(
              (m) => m.homeTeam === currentUser.teamName
            );
            const awayMatches = matches.filter(
              (m) => m.awayTeam === currentUser.teamName
            );

            return (
              <TouchableOpacity
                key={day.toDateString()}
                style={[
                  styles.dayContainer,
                  { width: daySize, height: daySize },
                  isToday && styles.todayDay,
                  isSelected && styles.selectedDay,
                ]}
                onPress={() => setSelectedDate(isSelected ? null : day)}
              >
                <Text
                  style={[styles.dayNumber, isToday && styles.todayDayNumber]}
                >
                  {day.getDate()}
                </Text>

                {/* Match indicators */}
                {matches.length > 0 && (
                  <View style={styles.matchIndicators}>
                    {homeMatches.length > 0 && (
                      <View style={styles.homeMatchIndicator}>
                        <Text style={styles.matchIndicatorText}>
                          {homeMatches.length}
                        </Text>
                      </View>
                    )}
                    {awayMatches.length > 0 && (
                      <View style={styles.awayMatchIndicator}>
                        <Text style={styles.matchIndicatorText}>
                          {awayMatches.length}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderSelectedDateMatches = () => {
    if (!selectedDate) return null;

    const matches = getMatchesForDate(selectedDate);
    if (matches.length === 0) return null;

    return (
      <View style={styles.selectedMatchesContainer}>
        <View style={styles.selectedDateHeader}>
          <Calendar color="#10B981" size={20} />
          <Text style={styles.selectedDateText}>
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>
        <View style={styles.matchesList}>
          {matches.map((match, index) => (
            <MatchCard
              key={`${match.homeTeam}-${match.awayTeam}-${index}`}
              match={match}
              userTeam={currentUser.teamName}
              onInfoClick={setSelectedMatch}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Controls */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.monthTitle}>{formatMonth()}</Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.homeLegendDot]} />
              <Text style={styles.legendText}>Home</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.awayLegendDot]} />
              <Text style={styles.legendText}>Away</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerControls}>
          <Button
            variant="outline"
            size="default"
            onPress={() => navigateMonth('prev')}
            style={styles.navButton}
          >
            <ChevronLeft size={20} color="#D1D5DB" />
          </Button>

          <Button
            variant="outline"
            size="default"
            onPress={() => setCurrentDate(new Date())}
            style={styles.navButton}
          >
            <Text style={styles.navButtonText}>Today</Text>
          </Button>

          <Button
            variant="outline"
            size="default"
            onPress={() => navigateMonth('next')}
            style={styles.navButton}
          >
            <ChevronRight size={20} color="#D1D5DB" />
          </Button>
        </View>
      </View>

      {/* Calendar Grid */}
      {renderCalendarGrid()}

      {/* Selected Date Matches */}
      {renderSelectedDateMatches()}

      {/* Legend */}
      <Text style={styles.legendHint}>
        Click on a date to view matches for that day
      </Text>

      {/* Match Info Modal */}
      <MatchInfoModal
        match={selectedMatch}
        userTeam={currentUser.teamName}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'column',
    gap: 12,
  },
  monthTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  legend: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  homeLegendDot: {
    backgroundColor: '#10B981',
  },
  awayLegendDot: {
    backgroundColor: '#3B82F6',
  },
  legendText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  headerControls: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    borderColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#D1D5DB',
  },
  calendarContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.4)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
    padding: 16,
    marginBottom: 24,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weekDayHeader: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  weekDayText: {
    color: '#D1D5DB',
    fontSize: 16,
    fontWeight: '600',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayEmpty: {
    // Empty day placeholder
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
    backgroundColor: 'rgba(31, 41, 55, 0.2)',
    margin: 2,
    padding: 8,
  },
  todayDay: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.5)',
  },
  selectedDay: {
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
    borderColor: 'rgba(59, 130, 246, 0.6)',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  todayDayNumber: {
    color: '#10B981',
  },
  matchIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  homeMatchIndicator: {
    width: 24,
    height: 24,
    backgroundColor: '#10B981',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  awayMatchIndicator: {
    width: 24,
    height: 24,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchIndicatorText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedMatchesContainer: {
    marginTop: 24,
  },
  selectedDateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  selectedDateText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  matchesList: {
    gap: 12,
  },
  legendHint: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 24,
    fontSize: 16,
  },
});

export default CalendarView;
