// components/Charts/PossessionChart.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PossessionChartProps {
  homeTeam: { name: string; possession: number };
  awayTeam: { name: string; possession: number };
}

const PossessionChart: React.FC<PossessionChartProps> = ({
  homeTeam,
  awayTeam,
}) => {
  const data = [
    { x: homeTeam.name, y: homeTeam.possession, color: '#10b981' },
    { x: awayTeam.name, y: awayTeam.possession, color: '#6b7280' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Possession</Text>
      <View style={styles.chartContainer}>
        <VictoryPie
          data={data}
          colorScale={data.map((item) => item.color)}
          innerRadius={50}
          padAngle={2}
          width={300}
          height={300}
          labels={({ datum }) => `${datum.x}: ${datum.y}%`}
          style={{
            labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  chartContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PossessionChart;
