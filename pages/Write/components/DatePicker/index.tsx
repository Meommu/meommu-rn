// react
import { memo, useEffect, useRef, useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import type { UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";

// redux
import { updateDatePickerBottomSheetRef } from "@/store/modules/bottomSheet";
import { useDispatch } from "react-redux";

// hooks
import { ZoomAndFadeInOut } from "@/hooks";

// components
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";
import { Footer } from "@/components/Layout/Footer";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { AView } from "@/components/Layout/AView";
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";
import { renderHandle } from "./DatePickerHandle";
import { renderBackdrop } from "./DatePickerBackdrop";
import { DatePickerCalendar } from "./DatePickerCalendar";
import { DatePickerProvider } from "./index.context";

// utils
import { dateToHyphenatedYYYYMMDD } from "@/utils";

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
    setYear(year);

    if (new Date(year, month - 1, date) > now) {
      setMonth(now.getMonth() + 1);
      setDate(now.getDate());
    }

    setCalendarType("date");
  };

  const handleApplyButtonClick = () => {
    setValue("date", dateToHyphenatedYYYYMMDD(new Date(year, month - 1, date)));

    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      containerStyle={styles.bottomSheetContainer}
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
                      <View style={styles.yearPickerItemLayout} key={year}>
                        <View style={styles.yearPickerItem}>
                          <View style={styles.yearPickerItemButtonLayout}>
                            <Pressable
                              style={styles.yearPickerItemButton}
                              onPress={handleYearItemClick(year)}
                            >
                              <Text style={styles.yearPickerItemButtonText}>
                                {year}
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
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
