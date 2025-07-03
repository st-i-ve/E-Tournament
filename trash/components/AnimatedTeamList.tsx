import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { Check } from 'lucide-react-native';

interface Team {
  id: number;
  name: string;
  league: string;
  color: string;
}

interface AnimatedTeamListProps {
  teams: Team[];
  selectedTeam: Team | null;
  onTeamSelect: (team: Team) => void;
}

const AnimatedTeamList = ({
  teams,
  selectedTeam,
  onTeamSelect,
}: AnimatedTeamListProps) => {
  const [animations] = useState(() => teams.map(() => new Animated.Value(0)));

  useEffect(() => {
    const animationsSequence = teams.map((_, index) => {
      return Animated.timing(animations[index], {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      });
    });

    Animated.stagger(100, animationsSequence).start();
  }, [teams]);

  const getAnimatedStyle = (index: number) => {
    return {
      opacity: animations[index],
      transform: [
        {
          translateY: animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
        {
          scale:
            selectedTeam?.id === teams[index].id
              ? animations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05],
                })
              : 1,
        },
      ],
    };
  };

  return (
    <View style={styles.container}>
      {teams.map((team, index) => (
        <Animated.View
          key={team.id}
          style={[
            styles.teamItem,
            getAnimatedStyle(index),
            selectedTeam?.id === team.id && styles.selectedTeam,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onTeamSelect(team)}
            style={styles.touchableArea}
          >
            <View style={styles.teamContent}>
              <View
                style={[styles.teamInitials, { backgroundColor: team.color }]}
              >
                <Text style={styles.initialsText}>
                  {team.name.substring(0, 2)}
                </Text>
              </View>

              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.teamLeague}>{team.league}</Text>
              </View>

              {selectedTeam?.id === team.id && (
                <Animated.View style={styles.checkIcon}>
                  <Check size={24} color="#ffffff" />
                </Animated.View>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  teamItem: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  selectedTeam: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  touchableArea: {
    padding: 16,
  },
  teamContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teamInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  initialsText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  teamLeague: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  checkIcon: {
    opacity: 1,
  },
});

export default AnimatedTeamList;
