// react
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { View, Text, TextInput, PressableProps, Pressable } from "react-native";

// redux
import { useDispatch } from "react-redux";
import { shareAiBottomSheetRef } from "@/store/modules/aiBottomSheet";

// components
import { AIBottomSheetFooter } from "./AIBottomSheetFooter";
import { AIBottomSheetHeader } from "./AIBottomSheetHeader";
import { AIBottomSheetBackdrop } from "./AIBottomSheetBackdrop";

// apis
import { apiService } from "@/apis";

// bottom sheet
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

// constants
import { size } from "@/constants";

// hooks
import { useResponsiveBottomSheet, useSwiper } from "@/hooks";
import Swiper from "react-native-web-swiper";

// styles
import { styles } from "./index.styles";
import { MultiSelectList } from "./MultiSelectList";
import { SentenseInput } from "./SentenseInput";

interface WriteGuideProps {}

export function WriteGuide({}: WriteGuideProps) {
  /**
   * react query
   */
  const { data } = useQuery(["writeGuide"], async () => {
    const guideElements: GuideElement[] = [];

    const guideGuides = await apiService.getGuideGuides();

    const guideElement: GuideElement = { type: "list", items: [] };

    for (const { guide } of guideGuides) {
      guideElement.items.push({ isSelect: false, sentence: guide });
    }

    guideElements.push(guideElement);

    for (const { id } of guideGuides) {
      const guideDetails = await apiService.getGuideDetails(id);

      const guideElement: GuideElement = { type: "list", items: [] };

      for (const { detail } of guideDetails) {
        guideElement.items.push({ isSelect: false, sentence: detail });
      }

      guideElement.items.push({ isSelect: false, sentence: "" });

      guideElements.push(guideElement);

      guideElements.push({
        type: "input",
        items: [{ isSelect: false, sentence: "" }],
      });
    }

    guideElements.push({
      type: "input",
      items: [{ isSelect: false, sentence: "" }],
    });

    return guideElements;
  });

  /**
   * redux
   */
  const dispatch = useDispatch();

  /**
   * swiper
   */
  const { swiperRef, handleSwiperIndexChange } = useSwiper(0);

  /**
   * bottom Sheets
   *
   * TODO: 사용되지 않는 훅도, 훅 내부에 존재하고 있어 추후 분리해야 할 것 같음.
   */
  const { bottomSheetRef, bottomSheetMaxWidthStyle } =
    useResponsiveBottomSheet();

  const snapPoints = useMemo(
    () => [
      size.BOTTOM_SHEET_INDICATOR_HEIGHT + size.AI_BOTTOM_SHEET_HEADER_HEIGHT,
      "60%",
      "99%",
    ],
    []
  );

  useEffect(() => {
    /**
     * 가이드의 열림/닫힘을 외부 컴포넌트에서도 제어할 수 있도록 bottomSheetRef를 전역 상태로 공유
     */
    dispatch(shareAiBottomSheetRef(bottomSheetRef));
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      containerStyle={bottomSheetMaxWidthStyle}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}
      footerComponent={AIBottomSheetFooter({ guideElements: data })}
      backdropComponent={AIBottomSheetBackdrop}
      enablePanDownToClose={true}
      index={-1}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        <AIBottomSheetHeader />

        {data && (
          <Swiper
            ref={swiperRef}
            onIndexChanged={handleSwiperIndexChange}
            containerStyle={styles.swiperContainer}
            gesturesEnabled={() => false}
            controlsEnabled={false}
          >
            {data.map(({ type, items }, i) => {
              return type === "list" ? (
                <MultiSelectList guideElementItems={items} key={i} />
              ) : (
                <SentenseInput guideElementItems={items} key={i} />
              );
            })}
          </Swiper>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}
