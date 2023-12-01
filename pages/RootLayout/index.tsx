// react
import { Platform } from "react-native";
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
import { Confirm } from "@/components/Overlay/Confirm";
import { GlobalErrorBoundary } from "./GlobalErrorBoundary";
import { ResponsiveKeyboardAvoidingView } from "./ResponsiveKeyboardAvoidingView";

// apis
import axios from "axios";
import { MockApiService } from "@/mocking/mockApi";

// polyfills
import { polyfill as polyfillReadableStream } from "react-native-polyfill-globals/src/readable-stream";
import { polyfill as polyfillFetch } from "react-native-polyfill-globals/src/fetch";
import { polyfill as polyfillEncoding } from "react-native-polyfill-globals/src/encoding";

/**
 * rn이 아닌 웹 환경에서 polyfill를 실행 할 경우
 * 동작에 문제가 생겨 Platform을 확인 후 적용하도록 구현
 */
if (Platform.OS !== "web") {
  polyfillReadableStream();
  polyfillFetch();
  polyfillEncoding();
}

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
            <ResponsiveKeyboardAvoidingView>
              <GlobalErrorBoundary>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                />
              </GlobalErrorBoundary>

              <Toast />
              <Confirm />
            </ResponsiveKeyboardAvoidingView>
          </ResponsiveLayoutView>
        )}
      </QueryProvider>
    </ReduxStore>
  );
}
