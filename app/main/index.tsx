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
import { PlusButton } from "@/components/Button/PlusButton";
import { UserButton } from "@/components/Button/UserButton";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

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

  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(11);

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

  const handleSheetOpen = useCallback(() => {
    bottomSheetRef.current?.present();
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
        {/**
         * 헤더
         */}
        <View style={styles.header}>
          <Text style={styles.logoText}>meommu</Text>

          <View style={styles.controllerBox}>
            <UserButton />
            <PlusButton />
          </View>
        </View>

        {/**
         * 날짜 선택기
         */}
        <Pressable style={styles.datePicker} onPress={handleSheetOpen}>
          <Text style={styles.datePickerText}>
            {year}년 {month}월
          </Text>
          <ArrowDropDown />
        </Pressable>

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

  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },

  logoText: {
    fontSize: 30,
    fontFamily: "yeonTheLand",
  },

  controllerBox: {
    flexDirection: "row",
    paddingVertical: 8,
    gap: 16,
  },

  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 12,
  },

  datePickerText: {
    fontFamily: "yeonTheLand",
    color: "#89899C",
  },

  bottomSheetContainer: {
    marginHorizontal: "auto",
  },
});
