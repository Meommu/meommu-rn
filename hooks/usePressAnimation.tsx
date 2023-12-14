// react
import React, { useMemo } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// constants
import { size, color } from "@/constants";

export const usePressInOutAnimation = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(scale.value, {
            duration: size.BUTTON_PRESS_IN_OUT_DURATION,
          }),
        },
      ],
    };
  });

  const dimmedAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: size.BUTTON_PRESS_IN_OUT_DURATION,
      }),
    };
  });

  const Dimmed: React.ReactNode = useMemo(() => {
    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,

            width: "100%",
            height: "100%",

            backgroundColor: color.g800,

            pointerEvents: "none",
          },
          dimmedAnimatedStyle,
        ]}
      />
    );
  }, [dimmedAnimatedStyle]);

  const handleButtonPressIn = () => {
    scale.value = 0.96;
    opacity.value = 0.15;
  };

  const handleButtonPressOut = () => {
    scale.value = 1;
    opacity.value = 0;
  };

  return {
    containerAnimatedStyle,
    Dimmed,
    handleButtonPressIn,
    handleButtonPressOut,
  };
};
