import { useMutation } from '@tanstack/react-query';
import { authService } from '../authService';
import { AuthCredentials, GoogleSignInRequest } from '../authTypes';

interface MutationsOptions<T> {
  onError?: (message: string) => void;
  onSuccess?: (data: T) => void;
}

export function useAuthGoogleSignIn(options?: MutationsOptions<AuthCredentials>) {
  const mutation = useMutation<AuthCredentials, Error, GoogleSignInRequest>({
    mutationFn: (variables: GoogleSignInRequest) => authService.signInWithGoogle(variables),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: authCredentials => {
      if (options?.onSuccess) {
        options.onSuccess(authCredentials);
      }
    },
  });

  return {
    isLoading: mutation.isPending,
    signInWithGoogle: (variables: GoogleSignInRequest) => mutation.mutate(variables),
    error: mutation.error,
  };
}
