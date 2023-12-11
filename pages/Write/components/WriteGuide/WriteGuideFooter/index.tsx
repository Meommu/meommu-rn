// react
import React from "react";
import { View, Text, Pressable } from "react-native";
import Swiper from "react-native-web-swiper";
import Animated, { useDerivedValue } from "react-native-reanimated";

// expo
import { LinearGradient } from "expo-linear-gradient";

// bottom sheet
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetFooterProps } from "@gorhom/bottom-sheet";
import { BottomSheetFooter } from "@gorhom/bottom-sheet";

// constants
import { color, size } from "@/constants";

// styles
import { styles } from "./index.styles";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Footer } from "@/components/Layout/Footer";

// hooks
import { useToast } from "@/hooks";

interface WriteGuideFooterProps {
  guideElements: GuideElement[] | undefined;

  bottomSheetRef: React.RefObject<BottomSheetMethods>;

  swiperRef: React.RefObject<Swiper | null>;

  swiperIndex: number;

  animatedFooterPosition: Animated.SharedValue<number>;

  createGptDiary: (diaries: string) => void;
}

function WriteGuideFooter({
  guideElements,
  bottomSheetRef,
  swiperRef,
  swiperIndex,
  animatedFooterPosition,
  createGptDiary,
}: WriteGuideFooterProps) {
  const { fireToast } = useToast();

  const footerPosition = useDerivedValue(() => {
    return Math.max(
      animatedFooterPosition.value,
      size.WRITE_GUIDE_HEADER_HEIGHT
    );
  }, []);

  const footerTitle = !guideElements
    ? ""
    : swiperIndex === 0
    ? "1단계"
    : swiperIndex === guideElements.length - 1
    ? "3단계"
    : "2단계";

  const handleNextButtonClick = () => {
    if (!guideElements || !swiperRef.current) {
      return;
    }

    const selectedIndexes: number[] = [];

    guideElements[0].items.forEach(({ isSelect }, i) => {
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
      case guideElements.length - 1:
        const sentenses: string[] = [];

        for (let i = 0; i < guideElements.length; i++) {
          if (i === 0) {
            continue;
          }

          const { type, items } = guideElements[i];

          if (type === "list") {
            if (!guideElements[0].items[Math.floor((i - 1) / 2)].isSelect) {
              continue;
            }

            for (let j = 0; j < items.length - 1; j++) {
              const item = items[j];

              if (item.isSelect) {
                sentenses.push(item.sentence);
              }
            }

            if (!items[items.length - 1].isSelect) {
              i++;
            }
          }

          if (type === "input") {
            if (
              i !== guideElements.length - 1 &&
              !guideElements[0].items[Math.floor((i - 1) / 2)].isSelect
            ) {
              continue;
            }

            const item = items[items.length - 1];

            if (item.isSelect) {
              sentenses.push(item.sentence);
            }
          }
        }

        bottomSheetRef.current?.snapToIndex(0);

        createGptDiary(sentenses.join("|"));

        break;

      /**
       * 2단계
       */
      default:
        if (guideElements[swiperIndex].type === "list") {
          const { items } = guideElements[swiperIndex];

          const customSentense = items[items.length - 1];

          if (customSentense.isSelect) {
            swiperRef.current.goToNext();

            break;
          }

          const i = Math.floor((swiperIndex - 1) / 2);

          const j = selectedIndexes.indexOf(i);

          const nextIndex = selectedIndexes[j + 1];

          if (nextIndex === undefined) {
            swiperRef.current.goTo(guideElements.length - 1);

            break;
          }

          swiperRef.current.goTo(nextIndex * 2 + 1);
        }

        if (guideElements[swiperIndex].type === "input") {
          const i = Math.floor((swiperIndex - 1) / 2);

          const j = selectedIndexes.indexOf(i);

          const nextIndex = selectedIndexes[j + 1];

          if (nextIndex === undefined) {
            swiperRef.current.goTo(guideElements.length - 1);

            break;
          }

          swiperRef.current.goTo(nextIndex * 2 + 1);
        }

        break;
    }
  };

  const handlePrevButtonClick = () => {
    if (!guideElements || !swiperRef.current) {
      return;
    }

    const selectedIndexes: number[] = [];

    guideElements[0].items.forEach(({ isSelect }, i) => {
      if (isSelect) {
        selectedIndexes.push(i);
      }
    });

    if (!selectedIndexes.length) {
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
      case guideElements.length - 1:
        const prevIndex = selectedIndexes[selectedIndexes.length - 1];

        const prevItems = guideElements[prevIndex * 2 + 1].items;

        const customSentense = prevItems[prevItems.length - 1];

        if (customSentense.isSelect) {
          swiperRef.current.goTo(prevIndex * 2 + 2);
        } else {
          swiperRef.current.goTo(prevIndex * 2 + 1);
        }

        break;

      /**
       * 2단계
       */
      default:
        if (guideElements[swiperIndex].type === "input") {
          swiperRef.current.goToPrev();
        }

        if (guideElements[swiperIndex].type === "list") {
          const i = Math.floor((swiperIndex - 1) / 2);

          const j = selectedIndexes.indexOf(i);

          const prevIndex = selectedIndexes[j - 1];

          if (prevIndex === undefined) {
            swiperRef.current.goTo(0);

            break;
          }

          const prevItems = guideElements[prevIndex * 2 + 1].items;

          const customSentense = prevItems[prevItems.length - 1];

          if (customSentense.isSelect) {
            swiperRef.current.goTo(prevIndex * 2 + 2);
          } else {
            swiperRef.current.goTo(prevIndex * 2 + 1);
          }
        }

        break;
    }
  };

  return (
    <BottomSheetFooter bottomInset={0} animatedFooterPosition={footerPosition}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.header}
          colors={[color.bg500, `${color.bg500}00`]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <Text style={styles.headerText}>{footerTitle}</Text>
        </LinearGradient>

        <Footer style={styles.footer}>
          <NavigationButton
            content="이전"
            onPress={handlePrevButtonClick}
            backgroundColor={color.g800}
            fontColor={color.g300}
          />

          <NavigationButton content="다음" onPress={handleNextButtonClick} />
        </Footer>
      </View>
    </BottomSheetFooter>
  );
}

export const renderFooter = (
  props: Omit<WriteGuideFooterProps, "animatedFooterPosition">
) => {
  return ({ animatedFooterPosition }: BottomSheetFooterProps) => {
    return (
      <WriteGuideFooter
        {...props}
        animatedFooterPosition={animatedFooterPosition}
      />
    );
  };
};
