// react
import { View, StyleSheet, Platform } from "react-native";
import { useEffect } from "react";

// expo
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import Constants from "expo-constants";

// utils
import { MockApiService } from "../utils/mockApi";

export default function AppLayout() {
  /**
   * Web 환경에서 다음과 같은 동작을 했을 때, 폰트가 불러와지지 않는 문제를 수정하기위해
   * 페이지마다 항상 실행되는 루트 `_layout.tsx` 에서 useFonts 중복으로 사용함.
   *
   * 1. URL를 조작하여 페이지 이동 시
   * 2. 특정 URL에서 새로고침
   */
  useFonts({
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
    yeonTheLand: require("../assets/fonts/yeonTheLand.ttf"),
  });

  /**
   * 개발중일 경우 mirage mock 서버 활성화
   */
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      new MockApiService().register();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
    overflow: "hidden",
  },
});
