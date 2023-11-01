describe("로그인/홈 페이지", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/home");
  });

  describe("아이디 Validation", () => {
    it('이메일을 입력하지 않을 경우, "이메일이 입력되지 않았습니다." Toast 형태의 오버레이가 등장', () => {
      cy.get('[data-testid="button-signin"]').click();

      cy.contains("이메일이 입력되지 않았습니다.");
    });

    it('올바르지 않은 형태의 이메일을 입력할 경우, "이메일 형식이 올바르지 않습니다." Toast 형태의 오버레이가 등장', () => {
      cy.get('[data-testid="input-signin-email"]').type("wrong@email@form");

      cy.get('[data-testid="button-signin"]').click();

      cy.contains("이메일 형식이 올바르지 않습니다.");
    });
  });

  describe("패스워드 Validation", () => {
    beforeEach(() => {
      cy.get('[data-testid="input-signin-email"]').type("correct@email.form");
    });

    it('패스워드를 입력하지 않을 경우, "패스워드가 입력되지 않았습니다." Toast 형태의 오버레이가 등장', () => {
      cy.get('[data-testid="button-signin"]').click();

      cy.contains("패스워드가 입력되지 않았습니다.");
    });
  });

  describe("홈 페이지 프로세스", () => {
    it("로그인이 성공하였을 경우 메인 페이지로 이동", () => {
      cy.get('[data-testid="input-signin-email"]').type("meommu@exam.com");
      cy.get('[data-testid="input-signin-password"]').type("Password1!");

      cy.get('[data-testid="button-signin"]').click();

      cy.location().should((location) => {
        expect(location.pathname).is.equal("/main");
      });
    });

    it('로그인이 실패하였을 경우, "로그인이 실패하였습니다." Toast 형태의 오버레이가 등장 ', () => {
      cy.get('[data-testid="input-signin-email"]').type("wrong@email.com");
      cy.get('[data-testid="input-signin-password"]').type("wrongPassword");

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
