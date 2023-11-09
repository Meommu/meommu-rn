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

export function useThrowRootIfLogin() {
  const { fireToast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        await apiService.getLoginInfo();

        /**
         * 에러가 발생하지 않으면 로그인이 되어 있는 상태이므로
         * 경고 메세지와 함께 루트 페이지로 라우트
         */
        fireToast("잘못된 접근입니다.", 2000);

        router.replace(VIEW_NAME.ROOT);
      } catch (e) {
        // 로그인이 되어어있지 않은 상태이므로 정상적으로 이용
      }
    })();
  }, []);
}
