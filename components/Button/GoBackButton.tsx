// react
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// svgs
import CaretLeft from "@/assets/svgs/caret-left.svg";

interface GoBackButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  disable?: boolean;
}

export function GoBackButton({ onPress, disable = false }: GoBackButtonProps) {
  const navigation = useNavigation();

  const goBackButtonClickHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Pressable
      style={[styles.container, { opacity: disable ? 0 : 1 }]}
      onPress={onPress || goBackButtonClickHandler}
      disabled={disable}
    >
      <CaretLeft />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  caretImage: {
    width: 7,
    height: 14,
  },
});
