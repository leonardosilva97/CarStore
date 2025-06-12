
export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface AuthCredentials {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthCredentialsAPI {
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime: number;
    lastSignInTime: number;
  };
  multiFactor: {
    enrolledFactors: any[];
  };
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: any[];
  providerId: string;
  refreshToken: string;
  tenantId: string | null;
  uid: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  displayName?: string;
}

export interface GoogleSignInResponse {
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  };
  scopes: string[];
  idToken: string | null;
  serverAuthCode: string | null;
}

export interface GoogleSignInRequest {
  googleResponse: GoogleSignInResponse;
}
