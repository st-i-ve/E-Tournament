
// Mock data for the application
export interface User {
  id: string;
  username: string;
  teamName: string;
  email: string;
  totalGoals: number;
  totalMatches: number;
  winRate: number;
}

export interface Tournament {
  id: string;
  name: string;
  type: 'league' | 'knockout';
  status: 'active' | 'completed' | 'upcoming';
  adminId: string;
  participants: string[];
  maxParticipants: number;
  userPosition?: number;
  totalParticipants: number;
  matchDays: string[];
  createdAt: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'completed' | 'upcoming' | 'live';
  scheduledDate: string;
}

// Mock current user
export const currentUser: User = {
  id: 'user-1',
  username: 'SkyWalker99',
  teamName: 'Thunder Bolts FC',
  email: 'skywalker@email.com',
  totalGoals: 45,
  totalMatches: 23,
  winRate: 73.9
};

// Mock tournaments
export const mockTournaments: Tournament[] = [
  {
    id: 'tour-1',
    name: 'Champions Elite League',
    type: 'league',
    status: 'active',
    adminId: 'user-2',
    participants: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6'],
    maxParticipants: 12,
    userPosition: 2,
    totalParticipants: 6,
    matchDays: ['monday', 'wednesday', 'friday'],
    createdAt: '2024-01-15'
  },
  {
    id: 'tour-2',
    name: 'Weekend Warriors Cup',
    type: 'knockout',
    status: 'active',
    adminId: 'user-1',
    participants: ['user-1', 'user-7', 'user-8', 'user-9'],
    maxParticipants: 8,
    userPosition: 1,
    totalParticipants: 4,
    matchDays: ['saturday', 'sunday'],
    createdAt: '2024-02-01'
  },
  {
    id: 'tour-3',
    name: 'Midweek Madness',
    type: 'league',
    status: 'active',
    adminId: 'user-3',
    participants: ['user-1', 'user-3', 'user-10'],
    maxParticipants: 6,
    userPosition: 3,
    totalParticipants: 3,
    matchDays: ['tuesday', 'thursday'],
    createdAt: '2024-02-10'
  }
];

// Mock recent matches
export const recentMatches: Match[] = [
  {
    id: 'match-1',
    tournamentId: 'tour-1',
    homeTeam: 'Thunder Bolts FC',
    awayTeam: 'Phoenix Rising',
    homeScore: 3,
    awayScore: 1,
    status: 'completed',
    scheduledDate: '2024-06-12'
  },
  {
    id: 'match-2',
    tournamentId: 'tour-2',
    homeTeam: 'Desert Eagles',
    awayTeam: 'Thunder Bolts FC',
    homeScore: 0,
    awayScore: 2,
    status: 'completed',
    scheduledDate: '2024-06-10'
  },
  {
    id: 'match-3',
    tournamentId: 'tour-1',
    homeTeam: 'Thunder Bolts FC',
    awayTeam: 'Lightning Strikes',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2024-06-16'
  }
];
