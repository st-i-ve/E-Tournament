// components/Charts/BarStatsChart.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';

interface BarStatsChartProps {
  title: string;
  homeTeam: {
    name: string;
    color: string;
    data: Array<{ category: string; value: number }>;
  };
  awayTeam: {
    name: string;
    color: string;
    data: Array<{ category: string; value: number }>;
  };
}

const BarStatsChart: React.FC<BarStatsChartProps> = ({
  title,
  homeTeam,
  awayTeam,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          height={300}
        >
          <VictoryAxis
            tickFormat={homeTeam.data.map((item) => item.category)}
            style={{
              tickLabels: { fill: 'white', fontSize: 10 },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fill: 'white', fontSize: 10 },
            }}
          />
          <VictoryBar
            data={homeTeam.data}
            x="category"
            y="value"
            style={{ data: { fill: homeTeam.color } }}
          />
          <VictoryBar
            data={awayTeam.data}
            x="category"
            y="value"
            style={{ data: { fill: awayTeam.color } }}
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

export default BarStatsChart;
