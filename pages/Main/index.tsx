// react
import React, { Suspense, useCallback } from "react";
import { View, Text } from "react-native";

// expo
import { router } from "expo-router";

// constants
import { PATH } from "@/constants";

// components
import { PlusButton } from "@/components/Button/PlusButton";
import { SettingButton } from "@/components/Button/SettingButton";
import { Header } from "@/components/Layout/Header";
import { DiaryList } from "./DiaryList";
import { MonthPicker } from "./MonthPicker";
import { MonthPickerSkeleton } from "./MonthPicker/index.skeleton";

// styles
import { styles } from "./index.styles";

export function MainPage() {
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

      <Suspense fallback={<MonthPickerSkeleton />}>
        <MonthPicker />
      </Suspense>

      <DiaryList />
    </View>
  );
}
