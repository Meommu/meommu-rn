// react
import React, { useRef, useMemo, useCallback, useEffect } from "react";
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

// redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";
import {
  applyCurrentBySelected,
  changeCurrentYearMonth,
  changeSelectedYearMonth,
  updateDiariesThumbnailImage,
} from "@/store/modules/diaryDate";

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
import { SView } from "@/components/Layout/SView";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { PlusButton } from "@/components/Button/PlusButton";
import { UserButton } from "@/components/Button/UserButton";
import { MonthPicker } from "@/components/MonthPicker";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

// bottom sheets
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { createYearMonthKey } from "@/utils";

export default function Main() {
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
   * diary date
   */
  const { data, isLoading } = useQuery(
    [],
    async () => {
      return await apiService.getDiariesSummary();
    },
    {
      retry: 0,
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      return;
    }

    /**
     * 최신 일기가 존재하는 년, 월 추출
     *
     * TODO: createdAt이 아닌 date로 날짜 파싱하기
     */
    const latestDate = !data.length
      ? new Date()
      : new Date(
          data.sort((a, b) => {
            return a.createdAt > b.createdAt ? -1 : 1;
          })[0].createdAt
        );

    const year = latestDate.getFullYear();
    const month = latestDate.getMonth() + 1;

    dispatch(changeCurrentYearMonth(year, month));
    dispatch(changeSelectedYearMonth(year, month));

    /**
     * 년, 월에 존재하는 일기들의 대표 이미지 추출
     */
    const yearMonthToImageId: Map<string, number> = new Map();

    data.forEach(({ date, imageIds }) => {
      if (!imageIds.length) {
        return;
      }

      yearMonthToImageId.set(createYearMonthKey(new Date(date)), imageIds[0]);
    });

    dispatch(updateDiariesThumbnailImage(yearMonthToImageId));
  }, [data]);

  const { currentMonth, currentYear } = useSelector<RootState, DiaryDateState>(
    (state) => state.diaryDate
  );

  const handleDatePickButtonClick = () => {
    dispatch(applyCurrentBySelected());

    bottomSheetRef.current?.dismiss();
  };

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
        {isLoading ? (
          <View style={styles.datePicker}>
            <SView textLength={7} />
          </View>
        ) : (
          <Pressable style={styles.datePicker} onPress={handleSheetOpen}>
            <Text style={styles.datePickerText}>
              {currentYear}년 {currentMonth}월
            </Text>
            <ArrowDropDown />
          </Pressable>
        )}

        {/**
         * (임시) 로그아웃 버튼
         */}
        <Button
          onPress={() => {
            AsyncStorage.removeItem("accessToken");

            router.replace(VIEW_NAME.HOME);
          }}
          title="로그아웃"
        />

        {/**
         * 날짜 선택기 바텀시트 모달
         */}
        <BottomSheetModal
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={animatedSnapPoints}
          contentHeight={animatedContentHeight}
          handleHeight={animatedHandleHeight}
          enableContentPanningGesture={false}
          containerStyle={[
            bottomSheetMaxWidthStyle,
            styles.bottomSheetContainer,
          ]}
          handleIndicatorStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            width: "10%",
          }}
        >
          <BottomSheetView
            style={styles.contentContainer}
            onLayout={handleContentLayout}
          >
            <MonthPicker />
            <NavigationButton
              content="확인"
              style={{ padding: 20 }}
              onPress={handleDatePickButtonClick}
            />
          </BottomSheetView>
        </BottomSheetModal>

        {/**
         * bottom sheet의 dimmed
         */}
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
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
        </AView>
      </View>
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

  /**
   * header
   */
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

  /**
   * controller
   */
  controllerBox: {
    flexDirection: "row",
    paddingVertical: 8,
    gap: 16,
  },

  /**
   * date picker
   */
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

  /**
   * bottom sheet
   */
  bottomSheetContainer: {
    marginHorizontal: "auto",
  },
});
