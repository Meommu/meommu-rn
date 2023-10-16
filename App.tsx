import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Router } from "./src/Router";
import { VIEW_NAME } from "./src/constants";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createServer } from "miragejs";
import type { Server, Registry } from "miragejs";
import type { AnyModels, AnyFactories } from "miragejs/-types";

declare global {
  interface Window {
    server: Server<Registry<AnyModels, AnyFactories>>;
  }
}

if (window.server) {
  window.server.shutdown();
}

const responseTemplate = (data: unknown) => ({
  code: "",
  mesasge: "",
  data,
});

window.server = createServer({
  routes() {
    this.get("/api/v1/kindergartens/email", (schema, request) => {
      const {
        queryParams: { email },
      } = request;

      if (!email) {
        return responseTemplate(false);
      }

      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return responseTemplate(false);
      }

      /**
       * 중복된 이메일 검사
       */
      if (email === "dup@test.com") {
        return responseTemplate(false);
      }

      return responseTemplate(true);
    });
  },
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [startView, setStartView] = useState<VIEW_NAME | null>(null);

  const [fontsLoaded] = useFonts({
    "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.otf"),
    "Author-Medium": require("./assets/fonts/Author-Medium.otf"),
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
      setStartView(VIEW_NAME.MAIN);

      SplashScreen.hideAsync();

      return;
    }

    if (await chkOnBoardingIsEnd()) {
      setStartView(VIEW_NAME.HOME);

      SplashScreen.hideAsync();

      return;
    }

    setStartView(VIEW_NAME.ON_BOARDING);

    SplashScreen.hideAsync();

    return;
  };

  useEffect(() => {
    if (fontsLoaded) {
      initial();
    }
  }, [fontsLoaded]);

  if (!startView) {
    return null;
  }

  return <Router initialRouterName={startView} />;
}
