import { faker } from "@faker-js/faker";

const utils = {
  clickAgreementButton: () => {
    cy.get('[data-testid="button-agreement"]').click();
  },

  clickEmailDupChkButton: () => {
    cy.get('[data-testid="email-button-dup-chk"]').click();
  },

  clickNextStepButton: () => {
    cy.get('[data-testid="button-next-step-of-signup"]').click();
  },

  clearAndWriteInputText: (testId: string, text: string) => {
    const $inputElement = cy.get(`[data-testid="${testId}"]`);

    $inputElement.clear();
    $inputElement.type(text);
  },

  chkElementInTheScreen: (testId: string) => {
    cy.get("body").then(($el) => {
      const boundaryX = $el[0].getBoundingClientRect().right;

      cy.get(`[data-testid="${testId}"]`).then(($el) => {
        expect($el[0].getBoundingClientRect().right <= boundaryX).is.equal(
          true
        );
      });
    });
  },
};

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

      utils.clearAndWriteInputText("input-email", email);
      utils.clickEmailDupChkButton();

      cy.contains("사용 가능한 이메일 입니다.");
    }
  );

  describe("이메일 Validation", () => {
    it('이메일 형식이 올바르지 않은 경우, "이메일 형식이 올바르지 않습니다." 메세지 출력', () => {
      utils.clearAndWriteInputText("input-email", "wrong@email@form");
      utils.clickEmailDupChkButton();

      cy.contains("이메일 형식이 올바르지 않습니다.");
    });
  });

  describe("비밀번호 Validation", () => {
    before(() => {
      utils.clearAndWriteInputText("input-email", email);
      utils.clickEmailDupChkButton();

      cy.contains("사용 가능한 이메일 입니다.");

      utils.clickAgreementButton();
    });

    it('8글자 미만의 올바른 형태의 비밀번호가 입력되었을 경우 "비밀번호 형식이 올바르지 않습니다." 메세지 출력', () => {
      utils.clearAndWriteInputText("input-password", "12345a!");
      utils.clearAndWriteInputText("input-password-confirm", "12345a!");

      utils.clickNextStepButton();

      cy.contains("비밀번호 형식이 올바르지 않습니다.");
    });

    it('20글자를 초과하는 올바른 형태의 비밀번호가 입력되었을 경우 "비밀번호 형식이 올바르지 않습니다." 메세지 출력', () => {
      utils.clearAndWriteInputText("input-password", "12345678901234567890a!");
      utils.clearAndWriteInputText(
        "input-password-confirm",
        "12345678901234567890a!"
      );

      utils.clickNextStepButton();

      cy.contains("비밀번호 형식이 올바르지 않습니다.");
    });

    it('특수기호가 포함되지 않은 비밀번호가 입력되었을 경우 "비밀번호 형식이 올바르지 않습니다." 메세지 출력', () => {
      utils.clearAndWriteInputText("input-password", "12345678a");
      utils.clearAndWriteInputText("input-password-confirm", "12345678a");

      utils.clickNextStepButton();

      cy.contains("비밀번호 형식이 올바르지 않습니다.");
    });

    it("비밀번호가 일치하지 않을 경우 입력되었을 경우 `패스워드가 일치하지 않습니다.` 메세지 출력", () => {
      utils.clearAndWriteInputText("input-password", "12345678a!");
      utils.clearAndWriteInputText("input-password-confirm", "1234!");

      utils.clickNextStepButton();

      cy.contains("패스워드가 일치하지 않습니다.");
    });

    after(() => {
      utils.clearAndWriteInputText("input-password", CORRECT_PASSWORD);
      utils.clearAndWriteInputText("input-password-confirm", CORRECT_PASSWORD);

      utils.clickNextStepButton();
      cy.wait(1000);
      utils.chkElementInTheScreen("text-guide-of-step-two");
    });
  });

  describe("이름 Validation", () => {
    before(() => {
      utils.clearAndWriteInputText(
        "input-kindergarten-name",
        CORRECT_KINDERGARTEN_NAME
      );
      utils.clearAndWriteInputText(
        "input-kindergarten-director-name",
        CORRECT_KINDERGARTEN_DIRECTOR_NAME
      );
      utils.clearAndWriteInputText("input-phone-number", CORRECT_PHONE_NUMBER);
    });

    it('2글자 미만의 유치원 이름이 입력되었을 경우 "2에서 8글자 사이의 이름을 입력해주세요." 메세지 출력', () => {
      utils.clearAndWriteInputText("input-kindergarten-name", "유");

      utils.clickNextStepButton();

      cy.contains("2에서 8글자 사이의 이름을 입력해주세요.");
    });

    it('8글자를 초과하는 유치원 이름이 입력되었을 경우 "2에서 8글자 사이의 이름을 입력해주세요." 메세지 출력', () => {
      utils.clearAndWriteInputText(
        "input-kindergarten-name",
        "유치원이름유치원이름"
      );

      utils.clickNextStepButton();

      cy.contains("2에서 8글자 사이의 이름을 입력해주세요.");
    });

    it('3글자 미만의 유치원 이름이 입력되었을 경우 "3에서 4글자 사이의 한글 이름을 입력해주세요." 메세지 출력', () => {
      utils.clearAndWriteInputText("input-kindergarten-director-name", "김숙");

      utils.clickNextStepButton();

      cy.contains("3에서 4글자 사이의 한글 이름을 입력해주세요.");
    });

    it('4글자를 초과하는 유치원 이름이 입력되었을 경우 "2에서 8글자 사이의 이름을 입력해주세요." 메세지 출력', () => {
      utils.clearAndWriteInputText(
        "input-kindergarten-director-name",
        "김숙자김숙자"
      );

      utils.clickNextStepButton();

      cy.contains("3에서 4글자 사이의 한글 이름을 입력해주세요.");
    });

    after(() => {
      utils.clearAndWriteInputText(
        "input-kindergarten-name",
        CORRECT_KINDERGARTEN_NAME
      );
      utils.clearAndWriteInputText(
        "input-kindergarten-director-name",
        CORRECT_KINDERGARTEN_DIRECTOR_NAME
      );
    });
  });

  describe("전화번호 Validation", () => {
    it('xxx-xxxx-xxxx 형태의 전화번호가 입력되지 않았을 경우 "올바른 형식의 전화번호를 입력하세요" 메세지 출력', () => {
      utils.clearAndWriteInputText("input-phone-number", "010-12345678");

      utils.clickNextStepButton();

      cy.contains("올바른 형식의 전화번호를 입력하세요");
    });

    after(() => {
      utils.clearAndWriteInputText("input-phone-number", CORRECT_PHONE_NUMBER);

      utils.clickNextStepButton();

      cy.wait(2000);

      utils.chkElementInTheScreen("text-guide-of-complete");

      utils.clickNextStepButton();
    });
  });
});

