import { useState, createRef } from "react";
import { View, Text, GestureResponderEvent } from "react-native";
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
        <View>
          <Text>화면 1</Text>
        </View>
        <View>
          <Text>화면 2</Text>
        </View>
        <View>
          <Text>화면 3</Text>
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
    height: "100%",
    backgroundColor: "red",
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
