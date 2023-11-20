// react
import { useRef, useMemo } from "react";
import { useWindowDimensions, Platform, ViewStyle } from "react-native";

// hooks
import { useDynamicStyle } from "./useDynamicStyle";

// constants
import { size, zIndex } from "@/constants";

// bottom sheet
import {
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";

export const useResponsiveBottomSheet = (
  /**
   * snapPoints 배열 내에 "CONTENT_HEIGHT" 상수가 들어가지 않으면 반응형으로 높이가 조절되지 않음에 유의
   */
  snapPoints?: (string | number)[]
) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const initialSnapPoints = useMemo(() => snapPoints || ["CONTENT_HEIGHT"], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  /**
   * bottom sheet의 반응형 너비 계산
   */
  const { width, height } = useWindowDimensions();

  const bottomSheetMaxWidthStyle = useDynamicStyle<ViewStyle>(() => {
    const maxWidth =
      Platform.OS === "web" && width >= size.LAPTOP_WIDTH
        ? (9 * height) / 16
        : "100%";

    return {
      maxWidth,
      marginHorizontal: "auto",
      zIndex: zIndex.bottomSheetContainer,
    };
  }, [width, height]);

  return {
    bottomSheetRef,
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
    bottomSheetMaxWidthStyle,
  };
};
