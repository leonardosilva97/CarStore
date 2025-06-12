import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "~/domain/auth/authTypes";

import { USER_STORAGE } from "./storageConfig";

export async function storageUserSave(user: User) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet(): Promise<User | null> {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: User | null = storage ? JSON.parse(storage) : null;

  return user;
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE);
}