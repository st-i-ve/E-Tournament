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
    height: 40,
    padding: 5,
    marginHorizontal: 20,
    marginVertical: 16,
    justifyContent:'center',
    alignItems:'center',
  
  },
  tab: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    height: 30,
    justifyContent:'center'
  },
  activeTab: {
    backgroundColor: '#22c55e',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  activeTabText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
});