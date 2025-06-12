import { Text, View } from "react-native";

export function Divider() {
  return (
    <View className="flex-row items-center my-6">
      <View className="flex-1 h-px bg-gray-200" />
      <Text className="mx-4 text-gray-500 text-sm">Ou</Text>
      <View className="flex-1 h-px bg-gray-200" />
    </View>
  );
}
