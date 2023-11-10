// react
import { useEffect } from "react";

// apis
import { apiService } from "@/apis";

// expo
import { router } from "expo-router";

// hooks
import { useToast } from "./useToast";

// constants
import { VIEW_NAME } from "@/constants";

export function useThrowRootIfLogout() {
  const { fireToast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        await apiService.getLoginInfo();
      } catch (e) {
        fireToast("잘못된 접근입니다.", 2000);

        router.replace(VIEW_NAME.ROOT);
      }
    })();
  }, []);
}

export function useThrowRootIfLogin() {
  const { fireToast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        await apiService.getLoginInfo();

        fireToast("잘못된 접근입니다.", 2000);

        router.replace(VIEW_NAME.ROOT);
      } catch (e) {}
    })();
  }, []);
}
