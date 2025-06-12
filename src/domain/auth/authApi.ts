import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, updateProfile, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { AuthCredentialsAPI, SignInRequest, SignUpRequest, GoogleSignInRequest } from './authTypes';

async function signIn({ email, password }: SignInRequest): Promise<AuthCredentialsAPI> {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    return {
      displayName: user.displayName,
      email: user.email!,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      metadata: {
        creationTime: user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : Date.now(),
        lastSignInTime: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).getTime() : Date.now(),
      },
      multiFactor: {
        enrolledFactors: [],
      },
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerData: user.providerData,
      providerId: user.providerId,
      refreshToken: token,
      tenantId: null,
      uid: user.uid,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao fazer login');
  }
}

async function signUp({ email, password, displayName }: SignUpRequest): Promise<AuthCredentialsAPI> {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

 
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    const token = await user.getIdToken();

    return {
      displayName: user.displayName || displayName || null,
      email: user.email!,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      metadata: {
        creationTime: user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : Date.now(),
        lastSignInTime: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).getTime() : Date.now(),
      },
      multiFactor: {
        enrolledFactors: [],
      },
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerData: user.providerData,
      providerId: user.providerId,
      refreshToken: token,
      tenantId: null,
      uid: user.uid,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao criar conta');
  }
}

async function signInWithGoogle({ googleResponse }: GoogleSignInRequest): Promise<AuthCredentialsAPI> {
  try {
    const auth = getAuth();

 
    if (!googleResponse.idToken) {
      throw new Error('Token do Google não encontrado');
    }

  
    const googleCredential = GoogleAuthProvider.credential(googleResponse.idToken);

  
    const userCredential = await signInWithCredential(auth, googleCredential);
    const user = userCredential.user;
    const token = await user.getIdToken();

    return {
      displayName: user.displayName || googleResponse.user.name || null,
      email: user.email!,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      metadata: {
        creationTime: user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : Date.now(),
        lastSignInTime: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).getTime() : Date.now(),
      },
      multiFactor: {
        enrolledFactors: [],
      },
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL || googleResponse.user.photo || null,
      providerData: user.providerData,
      providerId: user.providerId,
      refreshToken: token,
      tenantId: null,
      uid: user.uid,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao fazer login com Google');
  }
}

async function signOut(): Promise<void> {
  try {
    const auth = getAuth();
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao fazer logout');
  }
}

export const authApi = {
  signIn,
  signUp,
  signInWithGoogle,
  signOut,
};