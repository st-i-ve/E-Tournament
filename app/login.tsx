import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Gamepad2, Zap } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [googleScale] = useState(new Animated.Value(1));
  const [facebookScale] = useState(new Animated.Value(1));
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

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

  const handleGoogleLogin = async () => {
    animateButton(googleScale);
    setIsGoogleLoading(true);
    try {
      // Simulate OAuth login - replace with actual Google OAuth implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: 'google_' + Date.now(),
        username: 'google_user',
        email: 'user@gmail.com',
        teamName: '',
        teamColor: '',
        profilePicture: 'https://via.placeholder.com/100',
      };
      
      login(userData);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', 'Unable to login with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    animateButton(facebookScale);
    setIsFacebookLoading(true);
    try {
      // Simulate OAuth login - replace with actual Facebook OAuth implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: 'facebook_' + Date.now(),
        username: 'facebook_user',
        email: 'user@facebook.com',
        teamName: '',
        teamColor: '',
        profilePicture: 'https://via.placeholder.com/100',
      };
      
      login(userData);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', 'Unable to login with Facebook. Please try again.');
    } finally {
      setIsFacebookLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0a0a0a', '#1a1a2e', '#16213e']}
        style={styles.backgroundGradient}
      >
        {/* Gaming-style background elements */}
        <View style={styles.backgroundElements}>
          <LinearGradient
            colors={['#00d4ff', '#0099cc']}
            style={[styles.glowOrb, { top: 100, left: 50 }]}
          />
          <LinearGradient
            colors={['#00ff88', '#00cc66']}
            style={[styles.glowOrb, { top: 300, right: 80, width: 60, height: 60 }]}
          />
          <View style={[styles.hexagon, { top: 200, left: 120 }]} />
          <View style={[styles.hexagon, { bottom: 200, right: 60, transform: [{ rotate: '30deg' }] }]} />
          <Zap color="rgba(0, 212, 255, 0.3)" size={24} style={[styles.floatingIcon, { top: 250, left: 80 }]} />
          <Gamepad2 color="rgba(0, 255, 136, 0.3)" size={20} style={[styles.floatingIcon, { bottom: 300, right: 120 }]} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Logo or App Name */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#00d4ff', '#00ff88']}
              style={styles.logoGradient}
            >
              <Trophy color="#ffffff" size={48} />
            </LinearGradient>
            <Text style={styles.appName}>E-Tournament</Text>
            <Text style={styles.subtitle}>Level up your gaming experience</Text>
          </View>

        {/* OAuth Login Buttons */}
        <View style={styles.form}>
          <Animated.View style={{ transform: [{ scale: googleScale }] }}>
            <TouchableOpacity 
              style={styles.oauthButton}
              onPress={handleGoogleLogin}
              disabled={isGoogleLoading || isFacebookLoading}
            >
              <LinearGradient
                colors={isGoogleLoading ? ['#374151', '#4b5563'] : ['#1f2937', '#374151']}
                style={styles.buttonGradient}
              >
                {isGoogleLoading ? (
                  <ActivityIndicator color="#00d4ff" size="small" />
                ) : (
                  <>
                    <LinearGradient
                      colors={['#ffffff', '#f3f4f6']}
                      style={styles.googleIcon}
                    >
                      <Text style={styles.googleIconText}>G</Text>
                    </LinearGradient>
                    <Text style={styles.oauthButtonText}>Continue with Google</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: facebookScale }] }}>
            <TouchableOpacity 
              style={styles.oauthButton}
              onPress={handleFacebookLogin}
              disabled={isGoogleLoading || isFacebookLoading}
            >
              <LinearGradient
                colors={isFacebookLoading ? ['#1565c0', '#1976d2'] : ['#1877f2', '#42a5f5']}
                style={styles.buttonGradient}
              >
                {isFacebookLoading ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <>
                    <View style={styles.facebookIcon}>
                      <Text style={styles.facebookIconText}>f</Text>
                    </View>
                    <Text style={styles.oauthButtonText}>Continue with Facebook</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.divider}>
            <LinearGradient
              colors={['transparent', '#00d4ff', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.dividerLine}
            />
            <Text style={styles.dividerText}>OR</Text>
            <LinearGradient
              colors={['transparent', '#00d4ff', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.dividerLine}
            />
          </View>

          <TouchableOpacity 
            style={styles.signUpLink}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.signUpText}>
              New to gaming tournaments? <Text style={styles.linkText}>Join Now</Text>
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
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
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
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  hexagon: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 136, 0.2)',
    transform: [{ rotate: '45deg' }],
  },
  floatingIcon: {
    position: 'absolute',
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
    shadowColor: '#00d4ff',
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
    textShadowColor: 'rgba(0, 212, 255, 0.5)',
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
    color: '#00d4ff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginHorizontal: 20,
    textShadowColor: 'rgba(0, 212, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  signUpLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  signUpText: {
    color: '#b3b3b3',
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  linkText: {
    color: '#00ff88',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    textShadowColor: 'rgba(0, 255, 136, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
