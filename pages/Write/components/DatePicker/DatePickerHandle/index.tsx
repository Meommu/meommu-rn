// react
import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";

// constants
import { color, font } from "@/constants";

// svgs
import CaretDown from "@/assets/svgs/caret-down.svg";

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
    <View
      style={{
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",

        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: 48,
          height: 4,

          marginTop: 12,

          backgroundColor: color.g300,

          borderRadius: 2.5,
        }}
      />

      <Pressable
        style={{
          marginVertical: 14,
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
        onPress={handleYearMonthTextClick}
      >
        <CaretDown fill={color.g300} width={12} />

        <Text
          style={{
            color: color.g500,
            fontSize: 18,
            fontFamily: font.PretendardSemiBold,
          }}
        >
          {year}년 {calendarMonth.toString().padStart(2, "0")}월
        </Text>
      </Pressable>
    </View>
  );
}

export function renderHandle(props: DatePickerHandleProps) {
  return () => {
    return <DatePickerHandle {...props} />;
  };
}
