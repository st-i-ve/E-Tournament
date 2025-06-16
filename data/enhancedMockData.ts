
export interface User {
  id: string;
  username: string;
  email: string;
  teamName: string;
  teamColor: string;
  profilePicture?: string;
  totalGoals: number;
  totalMatches: number;
  winRate: number;
  totalAssists: number;
  cleanSheets: number;
}

export interface Tournament {
  id: string;
  name: string;
  type: 'league' | 'knockout';
  status: 'active' | 'completed' | 'upcoming';
  totalParticipants: number;
  maxParticipants: number;
  adminId: string;
  participants: string[];
  userPosition?: number;
  matchDays: string[];
  startDate: string;
  endDate?: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'upcoming' | 'completed' | 'live';
  scheduledDate: string;
  matchday?: number;
}

export const currentUser: User = {
  id: '1',
  username: 'footballer23',
  email: 'footballer23@gmail.com',
  teamName: 'FC Barcelona',
  teamColor: '#004D98',
  profilePicture: '⚽',
  totalGoals: 24,
  totalMatches: 18,
  winRate: 72,
  totalAssists: 8,
  cleanSheets: 6
};

export const mockUsers: User[] = [
  currentUser,
  {
    id: '2',
    username: 'striker_pro',
    email: 'striker@gmail.com',
    teamName: 'Real Madrid',
    teamColor: '#FEBE10',
    profilePicture: '⚽',
    totalGoals: 28,
    totalMatches: 20,
    winRate: 85,
    totalAssists: 5,
    cleanSheets: 0
  },
  {
    id: '3',
    username: 'midfield_master',
    email: 'midfield@gmail.com',
    teamName: 'Manchester City',
    teamColor: '#6CABDD',
    profilePicture: '⚽',
    totalGoals: 15,
    totalMatches: 18,
    winRate: 67,
    totalAssists: 12,
    cleanSheets: 0
  },
  {
    id: '4',
    username: 'goal_keeper',
    email: 'keeper@gmail.com',
    teamName: 'Liverpool',
    teamColor: '#C8102E',
    profilePicture: '🥅',
    totalGoals: 2,
    totalMatches: 19,
    winRate: 74,
    totalAssists: 1,
    cleanSheets: 12
  },
  {
    id: '5',
    username: 'defense_king',
    email: 'defense@gmail.com',
    teamName: 'Arsenal',
    teamColor: '#EF0107',
    profilePicture: '🛡️',
    totalGoals: 8,
    totalMatches: 17,
    winRate: 65,
    totalAssists: 4,
    cleanSheets: 8
  },
  {
    id: '6',
    username: 'chelsea_fan',
    email: 'chelsea@gmail.com',
    teamName: 'Chelsea',
    teamColor: '#034694',
    profilePicture: '⚽',
    totalGoals: 18,
    totalMatches: 16,
    winRate: 75,
    totalAssists: 7,
    cleanSheets: 3
  },
  {
    id: '7',
    username: 'spurs_player',
    email: 'spurs@gmail.com',
    teamName: 'Tottenham',
    teamColor: '#132257',
    profilePicture: '⚽',
    totalGoals: 22,
    totalMatches: 18,
    winRate: 61,
    totalAssists: 9,
    cleanSheets: 2
  },
  {
    id: '8',
    username: 'united_star',
    email: 'united@gmail.com',
    teamName: 'Manchester United',
    teamColor: '#DA020E',
    profilePicture: '⚽',
    totalGoals: 16,
    totalMatches: 17,
    winRate: 71,
    totalAssists: 6,
    cleanSheets: 4
  }
];

export const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Premier League Champions',
    type: 'league',
    status: 'active',
    totalParticipants: 8,
    maxParticipants: 12,
    adminId: '1',
    participants: ['1', '2', '3', '4', '5', '6', '7', '8'],
    userPosition: 2,
    matchDays: ['Monday', 'Wednesday', 'Friday'],
    startDate: '2025-01-15',
  },
  {
    id: '2',
    name: 'Weekend Warriors Cup',
    type: 'knockout',
    status: 'active',
    totalParticipants: 6,
    maxParticipants: 8,
    adminId: '2',
    participants: ['1', '2', '3', '4', '6', '7'],
    userPosition: 1,
    matchDays: ['Saturday', 'Sunday'],
    startDate: '2025-02-01',
  },
  {
    id: '3',
    name: 'Friday Night League',
    type: 'league',
    status: 'active',
    totalParticipants: 6,
    maxParticipants: 10,
    adminId: '3',
    participants: ['1', '3', '4', '5', '7', '8'],
    userPosition: 4,
    matchDays: ['Friday'],
    startDate: '2025-01-20',
  },
  {
    id: '4',
    name: 'Champions Cup',
    type: 'knockout',
    status: 'active',
    totalParticipants: 8,
    maxParticipants: 16,
    adminId: '4',
    participants: ['1', '2', '3', '4', '5', '6', '7', '8'],
    userPosition: 3,
    matchDays: ['Tuesday', 'Thursday'],
    startDate: '2025-03-01',
  }
];

