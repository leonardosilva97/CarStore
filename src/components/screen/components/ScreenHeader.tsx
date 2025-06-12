import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

interface Props {
  canGoBack?: boolean;
  title?: string;
}

export function ScreenHeader({ canGoBack, title }: Props) {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between mb-6">
      {canGoBack && (
        <TouchableOpacity
          onPress={navigation.goBack}
          className="flex-row items-center">
          <Feather name="arrow-left" size={30} color="black" />
          {!title && (
            <Text className="text-base font-semibold text-blue-600 ml-2">
              Voltar
            </Text>
          )}
        </TouchableOpacity>
      )}
      {title && (
        <Text className="text-2xl font-bold text-orange-500 capitalize">{title}</Text>
      )}
      {title && <View className="w-5 h-5" />}
    </View>
  );
}
