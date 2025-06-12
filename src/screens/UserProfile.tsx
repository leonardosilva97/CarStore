import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Screen } from "~/components/screen/Screen";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "~/context/authContext";

export function UserProfile() {
  const { user, signOut } = useAuth();

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
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Erro', 'Não foi possível fazer logout');
            }
          },
        },
      ]
    );
  };

  return (
    <Screen canGoBack title="Perfil" scrollable>
      <View className="flex-1">
     
        <View className="items-center mb-8 pt-8">
          <View className="w-24 h-24 bg-orange-500 rounded-full items-center justify-center mb-4">
            <Feather name="user" size={40} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            Perfil do Usuário
          </Text>
          <Text className="text-gray-600">
            Gerencie suas informações
          </Text>
        </View>

      
        <View className="gap-y-4 mb-8">
          <View className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <View className="flex-row items-center mb-2">
              <Feather name="user" size={20} color="#6B7280" />
              <Text className="text-sm font-medium text-gray-500 ml-2">Nome</Text>
            </View>
            <Text className="text-lg font-semibold text-gray-900">
              {user?.displayName || 'Usuário'}
            </Text>
          </View>

          <View className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <View className="flex-row items-center mb-2">
              <Feather name="mail" size={20} color="#6B7280" />
              <Text className="text-sm font-medium text-gray-500 ml-2">Email</Text>
            </View>
            <Text className="text-lg font-semibold text-gray-900">
              {user?.email || 'email@exemplo.com'}
            </Text>
          </View>
        </View>

    
        <View className="gap-y-4">
          <TouchableOpacity className="bg-gray-100 rounded-xl p-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Feather name="edit-3" size={20} color="#6B7280" />
              <Text className="text-lg font-medium text-gray-900 ml-3">
                Editar Perfil
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-100 rounded-xl p-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Feather name="settings" size={20} color="#6B7280" />
              <Text className="text-lg font-medium text-gray-900 ml-3">
                Configurações
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleSignOut}
            className="bg-red-50 rounded-xl p-4 flex-row items-center justify-between border border-red-200"
          >
            <View className="flex-row items-center">
              <Feather name="log-out" size={20} color="#EF4444" />
              <Text className="text-lg font-medium text-red-600 ml-3">
                Sair do App
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}
