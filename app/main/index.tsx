// react
import React, { Suspense, useCallback } from "react";
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

export default function Main() {
  /**
   * 컨트롤러(세팅, 글쓰기) 버튼 핸들러
   */
  const handleSettingButtonClick = useCallback(() => {
    router.push(PATH.SETTING);
  }, []);

  const handleWriteButtonClick = useCallback(() => {
    router.push(PATH.WRITE);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        left={<Text style={styles.logoText}>meommu</Text>}
        right={
          <View style={styles.controllerBox}>
            <SettingButton
              onPress={handleSettingButtonClick}
              testID="button-setting"
            />
            <PlusButton
              onPress={handleWriteButtonClick}
              testID="button-write"
            />
          </View>
        }
      />

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
  header: {
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 12,
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
  },
});
