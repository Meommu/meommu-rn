// react
import { type PressableProps } from "react-native";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// svgs
import GearSix from "@/assets/svgs/gear-six.svg";

// styles
import { styles } from "./index.styles";

export function SettingButton({ style, ...props }: PressableProps) {
  return (
    <InteractionPressable containerStyle={styles.button} {...props}>
      <GearSix />
    </InteractionPressable>
  );
}
