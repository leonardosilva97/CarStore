import { useMutation } from '@tanstack/react-query';
import { authService } from '../authService';
import { AuthCredentials, SignInRequest } from '../authTypes';

interface MutationsOptions<T> {
  onError?: (message: string) => void;
  onSuccess?: (data: T) => void;
}

export function useAuthSignIn(options?: MutationsOptions<AuthCredentials>) {
  const mutation = useMutation<AuthCredentials, Error, SignInRequest>({
    mutationFn: (variables: SignInRequest) => authService.signIn(variables),
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
    signIn: (variables: SignInRequest) => mutation.mutate(variables),
    error: mutation.error,
  };
}