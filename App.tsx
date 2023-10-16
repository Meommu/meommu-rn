import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Router } from "./src/Router";
import { VIEW_NAME } from "./src/constants";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createServer } from "miragejs";
import { Server, Registry, Response } from "miragejs";
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
      if (email === "dup1@test.com") {
        return responseTemplate(false);
      }

      return responseTemplate(true);
    });

    this.post("/api/v1/kindergartens/signup", (schema, request) => {
      const { requestBody } = request;

      const { name, ownerName, phone, email, password, passwordConfirmation } =
        JSON.parse(requestBody);

      /**
       * 프론트엔드에서 중복검사가 되지 않았을 경우
       */
      if (email === "dup2@test.com") {
        return new Response(400, {}, responseTemplate(""));
      }

      return new Response(201, {}, responseTemplate(true));
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
