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
import { Trophy } from 'lucide-react-native';
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo or App Name */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Trophy color="#25D366" size={48} />
          </View>
          <Text style={styles.appName}>E-Tournament</Text>
          <Text style={styles.subtitle}>Level up your gaming experience</Text>
        </View>

        {/* OAuth Login Buttons */}
        <View style={styles.form}>
          <TouchableOpacity 
            style={styles.oauthButton}
            onPress={handleGoogleLogin}
            disabled={isGoogleLoading || isFacebookLoading}
          >
            <View style={[styles.buttonContent, isGoogleLoading && styles.buttonDisabled]}>
              {isGoogleLoading ? (
                <ActivityIndicator color="#25D366" size="small" />
              ) : (
                <>
                  <View style={styles.googleIcon}>
                    <Text style={styles.googleIconText}>G</Text>
                  </View>
                  <Text style={styles.oauthButtonText}>Continue with Google</Text>
                </>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.oauthButton}
            onPress={handleFacebookLogin}
            disabled={isGoogleLoading || isFacebookLoading}
          >
            <View style={[styles.buttonContent, styles.facebookButton, isFacebookLoading && styles.buttonDisabled]}>
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
            </View>
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
              New to gaming tournaments? <Text style={styles.linkText}>Join Now</Text>
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
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#25D366',
  },
  appName: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  oauthButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    gap: 12,
  },
  facebookButton: {
    backgroundColor: '#1877f2',
    borderColor: '#1877f2',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIconText: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '700',
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
    fontWeight: '700',
  },
  oauthButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#25D366',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  signUpLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  signUpText: {
    color: '#888',
    fontSize: 15,
    textAlign: 'center',
  },
  linkText: {
    color: '#25D366',
    fontSize: 15,
    fontWeight: '600',
  },
});
