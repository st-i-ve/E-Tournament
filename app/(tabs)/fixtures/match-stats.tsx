import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Trophy, Target, Activity, Users, TrendingUp, Zap, Shield, Crosshair } from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';
import { router } from 'expo-router';

// Mock match statistics data
const mockMatchStats = {
  homeTeam: 'Paris FC',
  awayTeam: 'Jeshi ya South C',
  homeScore: 2,
  awayScore: 1,
  date: '2025-01-15',
  tournament: 'Champions Elite League',
  stats: {
    possession: { home: 53, away: 47 },
    shots: { home: 20, away: 5 },
    shotsOnTarget: { home: 17, away: 5 },
    fouls: { home: 2, away: 1 },
    offsides: { home: 2, away: 1 },
    cornerKicks: { home: 2, away: 0 },
    freeKicks: { home: 1, away: 2 },
    passes: { home: 181, away: 197 },
    successfulPasses: { home: 132, away: 132 },
    crosses: { home: 3, away: 1 },
    interceptions: { home: 55, away: 38 },
    tackles: { home: 9, away: 16 },
    saves: { home: 2, away: 7 }
  }
};

const { width: screenWidth } = Dimensions.get('window');

// Simple Bar Chart Component
const SimpleBarChart = ({ homeValue, awayValue, homeTeam, awayTeam, maxValue, delay = 0 }: {
  homeValue: number;
  awayValue: number;
  homeTeam: string;
  awayTeam: string;
  maxValue?: number;
  delay?: number;
}) => {
  const [homeAnimation] = useState(new Animated.Value(0));
  const [awayAnimation] = useState(new Animated.Value(0));
  
  const max = maxValue || Math.max(homeValue, awayValue, 1);
  const homePercentage = (homeValue / max) * 100;
  const awayPercentage = (awayValue / max) * 100;

  useEffect(() => {
    const animateBar = (animation: Animated.Value, targetValue: number) => {
      Animated.timing(animation, {
        toValue: targetValue,
        duration: 1000,
        delay: delay,
        useNativeDriver: false,
      }).start();
    };

    animateBar(homeAnimation, homePercentage);
    animateBar(awayAnimation, awayPercentage);
  }, [homePercentage, awayPercentage, delay]);

  return (
    <View style={styles.barChartContainer}>
      <View style={styles.barRow}>
        <View style={styles.leftBar}>
          <Text style={styles.barValue}>{homeValue}</Text>
          <View style={styles.barTrack}>
            <Animated.View 
              style={[
                styles.barFill, 
                styles.homeBar,
                {
                  width: homeAnimation.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp',
                  }),
                }
              ]} 
            />
          </View>
        </View>
        
        <View style={styles.centerDivider}>
          <View style={styles.centerDot} />
        </View>
        
        <View style={styles.rightBar}>
          <View style={styles.barTrack}>
            <Animated.View 
              style={[
                styles.barFill, 
                styles.awayBar,
                {
                  width: awayAnimation.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp',
                  }),
                }
              ]} 
            />
          </View>
          <Text style={styles.barValue}>{awayValue}</Text>
        </View>
      </View>
    </View>
  );
};

// Keep the Enhanced Possession Circle as requested
const EnhancedPossessionCircle = ({ homePercentage, awayPercentage }: {
  homePercentage: number;
  awayPercentage: number;
}) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const homeAngle = (homePercentage / 100) * 360;
  const awayAngle = (awayPercentage / 100) * 360;

  return (
    <View style={styles.possessionContainer}>
      <View style={styles.possessionCircleWrapper}>
        <View style={styles.outerRing}>
          <View style={styles.innerCircle}>
            <View style={styles.possessionDisplay}>
              <Text style={styles.possessionMainText}>{homePercentage}%</Text>
              <View style={styles.possessionDividerLine} />
              <Text style={styles.possessionMainText}>{awayPercentage}%</Text>
            </View>
          </View>
          
          {/* Animated progress rings */}
          <Animated.View 
            style={[
              styles.progressRing,
              styles.homeProgressRing,
              {
                transform: [{
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', `${homeAngle}deg`],
                  })
                }]
              }
            ]}
          />
          <Animated.View 
            style={[
              styles.progressRing,
              styles.awayProgressRing,
              {
                transform: [{
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', `${awayAngle}deg`],
                  })
                }]
              }
            ]}
          />
        </View>
        
        {/* Floating indicators */}
        <View style={[styles.floatingIndicator, styles.homeIndicator]}>
          <View style={styles.indicatorDot} />
        </View>
        <View style={[styles.floatingIndicator, styles.awayIndicator]}>
          <View style={[styles.indicatorDot, styles.awayIndicatorDot]} />
        </View>
      </View>
    </View>
  );
};

