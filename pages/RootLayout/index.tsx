// react
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

// components
import { QueryProvider } from "./QueryProvider";
import { ReduxStore } from "./ReduxStore";
import { ResponsiveLayoutView } from "./ResponsiveLayoutView";
import { Toast } from "@/components/Overlay/Toast";

// apis
import axios from "axios";
import { MockApiService } from "@/mocking/mockApi";
import { GlobalErrorBoundary } from "./GlobalErrorBoundary";

export function RootLayout() {
  /**
   * 폰트, Mocking API, accessToken 설정
   */
  const [fontsLoaded] = useFonts({
    "Pretendard-SemiBold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Regular": require("@/assets/fonts/Pretendard-Regular.otf"),
    yeonTheLand: require("@/assets/fonts/yeonTheLand.ttf"),
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      /**
       * 개발 환경일 경우 mirage mock 서버 활성화
       */
      if (process.env.EXPO_PUBLIC_MODE === "dev") {
        new MockApiService().register();
      }

      /**
       * accessToken이 존재할 경우 헤더에 등록
       */
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (accessToken) {
        axios.defaults.headers.common.Authorization = accessToken;
      }

      setReady(true);
    })();
  }, []);

  return (
    <ReduxStore>
      <QueryProvider>
        {fontsLoaded && ready && (
          <ResponsiveLayoutView>
            <GlobalErrorBoundary>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </GlobalErrorBoundary>

            <Toast />
          </ResponsiveLayoutView>
        )}
      </QueryProvider>
    </ReduxStore>
  );
}
