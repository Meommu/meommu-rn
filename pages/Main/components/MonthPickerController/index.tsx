// react
import { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-query";

// redux
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store";
import { type BottomSheetState } from "@/store/modules/bottomSheet";
import { type DiaryDateState } from "@/store/modules/diaryDate";
import { changeSelectedYearMonth } from "@/store/modules/diaryDate";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// apis
import { apiService } from "@/apis";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

// styles
import { styles } from "./index.styles";

export function MonthPickerController() {
  const dispatch = useDispatch();

  const { selectedYear, selectedMonth } = useSelector<
    RootState,
    DiaryDateState
  >((state) => state.diaryDate);

  const { monthPickerBottomSheetRef } = useSelector<
    RootState,
    BottomSheetState
  >((state) => state.bottomSheet);

  const handleSheetOpen = useCallback(() => {
    monthPickerBottomSheetRef?.current?.present();
  }, [monthPickerBottomSheetRef]);

  const { data: diariesSummary } = useQuery(
    ["diaries", "summary", "for", "initial", "month"],
    async () => {
      return await apiService.getDiariesSummary();
    }
  );

  /**
   * 최신 일기가 존재하는 년, 월 추출 후 초기화
   */
  useEffect(() => {
    if (!diariesSummary || !diariesSummary.length) {
      return;
    }

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
  }, [diariesSummary]);

  return (
    <View style={styles.container}>
      <InteractionPressable
        containerStyle={styles.button}
        onPress={handleSheetOpen}
        testID="button-month-picker"
      >
        <Text style={styles.buttonText}>
          {selectedYear}년 {selectedMonth}월
        </Text>

        <ArrowDropDown />
      </InteractionPressable>
    </View>
  );
}
