// react
import { useEffect, useCallback, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useQuery } from "react-query";

// redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";
import { changeSelectedYearMonth } from "@/store/modules/diaryDate";

// components
import { MonthCalendar } from "@/components/Widget/MonthCalendar";

// hooks
import { useBottomSheetModal } from "@/hooks";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

// apis
import { apiService } from "@/apis";

// utils
import { createYearMonthKey } from "@/utils";

// bottom sheets
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";

// styles
import { styles } from "./index.styles";

export function MonthPicker() {
  const [yearMonthToImageId, setYearMonthToImageId] = useState(new Map());
  /**
   * redux
   */
  const dispatch = useDispatch();

  const { selectedYear, selectedMonth } = useSelector<
    RootState,
    DiaryDateState
  >((state) => state.diaryDate);

  /**
   * useQuery
   */
  const { data } = useQuery(
    ["diariesSummary"],
    async () => {
      return await apiService.getDiariesSummary();
    },
    {
      suspense: true,
    }
  );

  useEffect(() => {
    if (!data || !data.length) {
      return;
    }

    // 최신 일기가 존재하는 년, 월 추출
    const latestDate = data
      .map(({ date }) => new Date(date))
      .sort((a, b) => {
        return a > b ? -1 : 1;
      })[0];

    const year = latestDate.getFullYear();
    const month = latestDate.getMonth() + 1;

    dispatch(changeSelectedYearMonth(year, month));

    // 년, 월에 존재하는 일기들의 대표 이미지 추출
    const yearMonthToImageId: Map<string, number> = new Map();

    data.forEach(({ date, imageIds }) => {
      if (!imageIds.length) {
        return;
      }

      yearMonthToImageId.set(createYearMonthKey(new Date(date)), imageIds[0]);
    });

    setYearMonthToImageId(yearMonthToImageId);
  }, [data]);

  /**
   * bottom sheet
   */
  const {
    bottomSheetRef,
    bottomSheetMaxWidthStyle,
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    handleContentLayout,
  } = useBottomSheetModal();

  /**
   * bottom sheet의 dimmed
   *
   * ※ Web 환경에서는 뒷 배경 클릭시 바텀시트 모달이 닫히지 않음.
   * ※ v5 버전에서 업데이트를 기다려야 할 것 같음.
   */
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[props.style, styles.bottomSheetBackdrop]}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  /**
   * event handlers
   */
  const handleDatePickButtonClick = (year: number, month: number) => () => {
    dispatch(changeSelectedYearMonth(year, month));

    bottomSheetRef.current?.dismiss();
  };

  const handleSheetOpen = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
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

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={animatedSnapPoints}
        contentHeight={animatedContentHeight}
        handleHeight={animatedHandleHeight}
        enableContentPanningGesture={false}
        containerStyle={[bottomSheetMaxWidthStyle, styles.bottomSheetContainer]}
        handleIndicatorStyle={styles.handleIndicator}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          <MonthCalendar
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            yearMonthToImageId={yearMonthToImageId}
            handleDatePickButtonClick={handleDatePickButtonClick}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
