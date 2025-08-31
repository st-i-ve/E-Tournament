export interface GameStats {
  totalGoals: number;
  tournaments: number;
  winRate: number;
  gamesPlayed: number;
  gamesWon: number;
  shotAccuracy: number;
  passAccuracy: number;
  currentStreak: number;
  bestStreak: number;
}

export interface FavoriteGame {
  name: string;
  hoursPlayed: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Pro';
}

export interface PlayStyle {
  position: string;
  strengths: string[];
  weaknesses: string[];
  preferredFormation: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: any; // lucide icon component
}

export interface FriendItem {
  id: string;
  displayName: string;
  username: string;
  isOnline: boolean;
  isMutual: boolean;
}

export interface PeerRatings {
  overall: number;
  teamwork: number;
  sportsmanship: number;
  skill: number;
  communication: number;
  totalRatings: number;
}

export interface FriendProfile {
  id: string;
  displayName: string;
  username: string;
  isOnline: boolean;
  teamName: string;
  profilePicture?: string | null;
  gameStats: GameStats;
  favoriteGames: FavoriteGame[];
  playStyle: PlayStyle;
  achievements: Achievement[];
  friends: FriendItem[];
  peerRatings: PeerRatings;
}

export interface FriendProfileRouteParams {
  friendId: string;
  friendData?: string; // stringified FriendProfile for passing via router
}