// react
import { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Swiper from "react-native-web-swiper";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";

// expo
import { router } from "expo-router";

// components
import { GoBackButton } from "@/components/Button/GoBackButton";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { StepOne } from "@/components/signUpForm/stepOne";
import { StepTwo } from "@/components/signUpForm/stepTwo";
import { Complete } from "@/components/signUpForm/complete";
import { KView } from "@/components/Layout/KView";
import { Header } from "@/components/Layout/Header";
import { SwiperIndexForTest } from "@/components/SwiperIndexForTest";

// constants
import { PATH, color } from "@/constants";

// apis
import { apiService } from "@/apis";

// hooks
import { useThrowMainIfLogin } from "@/hooks/useAccessControl";

const FIRST_SLIDE_INDEX = 0;
const SECOND_SLIDE_INDEX = 1;
const LAST_SLIDE_INDEX = 2;

export default function SignUp() {
  /**
   * 접근제어
   */
  useThrowMainIfLogin();

  /**
   * useForm
   */
  const methods = useForm<SignUpFormFieldValues>({
    defaultValues: {
      email: "",
      emailDupChk: null,
      password: "",
      passwordConfirm: "",
      agreement: false,
      kindergartenName: "",
      kindergartenDirectorName: "",
      phoneNumber: "",
    },
  });

  const {
    handleSubmit,
    watch,
    trigger,
    formState: { isSubmitting },
  } = methods;

  const formState = watch();

  /**
   * swiper
   */
  const [swiperIndex, setSwiperIndex] = useState(FIRST_SLIDE_INDEX);

  const swiper = useRef<Swiper>(null);

  const swiperIndexChangeHandler = useCallback((index: number) => {
    setSwiperIndex(index);
  }, []);

  /**
   * useMutation
   */
  const signUpMutation = useMutation(
    async (data: SignUpFormFieldValues) => {
      await apiService.setUserInfo(data);
    },
    {
      onSuccess: () => {
        swiper.current?.goTo(LAST_SLIDE_INDEX);
      },
    }
  );

  /**
   * button onPress handler
   */
  const handleNextButtonClick = useCallback(async () => {
    if (!swiper.current) {
      return;
    }

    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        if (
          !(await trigger("email")) ||
          !(await trigger("password")) ||
          !(await trigger("passwordConfirm"))
        ) {
          break;
        }

        swiper.current.goTo(SECOND_SLIDE_INDEX);

        break;

      case SECOND_SLIDE_INDEX:
        handleSubmit(async (formData) => {
          signUpMutation.mutate(formData);
        })();

        break;

      case LAST_SLIDE_INDEX:
        router.replace(PATH.HOME);

        break;
    }
  }, [swiper, swiperIndex]);

  const handleGoBackButtonClick = useCallback(() => {
    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        router.replace(PATH.HOME);

        break;

      case LAST_SLIDE_INDEX:
        break;

      default:
        swiper.current?.goToPrev();
    }
  }, [swiper, swiperIndex, trigger]);

  /**
   * util 함수
   */
  const isNextButtonActive = useCallback((): boolean => {
    const {
      password,
      passwordConfirm,
      emailDupChk,
      agreement,
      kindergartenName,
      kindergartenDirectorName,
      phoneNumber,
    } = formState;

    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        if (!emailDupChk || !agreement || !password || !passwordConfirm) {
          return false;
        }

        return true;
      case SECOND_SLIDE_INDEX:
        if (!kindergartenName || !kindergartenDirectorName || !phoneNumber) {
          return false;
        }

        return true;
      default:
        return true;
    }
  }, [formState, swiperIndex]);

  return (
    <FormProvider {...methods}>
      <KView style={styles.container}>
        {/**
         * header
         */}
        <Header
          style={styles.header}
          left={
            swiperIndex !== LAST_SLIDE_INDEX && (
              <GoBackButton onPress={handleGoBackButtonClick} />
            )
          }
        />

        {/**
         * content (swiper)
         */}
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
          <View style={styles.SlideView}>
            <View style={styles.GuideText}>
              <Text style={styles.GreetingText}>
                안녕하세요,{"\n"}
                멈무유치원에 오신걸 환영합니다!
              </Text>
              <Text style={styles.IntroductionText}>
                반려동물과의 건강한 추억을 기록해드리겠습니다.
              </Text>
            </View>

            <StepOne />
          </View>

          <View style={styles.SlideView}>
            <View style={styles.GuideText}>
              <Text style={styles.GreetingText}>
                이제 곧 끝나요!{"\n"}
                유치원 정보를 입력해주세요
              </Text>
              <Text style={styles.IntroductionText}>
                반려동물과의 건강한 추억을 기록해드리겠습니다.
              </Text>
            </View>

            <StepTwo />
          </View>

          <View style={styles.SlideView}>
            <Complete />
          </View>
        </Swiper>

        {/**
         * navigation button
         */}
        <View style={styles.navigationView}>
          <NavigationButton
            backgroundColor={
              isNextButtonActive() ? color.primary : color.inactive
            }
            content={swiperIndex === LAST_SLIDE_INDEX ? "시작하기" : "다음"}
            onPress={handleNextButtonClick}
            disabled={!isNextButtonActive() || isSubmitting}
            testID="button-next-step-of-signup"
          />
        </View>

        <SwiperIndexForTest swiperIndex={swiperIndex} />
      </KView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },

  header: {
    padding: 20,
  },

  navigationView: {
    padding: 20,
  },

  SlideView: {
    width: "100%",
    height: "100%",
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
