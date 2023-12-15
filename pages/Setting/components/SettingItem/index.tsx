// react
import { type PressableProps, Text } from "react-native";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";

// styles
import { styles } from "./index.styles";

interface SettingItemProps extends PressableProps {
  title: string;
}

export function SettingItem({ title, style, ...props }: SettingItemProps) {
  return (
    <InteractionPressable containerStyle={styles.button} {...props}>
      <Text style={styles.buttonText}>{title}</Text>

      <CaretRight />
    </InteractionPressable>
  );
}
