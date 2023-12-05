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
   * expo-router 특성상 현재 페이지가 아니더라도 메모리에 렌더링 되어있을 수 있다.
   *
   * `useWindowDimensions` 훅을 사용하는 만큼 화면이 크기조절 될 경우 리렌더링이 발생할 수 있으니,
   *
   * 리렌더링으로 인한 오작동이 발생하지 않게 훅을 사용하는 컴포넌트를 잘 고려하며 사용해야 한다.
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
