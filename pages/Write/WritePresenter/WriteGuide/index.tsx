// react
import { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";

// redux
import { useDispatch } from "react-redux";
import { shareAiBottomSheetRef } from "@/store/modules/aiBottomSheet";

// components
import { AIBottomSheetHeader } from "./AIBottomSheetHeader";
import { AIBottomSheetBackdrop } from "./AIBottomSheetBackdrop";
import { NavigationButton } from "@/components/Button/NavigationButton";

// apis
import { apiService } from "@/apis";

// bottom sheet
import BottomSheet, {
  BottomSheetView,
  BottomSheetFooter,
  type BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";

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

  /**
   * - swiper
   * - guideElement
   *
   * 와 같이 상태에 접근할 일이 많은 컴포넌트이므로 따로 컴포넌트로 분리하지 않고 내부에 선언하여 사용
   *
   * (+) JSX 형태로 사용할 수 없고, BottomSheet 컴포넌트에 함수 형태로 전달해주어야 하므로 Props를 전달하는데에도 문제가 있음.
   */
  const AIBottomSheetFooter = useCallback(
    ({ animatedFooterPosition }: BottomSheetFooterProps) => {
      const footerPosition = useDerivedValue(() => {
        /**
         * 바텀시트 푸터 컴포넌트에는, 푸터 컴포넌트가 항상 시트의 하단에 위치할 수 있도록하기 위한 계산값 `animatedFooterPosition`이 props로 넘겨진다.
         *
         * `animatedFooterPosition`은 바텀시트의 최상단 position과의 거리값이므로, 바텀시트가 위로 올라올수록 값은 더 커진다.
         *
         * 만약 푸터 컴포넌트의 등장을 지연시키고 싶다면, 이러한 특징을 이용하여 `animatedFooterPosition`의 최소값을 늘려주면 된다.
         *
         * 1) `animatedFooterPosition`의 값
         * 2) 바텀시트가 등장하기를 원하는 적절한 높이
         *
         * 두 값을 비교하여 항상 최대값을 반환하면 된다.
         */
        return Math.max(
          animatedFooterPosition.value,
          size.AI_BOTTOM_SHEET_HEADER_HEIGHT
        );
      }, []);

      return (
        <BottomSheetFooter
          bottomInset={0}
          animatedFooterPosition={footerPosition}
        >
          <View style={styles.bottomSheetFooter}>
            <NavigationButton content="이전" backgroundColor="#373840" />
            <NavigationButton
              content="다음"
              onPress={() => {
                console.log("[test]", data);
              }}
            />
          </View>
        </BottomSheetFooter>
      );
    },
    [data]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      containerStyle={bottomSheetMaxWidthStyle}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}
      footerComponent={AIBottomSheetFooter}
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
