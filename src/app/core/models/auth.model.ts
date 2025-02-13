export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
