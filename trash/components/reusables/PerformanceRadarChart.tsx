// components/Charts/PerformanceRadarChart.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryArea,
  VictoryTheme,
} from 'victory-native';

interface PerformanceRadarChartProps {
  homeTeam: { name: string; data: Array<{ subject: string; value: number }> };
  awayTeam: { name: string; data: Array<{ subject: string; value: number }> };
}

const PerformanceRadarChart: React.FC<PerformanceRadarChartProps> = ({
  homeTeam,
  awayTeam,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Performance</Text>
      <View style={styles.chartContainer}>
        <VictoryChart polar theme={VictoryTheme.material} height={300}>
          <VictoryPolarAxis
            dependentAxis
            style={{ axis: { stroke: 'none' } }}
            tickFormat={() => ''}
          />
          <VictoryPolarAxis
            tickValues={homeTeam.data.map((item) => item.subject)}
            tickFormat={(item) => item}
            style={{
              axis: { stroke: 'none' },
              tickLabels: { fill: 'white', fontSize: 10 },
            }}
          />
          <VictoryArea
            data={homeTeam.data}
            x="subject"
            y="value"
            style={{
              data: { fill: '#10b981', fillOpacity: 0.3, stroke: '#10b981' },
            }}
          />
          <VictoryArea
            data={awayTeam.data}
            x="subject"
            y="value"
            style={{
              data: { fill: '#6b7280', fillOpacity: 0.3, stroke: '#6b7280' },
            }}
          />
        </VictoryChart>
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
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PerformanceRadarChart;
