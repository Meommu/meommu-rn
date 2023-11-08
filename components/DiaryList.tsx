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

  /**
   * TODO: 무한 스크롤 적용하여 한번에 가져올 수 있는 개수만큼 스켈레톤 ui 렌더링하기
   */
  if (isLoading) {
    return (
      <NonIndicatorScrollView style={styles.container}>
        {Array(3)
          .fill(null)
          .map((_, i) => {
            return <DiaryItemSkeleton key={i} />;
          })}
      </NonIndicatorScrollView>
    );
  }

  if (!data || !data.length) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          style={{ width: 160, height: 160 }}
          source={require("@/assets/images/main/placeholder.png")}
        />
        <Text
          style={{
            fontFamily: "yeonTheLand",
            fontSize: 20,
            color: "#89899C",
          }}
        >
          안녕하세요! 멈무에요{"\n"}일기를 등록해주세요
        </Text>
      </View>
    );
  }

  return (
    <NonIndicatorScrollView style={styles.container}>
      {data && (
        <View>
          {data.map((diary) => {
            return <DiaryItem diary={diary} key={diary.id} />;
          })}

          <Text style={styles.listCountText}>{data.length}개의 일기</Text>
        </View>
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
