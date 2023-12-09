// react
import React from "react";

// swiper
import Swiper from "react-native-web-swiper";

// components
import { DatePickerCalendarItem } from "./DatePickerCalendarItem";

// hooks
import { useSwiper } from "@/hooks";

interface DatePickerCalendarProps {
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;

  month: number;
}

export function DatePickerCalendar({
  setCurrentMonth,
  month,
}: DatePickerCalendarProps) {
  const { swiperRef } = useSwiper(0);

  return (
    <Swiper
      ref={swiperRef}
      from={month - 1}
      onIndexChanged={(index) => {
        setCurrentMonth(index + 1);
      }}
      controlsEnabled={false}
    >
      {Array(12)
        .fill(null)
        .map((_, i) => {
          return <DatePickerCalendarItem calendarMonth={i + 1} key={i} />;
        })}
    </Swiper>
  );
}
