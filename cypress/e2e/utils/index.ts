/**
 * core
 */
export const getTestElement = (testId: string) => {
  return cy.get(`[data-testId="${testId}"]`);
};

/**
 * input
 */
export const clearAndWriteInputText = (testId: string, text: string) => {
  const inputElement = getTestElement(testId);

  inputElement.clear();
  inputElement.type(text);
};

/**
 * button
 */
export const clickAgreementButton = () => {
  getTestElement("button-agreement").click();
};

export const clickEmailDupChkButton = () => {
  getTestElement("email-button-dup-chk").click();
};

export const clickNextStepButton = () => {
  getTestElement("button-next-step-of-signup").click();
};

export const clickSignInButton = () => {
  getTestElement("button-signin").click();
};

export const clickSettingButtonClick = () => {
  getTestElement("button-setting").click();
};

export const clickLogoutButtonClick = () => {
  getTestElement("button-logout").click();
};

/**
 * text (button)
 */
export const clickSignUpText = () => {
  getTestElement("text-goto-signup").click();
};

/**
 * contains
 */
export const chkSwiperIndex = (swiperIndex: number) => {
  cy.contains(`swiperIndex ${swiperIndex}`);
};
