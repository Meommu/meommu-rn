// react
import { Platform } from "react-native";
import { useCallback, useEffect } from "react";

/**
 * 포커스 가능한 swiper 사용 시 tab 키를 누를 경우 화면이 이동하는 문제를 해결하기 위해 구현
 *
 * 모바일에서도 의도적으로 tab 동작을 수행할 수 있지만, tab 키가 자주 사용하는 웹 환경에 대해서만 지원
 */
export function usePreventTabScrolling() {
  const findNextFocusableElement = useCallback(
    (currentElement: HTMLElement) => {
      const focusableElements = Array.from(
        document.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );

      const currentIndex = focusableElements.indexOf(currentElement);

      const nextIndex = (currentIndex + 1) % focusableElements.length;

      return focusableElements[nextIndex];
    },
    []
  );

  const handleKeydownEvent = useCallback((e: KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const currentFocusedElement = document.activeElement;

      if (!(currentFocusedElement instanceof HTMLElement)) {
        return;
      }

      const nextFocusableElement = findNextFocusableElement(
        currentFocusedElement
      );

      if (nextFocusableElement instanceof HTMLElement) {
        nextFocusableElement.focus({ preventScroll: true });
      }
    }
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    document.addEventListener("keydown", handleKeydownEvent);

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
      input.addEventListener("keydown", handleKeydownEvent);
    });

    return () => {
      document.removeEventListener("keydown", handleKeydownEvent);

      inputs.forEach((input) => {
        input.removeEventListener("keydown", handleKeydownEvent);
      });
    };
  }, []);
}
