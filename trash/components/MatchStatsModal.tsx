import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { X } from 'lucide-react-native';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { DetailedMatch } from '@/data/matchStats';

interface MatchStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: DetailedMatch | null;
  userTeam: string;
}

const MatchStatsModal = ({
  isOpen,
  onClose,
  match,
  userTeam,
}: MatchStatsModalProps) => {
  if (!match) return null;

  const isHomeTeam = match.team_home.name === userTeam;
  const userTeamData = isHomeTeam ? match.team_home : match.team_away;
  const opponentData = isHomeTeam ? match.team_away : match.team_home;

  const possessionData = [
    {
      name: userTeamData.name,
      value: userTeamData.stats.possession_percent,
      fill: '#10b981',
    },
    {
      name: opponentData.name,
      value: opponentData.stats.possession_percent,
      fill: '#6b7280',
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

  const renderCustomizedLabel = ({
    name,
    value,
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <Text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 10 }}
      >
        {`${name}: ${value}%`}
      </Text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>
            {payload[0].name}: {payload[0].value}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={20} color="#9ca3af" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Possession Chart */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Possession</Text>
              <View style={styles.pieChartContainer}>
                <PieChart width={200} height={200}>
                  <Pie
                    data={possessionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={false}
                  >
                    {possessionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </View>
            </View>

            {/* Shots & Saves */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Shots & Saves</Text>
              <View style={styles.barChartContainer}>
                <BarChart
                  width={300}
                  height={200}
                  data={shotsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="category"
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                  />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Bar dataKey={userTeamData.name} fill="#10b981" />
                  <Bar dataKey={opponentData.name} fill="#6b7280" />
                </BarChart>
              </View>
            </View>

            {/* Passing Statistics */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Passing Statistics</Text>
              <View style={styles.barChartContainer}>
                <BarChart
                  width={300}
                  height={200}
                  data={passData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="category"
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                  />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Bar dataKey={userTeamData.name} fill="#10b981" />
                  <Bar dataKey={opponentData.name} fill="#6b7280" />
                </BarChart>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  chartContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  chartTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  pieChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barChartContainer: {
    alignItems: 'center',
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    borderRadius: 4,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
  },
});

export default MatchStatsModal;
