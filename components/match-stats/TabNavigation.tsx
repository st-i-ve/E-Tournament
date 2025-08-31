import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TabNavigationProps } from '@/types/matchStats';

export const TabNavigation: React.FC<TabNavigationProps> = ({ selectedTab, onTabChange }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[
          styles.tab, 
          selectedTab === 'overview' && styles.activeTab
        ]}
        onPress={() => onTabChange('overview')}
      >
        <Text style={[
          styles.tabText, 
          selectedTab === 'overview' && styles.activeTabText
        ]}>
          Overview
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.tab, 
          selectedTab === 'detailed' && styles.activeTab
        ]}
        onPress={() => onTabChange('detailed')}
      >
        <Text style={[
          styles.tabText, 
          selectedTab === 'detailed' && styles.activeTabText
        ]}>
          Detailed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
    padding: 4,
    marginHorizontal: 20,
    marginVertical: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#22c55e',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  activeTabText: {
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
  },
});