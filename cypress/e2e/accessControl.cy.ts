const clearAndWriteInputText = (testId: string, text: string) => {
  const $inputElement = cy.get(`[data-testid="${testId}"]`);

  $inputElement.clear();
  $inputElement.type(text);
};

describe("로그인/비로그인 상태에서의 페이지 접근제어", () => {
  before(() => {
    window.localStorage.setItem("onboarding", "end");
    cy.clearLocalStorage("accessToken");
  });

  it("비 로그인 상태로 메인 페이지에 접근할 경우 로그인 페이지로 이동 후 '잘못된 접근입니다.' 경고 메세지 출력", () => {
    cy.visit("http://localhost:8081/main");

    cy.contains("잘못된 접근입니다.");

    cy.contains("로그인");
  });

  it("올바르게 로그인 할 경우 메인 페이지 접근 가능", () => {
    clearAndWriteInputText("input-signin-email", "meommu@exam.com");
    clearAndWriteInputText("input-signin-password", "Password1!");

    cy.get('[data-testid="button-signin"]').click();

    cy.contains(/[0-9]{4}년 [0-9]{1,2}월/, { timeout: 1000 * 10 });
  });

  it("로그인 상태로 홈 페이지에 접근할 경우 메인 페이지로 이동 후 '잘못된 접근입니다.' 경고 메세지 출력", () => {
    cy.visit("http://localhost:8081/home");

    cy.contains("잘못된 접근입니다.");

    cy.contains(/[0-9]{4}년 [0-9]{1,2}월/, { timeout: 1000 * 10 });
  });

  it("올바르게 로그아웃 할 경우 홈 페이지로 이동", () => {
    cy.get('[data-testid="button-setting"]').click();

    cy.contains("로그아웃");

    cy.get('[data-testid="button-logout"]').click();

    cy.contains("로그인");
  });
});
