// react
import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

declare global {
  type AnimatedHook = (
    /**
     * 컴포넌트 마운트/언마운트를 결정하는 상태
     */
    isMount: boolean,

    /**
     * 애니메이션 지속시간 (ms)
     */
    duration: number
  ) => ReturnType<typeof useAnimatedStyle>;
}

export const ZoomAndFadeInOut: AnimatedHook = (isMount, duration) => {
  const sv = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(sv.value, { duration }) }],
      opacity: withTiming(sv.value, { duration }),
    };
  });

  useEffect(() => {
    sv.value = isMount ? 1 : 0;
  }, [isMount]);

  return style;
};

export const FadeInOut: AnimatedHook = (isMount, duration) => {
  const sv = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(sv.value, { duration }),
    };
  });

  useEffect(() => {
    sv.value = isMount ? 1 : 0;
  }, [isMount]);

  return style;
};
