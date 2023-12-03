// react
import { useCallback } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import { router } from "expo-router";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { BannerImage } from "@/components/Image/BannerImage";

// constants
import { PATH, color } from "@/constants";

// hooks
import { useSwiper } from "@/hooks";

// swiper
import Swiper from "react-native-web-swiper";

// styles
import { styles } from "./index.styles";

const FIRST_SLIDE_INDEX = 0;
const SECOND_SLIDE_INDEX = 1;
const LAST_SLIDE_INDEX = 2;

export function OnBoardingPage() {
  const { swiperIndex, swiperRef, handleSwiperIndexChange } =
    useSwiper(FIRST_SLIDE_INDEX);

  const handleNextButtonClick = useCallback(async (): Promise<void> => {
    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
      case SECOND_SLIDE_INDEX:
        swiperRef.current?.goToNext();

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
        ref={swiperRef}
        containerStyle={styles.swiper}
        springConfig={{
          overshootClamping: true,
        }}
        controlsProps={{
          dotsTouchable: true,
          dotActiveStyle: { ...styles.dot, backgroundColor: color.g600 },
          dotProps: {
            containerStyle: styles.dotContainer,
            badgeStyle: { ...styles.dot, backgroundColor: color.g300 },
          },
          nextPos: false,
          prevPos: false,
        }}
        onIndexChanged={handleSwiperIndexChange}
      >
        <View style={styles.slideLayout}>
          <BannerImage
            source={require("@/assets/images/onboarding/onboarding-1.png")}
          />

          <Text style={styles.guideText}>
            추억하고 싶은 순간을{"\n"}멈무일기에서 기록해봐요!
          </Text>
        </View>

        <View style={styles.slideLayout}>
          <BannerImage
            source={require("@/assets/images/onboarding/onboarding-2.png")}
          />

          <Text style={styles.guideText}>
            활동을 카테고리에 따라{"\n"}
            GPT로 간단하게 완성해봐요!
          </Text>
        </View>

        <View style={styles.slideLayout}>
          <BannerImage
            source={require("@/assets/images/onboarding/onboarding-3.png")}
          />

          <Text style={styles.guideText}>
            글과 사진을 함께 구성하며{"\n"}지루하지 않게 꾸며봐요!
          </Text>
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
