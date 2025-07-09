import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';

const SignupPage = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [moveAnim1] = React.useState(new Animated.Value(0));
  const [moveAnim2] = React.useState(new Animated.Value(0));
  const [moveAnim3] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    const animateBackground = () => {
      // First animation sequence
      Animated.loop(
        Animated.sequence([
          Animated.timing(moveAnim1, {
            toValue: 1,
            duration: 15000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(moveAnim1, {
            toValue: 0,
            duration: 15000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Second animation sequence
      Animated.loop(
        Animated.sequence([
          Animated.timing(moveAnim2, {
            toValue: 1,
            duration: 20000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(moveAnim2, {
            toValue: 0,
            duration: 20000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Third animation sequence
      Animated.loop(
        Animated.sequence([
          Animated.timing(moveAnim3, {
            toValue: 1,
            duration: 18000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(moveAnim3, {
            toValue: 0,
            duration: 18000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateBackground();
  }, []);

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} signup attempt`);

    const userData = {
      id: Date.now().toString(),
      username: `${provider.toLowerCase()}_user`,
      email: `user@${provider.toLowerCase()}.com`,
      teamName: '',
      teamColor: '',
    };

    login(userData);
    navigation.navigate('TeamSelection');
  };

  // Interpolate animation values
  const anim1Transform = moveAnim1.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [
      'translateX(0) translateY(0) scale(1)',
      'translateX(30px) translateY(-30px) scale(1.1)',
      'translateX(-20px) translateY(20px) scale(0.9)',
      'translateX(0) translateY(0) scale(1)',
    ],
  });

  const anim2Transform = moveAnim2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      'translateX(0) translateY(0) scale(1)',
      'translateX(-25px) translateY(-25px) scale(1.2)',
      'translateX(0) translateY(0) scale(1)',
    ],
  });

  const anim3Transform = moveAnim3.interpolate({
    inputRange: [0, 0.25, 0.75, 1],
    outputRange: [
      'translateX(0) translateY(0) scale(1)',
      'translateX(25px) translateY(25px) scale(0.8)',
      'translateX(-30px) translateY(10px) scale(1.1)',
      'translateX(0) translateY(0) scale(1)',
    ],
  });

  return (
    <View style={styles.container}>
      {/* Shape Blur Background */}
      <View style={styles.backgroundContainer}>
        <Animated.View
          style={[
            styles.backgroundShape1,
            { transform: [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }], // Simplified for demo
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundShape2,
            { transform: [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }], // Simplified for demo
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundShape3,
            { transform: [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }], // Simplified for demo
          ]}
        />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Join us</Text>
            <Text style={styles.subtitle}>Create your account to get started</Text>
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
            >
              <View style={styles.buttonOverlay} />
              <View style={styles.buttonContent}>
                {/* Google icon */}
                <View style={styles.iconContainer}>
                  <View
                    style={[styles.googleIconPart, { backgroundColor: '#EA4335' }]}
                  />
                  <View
                    style={[styles.googleIconPart, { backgroundColor: '#34A853' }]}
                  />
                  <View
                    style={[styles.googleIconPart, { backgroundColor: '#FBBC05' }]}
                  />
                  <View
                    style={[styles.googleIconPart, { backgroundColor: '#EA4335' }]}
                  />
                </View>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Facebook')}
            >
              <View style={styles.buttonOverlay} />
              <View style={styles.buttonContent}>
                {/* Facebook icon */}
                <View style={styles.facebookIcon}>
                  <Text style={styles.facebookIconText}>f</Text>
                </View>
                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  backgroundShape1: {
    position: 'absolute',
    top: '25%',
    left: '25%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(59, 130, 246, 0.4)',
    opacity: 0.4,
  },
  backgroundShape2: {
    position: 'absolute',
    top: '75%',
    right: '25%',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    opacity: 0.4,
  },
  backgroundShape3: {
    position: 'absolute',
    bottom: '25%',
    left: '50%',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(6, 182, 212, 0.35)',
    opacity: 0.4,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  socialButtons: {
    marginBottom: 24,
    gap: 16,
  },
  socialButton: {
    width: '100%',
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  buttonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  googleIconPart: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  facebookIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookIconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 16,
    alignSelf: 'center',
  },
  loginLinkText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SignupPage;