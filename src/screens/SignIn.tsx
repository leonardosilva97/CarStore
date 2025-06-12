import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextInput } from '../components/FormTextInput';
import { signinSchema, SigninFormData } from '../schemas/signin.schema';
import { Screen } from '~/components/screen/Screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider } from '~/components/Divider';
import { useAuth } from '~/context/authContext';
import { authService } from '~/domain/auth/authService';
import { useState } from 'react';
import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.EXPO_GOOGLE_CLIENT_ID,
});

export function LoginScreen() {
  const { signIn: contextSignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function signInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function handleGoogleSignIn() {
    try {
      setIsLoading(true);
      const googleResponse = await signInWithGoogle();

      if (googleResponse) {
        const credentials = await authService.signInWithGoogle({ googleResponse });
        await contextSignIn(credentials);
      }
    } catch (error: any) {
      Alert.alert('Erro no Login', error.message || 'Erro ao fazer login com Google');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const credentials = await authService.signIn({ email, password });
      await contextSignIn(credentials);
    } catch (error: any) {
      Alert.alert('Erro no Login', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const credentials = await authService.signUp({ email, password });
      await contextSignIn(credentials);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro no Cadastro', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: SigninFormData, isSignIn: boolean) => {
    if (isSignIn) {
      handleSignIn(data.email, data.password);
    } else {
      handleSignUp(data.email, data.password);
    }
  };

  return (
    <Screen>
      <View className=" flex-1 justify-center">
        <View className="mb-12 items-center">
          <View className="mb-8 h-20 w-20 items-center justify-center rounded-full bg-orange-500">
            <Text className="text-3xl font-bold text-white">C</Text>
          </View>

          <Text className="mb-2 text-2xl font-bold text-gray-900">Login</Text>
          <Text className="text-base text-gray-600">Bem Vindo ao CarStore</Text>
        </View>

        <View className="space-y-4">
          <FormTextInput
            name="email"
            control={control}
            placeholder="e-mail"
            icon="mail"
            autoCapitalize="none"
          />

          <FormTextInput
            name="password"
            control={control}
            placeholder="Password"
            icon="lock"
            secureTextEntry
          />

          <TouchableOpacity className="mt-2 self-center">
            <Text className="text-sm text-gray-600">Esqueci minha senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-6 rounded-xl bg-orange-500 py-4"
            onPress={handleSubmit((data) => onSubmit(data, true))}
            disabled={isLoading}>
            <Text className="text-center text-lg font-semibold text-white">
              {isLoading ? 'Entrando...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-6 rounded-xl border border-orange-500 py-4"
            onPress={handleSubmit((data) => onSubmit(data, false))}
            disabled={isLoading}>
            <Text className="text-center text-lg font-semibold text-orange-500">
              {isLoading ? 'Criando...' : 'Criar Conta'}
            </Text>
          </TouchableOpacity>

          <Divider />

          <View className="w-full items-center">
            <Text className="mb-4 text-sm text-gray-600">Entrar com google</Text>
            <View className="flex-row gap-x-4">
              <TouchableOpacity
                onPress={handleGoogleSignIn}
                className="h-14 w-14 items-center justify-center rounded-full bg-zinc-100 shadow-md">
                <MaterialCommunityIcons name="google" size={26} color="#EA4335" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}