describe("로그인 페이지", () => {
  describe("아이디 Validation", () => {
    it('이메일을 입력하지 않을 경우, "이메일이 입력되지 않았습니다." Toast 형태의 오버레이가 등장', () => {
      cy.get('[data-testid="button-signin"]').click();

      cy.contains("이메일이 입력되지 않았습니다.");
    });

    it('올바르지 않은 형태의 이메일을 입력할 경우, "이메일 형식이 올바르지 않습니다." Toast 형태의 오버레이가 등장', () => {
      utils.clearAndWriteInputText("input-signin-email", "wrong@email@form");

      cy.get('[data-testid="button-signin"]').click();

      cy.contains("이메일 형식이 올바르지 않습니다.");
    });

    after(() => {
      utils.clearAndWriteInputText("input-signin-email", email);
    });
  });

  describe("패스워드 Validation", () => {
    it('패스워드를 입력하지 않을 경우, "패스워드가 입력되지 않았습니다." Toast 형태의 오버레이가 등장', () => {
      cy.get('[data-testid="button-signin"]').click();

      cy.contains("패스워드가 입력되지 않았습니다.");
    });

    /**
     * 해당 부분에서 암묵적으로 회원가입한 아이디 & 패스워드로 로그인을 시도함.
     *
     * 별도의 테스트케이스로 분리할 필요가 있음
     */
    after(() => {
      utils.clearAndWriteInputText("input-signin-password", CORRECT_PASSWORD);

      cy.get('[data-testid="button-signin"]').click();

      cy.location().should((location) => {
        expect(location.pathname).is.equal("/main");
      });
    });
  });

  describe("홈 페이지 프로세스", () => {
    before(() => {
      cy.visit("http://localhost:8081/home");
      cy.clearLocalStorage("accessToken");
    });

    it('로그인이 실패하였을 경우, "로그인이 실패하였습니다." Toast 형태의 오버레이가 등장 ', () => {
      utils.clearAndWriteInputText("input-signin-email", "wrong@email.com");
      utils.clearAndWriteInputText("input-signin-password", "wrongPassword");

      cy.get('[data-testid="button-signin"]').click();

      cy.contains("로그인이 실패하였습니다.");
    });

    it('회원가입 버튼을 클릭하였을 경우 "/sign-up" 경로로 이동', () => {
      cy.get('[data-testid="text-goto-signup"]').click();

      cy.location().should((location) => {
        expect(location.pathname).is.equal("/sign-up");
      });
    });

    /**
     * TODO: 아이디/패스워드 찾기 버튼 클릭 시 페이지 이동에 대한 테스트 코드도 작성
     */
  });
});
