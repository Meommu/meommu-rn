// react
import { Suspense, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "react-query";

// expo
import { router } from "expo-router";

// constants
import { PATH } from "@/constants";

// components
import { GoBackButton } from "@/components/Button/GoBackButton";
import { Header } from "@/components/Layout/Header";
import { Profile } from "./Profile";
import { ProfileSkeleton } from "./Profile/index.skeleton";

// apis
import axios from "axios";

// styles
import { styles } from "./index.styles";

// hooks
import { useConfirm } from "@/hooks";

export function SettingPage() {
  const queryClient = useQueryClient();

  const { openConfirm } = useConfirm();

  const handleLogoutButtonClick = useCallback(async () => {
    openConfirm(
      "로그아웃",
      "로그아웃 후 알림을 받을 수 없습니다.",
      async () => {
        delete axios.defaults.headers.common.Authorization;

        await AsyncStorage.removeItem("accessToken");

        /**
         * TODO: 종종 로그아웃 시 쿼리 데이터 삭제로 인해 무한으로 api 요청이 반복되는 이슈 해결
         */
        queryClient.removeQueries();

        router.replace(PATH.HOME);
      },
      "로그아웃",
      "이전"
    );
  }, []);

  const handleResignButtonClick = useCallback(async () => {
    openConfirm(
      "회원탈퇴",
      "그 동안 작성했던 모든 일기와 입력했던 정보들이 삭제됩니다.",
      async () => {
        openConfirm(
          "정말 탈퇴하시겠어요?",
          "이 작업은 돌이킬 수 없습니다.",
          async () => {
            delete axios.defaults.headers.common.Authorization;

            await AsyncStorage.removeItem("accessToken");

            /**
             * TODO: 회원탈퇴 api 구현
             */

            router.replace(PATH.HOME);
          },
          "탈퇴하기",
          "취소"
        );
      },
      "회원탈퇴",
      "이전"
    );
  }, []);

  const handleGoBackButtonClick = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(PATH.MAIN);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header
          title="설정"
          style={styles.header}
          left={<GoBackButton onPress={handleGoBackButtonClick} />}
        />

        <View style={styles.profile}>
          <Suspense fallback={<ProfileSkeleton />}>
            <Profile />
          </Suspense>
        </View>

        <View style={styles.sign}>
          <Pressable
            style={styles.signButton}
            onPress={handleLogoutButtonClick}
            testID="button-logout"
          >
            <Text style={styles.signButtonText}>로그아웃</Text>
          </Pressable>

          <View style={styles.splitBar} />

          <Pressable
            style={styles.signButton}
            onPress={handleResignButtonClick}
          >
            <Text style={styles.signButtonText}>회원 탈퇴</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
