// react
import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import { useFonts } from "expo-font";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

// constants
import { VIEW_NAME } from "../constants";

// utils
import { MockApiService } from "../utils/mockApi";

/**
 * 개발중일 경우 mirage mock 서버 활성화
 */
if (process.env.NODE_ENV === "development") {
  new MockApiService().register();
}

/**
 * 루트(`/`) 페이지, 스플래시 화면
 */
export default function App() {
  const [fontsLoaded] = useFonts({
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
    yeonTheLand: require("../assets/fonts/yeonTheLand.ttf"),
  });

  const chkLogin = async (): Promise<boolean> => {
    /**
     * TODO: 로그인 확인 로직 추가
     */
    return false;
  };

  const chkOnBoardingIsEnd = async (): Promise<boolean> => {
    if ((await AsyncStorage.getItem("onboarding")) === "end") {
      return true;
    }

    return false;
  };

  const initial = async (): Promise<void> => {
    if (await chkLogin()) {
      router.replace(VIEW_NAME.MAIN);

      SplashScreen.hideAsync();

      return;
    }

    if (await chkOnBoardingIsEnd()) {
      router.replace(VIEW_NAME.HOME);

      SplashScreen.hideAsync();

      return;
    }

    router.replace(VIEW_NAME.ON_BOARDING);

    SplashScreen.hideAsync();

    return;
  };

  useEffect(() => {
    if (fontsLoaded) {
      initial();
    }
  }, [fontsLoaded]);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.splashImage}
        source={require("../assets/splash.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  splashImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});
