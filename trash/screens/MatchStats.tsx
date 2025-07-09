// MatchStatsPage.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { currentUser } from '@/data/enhancedMockData';
import { detailedMatches } from '@/data/matchStats';
import Header from '@/components/Header';
import Background from '@/trash/components/reusables/Background';
import Divider from '@/trash/components/reusables/Divider';
import PossessionChart from '@/trash/components/reusables/PossessionChart';
import PerformanceRadarChart from '@/trash/components/reusables/PerformanceRadarChart';
import BarStatsChart from '@/trash/components/reusables/BarStatsChart';

const MatchStats = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const matchId = route.params?.matchId;
  const userTeam = currentUser.teamName;

  const match = detailedMatches.find((m) => m.match_id === matchId);

  if (!match) {
    return (
      <View style={styles.container}>
        <Background />
        <Header
          title="Match Not Found"
          subtitle="The requested match could not be found"
        />
      </View>
    );
  }

  const isHomeTeam = match.team_home.name === userTeam;
  const userTeamData = isHomeTeam ? match.team_home : match.team_away;
  const opponentData = isHomeTeam ? match.team_away : match.team_home;

  // Prepare data for charts
  const possessionData = {
    homeTeam: {
      name: match.team_home.name,
      possession: match.team_home.stats.possession_percent,
    },
    awayTeam: {
      name: match.team_away.name,
      possession: match.team_away.stats.possession_percent,
    },
  };

  const radarData = {
    homeTeam: {
      name: match.team_home.name,
      data: [
        {
          subject: 'Possession',
          value: match.team_home.stats.possession_percent,
        },
        { subject: 'Shots', value: (match.team_home.stats.shots / 15) * 100 },
        {
          subject: 'Accuracy',
          value:
            (match.team_home.stats.shots_on_target /
              match.team_home.stats.shots) *
            100,
        },
        {
          subject: 'Pass Success',
          value:
            (match.team_home.stats.successful_passes /
              match.team_home.stats.passes) *
            100,
        },
        {
          subject: 'Tackles',
          value: (match.team_home.stats.tackles / 25) * 100,
        },
      ],
    },
    awayTeam: {
      name: match.team_away.name,
      data: [
        {
          subject: 'Possession',
          value: match.team_away.stats.possession_percent,
        },
        { subject: 'Shots', value: (match.team_away.stats.shots / 15) * 100 },
        {
          subject: 'Accuracy',
          value:
            (match.team_away.stats.shots_on_target /
              match.team_away.stats.shots) *
            100,
        },
        {
          subject: 'Pass Success',
          value:
            (match.team_away.stats.successful_passes /
              match.team_away.stats.passes) *
            100,
        },
        {
          subject: 'Tackles',
          value: (match.team_away.stats.tackles / 25) * 100,
        },
      ],
    },
  };

  const shotsData = {
    homeTeam: {
      name: match.team_home.name,
      color: '#10b981',
      data: [
        { category: 'Shots', value: match.team_home.stats.shots },
        { category: 'On Target', value: match.team_home.stats.shots_on_target },
        { category: 'Saves', value: match.team_home.stats.saves },
      ],
    },
    awayTeam: {
      name: match.team_away.name,
      color: '#6b7280',
      data: [
        { category: 'Shots', value: match.team_away.stats.shots },
        { category: 'On Target', value: match.team_away.stats.shots_on_target },
        { category: 'Saves', value: match.team_away.stats.saves },
      ],
    },
  };

  const passData = {
    homeTeam: {
      name: match.team_home.name,
      color: '#10b981',
      data: [
        { category: 'Total Passes', value: match.team_home.stats.passes },
        {
          category: 'Successful',
          value: match.team_home.stats.successful_passes,
        },
      ],
    },
    awayTeam: {
      name: match.team_away.name,
      color: '#6b7280',
      data: [
        { category: 'Total Passes', value: match.team_away.stats.passes },
        {
          category: 'Successful',
          value: match.team_away.stats.successful_passes,
        },
      ],
    },
  };

  return (
    <View style={styles.container}>
      <Background />

      <ScrollView style={styles.scrollContainer}>
        <Header
          title="Match Statistics"
          subtitle={`${userTeamData.name} ${userTeamData.score} - ${opponentData.score} ${opponentData.name}`}
        />

        <PossessionChart
          homeTeam={possessionData.homeTeam}
          awayTeam={possessionData.awayTeam}
        />

        <Divider />

        <PerformanceRadarChart
          homeTeam={radarData.homeTeam}
          awayTeam={radarData.awayTeam}
        />

        <Divider />

        <BarStatsChart
          title="Shots & Saves"
          homeTeam={shotsData.homeTeam}
          awayTeam={shotsData.awayTeam}
        />

        <Divider />

        <BarStatsChart
          title="Passing Statistics"
          homeTeam={passData.homeTeam}
          awayTeam={passData.awayTeam}
        />
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
  scrollContainer: {
    flex: 1,
    paddingBottom: 24,
  },
});

export default MatchStats;
