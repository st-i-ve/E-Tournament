import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  ArrowLeft,
  Palette,
  Bell,
  Shield,
  User,
  Globe,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Switch } from '@/trash/components/ui/switch';

const SettingsPage = () => {
  const navigation = useNavigation();
  const [selectedTheme, setSelectedTheme] = useState('forest');
  const [notifications, setNotifications] = useState(true);
  const [matchReminders, setMatchReminders] = useState(true);

  const themeOptions = [
    {
      id: 'green',
      name: 'Emerald Green',
      color: '#10b981',
      available: true,
    },
    {
      id: 'forest',
      name: 'Forest Green',
      color: '#047857',
      available: true,
    },
    { id: 'mint', name: 'Mint Green', color: '#6ee7b7', available: true },
    {
      id: 'blue',
      name: 'Ocean Blue',
      color: '#3b82f6',
      available: false,
      comingSoon: true,
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      color: '#8b5cf6',
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Theme Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Palette size={16} color="#34d399" />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Theme Selection</Text>
              <Text style={styles.sectionSubtitle}>
                Customize your app appearance
              </Text>
            </View>
          </View>

          <View style={styles.themeOptions}>
            {themeOptions.map((theme) => (
              <TouchableWithoutFeedback
                key={theme.id}
                onPress={() => theme.available && setSelectedTheme(theme.id)}
                disabled={!theme.available}
              >
                <View
                  style={[
                    styles.themeOption,
                    selectedTheme === theme.id && theme.available
                      ? styles.themeOptionSelected
                      : null,
                    !theme.available ? styles.themeOptionDisabled : null,
                  ]}
                >
                  <View style={styles.themeOptionContent}>
                    <View
                      style={[
                        styles.themeColor,
                        { backgroundColor: theme.color },
                        !theme.available ? { opacity: 0.5 } : null,
                      ]}
                    />
                    <View>
                      <Text
                        style={[
                          styles.themeName,
                          selectedTheme === theme.id && theme.available
                            ? { color: '#34d399' }
                            : { color: '#d1d5db' },
                        ]}
                      >
                        {theme.name}
                      </Text>
                      {theme.comingSoon && (
                        <Text style={styles.comingSoon}>Coming Soon</Text>
                      )}
                    </View>
                  </View>
                  {selectedTheme === theme.id && theme.available && (
                    <View style={styles.selectedIndicator} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={16} color="#60a5fa" />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Notifications</Text>
              <Text style={styles.sectionSubtitle}>
                Manage your notification preferences
              </Text>
            </View>
          </View>

          <View style={styles.notificationOptions}>
            <View style={styles.notificationOption}>
              <View>
                <Text style={styles.notificationTitle}>Push Notifications</Text>
                <Text style={styles.notificationSubtitle}>
                  Get notified about match updates and results
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                activeColor="#34d399"
              />
            </View>

            <View style={styles.notificationOption}>
              <View>
                <Text style={styles.notificationTitle}>Match Reminders</Text>
                <Text style={styles.notificationSubtitle}>
                  Remind me 30 minutes before matches start
                </Text>
              </View>
              <Switch
                value={matchReminders}
                onValueChange={setMatchReminders}
                activeColor="#34d399"
              />
            </View>
          </View>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Account */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={16} color="#a78bfa" />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Account</Text>
              <Text style={styles.sectionSubtitle}>
                Manage your account settings
              </Text>
            </View>
          </View>

          <View style={styles.accountOptions}>
            <TouchableOpacity style={styles.accountOption}>
              <View style={styles.accountOptionContent}>
                <Shield size={16} color="#d1d5db" />
                <Text style={styles.accountOptionText}>Privacy Settings</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accountOption}>
              <View style={styles.accountOptionContent}>
                <Globe size={16} color="#d1d5db" />
                <Text style={styles.accountOptionText}>Language</Text>
              </View>
              <View style={styles.languageOption}>
                <Text style={styles.languageText}>English</Text>
                <Text style={styles.arrow}>→</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(74, 222, 128, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  themeOptions: {
    gap: 8,
  },
  themeOption: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeOptionSelected: {
    // Selected state styling
  },
  themeOptionDisabled: {
    opacity: 0.5,
  },
  themeOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  themeName: {
    fontSize: 14,
    fontWeight: '500',
  },
  comingSoon: {
    fontSize: 12,
    color: '#6b7280',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34d399',
  },
  separator: {
    height: 1,
    marginVertical: 16,
    backgroundColor: 'rgba(74, 222, 128, 0.3)',
  },
  notificationOptions: {
    gap: 16,
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  notificationSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  accountOptions: {
    gap: 12,
  },
  accountOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  accountOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountOptionText: {
    fontSize: 14,
    color: '#d1d5db',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  languageText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  arrow: {
    color: '#6b7280',
    fontSize: 14,
  },
  bottomSpacing: {
    height: 64,
  },
});

export default SettingsPage;
