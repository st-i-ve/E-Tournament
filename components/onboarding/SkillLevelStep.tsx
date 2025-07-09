import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Users, Zap, Medal } from 'lucide-react-native';

interface SkillLevelStepProps {
  data: {
    skillLevel: string;
    teamPreference: string;
  };
  onUpdate: (data: any) => void;
}

const SkillLevelStep: React.FC<SkillLevelStepProps> = ({ data, onUpdate }) => {
  const skillLevels = [
    { id: 'beginner', name: 'Beginner', description: 'New to competitive gaming' },
    { id: 'casual', name: 'Casual', description: 'Play for fun occasionally' },
    { id: 'intermediate', name: 'Intermediate', description: 'Regular player with some experience' },
    { id: 'advanced', name: 'Advanced', description: 'Experienced competitive player' },
    { id: 'pro', name: 'Professional', description: 'Tournament veteran or pro player' },
  ];

  const teamPreferences = [
    { id: 'solo', name: 'Solo Player', description: 'Prefer to compete individually' },
    { id: 'team_join', name: 'Join a Team', description: 'Looking to join an existing team' },
    { id: 'team_create', name: 'Create a Team', description: 'Want to build your own team' },
    { id: 'flexible', name: 'Flexible', description: 'Open to both solo and team play' },
  ];

  const handleSkillLevelSelect = (skillLevel: string) => {
    onUpdate({ skillLevel });
  };

  const handleTeamPreferenceSelect = (teamPreference: string) => {
    onUpdate({ teamPreference });
  };

  const getSkillLevelColors = (level: string) => {
    switch (level) {
      case 'beginner': return ['#4ecdc4', '#45b7d1'];
      case 'casual': return ['#54a0ff', '#5f27cd'];
      case 'intermediate': return ['#feca57', '#ff9f43'];
      case 'advanced': return ['#ff9ff3', '#ff6b6b'];
      case 'pro': return ['#00ff88', '#00d4ff'];
      default: return ['#b3b3b3', '#666666'];
    }
  };

  const getTeamPreferenceIcon = (preference: string) => {
    switch (preference) {
      case 'solo': return <Zap size={20} color="#ff9ff3" />;
      case 'team_join': return <Users size={20} color="#54a0ff" />;
      case 'team_create': return <Trophy size={20} color="#00ff88" />;
      case 'flexible': return <Medal size={20} color="#feca57" />;
      default: return <Users size={20} color="#b3b3b3" />;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Skill Level Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Skill Level</Text>
        <Text style={styles.sectionSubtitle}>
          This helps us match you with appropriate tournaments
        </Text>
        
        <View style={styles.optionsContainer}>
          {skillLevels.map((level, index) => {
            const isSelected = data.skillLevel === level.id;
            const colors = getSkillLevelColors(level.id);
            
            return (
              <Pressable
                key={index}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedOptionCard,
                ]}
                onPress={() => handleSkillLevelSelect(level.id)}
              >
                <LinearGradient
                  colors={
                    isSelected
                      ? [`${colors[0]}20`, `${colors[1]}30`]
                      : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)']
                  }
                  style={styles.optionGradient}
                >
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      isSelected && { color: colors[0] },
                    ]}>
                      {level.name}
                    </Text>
                    <Text style={styles.optionDescription}>
                      {level.description}
                    </Text>
                  </View>
                  
                  {isSelected && (
                    <View style={[
                      styles.selectedIndicator,
                      { backgroundColor: colors[0] },
                    ]} />
                  )}
                </LinearGradient>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Team Preference Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Team Preference</Text>
        <Text style={styles.sectionSubtitle}>
          How would you like to participate in tournaments?
        </Text>
        
        <View style={styles.optionsContainer}>
          {teamPreferences.map((preference, index) => {
            const isSelected = data.teamPreference === preference.id;
            const icon = getTeamPreferenceIcon(preference.id);
            
            return (
              <Pressable
                key={index}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedOptionCard,
                ]}
                onPress={() => handleTeamPreferenceSelect(preference.id)}
              >
                <LinearGradient
                  colors={
                    isSelected
                      ? ['rgba(0, 255, 136, 0.1)', 'rgba(0, 212, 255, 0.1)']
                      : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)']
                  }
                  style={styles.optionGradient}
                >
                  <View style={styles.iconContainer}>
                    {React.cloneElement(icon)}
                  </View>
                  
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      isSelected && { color: '#ffffff' },
                    ]}>
                      {preference.name}
                    </Text>
                    <Text style={styles.optionDescription}>
                      {preference.description}
                    </Text>
                  </View>
                  
                  {isSelected && (
                    <View style={styles.selectedIndicator} />
                  )}
                </LinearGradient>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Tip */}
      <View style={styles.tipContainer}>
        <LinearGradient
          colors={['rgba(0, 212, 255, 0.1)', 'rgba(0, 255, 136, 0.1)']}
          style={styles.tipGradient}
        >
          <Trophy size={20} color="#00d4ff" />
          <Text style={styles.tipText}>
            You can change these preferences later in your profile settings.
          </Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 255, 136, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  sectionSubtitle: {
    color: '#b3b3b3',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedOptionCard: {
    borderColor: 'rgba(0, 255, 136, 0.3)',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  optionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    color: '#b3b3b3',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  optionDescription: {
    color: '#999999',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00ff88',
  },
  tipContainer: {
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  tipGradient: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
  },
  tipText: {
    flex: 1,
    color: '#b3b3b3',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
});

export default SkillLevelStep;