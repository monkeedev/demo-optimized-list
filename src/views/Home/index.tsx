import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "../../components";
import { StackScreens } from "../../router";

export const HomeView = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingHorizontal: 16,
      }}
    >
      <CustomButton
        title="Show default FlatList"
        onPress={() => navigate(StackScreens.DefaultFlatList)}
      />
      <CustomButton
        title="Show optimized FlatList"
        onPress={() => navigate(StackScreens.OptimizedFlatList)}
      />
    </SafeAreaView>
  );
};
