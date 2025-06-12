import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Rect, Path, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');
const chartWidth = width - 80;
const chartHeight = 200;

interface ChartData {
  label?: string;
  value?: number;
  color?: string;
  home?: number;
  away?: number;
  minute?: number;
}

interface StatsChartProps {
  type: 'pie' | 'bar' | 'line';
  data: ChartData[];
}

export default function StatsChart({ type, data }: StatsChartProps) {
  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
    let currentAngle = 0;
    const radius = 80;
    const centerX = chartWidth / 2;
    const centerY = chartHeight / 2;

    return (
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {data.map((item, index) => {
            const percentage = (item.value || 0) / total;
            const angle = percentage * 2 * Math.PI;
            
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const largeArcFlag = angle > Math.PI ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <Path
                key={index}
                d={pathData}
                fill={item.color || '#00FF88'}
                opacity={0.8}
              />
            );
          })}
        </Svg>
        
        <View style={styles.pieChartLegend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View 
                style={[
                  styles.legendColor, 
                  { backgroundColor: item.color || '#00FF88' }
                ]} 
              />
              <Text style={styles.legendText}>
                {item.label}: {item.value}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderBarChart = () => {
    const maxValue = Math.max(
      ...data.flatMap(item => [item.home || 0, item.away || 0])
    );
    const barWidth = 40;
    const barSpacing = 60;
    const chartPadding = 40;

    return (
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {data.map((item, index) => {
            const homeHeight = ((item.home || 0) / maxValue) * (chartHeight - 60);
            const awayHeight = ((item.away || 0) / maxValue) * (chartHeight - 60);
            
            const homeX = chartPadding + index * (barWidth * 2 + barSpacing);
            const awayX = homeX + barWidth + 10;
            
            const homeY = chartHeight - 40 - homeHeight;
            const awayY = chartHeight - 40 - awayHeight;

            return (
              <React.Fragment key={index}>
                <Rect
                  x={homeX}
                  y={homeY}
                  width={barWidth}
                  height={homeHeight}
                  fill="#00FF88"
                  opacity={0.8}
                  rx={4}
                />
                <Rect
                  x={awayX}
                  y={awayY}
                  width={barWidth}
                  height={awayHeight}
                  fill="#FF6B6B"
                  opacity={0.8}
                  rx={4}
                />
              </React.Fragment>
            );
          })}
        </Svg>
        
        <View style={styles.barChartLabels}>
          {data.map((item, index) => (
            <Text key={index} style={styles.barLabel}>
              {item.label}
            </Text>
          ))}
        </View>
        
        <View style={styles.barChartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#00FF88' }]} />
            <Text style={styles.legendText}>H67</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FF6B6B' }]} />
            <Text style={styles.legendText}>Opponent</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderLineChart = () => {
    const maxValue = Math.max(...data.flatMap(item => [item.home || 0, item.away || 0]));
    const minValue = Math.min(...data.flatMap(item => [item.home || 0, item.away || 0]));
    const range = maxValue - minValue;
    const chartPadding = 40;
    const plotWidth = chartWidth - chartPadding * 2;
    const plotHeight = chartHeight - 80;

    const homePoints = data.map((item, index) => {
      const x = chartPadding + (index / (data.length - 1)) * plotWidth;
      const y = chartHeight - 40 - ((item.home || 0) - minValue) / range * plotHeight;
      return `${x},${y}`;
    }).join(' ');

    const awayPoints = data.map((item, index) => {
      const x = chartPadding + (index / (data.length - 1)) * plotWidth;
      const y = chartHeight - 40 - ((item.away || 0) - minValue) / range * plotHeight;
      return `${x},${y}`;
    }).join(' ');

    return (
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => {
            const y = chartHeight - 40 - (i / 4) * plotHeight;
            return (
              <Line
                key={i}
                x1={chartPadding}
                y1={y}
                x2={chartWidth - chartPadding}
                y2={y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={1}
              />
            );
          })}
          
          {/* Home line */}
          <Path
            d={`M ${homePoints}`}
            fill="none"
            stroke="#00FF88"
            strokeWidth={3}
            opacity={0.8}
          />
          
          {/* Away line */}
          <Path
            d={`M ${awayPoints}`}
            fill="none"
            stroke="#FF6B6B"
            strokeWidth={3}
            opacity={0.8}
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = chartPadding + (index / (data.length - 1)) * plotWidth;
            const homeY = chartHeight - 40 - ((item.home || 0) - minValue) / range * plotHeight;
            const awayY = chartHeight - 40 - ((item.away || 0) - minValue) / range * plotHeight;
            
            return (
              <React.Fragment key={index}>
                <Circle cx={x} cy={homeY} r={4} fill="#00FF88" />
                <Circle cx={x} cy={awayY} r={4} fill="#FF6B6B" />
              </React.Fragment>
            );
          })}
        </Svg>
        
        <View style={styles.lineChartLabels}>
          {data.map((item, index) => (
            <Text key={index} style={styles.timeLabel}>
              {item.minute}'
            </Text>
          ))}
        </View>
        
        <View style={styles.lineChartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#00FF88' }]} />
            <Text style={styles.legendText}>H67</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FF6B6B' }]} />
            <Text style={styles.legendText}>Opponent</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {type === 'pie' && renderPieChart()}
      {type === 'bar' && renderBarChart()}
      {type === 'line' && renderLineChart()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chartContainer: {
    alignItems: 'center',
  },
  pieChartLegend: {
    marginTop: 16,
    gap: 8,
  },
  barChartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  barChartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 16,
  },
  lineChartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  lineChartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  barLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
    textAlign: 'center',
  },
  timeLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#888888',
  },
});