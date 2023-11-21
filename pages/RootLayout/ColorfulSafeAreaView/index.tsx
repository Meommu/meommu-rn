// react
import React, { Fragment } from "react";
import { Platform, SafeAreaView } from "react-native";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { AiBottomSheetState } from "@/store/modules/aiBottomSheet";

// hooks
import { useDynamicStyle } from "@/hooks";

interface ColorfulSafeAreaViewProps {
  children: React.ReactNode;
}
export function ColorfulSafeAreaView({ children }: ColorfulSafeAreaViewProps) {
  const { isOpen } = useSelector<RootState, AiBottomSheetState>(
    (state) => state.aiBottomSheet
  );

  const homeIndicatorStyle = useDynamicStyle(() => {
    return {
      backgroundColor: Platform.OS === "ios" && isOpen ? "#1B1E26" : "white",
    };
  }, [isOpen]);

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
      <SafeAreaView style={[{ flex: 1 }, homeIndicatorStyle]}>
        {children}
      </SafeAreaView>
    </Fragment>
  );
}
