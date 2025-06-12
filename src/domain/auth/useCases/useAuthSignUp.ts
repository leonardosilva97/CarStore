import { useMutation } from '@tanstack/react-query';
import { authService } from '../authService';
import { AuthCredentials, SignUpRequest } from '../authTypes';

interface MutationsOptions<T> {
  onError?: (message: string) => void;
  onSuccess?: (data: T) => void;
}

export function useAuthSignUp(options?: MutationsOptions<AuthCredentials>) {
  const mutation = useMutation<AuthCredentials, Error, SignUpRequest>({
    mutationFn: (variables: SignUpRequest) => authService.signUp(variables),
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
    signUp: (variables: SignUpRequest) => mutation.mutate(variables),
    error: mutation.error,
  };
}

export function useAuthSignOut(options?: { onSuccess?: () => void; onError?: (message: string) => void }) {
  const mutation = useMutation<void, Error, void>({
    mutationFn: () => authService.signOut(),
    retry: false,
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  return {
    isLoading: mutation.isPending,
    signOut: () => mutation.mutate(),
    error: mutation.error,
  };
}
