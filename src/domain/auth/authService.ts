import { authApi } from './authApi';
import { AuthCredentials, SignInRequest, SignUpRequest, User, GoogleSignInRequest } from './authTypes';

async function signIn({ email, password }: SignInRequest): Promise<AuthCredentials> {
  try {
    const authCredentialsAPI = await authApi.signIn({ email, password });

    const user: User = {
      uid: authCredentialsAPI.uid,
      email: authCredentialsAPI.email,
      displayName: authCredentialsAPI.displayName,
      photoURL: authCredentialsAPI.photoURL,
      emailVerified: authCredentialsAPI.emailVerified,
    };

    return {
      user,
      token: authCredentialsAPI.refreshToken,
      refreshToken: authCredentialsAPI.refreshToken,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Email ou senha inválidos');
  }
}

async function signUp({ email, password, displayName }: SignUpRequest): Promise<AuthCredentials> {
  try {
    const authCredentialsAPI = await authApi.signUp({ email, password, displayName });

    const user: User = {
      uid: authCredentialsAPI.uid,
      email: authCredentialsAPI.email,
      displayName: authCredentialsAPI.displayName,
      photoURL: authCredentialsAPI.photoURL,
      emailVerified: authCredentialsAPI.emailVerified,
    };

    return {
      user,
      token: authCredentialsAPI.refreshToken,
      refreshToken: authCredentialsAPI.refreshToken,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao criar conta');
  }
}

async function signInWithGoogle({ googleResponse }: GoogleSignInRequest): Promise<AuthCredentials> {
  try {
    const authCredentialsAPI = await authApi.signInWithGoogle({ googleResponse });

    const user: User = {
      uid: authCredentialsAPI.uid,
      email: authCredentialsAPI.email,
      displayName: authCredentialsAPI.displayName,
      photoURL: authCredentialsAPI.photoURL,
      emailVerified: authCredentialsAPI.emailVerified,
    };

    return {
      user,
      token: authCredentialsAPI.refreshToken,
      refreshToken: authCredentialsAPI.refreshToken,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao fazer login com Google');
  }
}

async function signOut(): Promise<void> {
  try {
    await authApi.signOut();
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao fazer logout');
  }
}

export const authService = {
  signIn,
  signUp,
  signInWithGoogle,
  signOut,
};
