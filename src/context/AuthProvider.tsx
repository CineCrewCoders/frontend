import { User } from '@firebase/auth-types';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

interface AuthState {
  userID: string | null;
  logoutLocal: () => Promise<void>;
  loginLocal: (user: User) => Promise<void>;
}

export const AuthContext = createContext<AuthState>({} as AuthState);

interface Props {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
  const [userID, setUserID] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem('userID');
    if (!uid) {
      setUserID(null);
      return;
    }
    setUserID(uid);
  }, []);

  const loginLocal = async (user: User) => {
    localStorage.setItem('userID', user.uid);
    setUserID(user.uid);
    navigate("/", { replace: true });
  }

  const logoutLocal = async () => {
    localStorage.removeItem('userID');
    setUserID(null);
    navigate("/login", { replace: true });
  };

  const value = { userID, logoutLocal, loginLocal }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};