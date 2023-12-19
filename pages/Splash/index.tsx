// react
import { useEffect } from "react";
import { View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import * as SplashScreen from "expo-splash-screen";

// hooks
import { useExpoRouter } from "@/hooks";

// apis
import { apiService } from "@/apis";

// styles
import { styles } from "./index.styles";

export function Splash() {
  const { router } = useExpoRouter("splash");

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
      router.goToMainPage();

      SplashScreen.hideAsync();

      return;
    }

    if (await chkOnBoardingIsEnd()) {
      router.goToHomePage();

      SplashScreen.hideAsync();

      return;
    }

    router.goToOnBoardingPage();

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
