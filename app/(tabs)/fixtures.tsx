import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, ChevronLeft, ChevronRight, Eye } from 'lucide-react-native';
import { MinimalCalendar } from '../../components/MinimalCalendar';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';

export default function FixturesTab() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // July 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const handleViewAllGames = () => {
    router.push('/schedule');
  };

  const days = getDaysInMonth(currentDate);

  return (
    <SafeAreaView style={styles.container}>
      {/* Geometric background elements */}
      <View style={styles.backgroundElements}>
        {/* Triangles */}
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View style={[styles.triangle, { top: 200, right: 80, transform: [{ rotate: '12deg' }] }]} />
        <View style={[styles.triangle, { bottom: 200, left: 100 }]} />
        
        {/* Circles */}
        <View style={[styles.circle, { top: 150, left: 120, width: 48, height: 48 }]} />
        <View style={[styles.circle, { bottom: 250, right: 100, width: 32, height: 32 }]} />
        <View style={[styles.circle, { top: 400, left: 80, width: 24, height: 24 }]} />
        
        {/* Rectangles */}
        <View style={[styles.rectangle, { top: 300, right: 40, width: 48, height: 32 }]} />
        <View style={[styles.rectangle, { bottom: 80, left: 200, width: 32, height: 48 }]} />
        
        {/* Lines */}
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <View style={styles.calendarIcon}>
                <View style={styles.calendarLine} />
              </View>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Fixtures</Text>
              <Text style={styles.headerSubtitle}>Your upcoming matches and tournament schedule</Text>
            </View>
          </View>
        </View>

        {/* Calendar Section */}
        <View style={styles.calendarSection}>
          <View style={styles.calendarHeader}>
            <View style={styles.calendarTitleContainer}>
              <Calendar color="#22c55e" size={16} />
              <Text style={styles.calendarTitle}>Calendar View</Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllGames}>
              <Eye color="#ffffff" size={12} />
              <Text style={styles.viewAllText}>View All Games</Text>
            </TouchableOpacity>
          </View>

          <MinimalCalendar />
        </View>

        {/* Upcoming Matches */}
        <View style={styles.matchesSection}>
          <Text style={styles.matchesSectionTitle}>Upcoming Matches</Text>
          <View style={styles.matchCard}>
            <View style={styles.matchHeader}>
              <Text style={styles.matchDate}>July 3, 2025</Text>
              <Text style={styles.matchTime}>7:30 PM</Text>
            </View>
            <View style={styles.matchTeams}>
              <Text style={styles.teamName}>Barcelona FC</Text>
              <Text style={styles.vs}>vs</Text>
              <Text style={styles.teamName}>Real Madrid</Text>
            </View>
            <Text style={styles.matchVenue}>Camp Nou Stadium</Text>
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
  scrollView: {
    flex: 1,
    zIndex: 10,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginTop: 4,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#22c55e',
    borderRadius: 12,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarLine: {
    width: 12,
    height: 2,
    backgroundColor: '#22c55e',
    transform: [{ rotate: '45deg' }],
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
  calendarSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 6,
  },
  viewAllButton: {
    backgroundColor: '#22c55e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewAllText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  matchesSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  matchesSectionTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  matchCard: {
    backgroundColor: '#1f2937',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#374151',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  matchDate: {
    color: '#22c55e',
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },
  matchTime: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  teamName: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  vs: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginHorizontal: 12,
  },
  matchVenue: {
    color: '#9ca3af',
    fontSize: 9,
    fontFamily: 'Inter-Regular',
  },
  bottomSpacing: {
    height: 80,
  },
});