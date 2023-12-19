// react
import { useMemo } from "react";

// expo
import { router, useLocalSearchParams } from "expo-router";

/**
 * // {스택의 레벨}
 * {속성}: {
 *   {메서드}: {
 *     ...
 *   },
 * },
 */
type PageRoutingMethods = {
  // 0
  _layout: {
    goToNotFoundPage: () => void;

    goToHomePage: () => void;
  };

  // 0
  notFound: {
    goToSplashPage: () => void;
  };

  // 1
  home: {
    goToRecoveryPage: () => void;

    goToSignUpPage: () => void;

    goToMainPage: () => void;
  };

  // 1
  main: {
    goToDiaryPage: (diaryId: number) => void;

    goToWritePage: () => void;

    goToModifyPage: (diaryId: number) => void;

    goToSettingPage: () => void;
  };

  // 1
  onBoarding: {
    goToHomePage: () => void;
  };

  // 1
  splash: {
    goToHomePage: () => void;

    goToMainPage: () => void;

    goToOnBoardingPage: () => void;
  };

  // 2
  signUp: {
    goBack: () => void;
  };

  // 2
  recovery: {
    goBack: () => void;
  };

  // 2, 3
  modify: {
    goBack: () => void;
  };

  // 2
  write: {
    goBack: () => void;

    goToDiaryPage: (diaryId: number) => void;
  };

  // 2
  diary: {
    goBack: () => void;

    goToModifyPage: (diaryId: number) => void;
  };

  // 2
  setting: {
    goBack: () => void;

    goToNoticePage: () => void;

    goToProfilePage: () => void;

    goToHomePage: () => void;
  };

  // 3
  profile: {
    goBack: () => void;
  };

  // 3
  notice: {
    goBack: () => void;
  };
};

export const useExpoRouter = <T extends keyof PageRoutingMethods>(page: T) => {
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
