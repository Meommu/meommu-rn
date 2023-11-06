// react
import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Animated from "react-native-reanimated";

// hooks
import { FadeIn, FadeOut } from "@/hooks/useReanimated";

/**
 * AView : Animated View
 */
export function AView({
  children,
  isMount,
  duration,
  entering = FadeIn,
  exiting = FadeOut,
}: {
  isMount: boolean;
  children: ReactNode;
  duration: number;
  entering?: AnimatedHook;
  exiting?: AnimatedHook;
}) {
  const [realMount, setRealMount] = useState(isMount);

  const enteringStyle = entering(isMount, duration);
  const exitingStyle = exiting(isMount, duration);

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

  if (!realMount) {
    return null;
  }

  return (
    <Animated.View style={[enteringStyle, exitingStyle]}>
      {children}
    </Animated.View>
  );
}
