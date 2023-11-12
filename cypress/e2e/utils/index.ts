export const getTestElement = (testId: string) => {
  return cy.get(`[data-testId="${testId}"]`);
};

export const clearAndWriteInputText = (testId: string, text: string) => {
  const inputElement = getTestElement(testId);

  inputElement.clear();
  inputElement.type(text);
};

export const clickAgreementButton = () => {
  getTestElement("button-agreement").click();
};

export const clickEmailDupChkButton = () => {
  getTestElement("email-button-dup-chk").click();
};

export const clickNextStepButton = () => {
  getTestElement("button-next-step-of-signup").click();
};
