// react
import { View, StyleSheet, Platform, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import type { StyleProp, ViewStyle } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// redux
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "@/store";

// expo
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import Constants from "expo-constants";
import { router } from "expo-router";

// utils
import { fireToast } from "@/utils";

// components
import { Toast } from "@/components/Overlay/Toast";

// constants
import { CODE, VIEW_NAME, size } from "@/constants";

// axios
import axios, { AxiosError } from "axios";

// mocking api
import { MockApiService } from "@/mocking/mockApi";

/**
 * redux 저장소
 */
const store = createStore(rootReducer);

/**
 * 중앙 집중식 에러 처리
 */
const errorHandler = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    /**
     * TODO: api 이외의 에러에 대한 처리
     */
    return;
  }

  if (!error.response) {
    return;
  }

  const { code, message } = error.response
    .data as unknown as ResponseTemplate<unknown>;

  switch (code) {
    case CODE.BAD_REQUEST:
    case CODE.BAD_EMAIL:
      fireToast(store.dispatch, message, 3000);

      break;
    case CODE.EMAIL_DUP:
      fireToast(store.dispatch, "이메일을 다시 확인하세요.", 3000);

      break;

    case CODE.LOGIN_FAILED:
      fireToast(store.dispatch, "로그인이 실패하였습니다.", 3000);

      break;
    case CODE.INTERNAL_SERVER_ERROR:
    case CODE.JSON_PROCESSING_ERROR:
      fireToast(store.dispatch, message, 3000);

      break;
    case CODE.UNSUPPORTED_JWT:
    case CODE.EXPIRED_JWT:
    case CODE.MALFORMED_JWT:
    case CODE.INVALID_SIGNATURE:
    case CODE.NO_AUTHORIZATION_HEADER:
    case CODE.INVALID_HEADER_FORMAT:
      (async () => {
        delete axios.defaults.headers.common.Authorization;

        await AsyncStorage.removeItem("accessToken");

        router.replace(VIEW_NAME.HOME);
      })();

      break;
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: errorHandler,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: errorHandler,
    },
  },
});

const mobileLayoutStyle: StyleProp<ViewStyle> = {
  width: "auto",
  maxWidth: "100%",
  height: "100%",
  aspectRatio: "9 / 16",
};

const hiddenStyle: StyleProp<ViewStyle> = {
  display: "none",
};

const dummyStyle: StyleProp<ViewStyle> = {};

export default function AppLayout() {
  /**
   * 반응형 레이아웃
   */
  const { width } = useWindowDimensions();

  const [isPcWeb, setIsPcWeb] = useState<boolean | null>(null);

  useEffect(() => {
    setIsPcWeb(Platform.OS === "web" && width >= size.LAPTOP_WIDTH);
  }, [width]);

  /**
   * 초기 설정
   */
  const [fontsLoaded] = useFonts({
    "Pretendard-SemiBold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {fontsLoaded && ready && (
          <View
            style={[
              styles.container,
              isPcWeb === null
                ? hiddenStyle
                : isPcWeb
                ? mobileLayoutStyle
                : dummyStyle,
            ]}
          >
            <Stack screenOptions={{ headerShown: false }} />
            <Toast />
          </View>
        )}
      </QueryClientProvider>
    </Provider>
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
