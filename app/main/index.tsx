// react
import React, { Suspense } from "react";
import { View, Text, StyleSheet } from "react-native";

// expo
import { router } from "expo-router";

// constants
import { PATH } from "@/constants";

// components
import { PlusButton } from "@/components/Button/PlusButton";
import { SettingButton } from "@/components/Button/SettingButton";
import { DiaryList } from "@/components/DiaryList";
import { Header } from "@/components/Layout/Header";
import {
  MonthPickerOpenController,
  MonthPickerOpenControllerSkeleton,
} from "@/components/MonthPickerOpenController";

// hooks
import { useThrowHomeIfLogout } from "@/hooks/useAccessControl";

export default function Main() {
  useThrowHomeIfLogout();

  /**
   * 컨트롤러(세팅, 글쓰기) 버튼 핸들러
   */
  const handleSettingButtonClick = () => {
    router.push(PATH.SETTING);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header
          left={<Text style={styles.logoText}>meommu</Text>}
          right={
            <View style={styles.controllerBox}>
              <SettingButton
                onPress={handleSettingButtonClick}
                testID="button-setting"
              />
              <PlusButton />
            </View>
          }
        />
      </View>

      <Suspense fallback={<MonthPickerOpenControllerSkeleton />}>
        <MonthPickerOpenController />
      </Suspense>

      <DiaryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },

  /**
   * header
   */
  headerWrapper: {
    padding: 20,
  },

  logoText: {
    fontSize: 30,
    fontFamily: "yeonTheLand",
  },

  /**
   * controller
   */
  controllerBox: {
    flexDirection: "row",
    paddingVertical: 8,
    gap: 16,
  },
});
