// react
import React, { useCallback } from "react";
import { View, Text } from "react-native";

// constants
import { color } from "@/constants";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

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

  return (
    <View style={styles.container}>
      <View style={styles.grabber} />

      <InteractionPressable
        style={styles.togglerWrapper}
        containerStyle={styles.toggler}
        onPress={handleYearMonthTextClick}
      >
        <CaretDown fill={color.g400} width={14} />

        <Text style={styles.togglerText}>
          {year}년 {calendarMonth.toString().padStart(2, "0")}월
        </Text>
      </InteractionPressable>
    </View>
  );
}

export function renderHandle(props: DatePickerHandleProps) {
  return () => {
    return <DatePickerHandle {...props} />;
  };
}
