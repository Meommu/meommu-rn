// react
import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

declare global {
  type AnimatedHook = (
    /**
     * 컴포넌트 마운트/언마운트를 결정하는 상태
     */
    isMount: boolean,

    /**
     * 컴포넌트 마운트/언마운트 시 애니메이션을 위한 지연 상태
     */
    isRealMount: boolean,

    /**
     * 애니메이션 지속시간 (ms)
     */
    duration: number
  ) => ReturnType<typeof useAnimatedStyle>;
}

const useSharedValueDuringMount = (
  disableValue: number,
  enableValue: number,
  isMount: boolean,
  isRealMount: boolean
): ReturnType<typeof useSharedValue<number>> => {
  const sharedValue = useSharedValue(disableValue);

  const sharedValueOnMount = useDerivedValue(() => {
    /**
     * 2. 컴포넌트가 다시 마운트 되기 이전에는 비활성화 된 상태값을 가져야 하므로,
     * 실제로 컴포넌트가 언마운트 되어있을 경우 비활성화 상태값을 반환
     */
    if (!isRealMount) {
      return disableValue;
    }

    /**
     * 1. 컴포넌트가 언마운트되는 시점부터는 활성화 되어있을 경우의 값`enableValue`만을 반환.
     */
    if (!isMount) {
      return enableValue;
    }

    return sharedValue.value;
  }, [isMount, isRealMount]);

  useEffect(() => {
    if (isMount) {
      sharedValue.value = enableValue;
    }

    return () => {
      sharedValue.value = disableValue;
    };
  }, [isMount]);

  return sharedValueOnMount;
};

const useSharedValueDuringUnmount = (
  disableValue: number,
  enableValue: number,
  isMount: boolean
): ReturnType<typeof useSharedValue<number>> => {
  const sharedValue = useSharedValue(disableValue);

  useEffect(() => {
    if (!isMount) {
      sharedValue.value = enableValue;
    }

    return () => {
      sharedValue.value = disableValue;
    };
  }, [isMount]);

  return sharedValue;
};

export const ZoomIn: AnimatedHook = (isMount, isRealMount, duration) => {
  const transformScale = useSharedValueDuringMount(0, 1, isMount, isRealMount);
  const opacity = useSharedValueDuringMount(0, 1, isMount, isRealMount);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(transformScale.value, { duration }) }],
      opacity: withTiming(opacity.value, { duration }),
    };
  });

  return style;
};

export const ZoomOut: AnimatedHook = (isMount, isRealMount, duration) => {
  const transformScale = useSharedValueDuringUnmount(1, 0, isMount);
  const opacity = useSharedValueDuringUnmount(1, 0, isMount);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(transformScale.value, { duration }) }],
      opacity: withTiming(opacity.value, { duration }),
    };
  });

  return style;
};

export const FadeIn: AnimatedHook = (isMount, isRealMount, duration) => {
  const opacity = useSharedValueDuringMount(0, 1, isMount, isRealMount);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration }),
    };
  });

  return style;
};

export const FadeOut: AnimatedHook = (isMount, isRealMount, duration) => {
  const opacity = useSharedValueDuringUnmount(1, 0, isMount);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration }),
    };
  });

  return style;
};
