import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '~/context/authContext';

interface CustomBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToHome: () => void;
  onNavigateToProfile: () => void;
}

export function CustomBottomSheet({
  isOpen,
  onClose,
  onNavigateToHome,
  onNavigateToProfile
}: CustomBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { user, signOut } = useAuth();

  // Variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1 && isOpen) {
      onClose();
    }
  }, [onClose, isOpen]);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      'Sair do App',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              onClose();
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Erro', 'Não foi possível fazer logout');
            }
          },
        },
      ]
    );
  };

  const handleHomePress = () => {
    onNavigateToHome();
    onClose();
  };

  const handleProfilePress = () => {
    onNavigateToProfile();
    onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: '#FFFFFF' }}
      handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}
    >
      <BottomSheetView className="flex-1 px-6 py-4">
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center">
         
            <View>
              <Text className="text-xl font-bold text-gray-900">CarStore</Text>
              <Text className="text-sm text-gray-600">Menu</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleClosePress}
            className="w-8 h-8 items-center justify-center rounded-full bg-gray-100"
          >
            <Feather name="x" size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View className="gap-y-3">
          {/* Home */}
          <TouchableOpacity
            onPress={handleHomePress}
            className="bg-gray-50 rounded-xl p-4 flex-row items-center border border-gray-200"
          >
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
              <Feather name="home" size={20} color="#EA580C" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">Home</Text>
              <Text className="text-sm text-gray-600">Página inicial</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* User Profile */}
          <TouchableOpacity
            onPress={handleProfilePress}
            className="bg-gray-50 rounded-xl p-4 flex-row items-center border border-gray-200"
          >
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Feather name="user" size={20} color="#2563EB" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">Perfil</Text>
              <Text className="text-sm text-gray-600">
                {user?.email || 'Suas informações'}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* Sign Out */}
          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-red-50 rounded-xl p-4 flex-row items-center border border-red-200"
          >
            <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-3">
              <Feather name="log-out" size={20} color="#DC2626" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-red-600">Sair</Text>
              <Text className="text-sm text-red-500">Desconectar do app</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
