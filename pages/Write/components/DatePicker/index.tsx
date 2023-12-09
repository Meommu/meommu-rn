// react
import { memo, useEffect, useRef, useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import type { UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";
import { DatePickerProvider } from "./index.context";

// redux
import { updateDatePickerBottomSheetRef } from "@/store/modules/bottomSheet";
import { useDispatch } from "react-redux";

// hooks
import { ZoomAndFadeInOut, useResponsiveMobileWidth } from "@/hooks";

// components
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";
import { Footer } from "@/components/Layout/Footer";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { AView } from "@/components/Layout/AView";
import { renderHandle } from "./DatePickerHandle";
import { renderBackdrop } from "./DatePickerBackdrop";
import { DatePickerCalendar } from "./DatePickerCalendar";

// apis
import { apiService } from "@/apis";

// bottom sheet
import BottomSheet, {
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

// styles
import { styles } from "./index.styles";

interface DatePickerProps {
  setValue: UseFormSetValue<DiaryWriteFormFieldValues>;
}

export const DatePicker = memo(({ setValue }: DatePickerProps) => {
  const dispatch = useDispatch();

  const now = useMemo(() => new Date(), []);

  const [calendarType, setCalendarType] = useState<"year" | "date">("date");
  const [currentMonth, setCurrentMonth] = useState<number>(now.getMonth() + 1);

  const [year, setYear] = useState<number>(now.getFullYear());
  const [month, setMonth] = useState<number>(now.getMonth() + 1);
  const [date, setDate] = useState<number>(now.getDate());

  const [dateToImageId, setDateToImageId] = useState<Map<string, number>>(
    new Map()
  );

  const { data: diariesSummary } = useQuery(["diariesSummary"], async () => {
    return await apiService.getDiariesSummary();
  });

  useEffect(() => {
    if (!diariesSummary) {
      return;
    }

    const newDateToImageId = new Map();

    diariesSummary.forEach(({ date, imageIds }) => {
      newDateToImageId.set(date, imageIds[0]);
    });

    setDateToImageId(newDateToImageId);
  }, [diariesSummary]);

  /**
   * bottom sheet
   */
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  useEffect(() => {
    dispatch(updateDatePickerBottomSheetRef(bottomSheetRef));
  }, [dispatch, bottomSheetRef]);

  const { responsiveWidthStyle } = useResponsiveMobileWidth();

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  /**
   * event handler
   */
  const handleYearItemClick = (year: number) => () => {
    /**
     * TODO: 연도를 변경할 경우 없는 month, date가 선택될 수 있으므로, 무조건 존재하는 날짜(Month, Date)로 변경 필요
     */
    setYear(year);

    setCalendarType("date");
  };

  const handleApplyButtonClick = () => {
    setValue(
      "date",
      `${year}-${month.toString().padStart(2, "0")}-${date
        .toString()
        .padStart(2, "0")}`
    );

    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      containerStyle={[responsiveWidthStyle, styles.bottomSheetContainer]}
      snapPoints={animatedSnapPoints}
      contentHeight={animatedContentHeight}
      backdropComponent={renderBackdrop()}
      handleHeight={animatedHandleHeight}
      enablePanDownToClose={true}
      handleComponent={renderHandle({
        year,
        calendarMonth: currentMonth,
        setCalendarType,
      })}
      index={-1}
      enableContentPanningGesture={false}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        <View style={styles.contentLayout}>
          {/**
           * 년 선택
           */}
          <AView
            isMount={calendarType === "year"}
            enterExitAnimation={ZoomAndFadeInOut}
            duration={500}
            fakeUnmount={true}
            style={styles.content}
          >
            <NonIndicatorScrollView>
              <View style={styles.yearPicker}>
                {Array(now.getFullYear() - 1970 + 1)
                  .fill(null)
                  .map((_, i) => {
                    const year = now.getFullYear() - i;

                    return (
                      <Pressable
                        style={styles.yearPickerItem}
                        onPress={handleYearItemClick(year)}
                        key={year}
                      >
                        <Text style={styles.yearPickerItemText}>{year}</Text>
                      </Pressable>
                    );
                  })}
              </View>
            </NonIndicatorScrollView>
          </AView>

          {/**
           * 일 선택
           */}
          <AView
            isMount={calendarType === "date"}
            enterExitAnimation={ZoomAndFadeInOut}
            duration={500}
            fakeUnmount={true}
            style={styles.content}
          >
            <DatePickerProvider
              value={{
                year,
                month,
                date,
                setYear: (year: number) => setYear(year),
                setMonth: (month: number) => setMonth(month),
                setDate: (date: number) => setDate(date),
                dateToImageId,
              }}
            >
              <DatePickerCalendar
                month={month}
                setCurrentMonth={setCurrentMonth}
              />
            </DatePickerProvider>
          </AView>
        </View>

        <Footer>
          <NavigationButton onPress={handleApplyButtonClick} content="확인" />
        </Footer>
      </BottomSheetView>
    </BottomSheet>
  );
});
