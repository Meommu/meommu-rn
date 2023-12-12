import { faker } from "@faker-js/faker";
import {
  chkSwiperIndex,
  clearAndWriteInputText,
  clickAgreementButton,
  clickEmailDupChkButton,
  clickSignUpNextStepButton,
  clickSignInButton,
  clickSignUpButton,
  getSignInEmailInput,
  getSignInPasswordInput,
  getSignUpEmailInput,
  getSignUpKindergartenDirectorNameInput,
  getSignUpKindergartenNameInput,
  getSignUpPasswordConfirmInput,
  getSignUpPasswordInput,
  getSignUpPhoneNumberInput,
} from "./utils";

let email = "";

const CORRECT_PASSWORD = "12345678a*!";
const CORRECT_KINDERGARTEN_NAME = "유치원이름";
const CORRECT_KINDERGARTEN_DIRECTOR_NAME = "김숙자";
const CORRECT_PHONE_NUMBER = "010-1234-5678";

describe("회원가입 페이지", () => {
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

  describe("이메일 Validation", () => {
    it('이메일 형식이 올바르지 않은 경우, "이메일 형식이 올바르지 않습니다." 메세지 출력', () => {
      clearAndWriteInputText(getSignUpEmailInput(), "wrong@email@form");
      clickEmailDupChkButton();

      cy.contains("이메일 형식이 올바르지 않습니다.");
    });
  });

  describe("비밀번호 Validation", () => {
    before(() => {
      clearAndWriteInputText(getSignUpEmailInput(), email);
      clickEmailDupChkButton();

      cy.contains("사용 가능한 이메일 입니다.");

      clickAgreementButton();
    });

    it('8글자 미만의 올바른 형태의 비밀번호가 입력되었을 경우 "비밀번호 형식이 올바르지 않습니다." 메세지 출력', () => {
      clearAndWriteInputText(getSignUpPasswordInput(), "12345a!");
      clearAndWriteInputText(getSignUpPasswordConfirmInput(), "12345a!");

      clickSignUpNextStepButton();

      cy.contains("비밀번호 형식이 올바르지 않습니다.");
    });

    it('20글자를 초과하는 올바른 형태의 비밀번호가 입력되었을 경우 "비밀번호 형식이 올바르지 않습니다." 메세지 출력', () => {
      clearAndWriteInputText(
        getSignUpPasswordInput(),
        "12345678901234567890a!"
      );
      clearAndWriteInputText(
        getSignUpPasswordConfirmInput(),
        "12345678901234567890a!"
      );

      clickSignUpNextStepButton();

      cy.contains("비밀번호 형식이 올바르지 않습니다.");
    });

    it('특수기호가 포함되지 않은 비밀번호가 입력되었을 경우 "비밀번호 형식이 올바르지 않습니다." 메세지 출력', () => {
      clearAndWriteInputText(getSignUpPasswordInput(), "12345678a");
      clearAndWriteInputText(getSignUpPasswordConfirmInput(), "12345678a");

      clickSignUpNextStepButton();

      cy.contains("비밀번호 형식이 올바르지 않습니다.");
    });

    it('영문자가 포함되지 않은 비밀번호가 입력되었을 경우 "비밀번호 형식이 올바르지 않습니다." 메세지 출력', () => {
      clearAndWriteInputText(getSignUpPasswordInput(), "12345678!");
      clearAndWriteInputText(getSignUpPasswordConfirmInput(), "12345678!");

      clickSignUpNextStepButton();

      cy.contains("비밀번호 형식이 올바르지 않습니다.");
    });

    it("비밀번호가 일치하지 않을 경우 입력되었을 경우 `패스워드가 일치하지 않습니다.` 메세지 출력", () => {
      clearAndWriteInputText(getSignUpPasswordInput(), "12345678a!");
      clearAndWriteInputText(getSignUpPasswordConfirmInput(), "1234!");

      clickSignUpNextStepButton();

      cy.contains("패스워드가 일치하지 않습니다.");
    });

    after(() => {
      clearAndWriteInputText(getSignUpPasswordInput(), CORRECT_PASSWORD);
      clearAndWriteInputText(getSignUpPasswordConfirmInput(), CORRECT_PASSWORD);

      clickSignUpNextStepButton();

      chkSwiperIndex(1);
    });
  });

  describe("이름 Validation", () => {
    before(() => {
      clearAndWriteInputText(
        getSignUpKindergartenNameInput(),
        CORRECT_KINDERGARTEN_NAME
      );
      clearAndWriteInputText(
        getSignUpKindergartenDirectorNameInput(),
        CORRECT_KINDERGARTEN_DIRECTOR_NAME
      );
      clearAndWriteInputText(getSignUpPhoneNumberInput(), CORRECT_PHONE_NUMBER);
    });

    it('2글자 미만의 유치원 이름이 입력되었을 경우 "2에서 8글자 사이의 이름을 입력해주세요." 메세지 출력', () => {
      clearAndWriteInputText(getSignUpKindergartenNameInput(), "유");

      clickSignUpNextStepButton();

      cy.contains("2에서 8글자 사이의 이름을 입력해주세요.");
    });

    it('8글자를 초과하는 유치원 이름이 입력되었을 경우 "2에서 8글자 사이의 이름을 입력해주세요." 메세지 출력', () => {
      clearAndWriteInputText(
        getSignUpKindergartenNameInput(),
        "유치원이름유치원이름"
      );

      clickSignUpNextStepButton();

      cy.contains("2에서 8글자 사이의 이름을 입력해주세요.");
    });

    it('3글자 미만의 유치원 이름이 입력되었을 경우 "3에서 4글자 사이의 한글 이름을 입력해주세요." 메세지 출력', () => {
      clearAndWriteInputText(getSignUpKindergartenDirectorNameInput(), "김숙");

      clickSignUpNextStepButton();

      cy.contains("3에서 4글자 사이의 한글 이름을 입력해주세요.");
    });

    it('4글자를 초과하는 유치원 이름이 입력되었을 경우 "2에서 8글자 사이의 이름을 입력해주세요." 메세지 출력', () => {
      clearAndWriteInputText(
        getSignUpKindergartenDirectorNameInput(),
        "김숙자김숙자"
      );

      clickSignUpNextStepButton();

      cy.contains("3에서 4글자 사이의 한글 이름을 입력해주세요.");
    });

    after(() => {
      clearAndWriteInputText(
        getSignUpKindergartenNameInput(),
        CORRECT_KINDERGARTEN_NAME
      );
      clearAndWriteInputText(
        getSignUpKindergartenDirectorNameInput(),
        CORRECT_KINDERGARTEN_DIRECTOR_NAME
      );
    });
  });

  describe("전화번호 Validation", () => {
    it('xxx-xxxx-xxxx 형태의 전화번호가 입력되지 않았을 경우 "올바른 형식의 전화번호를 입력하세요" 메세지 출력', () => {
      clearAndWriteInputText(getSignUpPhoneNumberInput(), "010-1234-56789");

      clickSignUpNextStepButton();

      cy.contains("올바른 형식의 전화번호를 입력하세요");
    });

    after(() => {
      clearAndWriteInputText(getSignUpPhoneNumberInput(), CORRECT_PHONE_NUMBER);

      clickSignUpNextStepButton();

      chkSwiperIndex(2);

      clickSignUpNextStepButton();
    });
  });
});

