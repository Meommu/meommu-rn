// react
import { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { View, Text } from "react-native";
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
import { useResponsiveBottomSheet, useSwiper, useToast } from "@/hooks";
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

    /**
     * 1단계 요소 추가
     */
    const guideElement: GuideElement = { type: "list", items: [] };

    for (const { guide } of guideGuides) {
      guideElement.items.push({ isSelect: false, sentence: guide });
    }

    /**
     * 2단계 요소 추가
     */
    guideElements.push(guideElement);

    for (const { id } of guideGuides) {
      const guideDetails = await apiService.getGuideDetails(id);

      const guideElement: GuideElement = { type: "list", items: [] };

      for (const { detail } of guideDetails) {
        guideElement.items.push({ isSelect: false, sentence: detail });
      }

      guideElement.items.push({
        isSelect: false,
        sentence: "나만의 문장 추가하기",
      });

      guideElements.push(guideElement);

      guideElements.push({
        type: "input",
        items: [{ isSelect: false, sentence: "" }],
      });
    }

    /**
     * 3단계 요소 추가
     */
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
  const { swiperIndex, swiperRef, handleSwiperIndexChange } = useSwiper(0);

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
      "65%",
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
   * BottomSheetFooter는 JSX 형태로 사용할 수 없고 BottomSheet 컴포넌트에 함수 형태로 전달해주어야 하므로
   * Props를 전달하는데 문제가 있어, 컴포넌트로 분리하지 않고 내부에 선언하여 사용함.
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

      const { fireToast } = useToast();

      const handleNextButtonClick = useCallback(() => {
        if (!data) {
          return;
        }

        if (!swiperRef.current) {
          fireToast("예상치 못한 오류가 발생했습니다.", 3000);

          return;
        }

        const selectedIndexes: number[] = [];

        data[0].items.forEach(({ isSelect }, i) => {
          if (isSelect) {
            selectedIndexes.push(i);
          }
        });

        if (!selectedIndexes.length) {
          fireToast("최소 하나 이상의 가이드를 선택해주세요.", 3000);

          return;
        }

        switch (swiperIndex) {
          /**
           * 1단계
           */
          case 0:
            const nextIndex = selectedIndexes[0] * 2 + 1;

            swiperRef.current.goTo(nextIndex);

            break;

          /**
           * 3단계
           */
          case data.length - 1:
            const sentenses: string[] = [];

            for (let i = 0; i < data.length; i++) {
              if (i === 0) {
                continue;
              }

              const { type } = data[i];

              if (type === "list") {
                for (let j = 0; j < data[i].items.length - 1; j++) {
                  if (data[i].items[j].isSelect) {
                    sentenses.push(data[i].items[j].sentence);
                  }
                }

                if (!data[i].items[data[i].items.length - 1].isSelect) {
                  i++;

                  continue;
                }
              } else if (type === "input") {
                if (data[i].items[data[i].items.length - 1].isSelect) {
                  sentenses.push(
                    data[i].items[data[i].items.length - 1].sentence
                  );
                }
              }
            }

            console.log(sentenses.join(", "), JSON.stringify(data, null, 2));

            break;

          /**
           * 2단계
           */
          default:
            if (data[swiperIndex].type === "list") {
              const currentItems = data[swiperIndex].items;

              const customSentense = currentItems[currentItems.length - 1];

              if (customSentense.isSelect) {
                swiperRef.current.goToNext();
              } else {
                const nextIndex =
                  selectedIndexes[
                    selectedIndexes.indexOf(Math.floor((swiperIndex - 1) / 2)) +
                      1
                  ];

                if (nextIndex === undefined) {
                  swiperRef.current.goTo(data.length - 1);
                } else {
                  swiperRef.current.goTo(nextIndex * 2 + 1);
                }
              }
            } else if (data[swiperIndex].type === "input") {
              const nextIndex =
                selectedIndexes[
                  selectedIndexes.indexOf(Math.floor((swiperIndex - 1) / 2)) + 1
                ];

              if (nextIndex === undefined) {
                swiperRef.current.goTo(data.length - 1);
              } else {
                swiperRef.current.goTo(nextIndex * 2 + 1);
              }
            }

            break;
        }
      }, [swiperIndex]);

      const handlePrevButtonClick = useCallback(() => {
        if (!data) {
          return;
        }

        if (!swiperRef.current) {
          fireToast("예상치 못한 오류가 발생했습니다.", 3000);

          return;
        }

        const selectedIndexes: number[] = [];

        data[0].items.forEach(({ isSelect }, i) => {
          if (isSelect) {
            selectedIndexes.push(i);
          }
        });

        if (!selectedIndexes.length) {
          fireToast("잘못된 접근입니다.", 3000);

          return;
        }

        switch (swiperIndex) {
          /**
           * 1단계
           */
          case 0:
            // do nothing

            break;

          /**
           * 3단계
           */
          case data.length - 1:
            const prevIndex = selectedIndexes[selectedIndexes.length - 1];

            const prevItems = data[prevIndex * 2 + 1].items;

            if (prevItems[prevItems.length - 1].isSelect) {
              swiperRef.current.goTo(prevIndex * 2 + 2);
            } else {
              swiperRef.current.goTo(prevIndex * 2 + 1);
            }

            break;

          /**
           * 2단계
           */
          default:
            if (data[swiperIndex].type === "input") {
              swiperRef.current.goToPrev();
            } else if (data[swiperIndex].type === "list") {
              const prevIndex =
                selectedIndexes[
                  selectedIndexes.indexOf(Math.floor((swiperIndex - 1) / 2)) - 1
                ];

              if (prevIndex === undefined) {
                swiperRef.current.goTo(0);
              } else {
                const prevItems = data[prevIndex * 2 + 1].items;

                if (prevItems[prevItems.length - 1].isSelect) {
                  swiperRef.current.goTo(prevIndex * 2 + 2);
                } else {
                  swiperRef.current.goTo(prevIndex * 2 + 1);
                }
              }
            }

            break;
        }
      }, [swiperIndex]);

      const step = !data
        ? ""
        : swiperIndex === 0
        ? "1단계"
        : swiperIndex === data.length - 1
        ? "3단계"
        : "2단계";

      return (
        <BottomSheetFooter
          bottomInset={0}
          animatedFooterPosition={footerPosition}
        >
          <View style={styles.bottomSheetFooter}>
            <Text style={styles.bottomSheetFooterTitle}>{step}</Text>
            <View style={styles.bottomSheetFooterButtonWrapper}>
              <NavigationButton
                content="이전"
                onPress={handlePrevButtonClick}
                backgroundColor="#373840"
              />
              <NavigationButton
                content="다음"
                onPress={handleNextButtonClick}
              />
            </View>
          </View>
        </BottomSheetFooter>
      );
    },
    [data, swiperIndex]
  );

  const headerTitle = data
    ? swiperIndex === 0
      ? "멈무일기 가이드"
      : swiperIndex === data.length - 1
      ? "다른 일상"
      : data[0].items[Math.floor((swiperIndex - 1) / 2)].sentence
    : "멈무일기 가이드";

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
        <AIBottomSheetHeader title={headerTitle} />

        {data && (
          <Swiper
            ref={swiperRef}
            onIndexChanged={handleSwiperIndexChange}
            containerStyle={styles.swiperContainer}
            gesturesEnabled={() => false}
            controlsEnabled={false}
            springConfig={{ speed: 20000 }}
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
