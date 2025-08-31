import { Animated } from 'react-native';

export interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  fouls: { home: number; away: number };
  offsides: { home: number; away: number };
  cornerKicks: { home: number; away: number };
  freeKicks: { home: number; away: number };
  passes: { home: number; away: number };
  successfulPasses: { home: number; away: number };
  crosses: { home: number; away: number };
  interceptions: { home: number; away: number };
  tackles: { home: number; away: number };
  saves: { home: number; away: number };
}

export interface MatchData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  tournament: string;
  stats: MatchStats;
}

export interface StatItem {
  icon: any;
  label: string;
  home: number;
  away: number;
  unit?: string;
}

export interface SimpleBarChartProps {
  homeValue: number;
  awayValue: number;
  homeTeam: string;
  awayTeam: string;
  maxValue?: number;
  delay?: number;
}

export interface PossessionCircleProps {
  homePercentage: number;
  awayPercentage: number;
}

export interface RadarChartProps {
  stats: MatchStats;
}

export interface StatRowProps {
  icon: any;
  title: string;
  homeValue: number;
  awayValue: number;
  unit?: string;
  delay?: number;
}

export interface MatchHeaderProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  tournament: string;
  animation: Animated.Value;
}

export interface TeamLegendProps {
  homeTeam: string;
  awayTeam: string;
}

export interface TabNavigationProps {
  selectedTab: 'overview' | 'detailed';
  onTabChange: (tab: 'overview' | 'detailed') => void;
}

export interface GeometricBackgroundProps {
  // no props needed for now
}