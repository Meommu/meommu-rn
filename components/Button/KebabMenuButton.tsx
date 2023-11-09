// react
import { View, Pressable } from "react-native";
import type { PressableProps } from "react-native";

// svgs
import ThreeDotsVertical from "@/assets/svgs/three-dots-vertical.svg";

interface KebabMenuButtonProps extends PressableProps {}

export function KebabMenuButton({ ...props }: KebabMenuButtonProps) {
  return (
    <Pressable {...props}>
      <View
        style={{
          width: 20,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThreeDotsVertical />
      </View>
    </Pressable>
  );
}
