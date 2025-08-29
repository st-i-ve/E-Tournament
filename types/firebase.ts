// firebase schema types based on readme.txt specifications
// these interfaces match the firestore collections structure

export interface User {
  id: string;
  username: string;
  userCode: string; // unique 6-digit code for friend requests
  email: string;
  isOnline: boolean;
  lastSeen: Date;
  friends: string[]; // array of user IDs
  incomingFriendRequests: string[]; // array of user IDs
  outgoingFriendRequests: string[]; // array of user IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface GameInvite {
  id: string;
  senderId: string;
  receiverId: string;
  gameCode: string; // room code for the game
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'expired';
  createdAt: Date;
  expiresAt: Date;
  expiryMinutes: number; // default 7 minutes
  revealed: boolean; // whether game code has been revealed to receiver
}

// extended user interface for ui display
export interface FriendUser extends User {
  displayName: string;
  avatar?: string;
  gameStatus?: 'available' | 'in-game' | 'away';
}

// notification types for the optional notifications collection
export interface Notification {
  id: string;
  userId: string;
  type: 'friend_request' | 'game_invite' | 'friend_accepted' | 'invite_expired';
  title: string;
  message: string;
  read: boolean;
  relatedId?: string; // id of related friend request or game invite
  createdAt: Date;
}

// ui state types for components
export interface FriendListItem {
  user: FriendUser;
  canInvite: boolean;
  lastActivity?: string;
}

export interface GameInviteWithUser extends GameInvite {
  senderUser: FriendUser;
  receiverUser: FriendUser;
  timeRemaining?: number; // milliseconds until expiry
  isExpired: boolean;
}

export interface FriendRequestWithUser extends FriendRequest {
  senderUser: FriendUser;
  receiverUser: FriendUser;
}