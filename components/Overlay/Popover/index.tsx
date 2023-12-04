// react
import { useCallback, useEffect, useState, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// svgs
import PopoverTap from "@/assets/svgs/popover-tap.svg";

// styles
import { styles } from "./index.styles";

interface PopoverProps {
  /**
   * Popover의 출현 여부를 결정하기 위한 고유한 id값
   */
  id: string;

  /**
   * Popover에 담길 문구
   */
  content: string;

  /**
   * Overlay가 위치할 화면 하단으로부터의 높이
   */
  bottom?: number;
}

export function Popover({ id, content, bottom = 0 }: PopoverProps) {
  const insets = useSafeAreaInsets();

  /**
   * Popover 애니메이션
   */
  const UP = 8;
  const DOWN = 0;

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const index = useRef<number>(0);

  const sv = useSharedValue(DOWN);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -sv.value }],
  }));

  useEffect(() => {
    interval.current = setInterval(() => {
      sv.value = withTiming(index.current % 2 === 0 ? UP : DOWN, {
        duration: 600,
        easing:
          index.current % 2 === 0
            ? Easing.out(Easing.bezierFn(0.42, -0.68, 0.96, 0.6))
            : Easing.bounce,
      });

      index.current++;
    }, 600);

    return () => {
      if (!interval.current) {
        return;
      }

      clearInterval(interval.current);
    };
  }, []);

  /**
   * Popover 출현 여부 결정
   */
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(`popover-${id}`).then((v) => {
      /*
      if (v === "clicked") {
        return;
      }
      */

      setIsShow(true);
    });
  }, []);

  /**
   * 이벤트 핸들러
   */
  const handlePopoverClick = useCallback(async () => {
    await AsyncStorage.setItem(`popover-${id}`, "clicked");

    setIsShow(false);
  }, []);

  if (!isShow) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          animatedStyle,
          styles.content,
          { bottom: bottom + insets.bottom },
        ]}
      >
        <Pressable onPress={handlePopoverClick}>
          <Text style={styles.contentText}>{content}</Text>
        </Pressable>

        <View style={styles.tabLayout}>
          <PopoverTap />
        </View>
      </Animated.View>
    </View>
  );
}
