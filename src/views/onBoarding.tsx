import { useState, createRef } from "react";
import { View, Text, Image, GestureResponderEvent } from "react-native";
import { StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { NavigationButton } from "../components/NavigationButton";
import Constants from "expo-constants";
import type { SwiperStates } from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import { VIEW_NAME } from "../constants";

export function OnBoarding() {
  const [swiperIndex, setSwiperIndex] = useState(0);

  const swiper = createRef<Swiper>();

  const navigation = useNavigation();

  const swiperIndexChangeHandler = (index: number) => {
    setSwiperIndex(index);
  };

  const nextButtonClickHandler = (event: GestureResponderEvent): void => {
    if (!swiper.current) {
      return;
    }

    const { index, total } = swiper.current.state as SwiperStates;

    if (index < total - 1) {
      swiper.current.scrollTo(index + 1);
    }

    /**
     * TODO: OnBoarding 종료 기록
     */
    if (index === total - 1) {
      navigation.navigate(VIEW_NAME.HOME);
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiper}
        style={styles.swiper}
        dotColor="#CCCCD9"
        activeDotColor="#565667"
        loop={false}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.dotStyle}
        onIndexChanged={swiperIndexChangeHandler}
      >
        <View style={styles.slideLayout}>
          <Text style={styles.guideText}>
            추억하고 싶은 순간을{"\n"}멈무일기에서 기록해봐요!
          </Text>
          <Image
            style={styles.imageLayout}
            source={require("../../assets/images/onboarding/onboarding-1.png")}
          />
        </View>
        <View style={styles.slideLayout}>
          <Text style={styles.guideText}>
            활동을 카테고리에 따라{"\n"}
            GPT로 간단하게 완성해봐요!
          </Text>
          <Image
            style={styles.imageLayout}
            source={require("../../assets/images/onboarding/onboarding-2.png")}
          />
        </View>
        <View style={styles.slideLayout}>
          <Text style={styles.guideText}>
            {" "}
            글과 사진을 함께 구성하며{"\n"}지루하지 않게 꾸며봐요!
          </Text>
          <Image
            style={styles.imageLayout}
            source={require("../../assets/images/onboarding/onboarding-3.png")}
          />
        </View>
      </Swiper>

      <View style={styles.buttonView}>
        <NavigationButton
          content={swiperIndex === 2 ? "시작하기" : "다음"}
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
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 40,
  },
  swiper: {
    /**
     * ※ width 값을 고정시키면 슬라이더가 동작하지 않음
     */
    height: "100%",
  },
  slideLayout: {
    width: "100%",
    height: "100%",
  },
  guideText: {
    fontSize: 25,
    fontFamily: "Pretendard-SemiBold",
    position: "absolute",
    left: 20,
    top: 108 - Constants.statusBarHeight,
  },
  imageLayout: {
    width: "100%",
    height: "100%",
    marginTop: 60,
  },
  buttonView: {
    width: "100%",
    padding: 20,
  },
  dotStyle: {
    marginLeft: 3.75,
    marginRight: 3.75,
    width: 6,
    height: 6,
  },
});
