// react
import { useEffect } from "react";

// expo
import { router } from "expo-router";

// apis
import { apiService } from "@/apis";

// constants
import { PATH } from "@/constants";

// hooks
import { useToast } from "./useToast";

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
