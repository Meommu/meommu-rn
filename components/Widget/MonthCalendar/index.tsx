// react
import React, { useCallback, useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Swiper from "react-native-web-swiper";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";
import CaretLeft from "@/assets/svgs/caret-left.svg";

// components
import { MonthCalendarItem } from "./MonthCalendarItem";
import { Header } from "@/components/Layout/Header";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { MonthCalendarProvider } from "./index.context";

// utils
import { getPastYearDate } from "@/utils";

// hooks
import { useSwiper } from "@/hooks";

// styles
import { styles } from "./index.styles";

const CALENDAR_PAGE_SIZE = 10;

interface MonthCalendarProps {
  selectedYear: number;
  selectedMonth: number;
  yearMonthToImageId: Map<string, number>;
  handleDatePickButtonClick: (year: number, month: number) => () => void;
}

export function MonthCalendar({
  selectedYear,
  selectedMonth,
  yearMonthToImageId,
  handleDatePickButtonClick,
}: MonthCalendarProps) {
  const now = useMemo(() => new Date(), []);

  const [currentYear, setCurrentYear] = useState(selectedYear);
  const [currentMonth, setCurrentMonth] = useState(selectedMonth);

  const setCurrentYearMonth = useCallback((year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  }, []);

  /**
   * 초기 인덱스 계산법
   *
   * 1. 최신 년도를 기준으로, 현재 선택된 년도와의 offset를 구한다.
   * 2. 달력은 보통 왼쪽으로 갈수록 과거이므로, 총 달력의 장 수에서 offset을 빼 준다.
   * 3. 인덱스는 0부터 시작하는 것을 고려해 1을 추가로 빼 준다.
   */
  const offset = now.getFullYear() - selectedYear;
  const initialSwiperIndex = CALENDAR_PAGE_SIZE - offset - 1;

  const { swiperIndex, swiperRef, handleSwiperIndexChange } =
    useSwiper(initialSwiperIndex);

  const handlerSwiperPrevButtonClick = useCallback(() => {
    swiperRef.current?.goToPrev();
  }, []);

  const handlerSwiperNextButtonClick = useCallback(() => {
    swiperRef.current?.goToNext();
  }, []);

  const isFirstSlide = useCallback(() => {
    return swiperIndex === 0;
  }, [swiperIndex]);

  const isLastSlide = useCallback(() => {
    return swiperIndex === CALENDAR_PAGE_SIZE - 1;
  }, [swiperIndex]);

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title={
          <Text style={styles.yearText}>
            {`${getPastYearDate(
              CALENDAR_PAGE_SIZE - swiperIndex - 1
            ).getFullYear()}년`}
          </Text>
        }
        left={
          !isFirstSlide() && (
            <Pressable
              onPress={handlerSwiperPrevButtonClick}
              testID="button-month-calendar-prev"
              style={styles.swiperController}
            >
              <CaretLeft fill={"#B5BEC6"} />
            </Pressable>
          )
        }
        right={
          !isLastSlide() && (
            <Pressable
              onPress={handlerSwiperNextButtonClick}
              style={styles.swiperController}
            >
              <CaretRight fill={"#B5BEC6"} />
            </Pressable>
          )
        }
      />

      {/**
       * 캘린더의 현재 선택된 년, 월을 하위 컴포넌트의 props로 넘겨주지 않고 context를 사용하는 이유는,
       * react-native-web-swiper 패키지가 내부적으로 cloneElement를 사용하여 컴포넌트를 복사해 사용하기 때문에 상태가 차단되기 때문.
       *
       * 전역 상태관리 라이브러리를 사용해도 마찬가지로 잘 동작하지만, 현재 선택된 년, 월 상태는 해당 컴포넌트 내에서만 사용되기 때문에
       * 굳이 전역 상태로 제작하지 않고 useContext를 사용하여 관리하도록 함.
       *
       * https://github.com/reactrondev/react-native-web-swiper/issues/65#issuecomment-781552692
       */}
      <MonthCalendarProvider
        value={{
          currentYear,
          currentMonth,
          yearMonthToImageId,
          setCurrentYearMonth,
        }}
      >
        <Swiper
          ref={swiperRef}
          from={initialSwiperIndex}
          onIndexChanged={handleSwiperIndexChange}
          controlsEnabled={false}
        >
          {Array(CALENDAR_PAGE_SIZE)
            .fill(null)
            .map((_, i) => new Date().getFullYear() - i)
            .reverse()
            .map((year) => {
              return (
                <MonthCalendarItem
                  calendarYear={year}
                  selectedYear={selectedYear}
                  selectedMonth={selectedMonth}
                  key={year}
                />
              );
            })}
        </Swiper>
      </MonthCalendarProvider>

      <View style={styles.chooseMonthButton}>
        <NavigationButton
          content="확인"
          onPress={handleDatePickButtonClick(currentYear, currentMonth)}
          testID="button-month-calendar-apply-button"
        />
      </View>
    </View>
  );
}
