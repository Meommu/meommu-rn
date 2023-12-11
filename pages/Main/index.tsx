// react
import React, { Suspense, useCallback } from "react";
import { View, Text } from "react-native";

// expo
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// constants
import { PATH, size } from "@/constants";

// components
import { PlusButton } from "@/components/Button/PlusButton";
import { SettingButton } from "@/components/Button/SettingButton";
import { Header } from "@/components/Layout/Header";
import { DiaryList } from "./components/DiaryList";
import { MonthPicker } from "./components/MonthPicker";
import { MonthPickerSkeleton } from "./components/MonthPicker/index.skeleton";
import { Footer } from "@/components/Layout/Footer";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Popover } from "@/components/Overlay/Popover";

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
          style={styles.scrollGradient}
          colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
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

      <Popover
        id="write"
        content="선생님 지금 시작해보세요"
        bottom={size.NAVIGATION_BUTTON_HEIGHT + size.FOOTER_PADDING_BOTTOM + 24}
      />
    </View>
  );
}
