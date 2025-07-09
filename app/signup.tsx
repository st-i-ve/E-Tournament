import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupScreen() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const { user, login } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    try {
      // Simulate OAuth signup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user data for testing
      const mockUser = {
        id: '1',
        username: 'John Doe',
        email: 'john.doe@gmail.com',
        teamName: '',
        teamColor: '',
        profilePicture: ''
      };
      
      login(mockUser);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Google signup error:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookSignup = async () => {
    setIsFacebookLoading(true);
    try {
      // Simulate OAuth signup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user data for testing
      const mockUser = {
        id: '2',
        username: 'Jane Smith',
        email: 'jane.smith@facebook.com',
        teamName: '',
        teamColor: '',
        profilePicture: ''
      };
      
      login(mockUser);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Facebook signup error:', error);
    } finally {
      setIsFacebookLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      
      {/* Background Shapes */}
      <View style={styles.backgroundShapes}>
        <LinearGradient
          colors={['rgba(34, 197, 94, 0.3)', 'transparent']}
          style={[styles.shape, styles.shape1]}
        />
        <LinearGradient
          colors={['rgba(34, 197, 94, 0.2)', 'transparent']}
          style={[styles.shape, styles.shape2]}
        />
        <LinearGradient
          colors={['rgba(34, 197, 94, 0.1)', 'transparent']}
          style={[styles.shape, styles.shape3]}
        />
      </View>

      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="trophy" size={32} color="#22c55e" />
          </View>
          <Text style={styles.appName}>E-Tournament</Text>
          <Text style={styles.subtitle}>Create your account to get started</Text>
        </View>

        {/* OAuth Buttons */}
        <View style={styles.form}>
          {/* Google Signup Button */}
          <TouchableOpacity 
            style={[styles.oauthButton, styles.googleButton]} 
            onPress={handleGoogleSignup}
            disabled={isGoogleLoading || isFacebookLoading}
          >
            {isGoogleLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <>
                <View style={styles.googleIcon}>
                  <Text style={styles.googleIconText}>G</Text>
                </View>
                <Text style={styles.oauthButtonText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Facebook Signup Button */}
          <TouchableOpacity 
            style={[styles.oauthButton, styles.facebookButton]} 
            onPress={handleFacebookSignup}
            disabled={isGoogleLoading || isFacebookLoading}
          >
            {isFacebookLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <>
                <View style={styles.facebookIcon}>
                  <Text style={styles.facebookIconText}>f</Text>
                </View>
                <Text style={styles.oauthButtonText}>Continue with Facebook</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Sign In Link */}
          <TouchableOpacity 
            style={styles.signInLink} 
            onPress={() => router.push('/login')}
          >
            <Text style={styles.signInText}>
              Already have an account? <Text style={styles.linkText}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  shape: {
    position: 'absolute',
    borderRadius: 100,
  },
  shape1: {
    width: 200,
    height: 200,
    top: -100,
    right: -100,
  },
  shape2: {
    width: 150,
    height: 150,
    bottom: -75,
    left: -75,
  },
  shape3: {
    width: 100,
    height: 100,
    top: '50%',
    left: -50,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
  signInLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  signInText: {
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
