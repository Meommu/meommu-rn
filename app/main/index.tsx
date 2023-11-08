// react
import React, { useRef, useMemo, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Pressable,
} from "react-native";
import { useQuery } from "react-query";

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

// expo
import { router } from "expo-router";

// constants
import { VIEW_NAME, size } from "@/constants";

// hooks
import { useDyanmicStyle } from "@/hooks";

// components
import { SText } from "@/components/Text/SText";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { PlusButton } from "@/components/Button/PlusButton";
import { MonthPicker } from "@/components/MonthPicker";
import { SettingButton } from "@/components/Button/SettingButton";
import { DiaryList } from "@/components/DiaryList";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

// bottom sheets
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

// utils
import { createYearMonthKey } from "@/utils";
import { Header } from "@/components/Layout/Header";

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
    if (!data || !data.length) {
      return;
    }

    /**
     * 최신 일기가 존재하는 년, 월 추출
     */
    const latestDate = data
      .map(({ date }) => new Date(date))
      .sort((a, b) => {
        return a > b ? -1 : 1;
      })[0];

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

  /**
   * bottom sheet의 dimmed
   *
   * ※ Web 환경에서는 뒷 배경 클릭시 바텀시트 모달이 닫히지 않음.
   * ※ v5 버전에서 업데이트를 기다려야 할 것 같음.
   */
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  /**
   * 컨트롤러(세팅, 글쓰기) 버튼 핸들러
   */
  const handleSettingButtonClick = () => {
    router.push(VIEW_NAME.SETTING);
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {/**
         * 헤더
         */}
        <View style={styles.headerWrapper}>
          <Header
            left={<Text style={styles.logoText}>meommu</Text>}
            right={
              <View style={styles.controllerBox}>
                <SettingButton onPress={handleSettingButtonClick} />
                <PlusButton />
              </View>
            }
          />
        </View>

        {/**
         * 날짜 선택기
         */}
        {isLoading ? (
          <View style={styles.datePicker}>
            <SText textLength={7} />
          </View>
        ) : (
          <Pressable style={styles.datePicker} onPress={handleSheetOpen}>
            <Text style={styles.datePickerText}>
              {currentYear}년 {currentMonth}월
            </Text>
            <ArrowDropDown />
          </Pressable>
        )}

        <DiaryList />

        {/**
         * 날짜 선택기 바텀시트 모달
         */}
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={animatedSnapPoints}
          contentHeight={animatedContentHeight}
          handleHeight={animatedHandleHeight}
          enableContentPanningGesture={false}
          containerStyle={[
            bottomSheetMaxWidthStyle,
            styles.bottomSheetContainer,
          ]}
          handleIndicatorStyle={styles.handleIndicator}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView onLayout={handleContentLayout}>
            <MonthPicker />
            <NavigationButton
              content="확인"
              style={styles.chooseMonthButton}
              onPress={handleDatePickButtonClick}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },

  /**
   * header
   */
  headerWrapper: {
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
    paddingBottom: 20,
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

  handleIndicator: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "10%",
  },

  chooseMonthButton: {
    padding: 20,
  },
});
