// components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBackButton = true,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButtonSmall}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle} />
          <View style={styles.logoSquare} />
        </View>
        <View style={styles.headerTextContainer}>
          <LinearGradient
            colors={['white', 'green']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientText}
          >
            <Text style={styles.headerTitle}>{title}</Text>
          </LinearGradient>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButtonSmall: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.3)',
  },
  logoContainer: {
    width: 32,
    height: 32,
    position: 'relative',
  },
  logoCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  logoSquare: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  gradientText: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
