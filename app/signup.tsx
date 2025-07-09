import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, Animated, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Gamepad2, Zap, Users } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupScreen() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [googleScale] = useState(new Animated.Value(1));
  const [facebookScale] = useState(new Animated.Value(1));
  const { user, login } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);

  const animateButton = (scaleValue: Animated.Value) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleGoogleSignup = async () => {
    animateButton(googleScale);
    setIsGoogleLoading(true);
    try {
      // Simulate OAuth signup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user data for testing - redirect to onboarding for new users
      const mockUser = {
        id: '1',
        username: 'John Doe',
        email: 'john.doe@gmail.com',
        teamName: '',
        teamColor: '',
        profilePicture: ''
      };
      
      login(mockUser);
      // Redirect to onboarding for new signups
      router.replace('/onboarding');
    } catch (error) {
      console.error('Google signup error:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookSignup = async () => {
    animateButton(facebookScale);
    setIsFacebookLoading(true);
    try {
      // Simulate OAuth signup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user data for testing - redirect to onboarding for new users
      const mockUser = {
        id: '2',
        username: 'Jane Smith',
        email: 'jane.smith@facebook.com',
        teamName: '',
        teamColor: '',
        profilePicture: ''
      };
      
      login(mockUser);
      // Redirect to onboarding for new signups
      router.replace('/onboarding');
    } catch (error) {
      console.error('Facebook signup error:', error);
    } finally {
      setIsFacebookLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <LinearGradient
        colors={['#0a0a0a', '#1a1a2e', '#16213e']}
        style={styles.backgroundGradient}
      >
        {/* Gaming-style background elements */}
        <View style={styles.backgroundElements}>
          <LinearGradient
            colors={['#00ff88', '#00cc66']}
            style={[styles.glowOrb, { top: 120, right: 60 }]}
          />
          <LinearGradient
            colors={['#00d4ff', '#0099cc']}
            style={[styles.glowOrb, { bottom: 200, left: 40, width: 70, height: 70 }]}
          />
          <View style={[styles.hexagon, { top: 180, left: 80 }]} />
          <View style={[styles.hexagon, { bottom: 300, right: 100, transform: [{ rotate: '45deg' }] }]} />
          <Users color="rgba(0, 255, 136, 0.3)" size={28} style={[styles.floatingIcon, { top: 280, right: 80 }]} />
          <Gamepad2 color="rgba(0, 212, 255, 0.3)" size={24} style={[styles.floatingIcon, { bottom: 250, left: 100 }]} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#00ff88', '#00d4ff']}
              style={styles.logoGradient}
            >
              <Trophy color="#ffffff" size={48} />
            </LinearGradient>
            <Text style={styles.appName}>E-Tournament</Text>
            <Text style={styles.subtitle}>Join the ultimate gaming community</Text>
          </View>

          {/* OAuth Buttons */}
          <View style={styles.form}>
            {/* Google Signup Button */}
            <Animated.View style={{ transform: [{ scale: googleScale }] }}>
              <TouchableOpacity 
                style={styles.oauthButton}
                onPress={handleGoogleSignup}
                disabled={isGoogleLoading || isFacebookLoading}
              >
                <LinearGradient
                  colors={isGoogleLoading ? ['#374151', '#4b5563'] : ['#1f2937', '#374151']}
                  style={styles.buttonGradient}
                >
                  {isGoogleLoading ? (
                    <ActivityIndicator size="small" color="#00d4ff" />
                  ) : (
                    <>
                      <LinearGradient
                        colors={['#ffffff', '#f3f4f6']}
                        style={styles.googleIcon}
                      >
                        <Text style={styles.googleIconText}>G</Text>
                      </LinearGradient>
                      <Text style={styles.oauthButtonText}>Sign up with Google</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Facebook Signup Button */}
            <Animated.View style={{ transform: [{ scale: facebookScale }] }}>
              <TouchableOpacity 
                style={styles.oauthButton}
                onPress={handleFacebookSignup}
                disabled={isGoogleLoading || isFacebookLoading}
              >
                <LinearGradient
                  colors={isFacebookLoading ? ['#1565c0', '#1976d2'] : ['#1877f2', '#42a5f5']}
                  style={styles.buttonGradient}
                >
                  {isFacebookLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <>
                      <View style={styles.facebookIcon}>
                        <Text style={styles.facebookIconText}>f</Text>
                      </View>
                      <Text style={styles.oauthButtonText}>Sign up with Facebook</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Divider */}
            <View style={styles.divider}>
              <LinearGradient
                colors={['transparent', '#00ff88', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.dividerLine}
              />
              <Text style={styles.dividerText}>OR</Text>
              <LinearGradient
                colors={['transparent', '#00ff88', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.dividerLine}
              />
            </View>

            {/* Sign In Link */}
            <TouchableOpacity 
              style={styles.signInLink} 
              onPress={() => router.push('/login')}
            >
              <Text style={styles.signInText}>
                Already a tournament champion? <Text style={styles.linkText}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  backgroundGradient: {
    flex: 1,
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  glowOrb: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.3,
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  hexagon: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.2)',
    transform: [{ rotate: '45deg' }],
  },
  floatingIcon: {
    position: 'absolute',
  },
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  appName: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 255, 136, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: '#b3b3b3',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    opacity: 0.8,
  },
  form: {
    gap: 20,
  },
  oauthButton: {
    borderRadius: 28,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 28,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  googleIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  googleIconText: {
    color: '#1f2937',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  facebookIcon: {
    width: 28,
    height: 28,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  facebookIconText: {
    color: '#1877f2',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  oauthButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    borderRadius: 1,
  },
  dividerText: {
    color: '#00ff88',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginHorizontal: 20,
    textShadowColor: 'rgba(0, 255, 136, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  signInLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  signInText: {
    color: '#b3b3b3',
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  linkText: {
    color: '#00d4ff',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    textShadowColor: 'rgba(0, 212, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
