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
import { ProfileCard } from "./ProfileCard";
import { ProfileCardSkeleton } from "./ProfileCard/index.skeleton";

// apis
import axios from "axios";
import { apiService } from "@/apis";

// styles
import { styles } from "./index.styles";

// hooks
import { useConfirm } from "@/hooks";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";

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

            await apiService.resignUser();

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

  const handleProfileManageButtonClick = useCallback(() => {
    router.push(PATH.SETTING_PROFILE);
  }, []);

  const handleNoticeButtonClick = useCallback(() => {
    router.push(PATH.SETTING_NOTICE);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="설정"
        style={styles.header}
        left={<GoBackButton onPress={handleGoBackButtonClick} />}
      />

      <View style={styles.profileCardLayout}>
        <Suspense fallback={<ProfileCardSkeleton />}>
          <ProfileCard />
        </Suspense>
      </View>

      <View style={styles.navigationButtonLayout}>
        <Pressable
          style={styles.navigationButton}
          onPress={handleProfileManageButtonClick}
        >
          <Text style={styles.navigationButtonText}>계정 관리</Text>
          <CaretRight />
        </Pressable>

        <Pressable
          style={styles.navigationButton}
          onPress={handleNoticeButtonClick}
        >
          <Text style={styles.navigationButtonText}>공지</Text>
          <CaretRight />
        </Pressable>
      </View>

      <View style={styles.signLayout}>
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
