// react
import { Suspense, useCallback } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import { router } from "expo-router";

// constants
import { PATH } from "@/constants";

// components
import { GoBackButton } from "@/components/Button/GoBackButton";
import { Header } from "@/components/Layout/Header";
import { Profile, ProfileSkeleton } from "@/components/Profile";

// apis
import axios from "axios";

export default function Setting() {
  const handleLogoutButtonClick = async () => {
    delete axios.defaults.headers.common.Authorization;

    await AsyncStorage.removeItem("accessToken");

    router.replace(PATH.HOME);
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },

  content: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  header: {
    padding: 12,
  },

  profile: {
    paddingHorizontal: 20,
  },

  sign: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    padding: 20,
  },

  signButton: {
    width: "50%",
  },

  signButtonText: {
    color: "#ABB0BA",
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    textAlign: "center",
  },

  splitBar: {
    borderWidth: 1,
    borderColor: "#ABB0BA",
  },
});
