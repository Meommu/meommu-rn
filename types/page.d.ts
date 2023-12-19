type PageRoutingMethods = {
  /**
   * 스택 레벨 0
   */
  _layout: {
    goToNotFoundPage: () => void;
    goToHomePage: () => void;
  };
  notFound: {
    goToSplashPage: () => void;
  };
  /**
   * 스택 레벨 1
   */
  home: {
    goToRecoveryPage: () => void;
    goToSignUpPage: () => void;
    goToMainPage: () => void;
  };
  main: {
    goToDiaryPage: (diaryId: number) => void;
    goToWritePage: () => void;
    goToModifyPage: (diaryId: number) => void;
    goToSettingPage: () => void;
  };
  onBoarding: {
    goToHomePage: () => void;
  };
  splash: {
    goToHomePage: () => void;
    goToMainPage: () => void;
    goToOnBoardingPage: () => void;
  };
  /**
   * 스택 레벨 2
   */
  signUp: {
    goBack: () => void;
  };
  recovery: {
    goBack: () => void;
  };
  modify: {
    // 3단계도 가능
    goBack: () => void;
  };
  write: {
    goBack: () => void;
    goToDiaryPage: (diaryId: number) => void;
  };
  diary: {
    goBack: () => void;
    goToModifyPage: (diaryId: number) => void;
  };
  setting: {
    goBack: () => void;
    goToNoticePage: () => void;
    goToProfilePage: () => void;
    goToHomePage: () => void;
  };
  /**
   * 스택 레벨 3
   */
  profile: {
    goBack: () => void;
  };
  notice: {
    goBack: () => void;
  };
};

type PageName = keyof Omit<PageRoutingMethods, "_layout">;
