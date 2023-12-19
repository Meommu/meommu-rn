// react
import { useMemo } from "react";

// expo
import { router, useLocalSearchParams } from "expo-router";

// constants
import { pagePath } from "@/constants";

export const useExpoRouter = <T extends PageName>(page: T) => {
  const { diaryId, source } = useLocalSearchParams<{
    diaryId?: string;
    source?: string;
  }>();

  const pageMethods = useMemo<PageRoutingMethods>(
    () => ({
      _layout: {
        goToHomePage() {
          router.replace(pagePath.home);
        },
        goToNotFoundPage() {
          router.replace(pagePath.notFound);
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

          router.replace(pagePath.home);
        },
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace(pagePath.main);
          }
        },
        goToNoticePage() {
          router.push(pagePath.notice);
        },
        goToProfilePage() {
          router.push(pagePath.profile);
        },
      },
      profile: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace(pagePath.setting);
          }
        },
      },
      notice: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace(pagePath.setting);
          }
        },
      },
      diary: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace(pagePath.main);
          }
        },

        goToModifyPage(diaryId: number) {
          router.push({
            pathname: `${pagePath.modify}/${diaryId}`,
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
              router.replace(`${pagePath.diary}/${diaryId}`);
            } else {
              router.replace(pagePath.main);
            }
          }
        },
      },
      write: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace(pagePath.main);
          }
        },

        goToDiaryPage(diaryId: number) {
          router.push(`${pagePath.diary}/${diaryId}`);
        },
      },
      recovery: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace(pagePath.home);
          }
        },
      },
      signUp: {
        goBack() {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace(pagePath.home);
          }
        },
      },
      splash: {
        goToHomePage() {
          router.replace(pagePath.home);
        },
        goToMainPage() {
          router.replace(pagePath.main);
        },
        goToOnBoardingPage() {
          router.replace(pagePath.onBoarding);
        },
      },
      onBoarding: {
        goToHomePage() {
          router.replace(pagePath.home);
        },
      },
      home: {
        goToMainPage() {
          router.replace(pagePath.main);
        },
        goToRecoveryPage() {
          router.push(pagePath.recovery);
        },
        goToSignUpPage() {
          router.push(pagePath.signUp);
        },
      },
      main: {
        goToDiaryPage(diaryId: number) {
          router.push(`${pagePath.diary}/${diaryId}`);
        },
        goToWritePage() {
          router.push(pagePath.write);
        },
        goToSettingPage() {
          router.push(pagePath.setting);
        },
        goToModifyPage(diaryId: number) {
          router.push(`${pagePath.modify}/${diaryId}`);
        },
      },
      notFound: {
        goToSplashPage() {
          router.replace(pagePath.splash);
        },
      },
    }),
    [diaryId, source]
  );

  return {
    router: pageMethods[page],
  };
};
