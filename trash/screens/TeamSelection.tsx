import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';

const teams = [
  {
    id: 1,
    name: 'Manchester United',
    league: 'Premier League',
    color: '#DA020E',
  },
  { id: 2, name: 'Barcelona', league: 'La Liga', color: '#A50044' },
  { id: 3, name: 'Bayern Munich', league: 'Bundesliga', color: '#DC052D' },
  { id: 4, name: 'Juventus', league: 'Serie A', color: '#000000' },
  { id: 5, name: 'PSG', league: 'Ligue 1', color: '#004170' },
  { id: 6, name: 'Real Madrid', league: 'La Liga', color: '#FEBE10' },
  { id: 7, name: 'Liverpool', league: 'Premier League', color: '#C8102E' },
  { id: 8, name: 'Chelsea', league: 'Premier League', color: '#034694' },
];

const TeamSelectionPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<(typeof teams)[0] | null>(
    null
  );
  const navigation = useNavigation();
  const { user, updateUser } = useAuth();
  const auroraAnim = new Animated.Value(0);

  // Aurora animation
  React.useEffect(() => {
    const animateAurora = () => {
      Animated.sequence([
        Animated.timing(auroraAnim, {
          toValue: 1,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(auroraAnim, {
          toValue: 0.5,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(auroraAnim, {
          toValue: 0,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(auroraAnim, {
          toValue: 0.75,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start(() => animateAurora());
    };

    animateAurora();
    return () => auroraAnim.stopAnimation();
  }, []);

  const handleTeamSelect = (team: (typeof teams)[0]) => {
    setSelectedTeam(team);
  };

  const handleContinue = () => {
    if (selectedTeam && user) {
      updateUser({
        ...user,
        teamName: selectedTeam.name,
        teamColor: selectedTeam.color,
      });
      navigation.navigate('Home');
    }
  };

  const auroraInterpolate = auroraAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const auroraScale = auroraAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });

  return (
    <View style={styles.container}>
      {/* Aurora Background */}
      <Animated.View
        style={[
          styles.auroraBg,
          {
            transform: [{ rotate: auroraInterpolate }, { scale: auroraScale }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(147, 51, 234, 0.3)',
            'rgba(79, 70, 229, 0.3)',
            'rgba(59, 130, 246, 0.3)',
            'rgba(16, 185, 129, 0.3)',
            'rgba(147, 51, 234, 0.3)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <Animated.View style={styles.auroraOverlay}>
        <LinearGradient
          colors={['rgba(147, 51, 234, 0.2)', 'transparent']}
          start={{ x: 0.2, y: 0.8 }}
          end={{ x: 0.5, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={['rgba(59, 130, 246, 0.2)', 'transparent']}
          start={{ x: 0.8, y: 0.2 }}
          end={{ x: 0.5, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.1)', 'transparent']}
          start={{ x: 0.4, y: 0.4 }}
          end={{ x: 0.5, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={['white', 'gray']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientText}
            >
              <Text style={styles.title}>Team Selection</Text>
            </LinearGradient>
            <Text style={styles.subtitle}>Choose your favorite team</Text>
          </View>

          {/* Team List */}
          <View style={styles.teamList}>
            {teams.map((team) => (
              <TouchableOpacity
                key={team.id}
                style={[
                  styles.teamItem,
                  selectedTeam?.id === team.id && {
                    borderColor: team.color,
                    backgroundColor: `${team.color}20`,
                  },
                ]}
                onPress={() => handleTeamSelect(team)}
              >
                <View
                  style={[styles.teamColor, { backgroundColor: team.color }]}
                />
                <View style={styles.teamInfo}>
                  <Text style={styles.teamName}>{team.name}</Text>
                  <Text style={styles.teamLeague}>{team.league}</Text>
                </View>
                {selectedTeam?.id === team.id && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.selectedText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Continue Button */}
          {selectedTeam && (
            <Animated.View style={styles.continueButtonContainer}>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <LinearGradient
                  colors={['#0066FF', '#9933FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>
                    Continue with {selectedTeam.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}
        </ScrollView>
      </View>
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
  auroraBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
    overflow: 'hidden',
  },
  auroraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 10,
    padding: 24,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  gradientText: {
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 8,
  },
  teamList: {
    width: '100%',
    maxWidth: 400,
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  teamColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 16,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  teamLeague: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  continueButtonContainer: {
    width: '100%',
    marginTop: 24,
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TeamSelectionPage;
