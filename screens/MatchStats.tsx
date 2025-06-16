import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import {
  PieChart,
  BarChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Pie,
  Bar,
  XAxis,
  YAxis,
  Cell,
} from 'react-native-svg-charts';
import { LinearGradient } from 'expo-linear-gradient';
import { detailedMatches } from '@/data/matchStats';
import { currentUser } from '@/data/enhancedMockData';

const MatchStatsPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const matchId = route.params?.matchId;
  const userTeam = currentUser.teamName;

  const match = detailedMatches.find((m) => m.match_id === matchId);

  if (!match) {
    return (
      <View style={styles.container}>
        {/* Geometric background */}
        <View style={styles.backgroundContainer}>
          {/* Triangles */}
          <View
            style={[
              styles.triangle,
              {
                top: 80,
                left: 40,
                width: 32,
                height: 32,
                transform: [{ rotate: '45deg' }],
              },
            ]}
          />
          <View
            style={[
              styles.triangle,
              {
                top: '33%',
                right: 80,
                width: 24,
                height: 24,
                transform: [{ rotate: '12deg' }],
              },
            ]}
          />
          <View
            style={[
              styles.triangle,
              {
                bottom: '25%',
                left: '25%',
                width: 40,
                height: 40,
                transform: [{ rotate: '45deg' }],
              },
            ]}
          />

          {/* Circles */}
          <View
            style={[
              styles.circle,
              { top: '25%', left: '33%', width: 48, height: 48 },
            ]}
          />
          <View
            style={[
              styles.circle,
              { bottom: '33%', right: '25%', width: 32, height: 32 },
            ]}
          />
          <View
            style={[
              styles.circle,
              { top: '66%', left: 80, width: 24, height: 24 },
            ]}
          />

          {/* Rectangles */}
          <View
            style={[
              styles.rectangle,
              { top: '50%', right: 40, width: 48, height: 32 },
            ]}
          />
          <View
            style={[
              styles.rectangle,
              { bottom: 80, left: '50%', width: 32, height: 48 },
            ]}
          />

          {/* Crossing lines */}
          <View style={[styles.lineVertical, { left: '25%' }]} />
          <View style={[styles.lineHorizontal, { top: '33%' }]} />
          <View style={[styles.lineHorizontal, { top: '66%' }]} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.notFoundContainer}>
            <LinearGradient
              colors={['white', 'green']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientText}
            >
              <Text style={styles.notFoundTitle}>Match Not Found</Text>
            </LinearGradient>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Fulltime')}
            >
              <LinearGradient
                colors={['#10b981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Back to Matches</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const isHomeTeam = match.team_home.name === userTeam;
  const userTeamData = isHomeTeam ? match.team_home : match.team_away;
  const opponentData = isHomeTeam ? match.team_away : match.team_home;

  const possessionData = [
    {
      name: userTeamData.name,
      value: userTeamData.stats.possession_percent,
      svg: { fill: '#10b981' },
      key: 'userTeam',
    },
    {
      name: opponentData.name,
      value: opponentData.stats.possession_percent,
      svg: { fill: '#6b7280' },
      key: 'opponent',
    },
  ];

  const shotsData = [
    {
      category: 'Shots',
      [userTeamData.name]: userTeamData.stats.shots,
      [opponentData.name]: opponentData.stats.shots,
    },
    {
      category: 'On Target',
      [userTeamData.name]: userTeamData.stats.shots_on_target,
      [opponentData.name]: opponentData.stats.shots_on_target,
    },
    {
      category: 'Saves',
      [userTeamData.name]: userTeamData.stats.saves,
      [opponentData.name]: opponentData.stats.saves,
    },
  ];

  const passData = [
    {
      category: 'Total Passes',
      [userTeamData.name]: userTeamData.stats.passes,
      [opponentData.name]: opponentData.stats.passes,
    },
    {
      category: 'Successful',
      [userTeamData.name]: userTeamData.stats.successful_passes,
      [opponentData.name]: opponentData.stats.successful_passes,
    },
  ];

  const radarData = [
    {
      subject: 'Possession',
      [userTeamData.name]: userTeamData.stats.possession_percent,
      [opponentData.name]: opponentData.stats.possession_percent,
      fullMark: 100,
    },
    {
      subject: 'Shots',
      [userTeamData.name]: (userTeamData.stats.shots / 15) * 100,
      [opponentData.name]: (opponentData.stats.shots / 15) * 100,
      fullMark: 100,
    },
    {
      subject: 'Accuracy',
      [userTeamData.name]:
        (userTeamData.stats.shots_on_target / userTeamData.stats.shots) * 100,
      [opponentData.name]:
        (opponentData.stats.shots_on_target / opponentData.stats.shots) * 100,
      fullMark: 100,
    },
    {
      subject: 'Pass Success',
      [userTeamData.name]:
        (userTeamData.stats.successful_passes / userTeamData.stats.passes) *
        100,
      [opponentData.name]:
        (opponentData.stats.successful_passes / opponentData.stats.passes) *
        100,
      fullMark: 100,
    },
    {
      subject: 'Tackles',
      [userTeamData.name]: (userTeamData.stats.tackles / 25) * 100,
      [opponentData.name]: (opponentData.stats.tackles / 25) * 100,
      fullMark: 100,
    },
  ];

  const chartColors = {
    [userTeamData.name]: '#10b981',
    [opponentData.name]: '#6b7280',
  };

  return (
    <View style={styles.container}>
      {/* Geometric background */}
      <View style={styles.backgroundContainer}>
        {/* Triangles */}
        <View
          style={[
            styles.triangle,
            {
              top: 80,
              left: 40,
              width: 32,
              height: 32,
              transform: [{ rotate: '45deg' }],
            },
          ]}
        />
        <View
          style={[
            styles.triangle,
            {
              top: '33%',
              right: 80,
              width: 24,
              height: 24,
              transform: [{ rotate: '12deg' }],
            },
          ]}
        />
        <View
          style={[
            styles.triangle,
            {
              bottom: '25%',
              left: '25%',
              width: 40,
              height: 40,
              transform: [{ rotate: '45deg' }],
            },
          ]}
        />

        {/* Circles */}
        <View
          style={[
            styles.circle,
            { top: '25%', left: '33%', width: 48, height: 48 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { bottom: '33%', right: '25%', width: 32, height: 32 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { top: '66%', left: 80, width: 24, height: 24 },
          ]}
        />

        {/* Rectangles */}
        <View
          style={[
            styles.rectangle,
            { top: '50%', right: 40, width: 48, height: 32 },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            { bottom: 80, left: '50%', width: 32, height: 48 },
          ]}
        />

        {/* Crossing lines */}
        <View style={[styles.lineVertical, { left: '25%' }]} />
        <View style={[styles.lineHorizontal, { top: '33%' }]} />
        <View style={[styles.lineHorizontal, { top: '66%' }]} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButtonSmall}
              onPress={() => navigation.navigate('Fulltime')}
            >
              <ArrowLeft size={20} color="#9ca3af" />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle} />
              <View style={styles.logoSquare} />
            </View>
            <View style={styles.headerTextContainer}>
              <LinearGradient
                colors={['white', 'green']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientText}
              >
                <Text style={styles.headerTitle}>Match Statistics</Text>
              </LinearGradient>
              <Text style={styles.headerSubtitle}>
                {userTeamData.name} {userTeamData.score} - {opponentData.score}{' '}
                {opponentData.name}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.chartsContainer}>
          {/* Possession Chart */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Possession</Text>
            <View style={styles.chartWrapper}>
              <PieChart style={styles.pieChart}>
                <Pie
                  data={possessionData}
                  outerRadius={80}
                  innerRadius={0}
                  padAngle={0}
                  dataKey="value"
                  label={({ dataEntry }) =>
                    `${dataEntry.name}: ${dataEntry.value}%`
                  }
                >
                  {possessionData.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={item.svg.fill} />
                  ))}
                </Pie>
              </PieChart>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Overall Performance Radar */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Overall Performance</Text>
            <View style={styles.chartWrapper}>
              <RadarChart
                style={styles.radarChart}
                data={radarData}
                outerRadius={90}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name={userTeamData.name}
                  dataKey={userTeamData.name}
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                />
                <Radar
                  name={opponentData.name}
                  dataKey={opponentData.name}
                  stroke="#6b7280"
                  fill="#6b7280"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Shots & Saves */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Shots & Saves</Text>
            <View style={styles.barChartWrapper}>
              <BarChart
                style={styles.barChart}
                data={shotsData}
                yAccessor={({ item }) => item[userTeamData.name]}
                svg={{ fill: chartColors[userTeamData.name] }}
                contentInset={{ top: 20, bottom: 20 }}
                spacingInner={0.4}
              >
                <XAxis
                  data={shotsData}
                  xAccessor={({ item }) => item.category}
                  svg={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis svg={{ fill: '#9ca3af', fontSize: 12 }} />
              </BarChart>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Passing Statistics */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Passing Statistics</Text>
            <View style={styles.barChartWrapper}>
              <BarChart
                style={styles.barChart}
                data={passData}
                yAccessor={({ item }) => item[userTeamData.name]}
                svg={{ fill: chartColors[userTeamData.name] }}
                contentInset={{ top: 20, bottom: 20 }}
                spacingInner={0.4}
              >
                <XAxis
                  data={passData}
                  xAccessor={({ item }) => item.category}
                  svg={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis svg={{ fill: '#9ca3af', fontSize: 12 }} />
              </BarChart>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  triangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
  },
  circle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 999,
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
  },
  lineVertical: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  lineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    zIndex: 10,
  },
  notFoundContainer: {
    alignItems: 'center',
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  backButton: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  gradientText: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButtonSmall: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.3)',
  },
  logoContainer: {
    width: 32,
    height: 32,
    position: 'relative',
  },
  logoCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  logoSquare: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  chartsContainer: {
    paddingHorizontal: 16,
  },
  chartSection: {
    marginBottom: 24,
    paddingVertical: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  chartWrapper: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChart: {
    height: 160,
    width: 160,
  },
  radarChart: {
    height: 200,
    width: '100%',
  },
  barChartWrapper: {
    height: 200,
    width: '100%',
  },
  barChart: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    marginVertical: 8,
  },
});

export default MatchStatsPage;
