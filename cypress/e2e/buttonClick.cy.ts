import { color } from "../../constants";
import { getTestElement } from "./utils";

describe("버튼 클릭 테스트", () => {
  before(() => {});

  it("개인정보 수집약관 동의 버튼을 토글할 수 있어야 한다.", () => {
    cy.visit("http://localhost:8081/sign-up");

    const agreementButton = getTestElement("button-agreement");

    agreementButton.then(([$el]) => {
      const $circleSvg = $el.querySelector("circle");

      expect($circleSvg?.getAttribute("fill")).is.equal(color.g200);

      agreementButton.click().then(() => {
        expect($circleSvg?.getAttribute("fill")).is.equal(color.g800);

        agreementButton.click().then(() => {
          expect($circleSvg?.getAttribute("fill")).is.equal(color.g200);
        });
      });
    });
  });
});
