// react
import React, { useCallback } from "react";
import {
  View,
  useWindowDimensions,
  Platform,
  type LayoutChangeEvent,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// redux
import { useDispatch } from "react-redux";
import { changeLayoutWidth } from "@/store/modules/layout";

// constants
import { size } from "@/constants";

// hooks
import { useDynamicStyle } from "@/hooks";

// styles
import { styles } from "./index.styles";

interface ResponsiveLayoutViewProps {
  children: React.ReactNode;
}

export function ResponsiveLayoutView({ children }: ResponsiveLayoutViewProps) {
  const dispatch = useDispatch();

  const { top } = useSafeAreaInsets();

  const { width } = useWindowDimensions();

  const responsiveStyle = useDynamicStyle<ViewStyle>(() => {
    if (Platform.OS !== "web" || width < size.LAPTOP_WIDTH) {
      return {
        width: "100%",
        height: "100%",
      };
    }

    return {
      width: "auto",
      maxWidth: "100%",
      height: "100%",
      aspectRatio: "9 / 16",

      marginHorizontal: "auto",

      overflow: "hidden",
    };
  }, [width]);

  const handleLayoutChange = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }: LayoutChangeEvent) => {
      dispatch(changeLayoutWidth(width));
    },
    []
  );

  return (
    <View style={responsiveStyle} onLayout={handleLayoutChange}>
      <View style={[styles.notch, { height: top }]} />

      <View style={styles.content}>{children}</View>
    </View>
  );
}
