export interface User {
    email: string;
  }
  
  export interface Credentials {
    email: string;
    password: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    authError: string | null;
    setUser: (value: User | null) => void; 
    setAuthError: (value: string | null) => void;
    login: (credentials: Credentials) => Promise<void>;
    signup: (credentials: Credentials) => Promise<void>;
    logout: () => void;
  }