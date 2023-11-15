// react
import React, { useCallback, useRef, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import Swiper from "react-native-web-swiper";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";
import CaretLeft from "@/assets/svgs/caret-left.svg";

// components
import { MonthCalendar } from "./MonthCalendar";
import { Header } from "@/components/Layout/Header";

// utils
import { getPastYearDate } from "@/utils";

const MAXIMUM_PAST_YEAR = 10;
const MONTH_PICKER_HEIGHT = 300;

export function MonthPicker() {
  const swiperRef = useRef<Swiper | null>(null);

  const { currentYear } = useSelector<RootState, DiaryDateState>(
    (state) => state.diaryDate
  );

  const initialSwiperIndex =
    MAXIMUM_PAST_YEAR - (new Date().getFullYear() - currentYear) - 1;

  const [index, setIndex] = useState(initialSwiperIndex);

  const swiperIndexChangeHandler = (index: number) => {
    setIndex(index);
  };

  const handlerSwiperPrevButtonClick = useCallback(() => {
    swiperRef.current?.goToPrev();
  }, []);

  const handlerSwiperNextButtonClick = useCallback(() => {
    swiperRef.current?.goToNext();
  }, []);

  const isFirstSlide = useCallback(() => {
    return index === 0;
  }, [index]);

  const isLastSlide = useCallback(() => {
    return index === MAXIMUM_PAST_YEAR - 1;
  }, [index]);

  return (
    <View style={styles.container}>
      <Header
        style={{ paddingHorizontal: 20, height: 40 }}
        title={`${getPastYearDate(
          MAXIMUM_PAST_YEAR - index - 1
        ).getFullYear()}년`}
        left={
          !isFirstSlide() && (
            <Pressable
              onPress={handlerSwiperPrevButtonClick}
              testID="button-month-calendar-prev"
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CaretLeft fill={"#B5BEC6"} />
            </Pressable>
          )
        }
        right={
          !isLastSlide() && (
            <Pressable
              onPress={handlerSwiperNextButtonClick}
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CaretRight fill={"#B5BEC6"} />
            </Pressable>
          )
        }
      />

      <Swiper
        ref={swiperRef}
        from={initialSwiperIndex}
        onIndexChanged={swiperIndexChangeHandler}
        controlsEnabled={false}
      >
        {Array(MAXIMUM_PAST_YEAR)
          .fill(null)
          .map((_, i) => new Date().getFullYear() - i)
          .reverse()
          .map((year) => {
            return <MonthCalendar year={year} key={year} />;
          })}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: MONTH_PICKER_HEIGHT,
  },

  yearView: { position: "absolute", width: "100%", top: 10 },

  yearText: {
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
    color: "#4A5660",
  },
});
