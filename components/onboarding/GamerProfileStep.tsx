import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, MapPin, Gamepad2 } from 'lucide-react-native';

interface GamerProfileStepProps {
  data: {
    username: string;
    avatar: string;
    region: string;
  };
  onUpdate: (data: any) => void;
}

const GamerProfileStep: React.FC<GamerProfileStepProps> = ({ data, onUpdate }) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const regions = [
    'North America',
    'Europe',
    'Asia Pacific',
    'South America',
    'Middle East & Africa',
    'Oceania',
  ];

  const avatarColors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd',
  ];

  const handleUsernameChange = (username: string) => {
    onUpdate({ username });
  };

  const handleRegionSelect = (region: string) => {
    onUpdate({ region });
  };

  const handleAvatarSelect = (avatar: string) => {
    onUpdate({ avatar });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Avatar Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Your Avatar</Text>
        <View style={styles.avatarContainer}>
          <View style={styles.currentAvatar}>
            <LinearGradient
              colors={[data.avatar || '#4ecdc4', data.avatar || '#45b7d1']}
              style={styles.avatarCircle}
            >
              <Text style={styles.avatarText}>
                {data.username ? getInitials(data.username) : 'GM'}
              </Text>
            </LinearGradient>
          </View>
          
          <View style={styles.colorPalette}>
            {avatarColors.map((color, index) => (
              <Pressable
                key={index}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  data.avatar === color && styles.selectedColor,
                ]}
                onPress={() => handleAvatarSelect(color)}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Username Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gamer Tag</Text>
        <View style={[
          styles.inputContainer,
          focusedField === 'username' && styles.inputContainerFocused,
        ]}>
          <LinearGradient
            colors={
              focusedField === 'username'
                ? ['rgba(0, 255, 136, 0.1)', 'rgba(0, 212, 255, 0.1)']
                : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)']
            }
            style={styles.inputGradient}
          >
            <User 
              size={20} 
              color={focusedField === 'username' ? '#00ff88' : '#b3b3b3'} 
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your gamer tag"
              placeholderTextColor="#666666"
              value={data.username}
              onChangeText={handleUsernameChange}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
              maxLength={20}
            />
          </LinearGradient>
        </View>
        {data.username.length > 0 && data.username.length < 3 && (
          <Text style={styles.errorText}>Username must be at least 3 characters</Text>
        )}
      </View>

      {/* Region Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Your Region</Text>
        <View style={styles.regionGrid}>
          {regions.map((region, index) => (
            <Pressable
              key={index}
              style={[
                styles.regionOption,
                data.region === region && styles.selectedRegion,
              ]}
              onPress={() => handleRegionSelect(region)}
            >
              <LinearGradient
                colors={
                  data.region === region
                    ? ['rgba(0, 255, 136, 0.2)', 'rgba(0, 212, 255, 0.2)']
                    : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)']
                }
                style={styles.regionGradient}
              >
                <MapPin 
                  size={18} 
                  color={data.region === region ? '#00ff88' : '#b3b3b3'} 
                />
                <Text style={[
                  styles.regionText,
                  data.region === region && styles.selectedRegionText,
                ]}>
                  {region}
                </Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Gaming Tip */}
      <View style={styles.tipContainer}>
        <LinearGradient
          colors={['rgba(0, 255, 136, 0.1)', 'rgba(0, 212, 255, 0.1)']}
          style={styles.tipGradient}
        >
          <Gamepad2 size={20} color="#00ff88" />
          <Text style={styles.tipText}>
            Your gamer tag will be visible to other players in tournaments and matches.
          </Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 255, 136, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  avatarContainer: {
    alignItems: 'center',
    gap: 20,
  },
  currentAvatar: {
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#ffffff',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  inputContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputContainerFocused: {
    borderColor: '#00ff88',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 12,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 8,
    marginLeft: 4,
  },
  regionGrid: {
    gap: 12,
  },
  regionOption: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedRegion: {
    borderColor: '#00ff88',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  regionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
  },
  regionText: {
    color: '#b3b3b3',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
  selectedRegionText: {
    color: '#ffffff',
  },
  tipContainer: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.2)',
  },
  tipGradient: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
  },
  tipText: {
    flex: 1,
    color: '#b3b3b3',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
});

export default GamerProfileStep;