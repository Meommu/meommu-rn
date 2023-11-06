// react
import { useEffect } from "react";
import type { ViewStyle, ImageStyle, TextStyle } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import type { AnimatedStyleProp } from "react-native-reanimated";

declare global {
  type AnimatedHook = (
    isMount: boolean,
    duration: number
  ) => AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>;
}

export const FadeIn: AnimatedHook = (isMount, duration) => {
  const opacity = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration }),
    };
  });

  useEffect(() => {
    if (isMount) {
      opacity.value = 1;
    }

    return () => {
      opacity.value = 0;
    };
  }, [isMount]);

  return style;
};

export const FadeOut: AnimatedHook = (isMount, duration) => {
  const opacity = useSharedValue(1);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration }),
    };
  });

  useEffect(() => {
    if (!isMount) {
      opacity.value = 0;
    }

    return () => {
      opacity.value = 1;
    };
  }, [isMount]);

  return style;
};
