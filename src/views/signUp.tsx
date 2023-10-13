import { useState, createRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Swiper from "react-native-web-swiper";
import { GoBackButton } from "../components/GoBackButton";
import { NavigationButton } from "../components/NavigationButton";
import { useNavigation } from "@react-navigation/native";
import type { GestureResponderEvent } from "react-native";
import { VIEW_NAME } from "../constants";
import { useForm } from "react-hook-form";
import { StepOne } from "./signUpForm/stepOne";

export type SignUpFormFieldValues = {
  email: string;
  emailDupChk: boolean;
  password: string;
  passwordConfirm: string;
  agreement: boolean;
};

const SLIDE_MAX_COUNT = 3;

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<SignUpFormFieldValues>({
    defaultValues: {
      email: "",
      emailDupChk: false,
      password: "",
      passwordConfirm: "",
      agreement: false,
    },
  });

  const navigation = useNavigation();

  const [swiperIndex, setSwiperIndex] = useState(0);

  const swiper = createRef<Swiper>();

  const swiperIndexChangeHandler = (index: number) => {
    setSwiperIndex(index);
  };

  const nextButtonClickHandler = async (
    event: GestureResponderEvent
  ): Promise<void> => {
    if (!swiper.current) {
      return;
    }

    if (!isNavigationButtonActive()) {
      return;
    }

    if (!(await isCurrentStepFieldAvailable())) {
      return;
    }

    if (isLastSlide()) {
      /**
       * TODO: 덮어쓰기 형태로 페이지 이동시키도록 구현
       */
      navigation.navigate(VIEW_NAME.MAIN);

      return;
    }

    swiper.current.goTo(swiperIndex + 1);
  };

  const goBackButtonClickHandler = () => {
    if (isLastSlide()) {
      return;
    }

    if (isFirstSlide()) {
      if (!navigation.canGoBack()) {
        return;
      }

      navigation.goBack();

      return;
    }

    if (!swiper.current) {
      return;
    }

    swiper.current.goToPrev();
  };

  const isFirstSlide = () => {
    return swiperIndex === 0;
  };

  const isLastSlide = () => {
    return swiperIndex === SLIDE_MAX_COUNT - 1;
  };

  const formState = watch();

  const isCurrentStepFieldAvailable = async () => {
    switch (swiperIndex) {
      case 0:
        return (
          (await trigger("email")) &&
          (await trigger("password")) &&
          (await trigger("passwordConfirm"))
        );
      default:
        return true;
    }
  };

  const isNavigationButtonActive = (): boolean => {
    const { password, passwordConfirm, emailDupChk, agreement } = formState;

    switch (swiperIndex) {
      case 0:
        /**
         * - 이메일 중복여부, 유효성 체크
         * - 비밀번호 유효성, 일치 여부 체크
         * - 약관 동의 여부 체크
         */
        if (!emailDupChk) {
          return false;
        }

        if (!agreement) {
          return false;
        }

        if (!password || !passwordConfirm) {
          return false;
        }

        return true;
      case 1:
        /**
         * - 유치원 이름 입력, 유효성 체크
         * - 대표자 이름 입력, 유효성 체크
         * - 전화번호 입력, 유효성 체크
         */
        return true;
      default:
        return true;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <GoBackButton
          onPress={goBackButtonClickHandler}
          disable={isLastSlide()}
        />
      </View>

      <Swiper
        ref={swiper}
        controlsEnabled={false}
        onIndexChanged={swiperIndexChangeHandler}
        gesturesEnabled={() => false}
        loop={false}
        springConfig={{
          tension: 0,
        }}
      >
        <View>
          <View style={styles.GuideText}>
            <Text style={styles.GreetingText}>
              안녕하세요,{"\n"}
              멈무유치원에 오신걸 환영합니다!
            </Text>
            <Text style={styles.IntroductionText}>
              반려동물과의 건강한 추억을 기록해드리겠습니다.
            </Text>
          </View>

          <StepOne control={control} setValue={setValue} errors={errors} />
        </View>

        <View>
          <Text>페이지 2</Text>
        </View>

        <View>
          <Text>페이지 3</Text>
        </View>
      </Swiper>

      <Text>
        [폼 상태]{"\n"}
        {JSON.stringify(formState, null, 2)}
      </Text>
      <Text>
        [폼 오류]{"\n"}
        {JSON.stringify(errors, null, 2)}
      </Text>

      <View style={styles.navigationView}>
        <NavigationButton
          backgroundColor={isNavigationButtonActive() ? "#8579F1" : "#B7B7CB"}
          content={isLastSlide() ? "시작하기" : "다음"}
          onPress={nextButtonClickHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },

  headerView: {
    padding: 20,
  },

  navigationView: {
    padding: 20,
  },

  GuideText: {
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },

  GreetingText: {
    fontSize: 25,
    fontFamily: "Pretendard-SemiBold",
  },

  IntroductionText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    color: "#B7B7CB",
  },
});
