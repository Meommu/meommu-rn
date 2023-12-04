// react
import React, { Suspense, useCallback } from "react";
import { View, Text } from "react-native";

// expo
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// constants
import { PATH, color } from "@/constants";

// components
import { PlusButton } from "@/components/Button/PlusButton";
import { SettingButton } from "@/components/Button/SettingButton";
import { Header } from "@/components/Layout/Header";
import { DiaryList } from "./DiaryList";
import { MonthPicker } from "./MonthPicker";
import { MonthPickerSkeleton } from "./MonthPicker/index.skeleton";
import { Footer } from "@/components/Layout/Footer";
import { NavigationButton } from "@/components/Button/NavigationButton";

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
        <MonthPicker />
      </Suspense>

      {/**
       * Suspense를 사용하지 않고, 내부적으로 `isLoading` 상태를 사용한 이유는,
       * 추후 무한 스크롤을 구현할 때 사용되기 때문임.
       */}
      <DiaryList />

      <View style={styles.footerWrapper}>
        <LinearGradient
          style={{ height: 30 }}
          colors={[color.w, "transparent"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />

        <Footer style={styles.footer}>
          <NavigationButton
            content="작성하기"
            onPress={handleWriteButtonClick}
          />
        </Footer>
      </View>
    </View>
  );
}
