export interface Pool {
  id: string;
  title: string;
  code: string;
  createdAt: string;
  ownerId: string | null;
  owner?: User;
  participants?: Participant[];
  _count?: {
    participants: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  googleId?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
}

export interface Participant {
  id: string;
  userId: string;
  poolId: string;
  user: User;
}

export interface Game {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guesses?: Guess[];
}

export interface Guess {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  createdAt: string;
  gameId: string;
  participantId: string;
  participant?: Participant;
}

export interface CreatePoolRequest {
  title: string;
}

export interface CreatePoolResponse {
  code: string;
}

export interface JoinPoolRequest {
  code: string;
}

export interface CreateGuessRequest {
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface AuthRequest {
  access_token: string;
}

export interface AuthResponse {
  token: string;
}
