import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

// Import onboarding steps
import GamerProfileStep from '../components/onboarding/GamerProfileStep';
import GamesSelectionStep from '../components/onboarding/GamesSelectionStep';
import SkillLevelStep from '../components/onboarding/SkillLevelStep';

const { width } = Dimensions.get('window');

interface OnboardingData {
  username: string;
  avatar: string;
  region: string;
  selectedGames: string[];
  skillLevel: string;
  teamPreference: string;
}

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    username: '',
    avatar: '',
    region: '',
    selectedGames: [],
    skillLevel: '',
    teamPreference: '',
  });

  const steps = [
    {
      title: 'Create Your Gamer Profile',
      subtitle: 'Tell us about yourself',
      component: GamerProfileStep,
    },
    {
      title: 'Choose Your Games',
      subtitle: 'Select the games you play',
      component: GamesSelectionStep,
    },
    {
      title: 'Set Your Preferences',
      subtitle: 'Configure your skill level and team preferences',
      component: SkillLevelStep,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and navigate to main app
      router.replace('/(tabs)');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return onboardingData.username.length >= 3 && onboardingData.region;
      case 1:
        return onboardingData.selectedGames.length > 0;
      case 2:
        return onboardingData.skillLevel && onboardingData.teamPreference;
      default:
        return false;
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <LinearGradient
      colors={['#0a0a0a', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            {steps.map((_, index) => (
              <View key={index} style={styles.progressBarContainer}>
                <LinearGradient
                  colors={
                    index <= currentStep
                      ? ['#00ff88', '#00d4ff']
                      : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)']
                  }
                  style={[
                    styles.progressBar,
                    { width: (width - 48) / steps.length - 8 },
                  ]}
                />
              </View>
            ))}
          </View>
          
          <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
          <Text style={styles.stepSubtitle}>{steps[currentStep].subtitle}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <CurrentStepComponent
            data={onboardingData}
            onUpdate={updateOnboardingData}
          />
        </View>

        {/* Navigation */}
        <View style={styles.navigation}>
          {currentStep > 0 && (
            <Pressable
              style={styles.backButton}
              onPress={handleBack}
            >
              <ChevronLeft size={20} color="#b3b3b3" />
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
          )}
          
          <View style={styles.spacer} />
          
          <Pressable
            style={[
              styles.nextButton,
              !isStepValid() && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!isStepValid()}
          >
            <LinearGradient
              colors={
                isStepValid()
                  ? ['#00ff88', '#00d4ff']
                  : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)']
              }
              style={styles.nextButtonGradient}
            >
              <Text style={[
                styles.nextButtonText,
                !isStepValid() && styles.nextButtonTextDisabled,
              ]}>
                {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              </Text>
              <ChevronRight 
                size={20} 
                color={isStepValid() ? '#ffffff' : '#666666'} 
              />
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 8,
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  stepTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 255, 136, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  stepSubtitle: {
    color: '#b3b3b3',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 32,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  backButtonText: {
    color: '#b3b3b3',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  spacer: {
    flex: 1,
  },
  nextButton: {
    borderRadius: 28,
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 28,
    gap: 8,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  nextButtonTextDisabled: {
    color: '#666666',
    textShadowColor: 'transparent',
  },
});

export default OnboardingScreen;