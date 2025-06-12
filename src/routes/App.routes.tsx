import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";
import { UserProfile } from "../screens/UserProfile";
import { CustomTabBar } from "./CustomBottomTabs";
import { Model } from "../screens/Model";

export type AppRoutes = {
  Home: undefined;
  UserProfile: undefined;
  Model: {
    brandCode: string;
    brandName: string;
  };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Screen name="Home" component={Home} />
      <Screen name="UserProfile" component={UserProfile} />
      <Screen name="Model" component={Model} options={{ tabBarButton: () => null }} />
    </Navigator>
  );
}
