// react
import { useState, createRef, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import { router } from "expo-router";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { BannerImage } from "@/components/Image/BannerImage";

// constants
import { PATH } from "@/constants";

// other library
import Swiper from "react-native-web-swiper";

const FIRST_SLIDE_INDEX = 0;
const SECOND_SLIDE_INDEX = 1;
const LAST_SLIDE_INDEX = 2;

export default function OnBoarding() {
  const [swiperIndex, setSwiperIndex] = useState(FIRST_SLIDE_INDEX);

  const swiper = createRef<Swiper>();

  const handleSwiperIndexChange = useCallback((index: number) => {
    setSwiperIndex(index);
  }, []);

  const handleNextButtonClick = useCallback(async (): Promise<void> => {
    if (!swiper.current) {
      return;
    }

    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
      case SECOND_SLIDE_INDEX:
        swiper.current.goToNext();

        break;

      case LAST_SLIDE_INDEX:
        await AsyncStorage.setItem("onboarding", "end");

        router.replace(PATH.HOME);

        break;
    }
  }, [swiperIndex]);

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiper}
        containerStyle={styles.swiper}
        springConfig={{
          overshootClamping: true,
        }}
        controlsProps={{
          dotsTouchable: true,
          dotActiveStyle: { ...styles.dotStyle, backgroundColor: "#565667" },
          dotProps: {
            badgeStyle: { ...styles.dotStyle, backgroundColor: "#CCCCD9" },
            containerStyle: { margin: 0 },
          },
          nextPos: false,
          prevPos: false,
        }}
        onIndexChanged={handleSwiperIndexChange}
      >
        <View style={styles.slideLayout}>
          <Text style={styles.guideText}>
            추억하고 싶은 순간을{"\n"}멈무일기에서 기록해봐요!
          </Text>

          <BannerImage
            source={require("@/assets/images/onboarding/onboarding-1.png")}
          />
        </View>

        <View style={styles.slideLayout}>
          <Text style={styles.guideText}>
            활동을 카테고리에 따라{"\n"}
            GPT로 간단하게 완성해봐요!
          </Text>

          <BannerImage
            source={require("@/assets/images/onboarding/onboarding-2.png")}
          />
        </View>

        <View style={styles.slideLayout}>
          <Text style={styles.guideText}>
            글과 사진을 함께 구성하며{"\n"}지루하지 않게 꾸며봐요!
          </Text>

          <BannerImage
            source={require("@/assets/images/onboarding/onboarding-3.png")}
          />
        </View>
      </Swiper>

      <View style={styles.buttonView}>
        <NavigationButton
          content={swiperIndex === LAST_SLIDE_INDEX ? "시작하기" : "다음"}
          onPress={handleNextButtonClick}
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

  swiper: {
    /**
     * ※ width 값을 고정시키면 슬라이더가 동작하지 않음
     */
    height: "100%",
  },

  slideLayout: {
    width: "100%",
    height: "100%",
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
  },

  guideText: {
    fontSize: 25,
    fontFamily: "Pretendard-SemiBold",
    position: "absolute",
    left: 20,
    top: 64,
    zIndex: 1,
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
    /**
     * react-native-web-swiper 패키지의
     * minWidth 속성 default(8)값을 제거해주기 위함
     */
    minWidth: 0,
  },
});
