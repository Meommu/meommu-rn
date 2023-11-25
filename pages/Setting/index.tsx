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
import { useConfirm } from "@/hooks";

export function SettingPage() {
  const queryClient = useQueryClient();

  const { openConfirm } = useConfirm();

  const handleLogoutButtonClick = async () => {
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
  };

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

          <Pressable style={styles.signButton}>
            <Text style={styles.signButtonText}>회원 탈퇴</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
