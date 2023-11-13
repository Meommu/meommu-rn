// react
import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { PressableProps } from "react-native";

// svgs
import CaretLeft from "@/assets/svgs/caret-left.svg";

export function GoBackButton({ style, onPress, ...props }: PressableProps) {
  const navigation = useNavigation();

  const handleGoBackButtonClick = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.hitBox}
        onPress={onPress || handleGoBackButtonClick}
        {...props}
      >
        <CaretLeft />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
  },

  hitBox: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  caretImage: {
    width: 7,
    height: 14,
  },
});
