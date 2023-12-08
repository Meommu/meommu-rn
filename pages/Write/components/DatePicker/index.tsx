// react
import { memo, useEffect, useRef, useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form";
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

// constants
import { color, font, zIndex } from "@/constants";

// bottom sheet
import BottomSheet, {
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export const DATE_PICKER_CONTENT_HEIGHT = 330;

interface DatePickerProps {
  setValue: UseFormSetValue<DiaryWriteFormFieldValues>;
}

export const DatePicker = memo(({ setValue }: DatePickerProps) => {
  const dispatch = useDispatch();

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
   * react hooks
   */
  const now = useMemo(() => new Date(), []);

  const [calendarType, setCalendarType] = useState<"year" | "date">("date");
  const [currentMonth, setCurrentMonth] = useState<number>(now.getMonth() + 1);

  const [year, setYear] = useState<number>(now.getFullYear());
  const [month, setMonth] = useState<number>(now.getMonth() + 1);
  const [date, setDate] = useState<number>(now.getDate());

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
      containerStyle={[
        responsiveWidthStyle,
        { marginHorizontal: "auto", zIndex: zIndex.bottomSheetContainer },
      ]}
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
        <View
          style={{
            position: "relative",
            width: "100%",
            height: DATE_PICKER_CONTENT_HEIGHT,
          }}
        >
          {/**
           * 년 선택
           */}
          <AView
            isMount={calendarType === "year"}
            enterExitAnimation={ZoomAndFadeInOut}
            duration={500}
            fakeUnmount={true}
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              width: "100%",
              height: "100%",
            }}
          >
            <NonIndicatorScrollView>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {Array(now.getFullYear() - 1970 + 1)
                  .fill(null)
                  .map((_, i) => {
                    const year = now.getFullYear() - i;

                    return (
                      <Pressable
                        style={{
                          width: "25%",
                          height: DATE_PICKER_CONTENT_HEIGHT / 3,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={handleYearItemClick(year)}
                        key={year}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontFamily: font.PretendardSemiBold,
                            color: color.g500,
                          }}
                        >
                          {year}
                        </Text>
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
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              width: "100%",
              height: "100%",
            }}
          >
            <DatePickerProvider
              value={{
                year,
                month,
                date,
                setYear: (year: number) => setYear(year),
                setMonth: (month: number) => setMonth(month),
                setDate: (date: number) => setDate(date),
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
