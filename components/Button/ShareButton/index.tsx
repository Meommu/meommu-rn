// react
import { type PressableProps } from "react-native";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// svgs
import ShareButtonSvg from "@/assets/svgs/share.svg";

// styles
import { styles } from "./index.styles";

export function ShareButton({ style, ...props }: PressableProps) {
  return (
    <InteractionPressable containerStyle={styles.button} {...props}>
      <ShareButtonSvg />
    </InteractionPressable>
  );
}
