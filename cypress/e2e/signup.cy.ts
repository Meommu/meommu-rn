describe("회원가입 페이지", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/sign-up");
  });

  describe("이메일 Validation", () => {
    it('중복된 이메일을 입력했을 경우, "사용 불가능한 이메일 입니다." 메세지 출력', () => {
      cy.contains("이메일 주소를 입력해주세요");
      cy.get('[data-testid="input-email"]').type("dup1@test.com");
      cy.get('[data-testid="email-button-dup-chk"]').click();
      cy.contains("사용 불가능한 이메일 입니다.");
    });

    it('중복되지 않는 이메일을 입력했을 경우, "사용 가능한 이메일 입니다." 메세지 출력', () => {
      cy.contains("이메일 주소를 입력해주세요");
      cy.get('[data-testid="input-email"]').type("no-dup@test.com");
      cy.get('[data-testid="email-button-dup-chk"]').click();
      cy.contains("사용 가능한 이메일 입니다.");
    });

    it('이메일 형식이 올바르지 않은 경우, "이메일 형식이 올바르지 않습니다." 메세지 출력', () => {
      cy.contains("이메일 주소를 입력해주세요");
      cy.get('[data-testid="input-email"]').type("wrong@email@form");
      cy.get('[data-testid="email-button-dup-chk"]').click();
      cy.contains("이메일 형식이 올바르지 않습니다.");
    });
  });

  describe("비밀번호 Validation", () => {
    beforeEach(() => {
      /**
       * `다음` 버튼을 누르기 위한 준비
       */
      cy.contains("이메일 주소를 입력해주세요");
      cy.get('[data-testid="input-email"]').type("no-dup@test.com");
      cy.get('[data-testid="email-button-dup-chk"]').click();
      cy.contains("사용 가능한 이메일 입니다.");

      cy.get('[data-testid="button-agreement"]').click();
    });

    it('8글자 미만의 올바른 형태의 비밀번호가 입력되었을 경우 "비밀번호 형식이 올바르지 않습니다." 메세지 출력', () => {
      cy.contains("비밀번호를 입력해주세요");
      cy.get('[data-testid="input-password"]').type("12345a!");
      cy.get('[data-testid="input-password-confirm"]').type("12345a!");
      cy.get('[data-testid="button-next-step-of-signup"]').click();
      cy.contains("비밀번호 형식이 올바르지 않습니다.");
    });

    it('20글자를 초과하는 올바른 형태의 비밀번호가 입력되었을 경우 "비밀번호 형식이 올바르지 않습니다." 메세지 출력', () => {
      cy.contains("비밀번호를 입력해주세요");
      cy.get('[data-testid="input-password"]').type("12345678901234567890a!");
      cy.get('[data-testid="input-password-confirm"]').type(
        "12345678901234567890a!"
      );
      cy.get('[data-testid="button-next-step-of-signup"]').click();
      cy.contains("비밀번호 형식이 올바르지 않습니다.");
    });

    it('특수기호가 포함되지 않은 비밀번호가 입력되었을 경우 "비밀번호 형식이 올바르지 않습니다." 메세지 출력', () => {
      cy.contains("비밀번호를 입력해주세요");
      cy.get('[data-testid="input-password"]').type("12345678a");
      cy.get('[data-testid="input-password-confirm"]').type("12345678a");
      cy.get('[data-testid="button-next-step-of-signup"]').click();
      cy.contains("비밀번호 형식이 올바르지 않습니다.");
    });

    it("비밀번호가 일치하지 않을 경우 입력되었을 경우 `패스워드가 일치하지 않습니다.` 메세지 출력", () => {
      cy.contains("비밀번호를 입력해주세요");
      cy.get('[data-testid="input-password"]').type("12345678a!");
      cy.get('[data-testid="input-password-confirm"]').type("1234!");
      cy.get('[data-testid="button-next-step-of-signup"]').click();
      cy.contains("패스워드가 일치하지 않습니다.");
    });

    it("올바른 비밀번호를 입력하였을 경우 두 번째 단계로 이동", () => {
      cy.contains("비밀번호를 입력해주세요");
      cy.get('[data-testid="input-password"]').type("12345678a!");
      cy.get('[data-testid="input-password-confirm"]').type("12345678a!");
      cy.get('[data-testid="button-next-step-of-signup"]').click();
      cy.contains("이제 곧 끝나요!");
    });
  });

  describe("이름 Validation", () => {
    beforeEach(() => {
      /**
       * step 1
       */
      cy.contains("이메일 주소를 입력해주세요");
      cy.get('[data-testid="input-email"]').type("no-dup@test.com");
      cy.get('[data-testid="email-button-dup-chk"]').click();
      cy.contains("사용 가능한 이메일 입니다.");

      cy.contains("비밀번호를 입력해주세요");
      cy.get('[data-testid="input-password"]').type("12345678a!");
      cy.get('[data-testid="input-password-confirm"]').type("12345678a!");

      cy.get('[data-testid="button-agreement"]').click();

      cy.get('[data-testid="button-next-step-of-signup"]').click();

      cy.contains("이제 곧 끝나요!");

      cy.wait(1000);

      /**
       * `다음` 버튼을 누르기 위한 준비
       */
      cy.get('[data-testid="input-kindergarten-name"]').type("유치원이름");
      cy.get('[data-testid="input-kindergarten-director-name"]').type("김숙자");
      cy.get('[data-testid="input-phone-number"]').type("010-1234-5678");
    });

    it('2글자 미만의 유치원 이름이 입력되었을 경우 "2에서 8글자 사이의 이름을 입력해주세요." 메세지 출력', () => {
      cy.contains("유치원 이름을 입력해주세요");
      cy.get('[data-testid="input-kindergarten-name"]').clear();
      cy.get('[data-testid="input-kindergarten-name"]').type("유");
      cy.get('[data-testid="button-next-step-of-signup"]').click();
      cy.contains("2에서 8글자 사이의 이름을 입력해주세요.");
    });

    it('8글자를 초과하는 유치원 이름이 입력되었을 경우 "2에서 8글자 사이의 이름을 입력해주세요." 메세지 출력', () => {
      cy.contains("유치원 이름을 입력해주세요");
      cy.get('[data-testid="input-kindergarten-name"]').clear();
      cy.get('[data-testid="input-kindergarten-name"]').type(
        "유치원이름유치원이름"
      );
      cy.get('[data-testid="button-next-step-of-signup"]').click();
      cy.contains("2에서 8글자 사이의 이름을 입력해주세요.");
    });

    it('3글자 미만의 유치원 이름이 입력되었을 경우 "3에서 4글자 사이의 한글 이름을 입력해주세요." 메세지 출력', () => {
      cy.contains("대표자 이름을 입력해주세요");
      cy.get('[data-testid="input-kindergarten-director-name"]').clear();
      cy.get('[data-testid="input-kindergarten-director-name"]').type("김숙");
      cy.get('[data-testid="button-next-step-of-signup"]').click();
      cy.contains("3에서 4글자 사이의 한글 이름을 입력해주세요.");
    });

    it('4글자를 초과하는 유치원 이름이 입력되었을 경우 "2에서 8글자 사이의 이름을 입력해주세요." 메세지 출력', () => {
      cy.contains("대표자 이름을 입력해주세요");
      cy.get('[data-testid="input-kindergarten-director-name"]').clear();
      cy.get('[data-testid="input-kindergarten-director-name"]').type(
        "김숙자김숙자"
      );
      cy.get('[data-testid="button-next-step-of-signup"]').click();
      cy.contains("3에서 4글자 사이의 한글 이름을 입력해주세요.");
    });
  });

  describe("전화번호 Validation", () => {
    beforeEach(() => {
      /**
       * step 1
       */
      cy.contains("이메일 주소를 입력해주세요");
      cy.get('[data-testid="input-email"]').type("no-dup@test.com");
      cy.get('[data-testid="email-button-dup-chk"]').click();
      cy.contains("사용 가능한 이메일 입니다.");

      cy.contains("비밀번호를 입력해주세요");
      cy.get('[data-testid="input-password"]').type("12345678a!");
      cy.get('[data-testid="input-password-confirm"]').type("12345678a!");

      cy.get('[data-testid="button-agreement"]').click();

      cy.get('[data-testid="button-next-step-of-signup"]').click();

      cy.contains("이제 곧 끝나요!");

      cy.wait(1000);

      /**
       * `다음` 버튼을 누르기 위한 준비
       */
      cy.get('[data-testid="input-kindergarten-name"]').type("유치원이름");
      cy.get('[data-testid="input-kindergarten-director-name"]').type("김숙자");
    });

    it('xxx-xxxx-xxxx 형태의 전화번호가 입력되지 않았을 경우 "올바른 형식의 전화번호를 입력하세요" 메세지 출력', () => {
      cy.contains("유치원 이름을 입력해주세요");
      cy.get('[data-testid="input-phone-number"]').type("010-12345678");
      cy.get('[data-testid="button-next-step-of-signup"]').click();
      cy.contains("올바른 형식의 전화번호를 입력하세요");
    });
  });
});
