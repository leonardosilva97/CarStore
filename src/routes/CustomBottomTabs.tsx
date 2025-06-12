import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { CustomBottomSheet } from "~/components/CustomBottomSheet";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const excludedRouteNames = ["UserProfile", "Model"];
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const isViewHideRoute =
    state.routes[state.index]?.name !== "Home"; 
  if (isViewHideRoute) {
    return null;
  }

  const handleNavigateToHome = () => {
    navigation.navigate("Home");
  };

  const handleNavigateToProfile = () => {
    navigation.navigate("UserProfile");
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <View className="flex-row border-t border-gray-200 bg-white items-center"
        style={{ paddingBottom: 20, height: 72 }}
      >
        {state.routes.map((route: any, index: number) => {
          if (excludedRouteNames.includes(route.name)) {
            return null; 
          }

          const isFocused = state.index === index;

          let iconName: keyof typeof Feather.glyphMap = "home";
          if (route.name === "Home") {
            iconName = "home";
          }

          return (
            <TouchableOpacity
              key={route.name}
              onPress={() => {
                if (!isFocused) {
                  navigation.navigate(route.name);
                }
              }}
              className="flex-1 h-full items-center justify-center"
            >
              <View className={`items-center justify-center pb-2 ${
                isFocused ? 'border-b-4 border-orange-500' : ''
              }`}>
                <Feather
                  name={iconName}
                  size={24}
                  color={isFocused ? "#EA580C" : "#6B7280"}
                />
                <Text className={`text-xs mt-1 ${
                  isFocused ? 'text-orange-600 font-semibold' : 'text-gray-600'
                }`}>
                  {route.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

     
        <TouchableOpacity
          onPress={handleOpenBottomSheet}
          className="flex-1 h-full items-center justify-center"
        >
          <View className="items-center justify-center pb-2">
            <Feather
              name="menu"
              size={24}
              color="#6B7280"
            />
            <Text className="text-xs mt-1 text-gray-600">
              Menu
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <CustomBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToProfile={handleNavigateToProfile}
      />
    </>
  );
}