describe("회원가입 페이지", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/sign-up");
  });

  describe("이메일 Validation", () => {
    it('중복된 이메일을 입력했을 경우 "사용 불가능한 이메일 입니다." 메세지 출력', () => {
      cy.contains("이메일 주소를 입력해주세요");

      cy.get('[data-testid="input-email"]').type("dup1@test.com");

      cy.get('[data-testid="email-dup-chk-button"]').click();

      cy.contains("사용 불가능한 이메일 입니다.");
    });
  });
});
