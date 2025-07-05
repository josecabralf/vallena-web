import { createContext } from 'react';

interface AuthContextType {
  logged: boolean;
  setLogged: (logged: boolean) => void;
  loading: boolean;
  userName: string;
  setUserName: (userName: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
