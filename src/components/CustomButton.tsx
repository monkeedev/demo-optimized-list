import { FC, memo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
};

export const CustomButton: FC<Props> = memo((props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={[
        styles.buttonContainer,
        props.backgroundColor && { backgroundColor: props.backgroundColor },
      ]}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#2196F3",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 4,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
