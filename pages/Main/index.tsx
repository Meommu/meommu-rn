// react
import React, { Suspense, useCallback } from "react";
import { View, Text } from "react-native";

// components
import { PlusButton } from "@/components/Button/PlusButton";
import { SettingButton } from "@/components/Button/SettingButton";
import { Header } from "@/components/Layout/Header";
import { DiaryList } from "./components/DiaryList";
import { MonthPicker } from "./components/MonthPicker";
import { MonthPickerSkeleton } from "./components/MonthPicker/index.skeleton";
import { MonthPickerController } from "./components/MonthPickerController";
import { FixedRelativeView } from "@/components/Layout/FixedRelativeView";

// constants
import { size } from "@/constants";

// hooks
import { useExpoRouter } from "@/hooks";

// utils
import { sleep } from "@/utils";

// styles
import { styles } from "./index.styles";

export function MainPage() {
  const { router } = useExpoRouter("main");

  const handleSettingButtonClick = useCallback(async () => {
    await sleep(size.BUTTON_PRESS_IN_OUT_DURATION * 2);

    router.goToSettingPage();
  }, []);

  const handleWriteButtonClick = useCallback(async () => {
    await sleep(size.BUTTON_PRESS_IN_OUT_DURATION * 2);

    router.goToWritePage();
  }, []);

  return (
    <FixedRelativeView style={styles.container}>
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
    </FixedRelativeView>
  );
}
