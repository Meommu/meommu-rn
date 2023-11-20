// react
import type { MutableRefObject } from "react";
import { useFormContext } from "react-hook-form";
import { Pressable, View, Text, ViewStyle } from "react-native";
import Swiper from "react-native-web-swiper";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "@/components/Button/GoBackButton";
import { WriteFormStepOne } from "@/pages/Write/WriteForm/WriteFormStepOne";
import { WriteFormStepTwo } from "@/pages/Write/WriteForm/WriteFormStepTwo";

// constants
import { color, size } from "@/constants";

// styles
import { styles } from "./index.styles";

// hooks
import { useResponsiveBottomSheet } from "@/hooks";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import type { SharedValue } from "react-native-reanimated";
import type { LayoutChangeEvent } from "react-native";

interface WritePresenterProps {
  swiperRef: MutableRefObject<Swiper | null>;
  handleBottomButtonClick: () => void;
  handleFinishButtonClick: () => void;
  handleGoBackButtonClick: () => void;
  handleSwiperIndexChange: (index: number) => void;
  isBottomButtonActive: () => boolean;
  isLastSlide: () => boolean;

  /**
   * bottom sheet 관련 props
   */
  bottomSheetRef: React.MutableRefObject<BottomSheet | null>;
  bottomSheetMaxWidthStyle: ViewStyle;
  animatedContentHeight: SharedValue<number>;
  animatedHandleHeight: SharedValue<number>;
  animatedSnapPoints: Readonly<{ value: (string | number)[] }>;
  handleContentLayout: ({
    nativeEvent: {
      layout: { height },
    },
  }: LayoutChangeEvent) => void;
}

export function WritePresenter({
  swiperRef,
  handleBottomButtonClick,
  handleFinishButtonClick,
  handleGoBackButtonClick,
  handleSwiperIndexChange,
  isBottomButtonActive,
  isLastSlide,

  bottomSheetRef,
  bottomSheetMaxWidthStyle,
  animatedContentHeight,
  animatedHandleHeight,
  animatedSnapPoints,
  handleContentLayout,
}: WritePresenterProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext<DiaryWriteFormFieldValues>();

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title={isLastSlide() ? "일기쓰기" : "누구에게 보낼 건가요?"}
        left={<GoBackButton onPress={handleGoBackButtonClick} />}
        right={
          isLastSlide() && (
            <Pressable
              style={styles.completeButton}
              onPress={handleFinishButtonClick}
            >
              <Text style={styles.completeButtonText}>완료</Text>
            </Pressable>
          )
        }
      />

      <Swiper
        ref={swiperRef}
        onIndexChanged={handleSwiperIndexChange}
        controlsEnabled={false}
        gesturesEnabled={() => false}
        springConfig={{
          tension: 0,
        }}
      >
        <WriteFormStepOne />
        <WriteFormStepTwo />
      </Swiper>

      <View style={styles.bottomButtonWrapper}>
        <NavigationButton
          onPress={handleBottomButtonClick}
          backgroundColor={
            isBottomButtonActive() ? color.primary : color.inactive
          }
          disabled={!isBottomButtonActive() || isSubmitting}
          content={isLastSlide() ? "멈무일기 가이드" : "다음"}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        containerStyle={[bottomSheetMaxWidthStyle, {}]}
        backgroundStyle={{
          backgroundColor: "#1B1E26",
        }}
        handleIndicatorStyle={{
          backgroundColor: "rgba(235, 235, 245, 0.3)",
          width: "10%",
        }}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          <View
            style={{
              height: size.AI_BOTTOM_SHEET_HEADER_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: size.BOTTOM_SHEET_INDICATOR_HEIGHT,
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Pretendard-SemiBold",
                color: "white",
              }}
            >
              멈무일기 가이드
            </Text>
            <Text
              style={{
                color: "#6F7682",
                fontSize: 14,
              }}
            >
              오늘은 어떤 낮잠 이었나요?
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
