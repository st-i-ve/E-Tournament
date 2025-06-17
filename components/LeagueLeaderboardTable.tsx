import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Trophy, Check, X, Minus } from 'lucide-react-native';

// Mock data
const mockUsers = [
  { id: 1, username: 'Player1' },
  { id: 2, username: 'Player2' },
  { id: 3, username: 'Player3' },
  { id: 4, username: 'Player4' },
  { id: 5, username: 'Player5' },
  { id: 6, username: 'CurrentPlayer', isCurrent: true },
];

const currentUser = { id: 6 };

// Enhanced teams data with user integration
const teams = mockUsers.map((user, index) => ({
  pos: index + 1,
  name: user.username,
  mp: 8,
  w: 6 - index,
  d: 2,
  l: index,
  pts: 24 - index * 3,
  gd: 12 - index * 4 > 0 ? `+${12 - index * 4}` : `${12 - index * 4}`,
  last5: ['W', 'L', 'D', 'W', 'L'].slice(0, 5),
  isCurrentUser: user.id === currentUser.id,
}));

const GameResultIcon = ({ result }: { result: 'W' | 'L' | 'D' }) => {
  const iconStyles = {
    W: { color: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.2)' },
    L: { color: '#f87171', backgroundColor: 'rgba(248, 113, 113, 0.2)' },
    D: { color: '#facc15', backgroundColor: 'rgba(250, 204, 21, 0.2)' },
  };

  const IconComponent = {
    W: Check,
    L: X,
    D: Minus,
  }[result];

  return (
    <View style={[styles.resultIcon, iconStyles[result]]}>
      <IconComponent size={12} />
    </View>
  );
};

const truncateName = (name: string, maxLength: number = 10) => {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength) + '...';
};

const LeaderboardTable = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.tablesContainer}>
        {/* Fixed Table - Position and Player */}
        <View style={styles.fixedTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Pos</Text>
            <Text style={styles.headerText}>Player</Text>
          </View>
          {teams.map((team) => (
            <View
              key={team.pos}
              style={[
                styles.tableRow,
                team.isCurrentUser && styles.currentUserRow,
              ]}
            >
              <Text
                style={[
                  styles.cellText,
                  styles.positionCell,
                  team.isCurrentUser && styles.currentUserText,
                ]}
              >
                {team.pos}
              </Text>
              <View style={styles.nameCell}>
                <Text
                  style={[
                    styles.cellText,
                    team.isCurrentUser && styles.currentUserText,
                  ]}
                  numberOfLines={1}
                >
                  {truncateName(team.name)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Scrollable Table - Stats */}
        <ScrollView horizontal style={styles.scrollableTable}>
          <View>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>MP</Text>
              <Text style={styles.headerText}>W</Text>
              <Text style={styles.headerText}>D</Text>
              <Text style={styles.headerText}>L</Text>
              <Text style={styles.headerText}>Pts</Text>
              <Text style={styles.headerText}>Last 5</Text>
            </View>
            {teams.map((team) => (
              <View
                key={team.pos}
                style={[
                  styles.tableRow,
                  team.isCurrentUser && styles.currentUserRow,
                ]}
              >
                <Text style={styles.cellText}>{team.mp}</Text>
                <Text style={[styles.cellText, styles.winText]}>{team.w}</Text>
                <Text style={[styles.cellText, styles.drawText]}>{team.d}</Text>
                <Text style={[styles.cellText, styles.lossText]}>{team.l}</Text>
                <Text style={[styles.cellText, styles.pointsText]}>
                  {team.pts}
                </Text>
                <View style={styles.lastFiveContainer}>
                  {team.last5.map((result, index) => (
                    <GameResultIcon
                      key={index}
                      result={result as 'W' | 'L' | 'D'}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    paddingHorizontal: 16,
  },
  tablesContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  fixedTable: {
    width: 144,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
  },
  scrollableTable: {
    flex: 1,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
  },
  tableHeader: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(55, 65, 81, 0.5)',
  },
  headerText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
    minWidth: 30,
  },
  tableRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(55, 65, 81, 0.3)',
  },
  currentUserRow: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderLeftWidth: 2,
    borderLeftColor: '#10B981',
  },
  cellText: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    flex: 1,
    minWidth: 30,
  },
  currentUserText: {
    color: '#6EE7B7',
  },
  positionCell: {
    fontWeight: '600',
  },
  nameCell: {
    flex: 1,
    paddingHorizontal: 8,
  },
  winText: {
    color: '#4ADE80',
    fontWeight: '500',
  },
  drawText: {
    color: '#9CA3AF',
  },
  lossText: {
    color: '#F87171',
    fontWeight: '500',
  },
  pointsText: {
    fontWeight: 'bold',
  },
  lastFiveContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    minWidth: 80,
    paddingHorizontal: 8,
  },
  resultIcon: {
    width: 16,
    height: 16,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LeaderboardTable;
