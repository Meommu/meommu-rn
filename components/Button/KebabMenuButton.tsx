// react
import { View, Pressable } from "react-native";
import type { PressableProps } from "react-native";

// svgs
import ThreeDotsVertical from "@/assets/svgs/three-dots-vertical.svg";

interface KebabMenuButtonProps extends PressableProps {
  fill?: string;
}

export function KebabMenuButton({
  fill = "#DEE2E6",
  ...props
}: KebabMenuButtonProps) {
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
        <ThreeDotsVertical fill={fill} />
      </View>
    </Pressable>
  );
}
