import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./storageConfig";

type StorageAuthTokenProps = {
  token: string;
  refreshToken: string;
}

export async function storageAuthTokenSave({ token, refreshToken }: StorageAuthTokenProps) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refreshToken }));
}

export async function storageAuthTokenGet(): Promise<StorageAuthTokenProps | null> {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  const tokenData: StorageAuthTokenProps | null = response ? JSON.parse(response) : null;

  return tokenData;
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}