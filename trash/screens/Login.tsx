import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Svg, Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const LoginPage = () => {
  const navigation = useNavigation();
  const { login } = useAuth(); // Assuming useAuth is properly imported

  // Animation values
  const move1Anim = new Animated.Value(0);
  const move2Anim = new Animated.Value(0);
  const move3Anim = new Animated.Value(0);

  // Start animations
  React.useEffect(() => {
    const startAnimations = () => {
      // Animation for first blob
      Animated.loop(
        Animated.sequence([
          Animated.timing(move1Anim, {
            toValue: 1,
            duration: 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(move1Anim, {
            toValue: 2,
            duration: 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(move1Anim, {
            toValue: 0,
            duration: 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      ).start();

      // Animation for second blob
      Animated.loop(
        Animated.sequence([
          Animated.timing(move2Anim, {
            toValue: 1,
            duration: 6666,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(move2Anim, {
            toValue: 0,
            duration: 6666,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      ).start();

      // Animation for third blob
      Animated.loop(
        Animated.sequence([
          Animated.timing(move3Anim, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(move3Anim, {
            toValue: 2,
            duration: 6000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(move3Anim, {
            toValue: 0,
            duration: 6000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    startAnimations();
  }, []);

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login attempt`);

    const userData = {
      id: '1',
      username: `${provider.toLowerCase()}_user`,
      email: `user@${provider.toLowerCase()}.com`,
      teamName: '',
      teamColor: '',
    };

    login(userData);
    navigation.navigate('TeamSelection');
  };

  // Interpolate animation values
  const move1TranslateX = move1Anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 30, -20],
  });
  const move1TranslateY = move1Anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -30, 20],
  });
  const move1Scale = move1Anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1.1, 0.9],
  });

  const move2TranslateX = move2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });
  const move2TranslateY = move2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });
  const move2Scale = move2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const move3TranslateX = move3Anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 25, -30],
  });
  const move3TranslateY = move3Anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 25, 10],
  });
  const move3Scale = move3Anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.8, 1.1],
  });

  return (
    <View style={styles.container}>
      {/* Shape Blur Background */}
      <View style={styles.backgroundContainer}>
        <Animated.View
          style={[
            styles.blob1,
            {
              transform: [
                { translateX: move1TranslateX },
                { translateY: move1TranslateY },
                { scale: move1Scale },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(37, 99, 235, 0.4)', 'rgba(124, 58, 237, 0.4)']}
            style={styles.gradientBlob}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.blob2,
            {
              transform: [
                { translateX: move2TranslateX },
                { translateY: move2TranslateY },
                { scale: move2Scale },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(147, 51, 234, 0.3)', 'rgba(236, 72, 153, 0.3)']}
            style={styles.gradientBlob}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.blob3,
            {
              transform: [
                { translateX: move3TranslateX },
                { translateY: move3TranslateY },
                { scale: move3Scale },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(6, 182, 212, 0.35)', 'rgba(59, 130, 246, 0.35)']}
            style={styles.gradientBlob}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['white', 'gray', 'gray']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientText}
          >
            <Text style={styles.title}>Welcome back</Text>
          </LinearGradient>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Social Login Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Google')}
          >
            <LinearGradient
              colors={[
                'transparent',
                'rgba(255, 255, 255, 0.2)',
                'transparent',
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[
                StyleSheet.absoluteFill,
                { transform: [{ translateX: -100 }] },
              ]}
            />
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <Path
                fill="#EA4335"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <Path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <Path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <Path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </Svg>
            <LinearGradient
              colors={['white', 'gray', 'white']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientText}
            >
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Facebook')}
          >
            <LinearGradient
              colors={[
                'transparent',
                'rgba(255, 255, 255, 0.2)',
                'transparent',
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[
                StyleSheet.absoluteFill,
                { transform: [{ translateX: -100 }] },
              ]}
            />
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <Path
                fill="#1877F2"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </Svg>
            <LinearGradient
              colors={['white', 'gray', 'white']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientText}
            >
              <Text style={styles.socialButtonText}>
                Continue with Facebook
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerText}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientBlob: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  blob1: {
    position: 'absolute',
    top: '25%',
    left: '25%',
    width: 384,
    height: 384,
    borderRadius: 999,
    opacity: 0.4,
  },
  blob2: {
    position: 'absolute',
    top: '75%',
    right: '25%',
    width: 320,
    height: 320,
    borderRadius: 999,
    opacity: 0.3,
  },
  blob3: {
    position: 'absolute',
    bottom: '25%',
    left: '50%',
    width: 288,
    height: 288,
    borderRadius: 999,
    opacity: 0.35,
  },
  contentContainer: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: 384,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  socialButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  socialButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  gradientText: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default LoginPage;
