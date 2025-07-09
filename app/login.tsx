import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Mail } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const handleGoogleLogin = async () => {
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
      {/* Abstract background shapes */}
      <View style={styles.backgroundElements}>
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View
          style={[
            styles.triangle,
            { top: 200, right: 80, transform: [{ rotate: '12deg' }] },
          ]}
        />
        <View
          style={[
            styles.circle,
            { top: 150, left: 120, width: 48, height: 48 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { bottom: 250, right: 100, width: 32, height: 32 },
          ]}
        />
        <View style={[styles.verticalLine, { left: '30%' }]} />
        <View style={[styles.horizontalLine, { top: '60%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo or App Name */}
        <View style={styles.logoContainer}>
          <Trophy color="#22c55e" size={48} />
          <Text style={styles.appName}>E-Tournament</Text>
          <Text style={styles.subtitle}>Welcome back! Sign in to continue</Text>
        </View>

        {/* OAuth Login Buttons */}
        <View style={styles.form}>
          <TouchableOpacity 
            style={[styles.oauthButton, styles.googleButton]} 
            onPress={handleGoogleLogin}
            disabled={isGoogleLoading || isFacebookLoading}
          >
            {isGoogleLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <>
                <View style={styles.googleIcon}>
                  <Text style={styles.googleIconText}>G</Text>
                </View>
                <Text style={styles.oauthButtonText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.oauthButton, styles.facebookButton]} 
            onPress={handleFacebookLogin}
            disabled={isGoogleLoading || isFacebookLoading}
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
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity 
            style={styles.signUpLink}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  triangle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appName: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 8,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 8,
  },
  googleButton: {
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  facebookButton: {
    backgroundColor: '#1877f2',
  },
  googleIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIconText: {
    color: '#1f2937',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  facebookIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookIconText: {
    color: '#1877f2',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  oauthButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  dividerText: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginHorizontal: 16,
  },
  signUpLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  signUpText: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  linkText: {
    color: '#22c55e',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});
