// react
import type { MutableRefObject } from "react";
import { useFormContext } from "react-hook-form";
import { Pressable, View, Text } from "react-native";
import Swiper from "react-native-web-swiper";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "@/components/Button/GoBackButton";
import { WriteFormStepOne } from "@/pages/Write/WriteForm/WriteFormStepOne";
import { WriteFormStepTwo } from "@/pages/Write/WriteForm/WriteFormStepTwo";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

interface WritePresenterProps {
  swiperRef: MutableRefObject<Swiper | null>;
  handleBottomButtonClick: () => void;
  handleFinishButtonClick: () => void;
  handleGoBackButtonClick: () => void;
  handleSwiperIndexChange: (index: number) => void;
  isBottomButtonActive: () => boolean;
  isLastSlide: () => boolean;
}

export function WritePresenter({
  swiperRef,
  handleBottomButtonClick,
  handleFinishButtonClick,
  handleGoBackButtonClick,
  handleSwiperIndexChange,
  isBottomButtonActive,
  isLastSlide,
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
    </View>
  );
}
