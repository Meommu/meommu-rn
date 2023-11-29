// react
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { View, Text, Pressable } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import { useFormContext } from "react-hook-form";
import Swiper from "react-native-web-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// redux
import { useDispatch } from "react-redux";
import { shareAiBottomSheetRef } from "@/store/modules/aiBottomSheet";

// components
import { AIBottomSheetHeader } from "./AIBottomSheetHeader";
import { AIBottomSheetBackdrop } from "./AIBottomSheetBackdrop";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { MultiSelectList } from "./MultiSelectList";
import { SentenseInput } from "./SentenseInput";
import { MultiSelectListSkeleton } from "./MultiSelectList/index.skeleton";

// apis
import { apiService, baseURL } from "@/apis";

// bottom sheet
import BottomSheet, {
  BottomSheetView,
  BottomSheetFooter,
  type BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";

// constants
import { size } from "@/constants";

// hooks
import { useResponsiveMobileWidth, useSwiper, useToast } from "@/hooks";

// bottom sheet modal
import { BottomSheetModal } from "@gorhom/bottom-sheet";

// styles
import { styles } from "./index.styles";

// svgs
import Stop from "@/assets/svgs/stop.svg";

// utils
import * as _ from "lodash";
import { sleep } from "@/utils";

interface WriteGuideProps {}

export function WriteGuide({}: WriteGuideProps) {
  const { fireToast } = useToast();

  const dispatch = useDispatch();

  const { swiperIndex, swiperRef, handleSwiperIndexChange } = useSwiper(0);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { responsiveWidthStyle } = useResponsiveMobileWidth();

  const { setValue, getValues } = useFormContext<DiaryWriteFormFieldValues>();

  const snapPoints = useMemo(
    () => [
      size.BOTTOM_SHEET_INDICATOR_HEIGHT + size.AI_BOTTOM_SHEET_HEADER_HEIGHT,
      "65%",
      "99%",
    ],
    []
  );

  /**
   * 가이드의 열림/닫힘을 외부 컴포넌트에서도 제어할 수 있도록 bottomSheetRef를 전역 상태로 공유
   */
  useEffect(() => {
    dispatch(shareAiBottomSheetRef(bottomSheetRef));
  }, []);

  /**
   * gpt 일기 생성
   */
  const interrupt = useRef(false);

  const createGptDiaryMutation = useMutation(
    async (details: string) => {
      const accessToken = await AsyncStorage.getItem("accessToken");

      /**
       * axios는 브라우저에서 XMLHttpRequest API를 사용하는데,
       * XMLHttpRequest는 `stream` 응답 형식을 지원하지 않는 문제가 있어 fetch를 이용하여 요청하도록 구현하였다.
       *
       * https://stackoverflow.com/questions/60048180/is-it-possible-to-post-a-responsetype-stream-in-axios
       *
       * ※ 현재 axios 사용하지 않기 때문에 공통 에러처리 핸들러에서 에러를 잡지 못하고 있다.
       */
      const stream = await fetch(`${baseURL}/api/v1/gpt/stream`, {
        method: "POST",
        body: JSON.stringify({
          details,
        }),
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
        /**
         * react-native에서 text stream 방식의 요청을 활성화하기 위한 비표준 옵션
         */
        // @ts-expect-error
        reactNative: { textStreaming: true },
      }).then((res) => {
        return res.body;
      });

      return stream;
    },
    {
      onSuccess: async (stream: ReadableStream<Uint8Array> | null) => {
        /**
         * TODO: 모바일에서 reader를 사용할 수 없는 문제 해결하기
         */
        if (!stream) {
          fireToast("GPT 일기생성 중 오류가 발생했습니다.", 3000);

          return;
        }

        const decorder = new TextDecoder();

        const reader = stream.getReader();

        for (
          let readerResult: ReadableStreamReadResult<Uint8Array> | undefined;
          !readerResult || !readerResult.done;

        ) {
          if (interrupt.current) {
            await reader.cancel();

            break;
          }

          readerResult = await reader.read();

          const chunk = decorder.decode(
            readerResult.value || new Uint8Array(),
            { stream: !readerResult.done }
          );

          /**
           * react-native의 느린 폼 요소 업데이트 문제로, 받아온 값이 input에 반영되지 않는 문제를
           * 일시적으로 해결하기 위해 지연 추가
           *
           * TODO: 추후 지연을 제거하고도 정상적으로 동작하게 할 수 있는 방법을 찾아 코드를 개선할 예정
           */
          await sleep(100);

          const word = chunk
            .split("\n")
            .filter((v) => v)
            .map((text) => {
              return text.startsWith("data:") ? text.slice(5) : text;
            })
            .map((text) => {
              try {
                const obj = JSON.parse(text);

                const content = _.get(obj, "choices[0].delta.content");

                return content;
              } catch (e) {
                return "";
              }
            })
            .join("");

          setValue("content", getValues("content") + word);
        }
      },
    }
  );

  /**
   * 가이드에 사용할 데이터
   */
  const { data: guideElements, isLoading } = useQuery(
    ["writeGuide"],
    async () => {
      const guideElements: GuideElement[] = [];

      const guideGuides = await apiService.getGuideGuides();

      /**
       * 1단계 요소 추가
       */
      const guideElement: GuideElement = { type: "list", items: [] };

      for (const { guide, description } of guideGuides) {
        guideElement.items.push({
          isSelect: false,
          sentence: guide,
          description,
        });
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
    }
  );

  const footerTitle = !guideElements
    ? ""
    : swiperIndex === 0
    ? "1단계"
    : swiperIndex === guideElements.length - 1
    ? "3단계"
    : "2단계";

  const headerTitle = !guideElements
    ? "멈무일기 가이드"
    : swiperIndex === 0
    ? "멈무일기 가이드"
    : swiperIndex === guideElements.length - 1
    ? "다른 일상"
    : guideElements[0].items[Math.floor((swiperIndex - 1) / 2)].sentence;

  const headerSubTitle = !guideElements
    ? "오늘 강아지에게 어떤 일상이 있었나요?"
    : swiperIndex === 0
    ? "오늘 강아지에게 어떤 일상이 있었나요?"
    : swiperIndex === guideElements.length - 1
    ? "이외의 다른 일상이 있다면 얘기해주세요"
    : guideElements[0].items[Math.floor((swiperIndex - 1) / 2)].description;

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

        interrupt.current = false;

        createGptDiaryMutation.mutate(sentenses.join("|"));

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

  const AIBottomSheetFooter = ({
    animatedFooterPosition,
  }: BottomSheetFooterProps) => {
    const footerPosition = useDerivedValue(() => {
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
          <Text style={styles.bottomSheetFooterTitle}>{footerTitle}</Text>
          <View style={styles.bottomSheetFooterButtonWrapper}>
            <NavigationButton
              content="이전"
              onPress={handlePrevButtonClick}
              backgroundColor="#373840"
            />
            <NavigationButton content="다음" onPress={handleNextButtonClick} />
          </View>
        </View>
      </BottomSheetFooter>
    );
  };

  const AIBottomSheetHandle = useCallback(() => {
    return (
      <View
        style={{
          position: "relative",
          width: "100%",
          height: size.BOTTOM_SHEET_INDICATOR_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {createGptDiaryMutation.isLoading &&
          !createGptDiaryMutation.isSuccess && (
            <View
              style={{
                position: "absolute",
                top: -(14 + 40),
                width: "100%",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <Pressable
                onPress={() => {
                  interrupt.current = true;
                }}
                style={{
                  pointerEvents: "auto",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: "white",
                  borderRadius: 6,
                  borderColor: "#D0D0D0",
                  borderWidth: 2,
                  flexDirection: "row",
                  gap: 7,
                }}
              >
                <Stop />
                <Text
                  style={{
                    color: "#B0B0B0",
                    fontSize: 16,
                    fontFamily: "Pretendard-SemiBold",
                  }}
                >
                  생성 멈추기
                </Text>
              </Pressable>
            </View>
          )}

        <View
          style={{
            backgroundColor: "rgba(235, 235, 245, 0.3)",
            borderRadius: 2.5,
            width: 48,
            height: 4,
          }}
        />
      </View>
    );
  }, [createGptDiaryMutation.isLoading, createGptDiaryMutation.isSuccess]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      containerStyle={[styles.bottomSheetContainer, responsiveWidthStyle]}
      backgroundStyle={styles.bottomSheetBackground}
      footerComponent={AIBottomSheetFooter}
      backdropComponent={AIBottomSheetBackdrop}
      handleComponent={AIBottomSheetHandle}
      enablePanDownToClose={true}
      index={-1}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        <AIBottomSheetHeader title={headerTitle} subTitle={headerSubTitle} />

        {isLoading && <MultiSelectListSkeleton />}

        {guideElements && (
          <Swiper
            ref={swiperRef}
            onIndexChanged={handleSwiperIndexChange}
            containerStyle={styles.swiperContainer}
            gesturesEnabled={() => false}
            controlsEnabled={false}
          >
            {guideElements.map(({ type, items }, i) => {
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
