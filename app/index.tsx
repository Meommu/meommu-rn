// react
import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

// constants
import { PATH } from "../constants";

// apis
import { apiService } from "@/apis";

/**
 * 루트(`/`) 페이지, 스플래시 화면
 */
export default function App() {
  const chkLogin = async (): Promise<boolean> => {
    /**
     * react-query의 공통 에러처리를 피하기 위해서
     * useQuery를 사용하지 않고 try-catch 문을 이용함.
     */
    try {
      await apiService.getLoginInfo();

      return true;
    } catch (e) {
      return false;
    }
  };

  const chkOnBoardingIsEnd = async (): Promise<boolean> => {
    if ((await AsyncStorage.getItem("onboarding")) === "end") {
      return true;
    }

    return false;
  };

  const initial = async (): Promise<void> => {
    if (await chkLogin()) {
      router.replace(PATH.MAIN);

      SplashScreen.hideAsync();

      return;
    }

    if (await chkOnBoardingIsEnd()) {
      router.replace(PATH.HOME);

      SplashScreen.hideAsync();

      return;
    }

    router.replace(PATH.ON_BOARDING);

    SplashScreen.hideAsync();

    return;
  };

  useEffect(() => {
    initial();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.splashImage}
        source={require("@/assets/splash.png")}
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
