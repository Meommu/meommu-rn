// react
import { useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { type AiBottomSheetState } from "@/store/modules/aiBottomSheet";

// expo
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

// components
import { WritePresenter } from "../WritePresenter";

// hooks
import { useSwiper, useToast } from "@/hooks";

// constants
import { PATH, regExp } from "@/constants";

// apis
import { apiService } from "@/apis";

const STEP_ONE_SLIDE_INDEX = 0;
const STEP_TWO_SLIDE_INDEX = 1;

export function ModifyContainer() {
  const { diaryId } = useLocalSearchParams<{ diaryId: string }>();

  const { fireToast } = useToast();

  const { bottomSheetRef } = useSelector<RootState, AiBottomSheetState>(
    (state) => state.aiBottomSheet
  );

  /**
   * useForm
   */
  const methods = useForm<DiaryWriteFormFieldValues>({
    defaultValues: {
      date: "",
      title: "",
      content: "",
      dogName: "",
      imageIds: [],
    },
  });

  const { handleSubmit, watch, getValues, setValue } = methods;

  const formState = watch();

  /**
   * useQuery & useMutation
   */
  const queryClient = useQueryClient();

  const { isLoading } = useQuery(
    [],
    async () => {
      const diary = await apiService.getDiaryDetail(diaryId || "");

      return diary;
    },
    {
      onSuccess: (diary: Diary) => {
        const { date, title, content, dogName, imageIds } = diary;

        setValue("date", date);
        setValue("title", title);
        setValue("content", content);
        setValue("dogName", dogName);
        setValue("imageIds", imageIds);
      },
    }
  );

  const writeDiaryMutation = useMutation(
    async (data: DiaryWriteFormFieldValues) => {
      await apiService.modifyDiary(diaryId || "", data);
    },
    {
      onSuccess: async () => {
        const diaryWriteDate = getValues("date");

        const [year, month] = diaryWriteDate.split("-").map(Number);

        await queryClient.invalidateQueries(["diaryList", year, month]);

        router.replace(`/diary/${diaryId}`);
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
        bottomSheetRef?.current?.snapToIndex(1);

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
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace(PATH.MAIN);
        }

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
   * 첫단계에서는 AI 글쓰기 가이드가 나타나지 않도록 함.
   */
  useEffect(() => {
    if (!bottomSheetRef) {
      return;
    }

    if (swiperIndex === STEP_ONE_SLIDE_INDEX) {
      bottomSheetRef.current?.close();
    }
  }, [bottomSheetRef, swiperIndex]);

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
      />
    </FormProvider>
  );
}