export const mockMatches: Match[] = [
  // Completed matches
  {
    id: '1',
    tournamentId: '1',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Real Madrid',
    homeScore: 3,
    awayScore: 1,
    status: 'completed',
    scheduledDate: '2025-05-10',
    matchday: 5
  },
  {
    id: '2',
    tournamentId: '2',
    homeTeam: 'Manchester City',
    awayTeam: 'FC Barcelona',
    homeScore: 1,
    awayScore: 2,
    status: 'completed',
    scheduledDate: '2025-05-08',
    matchday: 3
  },
  {
    id: '3',
    tournamentId: '3',
    homeTeam: 'Arsenal',
    awayTeam: 'FC Barcelona',
    homeScore: 1,
    awayScore: 3,
    status: 'completed',
    scheduledDate: '2025-05-05',
    matchday: 2
  },
  {
    id: '4',
    tournamentId: '4',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Chelsea',
    homeScore: 2,
    awayScore: 1,
    status: 'completed',
    scheduledDate: '2025-05-12',
    matchday: 1
  },

  // Upcoming matches - June 2025
  {
    id: '5',
    tournamentId: '1',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Liverpool',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-16',
    matchday: 6
  },
  {
    id: '6',
    tournamentId: '2',
    homeTeam: 'Tottenham',
    awayTeam: 'FC Barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-16',
    matchday: 4
  },
  {
    id: '7',
    tournamentId: '3',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Manchester United',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-18',
    matchday: 5
  },
  {
    id: '8',
    tournamentId: '1',
    homeTeam: 'Chelsea',
    awayTeam: 'FC Barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-20',
    matchday: 7
  },
  {
    id: '9',
    tournamentId: '4',
    homeTeam: 'Arsenal',
    awayTeam: 'FC Barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-22',
    matchday: 2
  },
  {
    id: '10',
    tournamentId: '2',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Manchester City',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-25',
    matchday: 5
  },
  {
    id: '11',
    tournamentId: '3',
    homeTeam: 'Liverpool',
    awayTeam: 'FC Barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-28',
    matchday: 6
  },
  {
    id: '12',
    tournamentId: '1',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Tottenham',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-30',
    matchday: 8
  },

  // July 2025 matches
  {
    id: '13',
    tournamentId: '4',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Real Madrid',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-07-02',
    matchday: 3
  },
  {
    id: '14',
    tournamentId: '2',
    homeTeam: 'Manchester United',
    awayTeam: 'FC Barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-07-05',
    matchday: 6
  },
  {
    id: '15',
    tournamentId: '1',
    homeTeam: 'Arsenal',
    awayTeam: 'FC Barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-07-08',
    matchday: 9
  },
  {
    id: '16',
    tournamentId: '3',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Chelsea',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-07-12',
    matchday: 7
  },
  {
    id: '17',
    tournamentId: '4',
    homeTeam: 'Liverpool',
    awayTeam: 'FC Barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-07-15',
    matchday: 4
  },
  {
    id: '18',
    tournamentId: '1',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Manchester United',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-07-18',
    matchday: 10
  },
  {
    id: '19',
    tournamentId: '2',
    homeTeam: 'Chelsea',
    awayTeam: 'FC Barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-07-22',
    matchday: 7
  },
  {
    id: '20',
    tournamentId: '3',
    homeTeam: 'Tottenham',
    awayTeam: 'FC Barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-07-25',
    matchday: 8
  },

  // Some matches on the same day to test multiple matches functionality
  {
    id: '21',
    tournamentId: '1',
    homeTeam: 'Real Madrid',
    awayTeam: 'Arsenal',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-16',
    matchday: 6
  },
  {
    id: '22',
    tournamentId: '3',
    homeTeam: 'Manchester City',
    awayTeam: 'Chelsea',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-20',
    matchday: 5
  },
  {
    id: '23',
    tournamentId: '4',
    homeTeam: 'Liverpool',
    awayTeam: 'Tottenham',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledDate: '2025-06-22',
    matchday: 2
  }
];

export const recentMatches: Match[] = mockMatches.slice(0, 4);
