// react
import { useEffect, useRef } from "react";
import type { ViewProps } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

const BRIGHT = 0.3;
const DARK = 0.8;

interface SViewProps extends ViewProps {
  duration?: number;
}

/**
 * SView: Skeleton View (스켈레톤 뷰)
 */
export function SView({ style, duration = 1000 }: SViewProps) {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const opacity = useSharedValue(DARK);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration }),
    };
  });

  useEffect(() => {
    interval.current = setInterval(() => {
      opacity.value = opacity.value < 0.5 ? DARK : BRIGHT;
    }, duration);

    return () => {
      if (!interval.current) {
        return;
      }

      clearInterval(interval.current);
    };
  }, []);

  return (
    <Animated.View
      style={[
        animatedStyle,
        { backgroundColor: "lightgray", borderRadius: 4 },
        style,
      ]}
    />
  );
}
