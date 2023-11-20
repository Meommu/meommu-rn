// react
import { useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

// expo
import { router } from "expo-router";

// components
import { WritePresenter } from "../WritePresenter";

// hooks
import { useSwiper, useToast, useResponsiveBottomSheet } from "@/hooks";

// constants
import { PATH, regExp, size } from "@/constants";

// apis
import axios from "axios";

const FIRST_SLIDE_INDEX = 0;
const LAST_SLIDE_INDEX = 1;

export function WriteContainer() {
  const { fireToast } = useToast();

  const queryClient = useQueryClient();

  /**
   * useForm
   */
  const methods = useForm<DiaryWriteFormFieldValues>({
    defaultValues: {
      /**
       * TODO: 날짜 선택 컴포넌트가 구현되면 고정 값 제거
       */
      date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
      title: "",
      content: "",
      dogName: "",
      imageIds: [],
    },
  });

  const { handleSubmit, watch, getValues } = methods;

  const formState = watch();

  /**
   * useMutation
   */
  const writeDiaryMutation = useMutation(
    async (data: DiaryWriteFormFieldValues) => {
      const {
        data: {
          data: { savedId },
        },
      } = await axios.post<ResponseTemplate<{ savedId: number }>>(
        "/api/v1/diaries",
        data
      );

      return savedId;
    },
    {
      onSuccess: async (savedId: number) => {
        /**
         * TODO: /detail/{savedId} 페이지로 라우트
         */
        console.log(savedId);

        const diaryWriteDate = getValues("date");

        const [year, month] = diaryWriteDate.split("-").map(Number);

        await queryClient.invalidateQueries(["diaryList", year, month]);

        router.replace(PATH.MAIN);
      },
    }
  );

  /**
   * swiper
   */
  const { swiperIndex, swiperRef, handleSwiperIndexChange } =
    useSwiper(FIRST_SLIDE_INDEX);

  /**
   * bottom sheet
   */
  const {
    bottomSheetRef,
    bottomSheetMaxWidthStyle,
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    handleContentLayout,
  } = useResponsiveBottomSheet([
    size.BOTTOM_SHEET_INDICATOR_HEIGHT + size.AI_BOTTOM_SHEET_HEADER_HEIGHT,
    "CONTENT_HEIGHT",
    "100%",
  ]);

  useEffect(() => {
    if (swiperIndex === 0) {
      bottomSheetRef.current?.close();
    }
  }, [swiperIndex]);

  /**
   * event handlers
   */
  const handleBottomButtonClick = useCallback(() => {
    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        swiperRef.current?.goTo(LAST_SLIDE_INDEX);

        break;
      case LAST_SLIDE_INDEX:
        bottomSheetRef.current?.snapToIndex(0);

        break;
    }
  }, [swiperIndex]);

  const handleFinishButtonClick = useCallback(() => {
    const { date, imageIds } = formState;

    if (!regExp.date.test(date)) {
      console.log("1");
      fireToast("올바른 날짜를 입력하세요.", 2000);

      return;
    }

    if (imageIds.length < 1) {
      fireToast("사진은 최소 하나 이상이어야 합니다.", 2000);

      return;
    }

    if (imageIds.length > 5) {
      fireToast("사진은 최대 5장까지 추가할 수 있습니다.", 2000);

      return;
    }

    handleSubmit(
      (data) => {
        writeDiaryMutation.mutate(data);
      },
      (errors) => {
        if (errors.title?.message) {
          fireToast("올바른 제목을 입력하세요.", 2000);

          return;
        }

        if (errors.content?.message) {
          fireToast("올바른 일기를 입력하세요.", 2000);

          return;
        }

        if (errors.dogName?.message) {
          fireToast("올바른 강아지 이름을 입력하세요.", 2000);

          return;
        }
      }
    )();
  }, [formState]);

  const handleGoBackButtonClick = useCallback(() => {
    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace(PATH.MAIN);
        }

        break;

      case LAST_SLIDE_INDEX:
        swiperRef.current?.goToPrev();
        break;
    }
  }, [swiperIndex, swiperRef]);

  /**
   * util functions
   */

  const isBottomButtonActive = useCallback(() => {
    const { dogName } = formState;

    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        return dogName.length >= 1;

      case LAST_SLIDE_INDEX:
      default:
        return true;
    }
  }, [swiperIndex, formState]);

  const isLastSlide = useCallback(() => {
    return swiperIndex === LAST_SLIDE_INDEX;
  }, [swiperIndex]);

  return (
    <FormProvider {...methods}>
      <WritePresenter
        swiperRef={swiperRef}
        handleBottomButtonClick={handleBottomButtonClick}
        handleFinishButtonClick={handleFinishButtonClick}
        handleGoBackButtonClick={handleGoBackButtonClick}
        handleSwiperIndexChange={handleSwiperIndexChange}
        isBottomButtonActive={isBottomButtonActive}
        isLastSlide={isLastSlide}
        bottomSheetRef={bottomSheetRef}
        bottomSheetMaxWidthStyle={bottomSheetMaxWidthStyle}
        animatedContentHeight={animatedContentHeight}
        animatedHandleHeight={animatedHandleHeight}
        animatedSnapPoints={animatedSnapPoints}
        handleContentLayout={handleContentLayout}
      />
    </FormProvider>
  );
}