describe("로그인 페이지", () => {
  describe("아이디 Validation", () => {
    it('이메일을 입력하지 않을 경우, "이메일이 입력되지 않았습니다." Toast 형태의 오버레이가 등장', () => {
      clickSignInButton();

      cy.contains("이메일이 입력되지 않았습니다.");
    });

    it('올바르지 않은 형태의 이메일을 입력할 경우, "이메일 형식이 올바르지 않습니다." Toast 형태의 오버레이가 등장', () => {
      clearAndWriteInputText(getSignInEmailInput(), "wrong@email@form");
      clickSignInButton();

      cy.contains("이메일 형식이 올바르지 않습니다.");
    });
  });

  describe("패스워드 Validation", () => {
    before(() => {
      clearAndWriteInputText(getSignInEmailInput(), email);
    });

    it('패스워드를 입력하지 않을 경우, "패스워드가 입력되지 않았습니다." Toast 형태의 오버레이가 등장', () => {
      clickSignInButton();

      cy.contains("패스워드가 입력되지 않았습니다.");
    });
  });

  describe("로그인 시도", () => {
    it('로그인이 실패하였을 경우, "로그인이 실패하였습니다." Toast 형태의 오버레이가 등장 ', () => {
      clearAndWriteInputText(getSignInEmailInput(), "wrong@email.com");
      clearAndWriteInputText(getSignInPasswordInput(), "wrongPassword");

      clickSignInButton();

      cy.contains("로그인이 실패하였습니다.");
    });

    it("로그인이 성공하였을 경우, 메인 페이지로 이동", () => {
      clearAndWriteInputText(getSignInEmailInput(), email);
      clearAndWriteInputText(getSignInPasswordInput(), CORRECT_PASSWORD);

      clickSignInButton();

      cy.location().should((location) => {
        expect(location.pathname).is.equal("/main");
      });
    });
  });

  describe("홈 페이지 프로세스", () => {
    before(() => {
      cy.clearLocalStorage("accessToken");
      cy.visit("http://localhost:8081/home");
    });

    it('회원가입 버튼을 클릭하였을 경우 "/sign-up" 경로로 이동', () => {
      clickSignUpButton();

      cy.location().should((location) => {
        expect(location.pathname).is.equal("/sign-up");
      });
    });

    /**
     * TODO: 아이디/패스워드 찾기 버튼 클릭 시 페이지 이동에 대한 테스트 코드도 작성
     */
  });
});
