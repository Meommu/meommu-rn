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
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <ThreeDotsVertical />
      </View>
    </Pressable>
  );
}
