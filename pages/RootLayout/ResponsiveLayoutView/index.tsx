// react
import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  useWindowDimensions,
  Platform,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AiBottomSheetState } from "@/store/modules/aiBottomSheet";

// constants
import { size } from "@/constants";

// hooks
import { useDynamicStyle } from "@/hooks";

interface ResponsiveLayoutViewProps {
  children: React.ReactNode;
}

export function ResponsiveLayoutView({ children }: ResponsiveLayoutViewProps) {
  /**
   * notch, home indicator를 고려한 레이아웃
   */
  const { top, bottom } = useSafeAreaInsets();

  const { isOpen } = useSelector<RootState, AiBottomSheetState>(
    (state) => state.aiBottomSheet
  );

  const homeIndicatorStyle = useDynamicStyle(() => {
    return {
      backgroundColor: Platform.OS === "ios" && isOpen ? "#1B1E26" : "white",
    };
  }, [isOpen]);

  /**
   * 기기의 너비에 따른 반응형 레이아웃
   */
  const { width } = useWindowDimensions();

  const [isPcWeb, setIsPcWeb] = useState<boolean | null>(null);

  useEffect(() => {
    setIsPcWeb(Platform.OS === "web" && width >= size.LAPTOP_WIDTH);
  }, [width]);

  const mobileLayoutStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: "auto",
      maxWidth: "100%",
      height: "100%",
      aspectRatio: "9 / 16",
      marginLeft: "auto",
      marginRight: "auto",
      overflow: "hidden",
    }),
    []
  );

  const hiddenStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      display: "none",
    }),
    []
  );

  const dummyStyle: StyleProp<ViewStyle> = useMemo(() => ({}), []);

  const responsiveStyle =
    isPcWeb === null ? hiddenStyle : isPcWeb ? mobileLayoutStyle : dummyStyle;

  return (
    <View style={[styles.container, responsiveStyle]}>
      <View style={{ width: "100%", height: top, backgroundColor: "white" }} />
      {children}
      <View style={[{ width: "100%", height: bottom }, homeIndicatorStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
