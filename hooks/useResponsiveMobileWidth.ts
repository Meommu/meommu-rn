// react
import { type ViewStyle } from "react-native";

// redux
import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { type LayoutState } from "@/store/modules/layout";

// hooks
import { useDynamicStyle } from "./useDynamicStyle";

export const useResponsiveMobileWidth = () => {
  /**
   * ※ expo-router 특성상 현재 페이지가 아니더라도 메모리에 렌더링 되어있을 수 있다.
   *
   * 루트 레이아웃의 width값은 `/pages/RootLayout/ResponsiveLayoutView` 컴포넌트에서
   * `useWindowDimensions` 훅을 사용해 계산된 후 전역 상태로 공유되는 것이므로,
   * 해당 훅을 사용하는 컴포넌트는 화면이 크기조절 될 경우 리렌더링 될 수 있다는 것을 고려해 오작동이 발생하지 않게 유의하여 사용해야 한다.
   */
  const { width } = useSelector<RootState, LayoutState>(
    (state) => state.layout
  );

  const responsiveWidthStyle = useDynamicStyle<ViewStyle>(() => {
    return {
      maxWidth: width,
    };
  }, [width]);

  return {
    responsiveWidthStyle,
  };
};
