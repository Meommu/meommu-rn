// react
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useQuery } from "react-query";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";

// apis
import { apiService } from "@/apis";

// components
import { DiaryItem } from "./DiaryItem";

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

  if (isLoading) {
    return <View />;
  }

  return (
    <ScrollView style={styles.container}>
      {data && (
        <View>
          {data.map((diary) => {
            return <DiaryItem diary={diary} key={diary.id} />;
          })}

          <Text style={styles.listCountText}>{data.length}개의 일기</Text>
        </View>
      )}
    </ScrollView>
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
