// react
import React, { useRef, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  useWindowDimensions,
  Platform,
  Pressable,
} from "react-native";
import { useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

// apis
import { apiService } from "@/apis";
import { useState } from "react";

// expo
import { router } from "expo-router";

// constants
import { VIEW_NAME, size } from "@/constants";

// hooks
import { useDyanmicStyle } from "@/hooks";

// components
import { AView } from "@/components/Layout/AView";
import { NavigationButton } from "@/components/Button/NavigationButton";

// bottom sheets
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";

export default function Main() {
  /**
   * useQuery
   */
  const { data } = useQuery(
    [],
    async () => {
      return await apiService.getDiariesDate();
    },
    {
      retry: 0,
    }
  );

  /**
   * bottomSheets
   */
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const [sheetIndex, setSheetIndex] = useState(-1);

  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  /**
   * bottom sheet의 반응형 너비 계산
   */
  const { width, height } = useWindowDimensions();

  const bottomSheetMaxWidthStyle = useDyanmicStyle(() => {
    const maxWidth =
      Platform.OS === "web" && width >= size.LAPTOP_WIDTH
        ? (9 * height) / 16
        : "100%";

    return { maxWidth };
  }, [width, height]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text>메인 페이지</Text>

        <Text>인덱스 : {sheetIndex}</Text>

        <Button
          onPress={() => {
            bottomSheetRef.current?.present();
          }}
          title="모달 열기"
        />

        <Button
          onPress={() => {
            AsyncStorage.removeItem("accessToken");

            router.replace(VIEW_NAME.HOME);
          }}
          title="로그아웃"
        />

        <BottomSheetModal
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={animatedSnapPoints}
          contentHeight={animatedContentHeight}
          handleHeight={animatedHandleHeight}
          containerStyle={[
            bottomSheetMaxWidthStyle,
            styles.bottomSheetContainer,
          ]}
        >
          <BottomSheetView
            style={styles.contentContainer}
            onLayout={handleContentLayout}
          >
            <View
              style={{
                height: 300,
                width: "100%",
                backgroundColor: "red",
              }}
            >
              <Text>캘린더</Text>
            </View>

            <NavigationButton content="확인" style={{ padding: 20 }} />
          </BottomSheetView>
        </BottomSheetModal>
      </View>

      <AView
        isMount={sheetIndex !== -1}
        duration={300}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <Pressable
          onPress={() => {
            bottomSheetRef.current?.dismiss();
          }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.5,
          }}
        />
      </AView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
  },

  bottomSheetContainer: {
    marginHorizontal: "auto",
  },
});
