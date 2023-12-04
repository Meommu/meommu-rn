// react
import { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

// svgs
import PopoverTap from "@/assets/svgs/popover-tap.svg";

// styles
import { styles } from "./index.styles";

interface PopoverProps {
  id: string;
  content: string;
}

const UP = 8;
const DOWN = 0;

export function Popover({ id, content }: PopoverProps) {
  const [isShow, setIsShow] = useState(false);
  const sv = useSharedValue(DOWN);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -sv.value }],
  }));

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(sv.value === UP ? DOWN : UP, {
        duration: 600,
        easing: {
          factory: () => {
            return sv.value < (DOWN + UP) / 2
              ? Easing.out(Easing.bezierFn(0.42, -0.68, 0.96, 0.6))
              : Easing.bounce;
          },
        },
      }),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(`popover-${id}`).then((v) => {
      if (v === "clicked") {
        return;
      }

      setIsShow(true);
    });
  }, []);

  const handlePopoverClick = useCallback(async () => {
    await AsyncStorage.setItem(`popover-${id}`, "clicked");

    setIsShow(false);
  }, []);

  if (!isShow) {
    return null;
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable onPress={handlePopoverClick} style={styles.container}>
        <Text style={styles.contentText}>{content}</Text>

        <View style={styles.tabLayout}>
          <PopoverTap />
        </View>
      </Pressable>
    </Animated.View>
  );
}
