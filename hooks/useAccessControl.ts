// react
import { useEffect } from "react";

// expo
import { router } from "expo-router";

// apis
import { apiService } from "@/apis";

// constants
import { CODE, PATH } from "@/constants";

// hooks
import { useToast } from "./useToast";

// others
import { globalErrorHandler } from "@/app/_layout";

const UNAUTHORIZED_ERROR = Object.freeze({
  response: { data: { code: CODE.INVALID_HEADER_FORMAT } },
});

export function useThrowHomeIfLogout() {
  useEffect(() => {
    apiService.getLoginInfo().catch(() => {
      globalErrorHandler(UNAUTHORIZED_ERROR);
    });
  }, []);
}

export function useThrowMainIfLogin() {
  const { fireToast } = useToast();

  useEffect(() => {
    apiService
      .getLoginInfo()
      .then(() => {
        fireToast("잘못된 접근입니다.", 2000);

        router.replace(PATH.MAIN);
      })
      .catch(() => {
        // do nothing
      });
  }, []);
}
