import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { DefaultFlatListView, HomeView, OptimizedFlatListView } from "../views";

export const StackScreens = {
  Home: "Home",
  DefaultFlatList: "DefaultFlatList",
  OptimizedFlatList: "OptimizedFlatList",
} as const;

const MainStack = createNativeStackNavigator({
  initialRouteName: StackScreens.Home,
  screens: {
    [StackScreens.Home]: {
      screen: HomeView,
      options: {
        headerShown: false,
      },
    },
    [StackScreens.DefaultFlatList]: {
      screen: DefaultFlatListView,
      options: {
        title: "Default FlatList",
        headerBackButtonDisplayMode: "minimal",
      },
    },
    [StackScreens.OptimizedFlatList]: {
      screen: OptimizedFlatListView,
      options: {
        title: "Optimized FlatList",
        headerBackButtonDisplayMode: "minimal",
      },
    },
  },
});

export const MainNavigator = createStaticNavigation(MainStack);
