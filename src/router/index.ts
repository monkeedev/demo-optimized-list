import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { DefaultFlatListView, HomeView, OptimizedFlatListView } from "../views";
import { StackScreens } from "./constants";


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
