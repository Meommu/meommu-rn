// react
import { View, Text, StyleSheet, Image } from "react-native";
import { useQuery } from "react-query";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";

// apis
import { apiService } from "@/apis";

// components
import { DiaryItem, DiaryItemSkeleton } from "./DiaryItem";
import { NonIndicatorScrollView } from "./ScrollView/NonIndicatorScrollView";
import { DiaryListPlaceholder } from "./DiaryListPlaceholder";

export function DiaryList() {
  const { currentMonth, currentYear } = useSelector<RootState, DiaryDateState>(
    (state) => state.diaryDate
  );

  const { data, isLoading } = useQuery(
    ["diaryList", currentMonth, currentYear],
    async () => {
      return await apiService.getDiaries(currentYear, currentMonth);
    }
  );

  const diaries = data || [];

  return (
    <NonIndicatorScrollView style={styles.container}>
      {diaries.map((diary) => {
        return <DiaryItem diary={diary} key={diary.id} />;
      })}

      {isLoading &&
        Array(3)
          .fill(null)
          .map((_, i) => {
            return <DiaryItemSkeleton key={i} />;
          })}

      {diaries.length > 0 ? (
        <Text style={styles.listCountText}>{diaries.length}개의 일기</Text>
      ) : (
        <DiaryListPlaceholder />
      )}
    </NonIndicatorScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  listCountText: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 60,
    fontSize: 14,
    color: "#7D8899",
    fontFamily: "Pretendard-SemiBold",
  },
});
