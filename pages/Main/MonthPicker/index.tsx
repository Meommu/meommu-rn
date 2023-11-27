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
import { ResponsiveButtonSheetModal } from "@/components/Layout/ResponsiveBottomSheetModal";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

// apis
import { apiService } from "@/apis";

// utils
import { createYearMonthKey } from "@/utils";

// bottom sheets
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// styles
import { styles } from "./index.styles";

export function MonthPicker() {
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
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
   * event handlers
   */
  const handleDatePickButtonClick = (year: number, month: number) => () => {
    dispatch(changeSelectedYearMonth(year, month));

    setBottomSheetIsOpen(false);
  };

  const handleSheetOpen = useCallback(() => {
    setBottomSheetIsOpen(true);
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

      <ResponsiveButtonSheetModal
        isOpen={bottomSheetIsOpen}
        setIsOpen={setBottomSheetIsOpen}
      >
        <MonthCalendar
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          yearMonthToImageId={yearMonthToImageId}
          handleDatePickButtonClick={handleDatePickButtonClick}
        />
      </ResponsiveButtonSheetModal>
    </BottomSheetModalProvider>
  );
}
