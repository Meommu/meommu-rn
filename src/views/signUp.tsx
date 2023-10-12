import { useState, createRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Swiper from "react-native-web-swiper";
import { GoBackButton } from "../components/GoBackButton";
import { NavigationButton } from "../components/NavigationButton";
import { useNavigation } from "@react-navigation/native";
import type { GestureResponderEvent } from "react-native";
import { VIEW_NAME } from "../constants";

const SLIDE_MAX_COUNT = 3;

export function SignUp() {
  const [isEmailDup, setIsEmailDup] = useState(true);

  const navigation = useNavigation();

  const [swiperIndex, setSwiperIndex] = useState(0);

  const swiper = createRef<Swiper>();

  const swiperIndexChangeHandler = (index: number) => {
    setSwiperIndex(index);
  };

  const nextButtonClickHandler = (event: GestureResponderEvent): void => {
    if (!swiper.current) {
      return;
    }

    if (!isNavigationButtonActive()) {
      return;
    }

    if (isLastSlide()) {
      /**
       * TODO: 덮어쓰기 형태로 페이지 이동시키도록 구현
       */
      navigation.navigate(VIEW_NAME.MAIN);

      return;
    }

    const index = swiper.current.getActiveIndex();

    swiper.current.goTo(index + 1);
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

  const isNavigationButtonActive = (): boolean => {
    if (!swiper.current) {
      return false;
    }

    const index = swiper.current.getActiveIndex();

    switch (index) {
      case 0:
        /**
         * - 이메일 중복여부 체크
         * - 비밀번호 유효성, 일치 여부 체크
         * - 약관 동의 여부 체크
         */
        return !isEmailDup;
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
          <Text>페이지 1</Text>
        </View>
        <View>
          <Text>페이지 2</Text>
        </View>
        <View>
          <Text>페이지 3</Text>
        </View>
      </Swiper>

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
});
