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
