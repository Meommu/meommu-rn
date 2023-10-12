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

    swiper.current.goToNext();

    const index = swiper.current.getActiveIndex();

    if (index === SLIDE_MAX_COUNT - 1) {
      navigation.navigate(VIEW_NAME.MAIN);
    }
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

  const isNavigationButtonActive = () => {
    /**
     * TODO: 현재 단계에 따라 다음 단계로 넘어갈 수 있는지 판단하는 함수 구현
     */
    return true;
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
