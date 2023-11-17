// react
import { useRef, useMemo } from "react";
import { useWindowDimensions, Platform } from "react-native";

// hooks
import { useDynamicStyle } from "./useDynamicStyle";

// constants
import { size } from "@/constants";

// bottom sheet
import {
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";

export const useResponsiveBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

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

  const bottomSheetMaxWidthStyle = useDynamicStyle(() => {
    const maxWidth =
      Platform.OS === "web" && width >= size.LAPTOP_WIDTH
        ? (9 * height) / 16
        : "100%";

    return { maxWidth };
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
