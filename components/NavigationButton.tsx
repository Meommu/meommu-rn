import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { size } from "../constants";

interface NavigationButtonProps extends TouchableOpacityProps {
  fontColor?: string;
  backgroundColor?: string;
  content?: string;
}

export function NavigationButton({
  backgroundColor = "#8579F1",
  fontColor = "white",
  content,
  ...props
}: NavigationButtonProps) {
  return (
    <TouchableOpacity {...props}>
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.buttonText, { color: fontColor }]}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: size.NAVIGATION_BUTTON_HEIGHT,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
  },
});
