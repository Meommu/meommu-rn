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
import { DiaryList } from "./components/DiaryList";
import { MonthPicker } from "./components/MonthPicker";
import { MonthPickerSkeleton } from "./components/MonthPicker/index.skeleton";
import { MonthPickerController } from "./components/MonthPickerController";

// styles
import { styles } from "./index.styles";

export function MainPage() {
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
        <MonthPickerController />
      </Suspense>

      <MonthPicker />

      {/**
       * Suspense를 사용하지 않고, 내부적으로 `isLoading` 상태를 사용한 이유는,
       * 추후 무한 스크롤을 구현할 때 사용되기 때문임.
       */}
      <DiaryList />
    </View>
  );
}
