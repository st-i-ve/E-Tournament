import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Palette, Bell, Shield, User, Globe, LogOut } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const [selectedTheme, setSelectedTheme] = useState('forest');
  const [notifications, setNotifications] = useState(true);
  const [matchReminders, setMatchReminders] = useState(true);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const themeOptions = [
    { id: 'green', name: 'Emerald Green', color: '#22c55e', available: true },
    { id: 'forest', name: 'Forest Green', color: '#16a34a', available: true },
    { id: 'mint', name: 'Mint Green', color: '#10b981', available: true },
    { id: 'blue', name: 'Ocean Blue', color: '#3b82f6', available: false, comingSoon: true },
    { id: 'purple', name: 'Royal Purple', color: '#8b5cf6', available: false, comingSoon: true }
  ];

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const toggleMatchReminders = () => {
    setMatchReminders(!matchReminders);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Geometric background elements */}
      <View style={styles.backgroundElements}>
        {/* Triangles */}
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View style={[styles.triangle, { top: 200, right: 80, transform: [{ rotate: '12deg' }] }]} />
        <View style={[styles.triangle, { bottom: 200, left: 100 }]} />
        
        {/* Circles */}
        <View style={[styles.circle, { top: 150, left: 120, width: 48, height: 48 }]} />
        <View style={[styles.circle, { bottom: 250, right: 100, width: 32, height: 32 }]} />
        <View style={[styles.circle, { top: 400, left: 80, width: 24, height: 24 }]} />
        
        {/* Rectangles */}
        <View style={[styles.rectangle, { top: 300, right: 40, width: 48, height: 32 }]} />
        <View style={[styles.rectangle, { bottom: 80, left: 200, width: 32, height: 48 }]} />
        
        {/* Lines */}
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#22c55e" size={20} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.content}>
          {/* Theme Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Palette color="#22c55e" size={16} />
              <View style={styles.sectionHeaderText}>
                <Text style={styles.sectionTitle}>Theme Selection</Text>
                <Text style={styles.sectionSubtitle}>Customize your app appearance</Text>
              </View>
            </View>
            
            <View style={styles.themeOptions}>
              {themeOptions.map((theme) => (
                <TouchableOpacity
                  key={theme.id}
                  style={[
                    styles.themeOption,
                    selectedTheme === theme.id && theme.available && styles.selectedTheme,
                    !theme.available && styles.disabledTheme
                  ]}
                  onPress={() => theme.available && setSelectedTheme(theme.id)}
                  disabled={!theme.available}
                >
                  <View style={styles.themeOptionContent}>
                    <View style={[styles.themeColor, { backgroundColor: theme.color }]} />
                    <View style={styles.themeInfo}>
                      <Text style={[
                        styles.themeName,
                        selectedTheme === theme.id && theme.available && styles.selectedThemeText,
                        !theme.available && styles.disabledText
                      ]}>
                        {theme.name}
                      </Text>
                      {theme.comingSoon && (
                        <Text style={styles.comingSoonText}>Coming Soon</Text>
                      )}
                    </View>
                  </View>
                  {selectedTheme === theme.id && theme.available && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.separator} />

          {/* Notifications */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Bell color="#3b82f6" size={16} />
              <View style={styles.sectionHeaderText}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <Text style={styles.sectionSubtitle}>Manage your notification preferences</Text>
              </View>
            </View>

            <View style={styles.settingsList}>
              <TouchableOpacity style={styles.settingItem} onPress={toggleNotifications}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>Get notified about match updates and results</Text>
                </View>
                <View style={[styles.toggle, notifications && styles.toggleActive]}>
                  <View style={[styles.toggleThumb, notifications && styles.toggleThumbActive]} />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem} onPress={toggleMatchReminders}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Match Reminders</Text>
                  <Text style={styles.settingDescription}>Remind me 30 minutes before matches start</Text>
                </View>
                <View style={[styles.toggle, matchReminders && styles.toggleActive]}>
                  <View style={[styles.toggleThumb, matchReminders && styles.toggleThumbActive]} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.separator} />

          {/* Account */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <User color="#8b5cf6" size={16} />
              <View style={styles.sectionHeaderText}>
                <Text style={styles.sectionTitle}>Account</Text>
                <Text style={styles.sectionSubtitle}>Manage your account settings</Text>
              </View>
            </View>

            <View style={styles.settingsList}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <Shield color="#9ca3af" size={16} />
                  <Text style={styles.menuItemText}>Privacy Settings</Text>
                </View>
                <Text style={styles.menuItemArrow}>→</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <Globe color="#9ca3af" size={16} />
                  <Text style={styles.menuItemText}>Language</Text>
                </View>
                <View style={styles.menuItemRight}>
                  <Text style={styles.menuItemValue}>English</Text>
                  <Text style={styles.menuItemArrow}>→</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
                <View style={styles.menuItemContent}>
                  <LogOut color="#ef4444" size={16} />
                  <Text style={styles.logoutText}>Log Out</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
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
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 50,
  },
  rectangle: {
    position: 'absolute',
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
  scrollView: {
    flex: 1,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  sectionSubtitle: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  themeOptions: {
    gap: 8,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  selectedTheme: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  disabledTheme: {
    opacity: 0.5,
  },
  themeOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  themeColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    color: '#e5e7eb',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  selectedThemeText: {
    color: '#22c55e',
  },
  disabledText: {
    color: '#6b7280',
  },
  comingSoonText: {
    color: '#6b7280',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    marginVertical: 24,
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  settingDescription: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#374151',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#22c55e',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    color: '#e5e7eb',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemValue: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  menuItemArrow: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  bottomSpacing: {
    height: 80,
  },
  logoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
});