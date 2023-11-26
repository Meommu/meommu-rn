// react
import React, { useState, useEffect, useRef } from "react";
import Animated from "react-native-reanimated";
import { ViewStyle } from "react-native";

// hooks
import { FadeIn, FadeOut } from "@/hooks";

interface AViewProps {
  isMount: boolean;
  duration: number;
  style?: ViewStyle;
  children?: React.ReactNode;
  entering?: AnimatedHook;
  exiting?: AnimatedHook;
}

/**
 * AView : Animated View
 *
 * 마운트, 언마운트 시 애니메이션을 적용할 수 있는 컴포넌트
 */
export function AView({
  children,
  isMount,
  duration,
  style,
  entering = FadeIn,
  exiting = FadeOut,
}: AViewProps) {
  const [isRealMount, setRealMount] = useState(isMount);

  const enteringStyle = entering(isMount, isRealMount, duration);
  const exitingStyle = exiting(isMount, isRealMount, duration);

  /**
   * debouncing을 적용하지 않으면 setTimeout 함수가 여러번 호출되어 문제가 생길 수 있음.
   */
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (isMount) {
      setRealMount(true);

      return;
    } else {
      timer.current = setTimeout(() => {
        setRealMount(false);
      }, duration);
    }
  }, [isMount]);

  if (!isRealMount) {
    return null;
  }

  return (
    <Animated.View style={[style, enteringStyle, exitingStyle]}>
      {children}
    </Animated.View>
  );
}
