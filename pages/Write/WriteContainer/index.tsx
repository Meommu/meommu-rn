// react
import { useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { type BottomSheetState } from "@/store/modules/bottomSheet";

// components
import { WritePresenter } from "../WritePresenter";

// hooks
import { useSwiper, useToast, useExpoRouter } from "@/hooks";

// constants
import { regExp } from "@/constants";

// utils
import { dateToHyphenatedYYYYMMDD } from "@/utils";

// apis
import { apiService } from "@/apis";

const STEP_ONE_SLIDE_INDEX = 0;
const STEP_TWO_SLIDE_INDEX = 1;

export function WriteContainer() {
  const { router } = useExpoRouter("write");

  const { fireToast } = useToast();

  const { writeGuideBottomSheetRef, datePickerBottomSheetRef } = useSelector<
    RootState,
    BottomSheetState
  >((state) => state.bottomSheet);

  /**
   * useForm
   */
  const methods = useForm<DiaryWriteFormFieldValues>({
    defaultValues: {
      date: dateToHyphenatedYYYYMMDD(new Date()),
      title: "",
      content: "",
      dogName: "",
      imageIds: [],
    },
  });

  const { handleSubmit, watch, getValues } = methods;

  const formState = watch();

  /**
   * useQuery & useMutation
   */
  const queryClient = useQueryClient();

  const writeDiaryMutation = useMutation(
    async (data: DiaryWriteFormFieldValues) => {
      const savedId = apiService.createDiary(data);

      return savedId;
    },
    {
      onSuccess: async (savedId: number) => {
        const diaryWriteDate = getValues("date");

        const [year, month] = diaryWriteDate.split("-").map(Number);

        await queryClient.invalidateQueries(["diaryList", year, month]);
        await queryClient.invalidateQueries(["diariesSummary"]);

        router.goToDiaryPage(savedId);
      },
    }
  );

  /**
   * swiper
   */
  const { swiperIndex, swiperRef, handleSwiperIndexChange } =
    useSwiper(STEP_ONE_SLIDE_INDEX);

  /**
   * event handlers
   */
  const handleBottomButtonClick = useCallback(() => {
    switch (swiperIndex) {
      case STEP_ONE_SLIDE_INDEX:
        swiperRef.current?.goTo(STEP_TWO_SLIDE_INDEX);

        break;

      case STEP_TWO_SLIDE_INDEX:
        writeGuideBottomSheetRef?.current?.snapToIndex(1);

        break;
    }
  }, [swiperIndex]);

  const handleFinishButtonClick = useCallback(() => {
    const { date, imageIds } = formState;

    if (!regExp.date.test(date)) {
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

    if (imageIds.some((imageId) => imageId < 0)) {
      fireToast("업로드 중인 이미지가 존재합니다.", 2000);

      return;
    }

    handleSubmit(
      (data) => {
        writeDiaryMutation.mutate(data);
      },
      (errors) => {
        if (errors.title) {
          fireToast("올바른 제목을 입력하세요.", 2000);

          return;
        }

        if (errors.content) {
          fireToast("올바른 일기를 입력하세요.", 2000);

          return;
        }

        if (errors.dogName) {
          fireToast("올바른 강아지 이름을 입력하세요.", 2000);

          return;
        }
      }
    )();
  }, [formState]);

  const handleGoBackButtonClick = useCallback(() => {
    switch (swiperIndex) {
      case STEP_ONE_SLIDE_INDEX:
        router.goBack();

        break;

      case STEP_TWO_SLIDE_INDEX:
        swiperRef.current?.goToPrev();

        break;
    }
  }, [swiperIndex, swiperRef]);

  /**
   * util functions
   */
  const isBottomButtonActive = useCallback(() => {
    if (swiperIndex === STEP_TWO_SLIDE_INDEX) {
      return true;
    }

    const { dogName } = formState;

    return dogName.length >= 1;
  }, [formState, swiperIndex]);

  const isStepOneSlide = useCallback(() => {
    return swiperIndex === STEP_ONE_SLIDE_INDEX;
  }, [swiperIndex]);

  /**
   * 첫 단계에서는 두번째 폼의 바텀시트들이 나타나지 않도록 함.
   */
  useEffect(() => {
    if (swiperIndex === STEP_ONE_SLIDE_INDEX) {
      writeGuideBottomSheetRef?.current?.close();
      datePickerBottomSheetRef?.current?.close();
    }
  }, [writeGuideBottomSheetRef, datePickerBottomSheetRef, swiperIndex]);

  return (
    <FormProvider {...methods}>
      <WritePresenter
        swiperRef={swiperRef}
        handleBottomButtonClick={handleBottomButtonClick}
        handleFinishButtonClick={handleFinishButtonClick}
        handleGoBackButtonClick={handleGoBackButtonClick}
        handleSwiperIndexChange={handleSwiperIndexChange}
        isBottomButtonActive={isBottomButtonActive}
        isStepOneSlide={isStepOneSlide}
        isLoading={writeDiaryMutation.isLoading}
      />
    </FormProvider>
  );
}
