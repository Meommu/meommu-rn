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

// lodash
import * as _ from "lodash";

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
      case CODE.NO_AUTHORIZATION_HEADER:
        fireToast(store.dispatch, "잘못된 접근입니다.", 3000);

        delete axios.defaults.headers.common.Authorization;

        await AsyncStorage.removeItem("accessToken");

        queryClient.removeQueries({
          predicate: ({ queryKey }) => {
            const [queryType, ..._] = queryKey;

            switch (queryType) {
              case "diaryImage":
              case "writeGuide":
                return false;

              default:
                return true;
            }
          },
        });

        router.replace(PATH.HOME);

        break;

      case CODE.DIARY_NOT_FOUND:
        router.replace(PATH.NOT_FOUND);

        break;

      case CODE.EMAIL_KINDERGARTEN_NOT_FOUND:
        fireToast(store.dispatch, "해당 이메일이 존재하지 않습니다.", 3000);

        break;
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
            useErrorBoundary: (error) =>
              _.get(error, "response.status", -1) >= 500,
          },
          mutations: {
            onError: errorHandler,
            useErrorBoundary: (error) =>
              _.get(error, "response.status", -1) >= 500,
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {Platform.OS === "web" && process.env.EXPO_PUBLIC_MODE !== "prod" && (
        <View style={{ position: "absolute" }}>
          <ReactQueryDevtools />
        </View>
      )}
    </QueryClientProvider>
  );
}
