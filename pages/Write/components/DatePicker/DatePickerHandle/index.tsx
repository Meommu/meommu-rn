// react
import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import Animated from "react-native-reanimated";

// constants
import { color } from "@/constants";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// svgs
import CaretDown from "@/assets/svgs/caret-down.svg";

// styles
import { styles } from "./index.styles";

interface DatePickerHandleProps {
  year: number;

  calendarMonth: number;

  setCalendarType: React.Dispatch<React.SetStateAction<"year" | "date">>;
}

function DatePickerHandle({
  year,
  calendarMonth,
  setCalendarType,
}: DatePickerHandleProps) {
  const handleYearMonthTextClick = useCallback(() => {
    setCalendarType((calendarType) => {
      return calendarType === "year" ? "date" : "year";
    });
  }, [setCalendarType]);

  const {
    containerAnimatedStyle,
    Dimmed,
    handleButtonPressIn,
    handleButtonPressOut,
  } = usePressInOutAnimation();

  return (
    <View style={styles.container}>
      <View style={styles.grabber} />

      <Animated.View style={[styles.togglerWrapper, containerAnimatedStyle]}>
        <Pressable
          style={styles.toggler}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={handleYearMonthTextClick}
        >
          <CaretDown fill={color.g300} width={12} />

          <Text style={styles.togglerText}>
            {year}년 {calendarMonth.toString().padStart(2, "0")}월
          </Text>
        </Pressable>

        {Dimmed}
      </Animated.View>
    </View>
  );
}

export function renderHandle(props: DatePickerHandleProps) {
  return () => {
    return <DatePickerHandle {...props} />;
  };
}
