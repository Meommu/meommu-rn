// react
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import Swiper from "react-native-web-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// redux
import { useDispatch } from "react-redux";
import { updateWriteGuideBottomSheetRef } from "@/store/modules/bottomSheet";

// components
import { MultiSelectList } from "./MultiSelectList";
import { MultiSelectListSkeleton } from "./MultiSelectList/index.skeleton";
import { SentenseInput } from "./SentenseInput";
import { WriteGuideHeader } from "./WriteGuideHeader";
import { renderBackdrop } from "./WriteGuideBackdrop";
import { renderFooter } from "./WriteGuideFooter";
import { renderHandle } from "./WriteGuideHandle";

// apis
import { apiService, baseURL } from "@/apis";

// bottom sheet
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

// constants
import { size } from "@/constants";

// hooks
import { useSwiper, useToast } from "@/hooks";

// bottom sheet modal
import { BottomSheetModal } from "@gorhom/bottom-sheet";

// styles
import { styles } from "./index.styles";

// utils
import * as _ from "lodash";
import { sleep } from "@/utils";

interface WriteGuideProps {
  setValue: UseFormSetValue<DiaryWriteFormFieldValues>;

  getValues: UseFormGetValues<DiaryWriteFormFieldValues>;
}

export const WriteGuide = memo(({ setValue, getValues }: WriteGuideProps) => {
  const { fireToast } = useToast();

  const dispatch = useDispatch();

  const { swiperIndex, swiperRef, handleSwiperIndexChange } = useSwiper(0);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(
    () => [
      size.BOTTOM_SHEET_INDICATOR_HEIGHT + size.WRITE_GUIDE_HEADER_HEIGHT,
      "65%",
      "99%",
    ],
    []
  );

  /**
   * 가이드의 열림/닫힘을 외부 컴포넌트에서도 제어할 수 있도록 bottomSheetRef를 전역 상태로 공유
   */
  useEffect(() => {
    dispatch(updateWriteGuideBottomSheetRef(bottomSheetRef));
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
       * TODO: 공통 에러처리 핸들러가 axiosError 이외의 에러는 무시하고 있어, fetch 에러를 적절히 처리하지 못하는 이슈 해결할 것
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
            await reader.cancel("사용자의 일기 생성 중지");

            break;
          }

          readerResult = await reader.read();

          const chunk = decorder.decode(
            readerResult.value || new Uint8Array(),
            { stream: !readerResult.done }
          );

          /**
           * 1. `setValue`로 폼의 상태가 업데이트되고, 리렌더링이 발생해 ui가 업데이트 되는데 걸리는 시간
           * 2. `setValue`함수 호출을 마치고 stream으로부터 다음 값을 읽어와 처리하는데 걸리는 시간
           *
           * react-native 환경에서는 작업에 걸리는 시간이 1 > 2 가 되면서 마치 값이 유실되는 듯한 문제가 있어 50ms의 지연을 추가함.
           */
          await sleep(50);

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

        bottomSheetRef.current?.close();
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

  const createGptDiary = useCallback((diaries: string) => {
    interrupt.current = false;

    createGptDiaryMutation.mutate(diaries);
  }, []);

  const handleGptDiaryStopButtonClick = useCallback(() => {
    interrupt.current = true;
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      containerStyle={styles.bottomSheetContainer}
      backgroundStyle={styles.bottomSheetBackground}
      footerComponent={renderFooter({
        bottomSheetRef,
        guideElements,
        swiperIndex,
        swiperRef,
        createGptDiary: createGptDiary,
      })}
      backdropComponent={renderBackdrop()}
      handleComponent={renderHandle({
        isGptDiaryMutationLoading: createGptDiaryMutation.isLoading,
        isGptDirayMutationSuccess: createGptDiaryMutation.isSuccess,
        handleGptDiaryStopButtonClick: handleGptDiaryStopButtonClick,
      })}
      enablePanDownToClose={true}
      index={-1}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        <WriteGuideHeader
          swiperIndex={swiperIndex}
          guideElements={guideElements}
        />

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
});
