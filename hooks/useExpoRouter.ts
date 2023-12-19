// react
import { useMemo } from "react";

// expo
import { router, useLocalSearchParams } from "expo-router";

export const useExpoRouter = <T extends PageName>(page: T) => {
  const { diaryId, source } = useLocalSearchParams<{
    diaryId?: string;
    source?: string;
  }>();

  const pageMethods = useMemo<PageRoutingMethods>(
    () => ({
      _layout: {
        goToHomePage() {
          router.replace("home");
        },
        goToNotFoundPage() {
          router.replace("404");
        },
      },
      setting: {
        goToHomePage() {
          /**
           * 곧바로 replace할 경우 스택이 하나 더 쌓이는 이슈가 있어, back을 미리 해줌.
           */
          if (router.canGoBack()) {
            router.back();
          }

          router.replace("home");
        },
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("main");
          }
        },
        goToNoticePage() {
          router.push("setting/notice");
        },
        goToProfilePage() {
          router.push("setting/profile");
        },
      },
      profile: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("setting");
          }
        },
      },
      notice: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("setting");
          }
        },
      },
      diary: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("main");
          }
        },

        goToModifyPage(diaryId: number) {
          router.push({
            pathname: `modify/${diaryId}`,
            params: { source: "diary" },
          });
        },
      },
      modify: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            if (source === "diary") {
              router.replace(`diary/${diaryId}`);
            } else {
              router.replace("main");
            }
          }
        },
      },
      write: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("main");
          }
        },

        goToDiaryPage(diaryId: number) {
          router.push(`diary/${diaryId}`);
        },
      },
      recovery: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("home");
          }
        },
      },
      signUp: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("home");
          }
        },
      },
      splash: {
        goToHomePage() {
          router.replace("home");
        },
        goToMainPage() {
          router.replace("main");
        },
        goToOnBoardingPage() {
          router.replace("on-boarding");
        },
      },
      onBoarding: {
        goToHomePage() {
          router.replace("home");
        },
      },
      home: {
        goToMainPage() {
          router.replace("main");
        },
        goToRecoveryPage() {
          router.push("recovery");
        },
        goToSignUpPage() {
          router.push("sign-up");
        },
      },
      main: {
        goToDiaryPage(diaryId: number) {
          router.push(`diary/${diaryId}`);
        },
        goToWritePage() {
          router.push("write");
        },
        goToSettingPage() {
          router.push("setting");
        },
        goToModifyPage(diaryId: number) {
          router.push(`modify/${diaryId}`);
        },
      },
      notFound: {
        goToSplashPage() {
          router.replace("");
        },
      },
    }),
    [diaryId, source]
  );

  return {
    router: pageMethods[page],
  };
};
