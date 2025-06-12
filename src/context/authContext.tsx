import { useState, useEffect, createContext, ReactNode, useContext } from "react";
import auth from '@react-native-firebase/auth';

import { User, AuthCredentials } from "../domain/auth/authTypes";

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "../storage/storageUser";

import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from "../storage/storageToken";

export type AuthContextDataProps = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function signIn(credentials: AuthCredentials) {
    try {
      setIsLoading(true);

     
      await storageUserSave(credentials.user);
      await storageAuthTokenSave({
        token: credentials.token,
        refreshToken: credentials.refreshToken,
      });

      
      setUser(credentials.user);
      setToken(credentials.token);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);

      
      await auth().signOut();

      
      await storageUserRemove();
      await storageAuthTokenRemove();

     
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoading(true);

      const userLogged = await storageUserGet();
      const tokenData = await storageAuthTokenGet();

      if (userLogged && tokenData?.token) {
        setUser(userLogged);
        setToken(tokenData.token);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setToken(null);
        await storageUserRemove();
        await storageAuthTokenRemove();
      }
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthContextProvider');
  }

  return context;
}