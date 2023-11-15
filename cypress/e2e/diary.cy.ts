import { faker } from "@faker-js/faker";
import {
  chkSwiperIndex,
  clearAndWriteInputText,
  clickAgreementButton,
  clickEmailDupChkButton,
  clickMonthCalendarApplyButton,
  clickMonthCalendarPrevButton,
  clickMonthPicker,
  clickSignInButton,
  clickSignUpNextStepButton,
  getSignInEmailInput,
  getSignInPasswordInput,
  getSignUpEmailInput,
  getSignUpKindergartenDirectorNameInput,
  getSignUpKindergartenNameInput,
  getSignUpPasswordConfirmInput,
  getSignUpPasswordInput,
  getSignUpPhoneNumberInput,
  getTestElement,
} from "./utils";

let email = "";

const CORRECT_PASSWORD = "12345678a*!";
const CORRECT_KINDERGARTEN_NAME = "유치원이름";
const CORRECT_KINDERGARTEN_DIRECTOR_NAME = "김숙자";
const CORRECT_PHONE_NUMBER = "010-1234-5678";

describe("일기와 관련된 컴포넌트 테스트", () => {
  describe("메인 페이지 접근을 위한 회원가입/로그인 과정 수행", () => {
    before(() => {
      cy.visit("http://localhost:8081/sign-up");
      cy.clearLocalStorage("accessToken");
    });

    it(
      "중복되지 않은 이메일 생성",
      // 10번의 새로운 이메일을 생성할 경우 높은 확률로 중복을 피할 수 있을 것이라 예상
      { retries: 10 },
      () => {
        cy.contains("이메일 주소를 입력해주세요");

        email = faker.internet.exampleEmail().toLowerCase();

        clearAndWriteInputText(getSignUpEmailInput(), email);
        clickEmailDupChkButton();

        cy.contains("사용 가능한 이메일 입니다.");
      }
    );

    it("회원가입 수행", () => {
      clearAndWriteInputText(getSignUpPasswordInput(), CORRECT_PASSWORD);
      clearAndWriteInputText(getSignUpPasswordConfirmInput(), CORRECT_PASSWORD);
      clickAgreementButton();

      clickSignUpNextStepButton();

      clearAndWriteInputText(
        getSignUpKindergartenNameInput(),
        CORRECT_KINDERGARTEN_NAME
      );
      clearAndWriteInputText(
        getSignUpKindergartenDirectorNameInput(),
        CORRECT_KINDERGARTEN_DIRECTOR_NAME
      );
      clearAndWriteInputText(getSignUpPhoneNumberInput(), CORRECT_PHONE_NUMBER);

      clickSignUpNextStepButton();

      chkSwiperIndex(2);

      clickSignUpNextStepButton();
    });

    it("로그인 수행", () => {
      clearAndWriteInputText(getSignInEmailInput(), email);
      clearAndWriteInputText(getSignInPasswordInput(), CORRECT_PASSWORD);

      clickSignInButton();
    });
  });

  describe("일기가 작성된 년, 월 선택 바텀시트 동작 테스트", () => {
    const now = new Date();

    it("일기를 조회할 년, 월을 바텀시트에서 선택한 후 적용하면, 메인 페이지의 년, 월이 변경된다.", () => {
      cy.contains(/[0-9]{4}년 [0-9]{1,2}월/);

      clickMonthPicker();

      cy.contains(`${now.getFullYear()}년`);

      clickMonthCalendarPrevButton();

      const pickYear = now.getFullYear() - 1;
      const pickMonth = 1;

      getTestElement(
        `button-month-calendar-element-${pickYear}-${pickMonth}`
      ).click();

      clickMonthCalendarApplyButton();

      cy.contains(`${pickYear}년 ${pickMonth}월`);
    });
  });
});
