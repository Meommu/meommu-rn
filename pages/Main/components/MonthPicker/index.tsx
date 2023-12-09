// react
import { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { useQuery } from "react-query";

// redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";
import { changeSelectedYearMonth } from "@/store/modules/diaryDate";

// components
import { Footer } from "@/components/Layout/Footer";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { MonthPickerProvider } from "./index.context";
import { MonthCalendarItem } from "./MonthCalendarItem";
import { renderHandle } from "./MonthPickerHandle";
import { renderBackdrop } from "./MonthPickerBackdrop";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

// hooks
import { useResponsiveMobileWidth, useSwiper } from "@/hooks";

// apis
import { apiService } from "@/apis";

// utils
import { createYearMonthKey } from "@/utils";

// constants
import { size } from "@/constants";

// bottom sheets
import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";

// styles
import { styles } from "./index.styles";

// swiper
import Swiper from "react-native-web-swiper";

export function MonthPicker() {
  const dispatch = useDispatch();

  const { selectedYear, selectedMonth } = useSelector<
    RootState,
    DiaryDateState
  >((state) => state.diaryDate);

  const now = useMemo(() => new Date(), []);

  const [currentYear, setCurrentYear] = useState(selectedYear);
  const [currentMonth, setCurrentMonth] = useState(selectedMonth);

  /**
   * swiper
   *
   * 초기 인덱스 계산법
   *
   * 1. 최신 년도를 기준으로, 현재 선택된 년도와의 offset를 구한다.
   * 2. 달력은 보통 왼쪽으로 갈수록 과거이므로, 총 달력의 장 수에서 offset을 빼 준다.
   * 3. 인덱스는 0부터 시작하는 것을 고려해 1을 추가로 빼 준다.
   */
  const offset = now.getFullYear() - selectedYear;

  const initialSwiperIndex = size.MONTH_CALENDAR_PAGE_COUNT - offset - 1;

  const { swiperRef, swiperIndex, handleSwiperIndexChange } =
    useSwiper(initialSwiperIndex);

  /**
   * bottom sheet
   */
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const { responsiveWidthStyle } = useResponsiveMobileWidth();

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  /**
   * useQuery
   */
  const [yearMonthToImageId, setYearMonthToImageId] = useState(new Map());

  const { data: diariesSummary } = useQuery(
    ["diariesSummary"],
    async () => {
      return await apiService.getDiariesSummary();
    },
    {
      suspense: true,
    }
  );

  useEffect(() => {
    if (!diariesSummary || !diariesSummary.length) {
      return;
    }

    /**
     * 최신 일기가 존재하는 년, 월 추출
     */
    const latestDate = diariesSummary
      .map(({ date }) => {
        const [yyyy, mm, dd] = date.split("-").map(Number);

        return new Date(yyyy, mm - 1, dd);
      })
      .sort((a, b) => {
        return a > b ? -1 : 1;
      })[0];

    const year = latestDate.getFullYear();
    const month = latestDate.getMonth() + 1;

    dispatch(changeSelectedYearMonth(year, month));

    /**
     * 년, 월에 존재하는 일기들의 대표 이미지 추출
     */
    const yearMonthToImageId: Map<string, number> = new Map();

    diariesSummary.forEach(({ date, imageIds }) => {
      if (!imageIds.length) {
        return;
      }

      const [yyyy, mm, dd] = date.split("-").map(Number);

      yearMonthToImageId.set(
        createYearMonthKey(new Date(yyyy, mm - 1, dd)),
        imageIds[0]
      );
    });

    setYearMonthToImageId(yearMonthToImageId);
  }, [diariesSummary]);

  /**
   * event handlers
   */
  const handleDatePickButtonClick = useCallback(() => {
    dispatch(changeSelectedYearMonth(currentYear, currentMonth));

    bottomSheetRef.current?.close();
  }, [currentYear, currentMonth]);

  const handleSheetOpen = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, [bottomSheetRef]);

  /**
   * util functions
   */
  const setCurrentYearMonth = useCallback((year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.content}
          onPress={handleSheetOpen}
          testID="button-month-picker"
        >
          <Text style={styles.dateText}>
            {selectedYear}년 {selectedMonth}월
          </Text>

          <ArrowDropDown />
        </Pressable>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        containerStyle={[responsiveWidthStyle, styles.bottomSheetContainer]}
        snapPoints={animatedSnapPoints}
        contentHeight={animatedContentHeight}
        handleHeight={animatedHandleHeight}
        enablePanDownToClose={true}
        handleComponent={renderHandle({
          swiperRef,
          swiperIndex,
        })}
        backdropComponent={renderBackdrop()}
        index={-1}
        enableContentPanningGesture={false}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          {/**
           * 캘린더의 현재 선택된 년, 월을 하위 컴포넌트의 props로 넘겨주지 않고 context를 사용하는 이유는,
           * react-native-web-swiper 패키지가 내부적으로 cloneElement를 사용하여 컴포넌트를 복사해 사용하기 때문에 상태가 차단되기 때문.
           *
           * 전역 상태관리 라이브러리를 사용해도 마찬가지로 잘 동작하지만, 현재 선택된 년, 월 상태는 해당 컴포넌트 내에서만 사용되기 때문에
           * 굳이 전역 상태로 제작하지 않고 useContext를 사용하여 관리하도록 함.
           *
           * https://github.com/reactrondev/react-native-web-swiper/issues/65#issuecomment-781552692
           */}
          <MonthPickerProvider
            value={{
              currentYear,
              currentMonth,
              yearMonthToImageId,
              setCurrentYearMonth,
            }}
          >
            <View style={styles.monthCalendar}>
              <Swiper
                ref={swiperRef}
                from={initialSwiperIndex}
                onIndexChanged={handleSwiperIndexChange}
                controlsEnabled={false}
              >
                {Array(size.MONTH_CALENDAR_PAGE_COUNT)
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
            </View>
          </MonthPickerProvider>

          <Footer>
            <NavigationButton
              content="확인"
              onPress={handleDatePickButtonClick}
              testID="button-month-calendar-apply"
            />
          </Footer>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
