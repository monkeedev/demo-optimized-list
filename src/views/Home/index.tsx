import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "../../components";
import { StackScreens } from "../../router/constants";

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
        title="Default List"
        onPress={() => navigate(StackScreens.DefaultFlatList)}
      />
      <CustomButton
        title="Better List"
        onPress={() => navigate(StackScreens.OptimizedFlatList)}
      />
      <CustomButton
        title="Fully Optimized List"
        onPress={() => navigate(StackScreens.FlashList)}
      />
    </SafeAreaView>
  );
};
