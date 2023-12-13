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
import { ProfileCard } from "./components/ProfileCard";
import { ProfileCardSkeleton } from "./components/ProfileCard/index.skeleton";
import { TransparentButton } from "@/components/Button/TransparentButton";

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
  const { openConfirm } = useConfirm();

  const handleLogoutButtonClick = useCallback(async () => {
    openConfirm({
      title: "로그아웃",
      body: "로그아웃 후 알림을 받을 수 없습니다.",
      button: {
        ok: {
          message: "로그아웃",
          callback: async () => {
            delete axios.defaults.headers.common.Authorization;

            await AsyncStorage.removeItem("accessToken");

            router.replace(PATH.HOME);
          },
        },
        cancel: {
          message: "이전",
        },
      },
    });
  }, []);

  const handleResignButtonClick = useCallback(async () => {
    openConfirm({
      title: "회원탈퇴",
      body: '그 동안 작성했던 모든 일기와 입력했던 정보들이 삭제됩니다.\n계속하시겠으면 "탈퇴하겠습니다."를 입력해주세요.',
      button: {
        ok: {
          lock: "탈퇴하겠습니다.",
          message: "회원탈퇴",
          callback: async () => {
            delete axios.defaults.headers.common.Authorization;

            await AsyncStorage.removeItem("accessToken");

            await apiService.resignUser();

            router.replace(PATH.HOME);
          },
        },
        cancel: {
          message: "이전",
        },
      },
    });
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

      <View style={styles.content}>
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
      </View>

      <View style={styles.signLayout}>
        <TransparentButton
          content="로그아웃"
          onPress={handleLogoutButtonClick}
          testID="button-logout"
        />

        <View style={styles.splitBar} />

        <TransparentButton
          content="회원 탈퇴"
          onPress={handleResignButtonClick}
        />
      </View>
    </View>
  );
}
