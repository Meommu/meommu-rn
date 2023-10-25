// react
import { useState, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Swiper from "react-native-web-swiper";
import type { GestureResponderEvent } from "react-native";
import { useForm, FormProvider } from "react-hook-form";

// expo
import { router } from "expo-router";

// components
import { GoBackButton } from "@/components/Button/GoBackButton";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { StepOne } from "@/components/signUpForm/stepOne";
import { StepTwo } from "@/components/signUpForm/stepTwo";
import { Complete } from "@/components/signUpForm/complete";

// constants
import { VIEW_NAME } from "@/constants";

// apis
import { apiService } from "@/apis";

const SLIDE_MAX_COUNT = 3;

export default function SignUp() {
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

  const [swiperIndex, setSwiperIndex] = useState(0);

  const swiper = createRef<Swiper>();

  const swiperIndexChangeHandler = (index: number) => {
    setSwiperIndex(index);
  };

  const nextButtonClickHandler = async (
    event: GestureResponderEvent
  ): Promise<void> => {
    /**
     * 비동기 처리 이후 swiper.current가 null로 변경되는 이슈가 있어 `swiperObj` 변수에 저장해두고 사용
     */
    const swiperObj = swiper.current;

    if (!swiperObj) {
      return;
    }

    if (!isNavigationButtonActive()) {
      return;
    }

    if (!(await isCurrentStepFieldAvailable())) {
      return;
    }

    switch (swiperIndex) {
      case 0:
        swiperObj.goTo(1);

        break;
      case 1:
        handleSubmit(async (formData) => {
          try {
            await apiService.setUserInfo(formData.email);

            swiperObj.goTo(2);
          } catch (e) {
            /**
             * TODO: 회원가입 실패 시 로직 작성
             */
            console.log(e);
          }
        })();

        break;
      case 2:
        router.replace(VIEW_NAME.MAIN);

        break;
      default:
        break;
    }
  };

  const goBackButtonClickHandler = () => {
    if (isLastSlide()) {
      return;
    }

    if (isFirstSlide()) {
      if (!router.canGoBack()) {
        router.replace(VIEW_NAME.HOME);

        return;
      }

      router.back();

      return;
    }

    if (swiper.current) {
      swiper.current.goToPrev();
    }
  };

  const isFirstSlide = () => {
    return swiperIndex === 0;
  };

  const isLastSlide = () => {
    return swiperIndex === SLIDE_MAX_COUNT - 1;
  };

  const formState = watch();

  const isCurrentStepFieldAvailable = async (): Promise<boolean> => {
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
      case 0:
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
        if (!kindergartenName) {
          return false;
        }

        if (!kindergartenDirectorName) {
          return false;
        }

        if (!phoneNumber) {
          return false;
        }

        return true;
      default:
        return true;
    }
  };

  return (
    <FormProvider {...methods}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

              <ScrollView>
                <StepOne />
              </ScrollView>
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

            <View style={[styles.SlideView]}>
              <Complete />
            </View>
          </Swiper>

          <View style={styles.navigationView}>
            <NavigationButton
              backgroundColor={
                isNavigationButtonActive() ? "#8579F1" : "#B7B7CB"
              }
              content={isLastSlide() ? "시작하기" : "다음"}
              onPress={nextButtonClickHandler}
              disabled={swiperIndex === 1 && isSubmitting}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </FormProvider>
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
