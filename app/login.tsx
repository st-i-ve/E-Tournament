import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Trophy, Star, User, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <Text style={styles.appName}>GameHub</Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <User color="#9ca3af" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputGroup}>
            <Lock color="#9ca3af" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.linksContainer}>
            <TouchableOpacity>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 32,
  },
  appName: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  loginButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  linkText: {
    color: '#22c55e',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
});
