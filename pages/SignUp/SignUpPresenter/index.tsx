// react
import { View } from "react-native";
import { useFormContext } from "react-hook-form";
import Swiper from "react-native-web-swiper";
import type { MutableRefObject } from "react";

// components
import { GoBackButton } from "@/components/Button/GoBackButton";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Header } from "@/components/Layout/Header";
import { SwiperIndexForTest } from "@/components/Widget/SwiperIndexForTest";
import { SignUpFormStepOne } from "../SignUpForm/SignUpFormStepOne";
import { SignUpFormStepTwo } from "../SignUpForm/SignUpFormStepTwo";
import { SignUpFormStepThree } from "../SignUpForm/SignUpFormStepThree";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

interface SignUpPresenterPrpos {
  swiperIndex: number;
  swiperRef: MutableRefObject<Swiper | null>;
  handleSwiperIndexChange: (index: number) => void;
  handleNextButtonClick: () => Promise<void>;
  handleGoBackButtonClick: () => void;
  isNextButtonActive: () => boolean;
  isLastSlide: () => boolean;
}

export function SignUpPresenter({
  swiperIndex,
  swiperRef,
  handleSwiperIndexChange,
  handleGoBackButtonClick,
  handleNextButtonClick,
  isNextButtonActive,
  isLastSlide,
}: SignUpPresenterPrpos) {
  const {
    formState: { isSubmitting },
  } = useFormContext<SignUpFormFieldValues>();

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        left={
          <GoBackButton
            onPress={handleGoBackButtonClick}
            isHidden={isLastSlide()}
            disabled={isLastSlide()}
          />
        }
      />

      <Swiper
        ref={swiperRef}
        controlsEnabled={false}
        onIndexChanged={handleSwiperIndexChange}
        gesturesEnabled={() => false}
        loop={false}
        springConfig={{
          tension: 0,
        }}
      >
        <SignUpFormStepOne />
        <SignUpFormStepTwo />
        <SignUpFormStepThree />
      </Swiper>

      <View style={styles.navigationView}>
        <NavigationButton
          content={isLastSlide() ? "시작하기" : "다음"}
          onPress={handleNextButtonClick}
          disabled={!isNextButtonActive()}
          /**
           * TODO: useMutation의 로딩 상태로 변경
           */
          isLoading={isSubmitting}
          testID="button-next-step-of-signup"
        />
      </View>

      <SwiperIndexForTest swiperIndex={swiperIndex} />
    </View>
  );
}