// Colored Radar Chart with filled areas
const ColoredRadarChart = ({ stats }: { stats: any }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  const radarStats = [
    { label: 'Attack', home: (stats.shots.home / 25) * 100, away: (stats.shots.away / 25) * 100, icon: Crosshair },
    { label: 'Control', home: (stats.passes.home / 250) * 100, away: (stats.passes.away / 250) * 100, icon: Target },
    { label: 'Defense', home: (stats.tackles.home / 20) * 100, away: (stats.tackles.away / 20) * 100, icon: Shield },
    { label: 'Saves', home: (stats.saves.home / 10) * 100, away: (stats.saves.away / 10) * 100, icon: Zap },
  ];

  const center = { x: 80, y: 80 };
  const maxRadius = 60;

  // Calculate points for both teams
  const homePoints = radarStats.map((stat, index) => {
    const angle = (index * 90 - 90) * (Math.PI / 180); // Start from top
    const radius = (stat.home / 100) * maxRadius;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
  });

  const awayPoints = radarStats.map((stat, index) => {
    const angle = (index * 90 - 90) * (Math.PI / 180);
    const radius = (stat.away / 100) * maxRadius;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
  });

  // Create SVG path strings for filled areas
  const homePathData = `M ${homePoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
  const awayPathData = `M ${awayPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`;

  return (
    <View style={styles.radarContainer}>
      <View style={styles.radarBackground}>
        {/* Concentric circles */}
        {[1, 2, 3, 4].map((ring) => (
          <View 
            key={ring}
            style={[
              styles.radarRing,
              { 
                width: ring * 30,
                height: ring * 30,
                borderRadius: ring * 15,
              }
            ]}
          />
        ))}
        
        {/* Radar lines */}
        <View style={[styles.radarLine, { transform: [{ rotate: '0deg' }] }]} />
        <View style={[styles.radarLine, { transform: [{ rotate: '90deg' }] }]} />
        <View style={[styles.radarLine, { transform: [{ rotate: '45deg' }] }]} />
        <View style={[styles.radarLine, { transform: [{ rotate: '135deg' }] }]} />
      </View>
      
      {/* Colored filled areas */}
      <View style={styles.radarOverlay}>
        <View style={[styles.radarArea, styles.homeRadarArea]} />
        <View style={[styles.radarArea, styles.awayRadarArea]} />
      </View>
      
      {/* Data points and labels */}
      <View style={styles.radarStats}>
        {radarStats.map((stat, index) => {
          const angle = (index * 90 - 90) * (Math.PI / 180);
          const labelRadius = 75;
          const IconComponent = stat.icon;
          
          return (
            <View key={stat.label}>
              {/* Home team point */}
              <Animated.View 
                style={[
                  styles.radarPoint,
                  styles.homeRadarPoint,
                  {
                    left: center.x + Math.cos(angle) * ((stat.home / 100) * maxRadius) - 5,
                    top: center.y + Math.sin(angle) * ((stat.home / 100) * maxRadius) - 5,
                    opacity: animation,
                  }
                ]} 
              />
              
              {/* Away team point */}
              <Animated.View 
                style={[
                  styles.radarPoint,
                  styles.awayRadarPoint,
                  {
                    left: center.x + Math.cos(angle) * ((stat.away / 100) * maxRadius) - 5,
                    top: center.y + Math.sin(angle) * ((stat.away / 100) * maxRadius) - 5,
                    opacity: animation,
                  }
                ]} 
              />
              
              {/* Label with icon */}
              <View 
                style={[
                  styles.radarLabel,
                  {
                    left: center.x + Math.cos(angle) * labelRadius - 20,
                    top: center.y + Math.sin(angle) * labelRadius - 15,
                  }
                ]}
              >
                <IconComponent color="#22c55e" size={12} />
                <Text style={styles.radarLabelText}>{stat.label}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Simple Stat Row Component
const StatRow = ({ icon: IconComponent, title, homeValue, awayValue, unit = '', delay = 0 }: {
  icon: any;
  title: string;
  homeValue: number;
  awayValue: number;
  unit?: string;
  delay?: number;
}) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, [delay]);

  return (
    <Animated.View 
      style={[
        styles.statRow,
        {
          opacity: animation,
          transform: [{
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            })
          }]
        }
      ]}
    >
      <View style={styles.statHeader}>
        <View style={styles.statIconContainer}>
          <IconComponent color="#22c55e" size={16} />
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      
      <SimpleBarChart
        homeValue={homeValue}
        awayValue={awayValue}
        homeTeam={mockMatchStats.homeTeam}
        awayTeam={mockMatchStats.awayTeam}
        delay={delay + 200}
      />
    </Animated.View>
  );
};

export default function MatchStatsPage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'detailed'>('overview');
  const [headerAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(headerAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const overviewStats = [
    { icon: Activity, label: 'Possession', home: mockMatchStats.stats.possession.home, away: mockMatchStats.stats.possession.away, unit: '%' },
    { icon: Target, label: 'Shots', home: mockMatchStats.stats.shots.home, away: mockMatchStats.stats.shots.away },
    { icon: Crosshair, label: 'Shots on Target', home: mockMatchStats.stats.shotsOnTarget.home, away: mockMatchStats.stats.shotsOnTarget.away },
    { icon: TrendingUp, label: 'Passes', home: mockMatchStats.stats.passes.home, away: mockMatchStats.stats.passes.away },
  ];

  const detailedStats = [
    { icon: Shield, label: 'Fouls', home: mockMatchStats.stats.fouls.home, away: mockMatchStats.stats.fouls.away },
    { icon: Target, label: 'Offsides', home: mockMatchStats.stats.offsides.home, away: mockMatchStats.stats.offsides.away },
    { icon: Activity, label: 'Corner Kicks', home: mockMatchStats.stats.cornerKicks.home, away: mockMatchStats.stats.cornerKicks.away },
    { icon: Zap, label: 'Free Kicks', home: mockMatchStats.stats.freeKicks.home, away: mockMatchStats.stats.freeKicks.away },
    { icon: TrendingUp, label: 'Successful Passes', home: mockMatchStats.stats.successfulPasses.home, away: mockMatchStats.stats.successfulPasses.away },
    { icon: Activity, label: 'Crosses', home: mockMatchStats.stats.crosses.home, away: mockMatchStats.stats.crosses.away },
    { icon: Shield, label: 'Interceptions', home: mockMatchStats.stats.interceptions.home, away: mockMatchStats.stats.interceptions.away },
    { icon: Target, label: 'Tackles', home: mockMatchStats.stats.tackles.home, away: mockMatchStats.stats.tackles.away },
    { icon: Zap, label: 'Saves', home: mockMatchStats.stats.saves.home, away: mockMatchStats.stats.saves.away },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Geometric background elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View style={[styles.triangle, { top: 200, right: 80, transform: [{ rotate: '12deg' }] }]} />
        <View style={[styles.triangle, { bottom: 200, left: 100 }]} />
        
        <View style={[styles.circle, { top: 150, left: 120, width: 48, height: 48 }]} />
        <View style={[styles.circle, { bottom: 250, right: 100, width: 32, height: 32 }]} />
        <View style={[styles.circle, { top: 400, left: 80, width: 24, height: 24 }]} />
        
        <View style={[styles.rectangle, { top: 300, right: 40, width: 48, height: 32 }]} />
        <View style={[styles.rectangle, { bottom: 80, left: 200, width: 32, height: 48 }]} />
        
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: headerAnimation,
              transform: [{
                translateY: headerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                })
              }]
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#22c55e" size={20} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.headerIcon}>
              <Trophy color="#22c55e" size={16} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Match Statistics</Text>
              <Text style={styles.headerSubtitle}>Performance analysis</Text>
            </View>
          </View>
          <Badge style={styles.tournamentBadge}>
            {mockMatchStats.tournament}
          </Badge>
        </Animated.View>

        {/* Match Result Header */}
        <Animated.View 
          style={[
            styles.matchHeader,
            {
              opacity: headerAnimation,
              transform: [{
                scale: headerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                })
              }]
            }
          ]}
        >
          <View style={styles.teamSection}>
            <Text style={styles.teamName}>{mockMatchStats.homeTeam}</Text>
            <Text style={styles.score}>{mockMatchStats.homeScore}</Text>
          </View>
          
          <View style={styles.vsSection}>
            <Text style={styles.vsText}>VS</Text>
            <Text style={styles.matchDate}>{mockMatchStats.date}</Text>
          </View>
          
          <View style={styles.teamSection}>
            <Text style={styles.teamName}>{mockMatchStats.awayTeam}</Text>
            <Text style={styles.score}>{mockMatchStats.awayScore}</Text>
          </View>
        </Animated.View>

        {/* Team Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, { backgroundColor: '#22c55e' }]} />
            <Text style={styles.legendText}>{mockMatchStats.homeTeam}</Text>
          </View>
          <View style={styles.legendDivider} />
          <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, { backgroundColor: '#3b82f6' }]} />
            <Text style={styles.legendText}>{mockMatchStats.awayTeam}</Text>
          </View>
        </View>

        {/* Possession Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity color="#22c55e" size={18} />
            <Text style={styles.sectionTitle}>Ball Possession</Text>
          </View>
          <EnhancedPossessionCircle 
            homePercentage={mockMatchStats.stats.possession.home}
            awayPercentage={mockMatchStats.stats.possession.away}
          />
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
            onPress={() => setSelectedTab('overview')}
          >
            <Target color={selectedTab === 'overview' ? '#ffffff' : '#9ca3af'} size={16} />
            <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
              Overview
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'detailed' && styles.activeTab]}
            onPress={() => setSelectedTab('detailed')}
          >
            <Trophy color={selectedTab === 'detailed' ? '#ffffff' : '#9ca3af'} size={16} />
            <Text style={[styles.tabText, selectedTab === 'detailed' && styles.activeTabText]}>
              Detailed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          {(selectedTab === 'overview' ? overviewStats : detailedStats).map((stat, index) => (
            <StatRow
              key={stat.label}
              icon={stat.icon}
              title={stat.label}
              homeValue={stat.home}
              awayValue={stat.away}
              unit={stat.unit}
              delay={index * 100}
            />
          ))}
        </View>

        {/* Performance Radar */}
        {selectedTab === 'overview' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Users color="#22c55e" size={18} />
              <Text style={styles.sectionTitle}>Performance Radar</Text>
            </View>
            <ColoredRadarChart stats={mockMatchStats.stats} />
          </View>
        )}

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
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    lineHeight: 20,
  },
  headerSubtitle: {
    color: '#6b7280',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  tournamentBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 20,
  },
  teamSection: {
    alignItems: 'center',
    flex: 1,
  },
  teamName: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 8,
  },
  score: {
    color: '#22c55e',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  vsSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  vsText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  matchDate: {
    color: '#6b7280',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  legendDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    marginHorizontal: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
  },
  possessionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  possessionCircleWrapper: {
    position: 'relative',
    width: 160,
    height: 160,
  },
  outerRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  possessionDisplay: {
    alignItems: 'center',
  },
  possessionMainText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  possessionDividerLine: {
    width: 30,
    height: 2,
    backgroundColor: 'rgba(34, 197, 94, 0.5)',
    marginVertical: 8,
  },
  progressRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  homeProgressRing: {
    borderTopColor: '#22c55e',
    borderRightColor: '#22c55e',
  },
  awayProgressRing: {
    borderBottomColor: '#3b82f6',
    borderLeftColor: '#3b82f6',
  },
  floatingIndicator: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIndicator: {
    top: 10,
    right: 10,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  awayIndicator: {
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  awayIndicatorDot: {
    backgroundColor: '#3b82f6',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#22c55e',
  },
  tabText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  activeTabText: {
    color: '#ffffff',
  },
  statsContainer: {
    paddingHorizontal: 16,
    gap: 20,
  },
  statRow: {
    marginBottom: 4,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  barChartContainer: {
    paddingVertical: 8,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
  },
  leftBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 12,
  },
  rightBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 12,
  },
  centerDivider: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#22c55e',
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  homeBar: {
    backgroundColor: '#22c55e',
  },
  awayBar: {
    backgroundColor: '#3b82f6',
  },
  barValue: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    minWidth: 24,
    textAlign: 'center',
  },
  radarContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    height: 200,
  },
  radarBackground: {
    position: 'absolute',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radarRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  radarLine: {
    position: 'absolute',
    width: 120,
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  radarOverlay: {
    position: 'absolute',
    width: 160,
    height: 160,
  },
  radarArea: {
    position: 'absolute',
    width: 120,
    height: 120,
    left: 20,
    top: 20,
    borderRadius: 60,
  },
  homeRadarArea: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  awayRadarArea: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  radarStats: {
    width: 160,
    height: 160,
    position: 'relative',
  },
  radarPoint: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0a0a0a',
  },
  homeRadarPoint: {
    backgroundColor: '#22c55e',
  },
  awayRadarPoint: {
    backgroundColor: '#3b82f6',
  },
  radarLabel: {
    position: 'absolute',
    alignItems: 'center',
    gap: 2,
    width: 40,
  },
  radarLabelText: {
    color: '#9ca3af',
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 80,
  },
});