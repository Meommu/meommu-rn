// react
import { View, Platform } from "react-native";
import React, { useCallback, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactQueryDevtools } from "react-query/devtools";

// redux
import { store } from "../ReduxStore";

// expo
import { router } from "expo-router";

// constants
import { CODE, PATH } from "@/constants";

// apis
import axios, { AxiosError } from "axios";

// utils
import { fireToast } from "@/utils";

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const errorHandler = useCallback(async (error: unknown) => {
    const axiosError = error as AxiosError;

    if (!axiosError.response) {
      return;
    }

    const { code, message } = axiosError.response
      .data as unknown as ResponseTemplate<unknown>;

    switch (code) {
      case CODE.BAD_REQUEST:
      case CODE.BAD_EMAIL:
      case CODE.INTERNAL_SERVER_ERROR:
      case CODE.JSON_PROCESSING_ERROR:
        fireToast(store.dispatch, message, 3000);

        break;

      case CODE.EMAIL_DUP:
        fireToast(store.dispatch, "이메일을 다시 확인하세요.", 3000);

        break;

      case CODE.LOGIN_FAILED:
        fireToast(store.dispatch, "로그인이 실패하였습니다.", 3000);

        break;

      case CODE.UNSUPPORTED_JWT:
      case CODE.EXPIRED_JWT:
      case CODE.MALFORMED_JWT:
      case CODE.INVALID_SIGNATURE:
      case CODE.INVALID_HEADER_FORMAT:
        delete axios.defaults.headers.common.Authorization;

        await AsyncStorage.removeItem("accessToken");

      case CODE.NO_AUTHORIZATION_HEADER:
        fireToast(store.dispatch, "잘못된 접근입니다.", 3000);

        queryClient.removeQueries({
          predicate: ({ queryKey }) => {
            const [queryType, ..._] = queryKey;

            return queryType === "diaryImage" ? false : true;
          },
        });

        router.replace(PATH.HOME);

        break;

      case CODE.DIARY_NOT_FOUND:
        fireToast(store.dispatch, message, 3000);

        router.replace(PATH.MAIN);
    }
  }, []);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            onError: errorHandler,
            refetchOnWindowFocus: false,
            retry: 0,
            staleTime: Infinity,
          },
          mutations: {
            onError: errorHandler,
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {Platform.OS === "web" && process.env.EXPO_PUBLIC_MODE === "dev" && (
        <View style={{ position: "absolute" }}>
          <ReactQueryDevtools />
        </View>
      )}
    </QueryClientProvider>
  );
}
