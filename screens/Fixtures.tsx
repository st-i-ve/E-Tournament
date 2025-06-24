import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Calendar } from 'lucide-react-native';
import MinimalCalendar from '../components/MinimalCalendar'; //

const FixturesPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
          <View style={styles.headerIcon}>
            <View style={styles.headerIconLine} />
          </View>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Fixtures</Text>
          <Text style={styles.subtitle}>
            Your upcoming matches and tournament schedule
          </Text>
        </View>
      </View>

      {/* Calendar View */}
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <View style={styles.calendarTitleContainer}>
            <Calendar color="#4ade80" size={16} />
            <Text style={styles.calendarTitle}>Calendar View</Text>
          </View>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('Schedule')}
          >
            <Text style={styles.viewAllButtonText}>View All Games</Text>
            <View style={styles.buttonHighlight} />
          </TouchableOpacity>
        </View>
        <View style={styles.calendarWrapper}>
          <MinimalCalendar />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 96,
  },
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerIconContainer: {
    width: 24,
    height: 24,
    marginTop: 4,
    marginRight: 16,
  },
  headerIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4ade80',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerIconLine: {
    position: 'absolute',
    width: 32,
    height: 2,
    backgroundColor: '#4ade80',
    transform: [{ rotate: '45deg' }],
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'transparent',
    backgroundImage: 'linear-gradient(to right, white, #4ade80)',
    backgroundClip: 'text',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  calendarContainer: {
    flex: 1,
    maxHeight: '45%',
    marginHorizontal: '4%',
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
    gap: 8,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  viewAllButton: {
    backgroundColor: '#16a34a',
    borderWidth: 1,
    borderColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  viewAllButtonText: {
    color: 'white',
    fontSize: 14,
    position: 'relative',
    zIndex: 10,
  },
  buttonHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(74, 222, 128, 0.3)',
    transform: [{ skewX: '-12deg' }, { translateX: -100 }],
  },
  calendarWrapper: {
    flex: 1,
  },
});

export default FixturesPage;
