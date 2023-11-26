// react
import React, { useState, useEffect, useRef } from "react";
import Animated from "react-native-reanimated";
import { ViewStyle } from "react-native";

// hooks
import { FadeInOut } from "@/hooks";

interface AViewProps {
  style?: ViewStyle;
  children?: React.ReactNode;

  /**
   * 컴포넌트 마운트/언마운트 여부
   */
  isMount: boolean;

  /**
   * 등장, 퇴장 애니메이션 지속시간
   */
  duration: number;

  /**
   * 적용할 등장, 퇴장 애니메이션 훅
   *
   * default: fade in/out
   */
  enterExitAnimation?: AnimatedHook;
}

/**
 * AView : Animated View
 *
 * 마운트, 언마운트 시 애니메이션을 적용할 수 있는 컴포넌트
 */
export function AView({
  style,
  children,
  isMount,
  duration,
  enterExitAnimation = FadeInOut,
}: AViewProps) {
  const [isRealMount, setRealMount] = useState(isMount);

  const enterExitAnimationStyle = enterExitAnimation(isMount, duration);

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
    <Animated.View style={[style, enterExitAnimationStyle]}>
      {children}
    </Animated.View>
  );
}
