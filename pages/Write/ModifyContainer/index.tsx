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
import { WritePresenterSkeleton } from "../WritePresenter/index.skeleton";

// hooks
import { useSwiper, useToast } from "@/hooks";

// constants
import { PATH, regExp } from "@/constants";

// apis
import { apiService } from "@/apis";

const STEP_ONE_SLIDE_INDEX = 0;
const STEP_TWO_SLIDE_INDEX = 1;

export function ModifyContainer() {
  const { fireToast } = useToast();

  const queryClient = useQueryClient();

  const { bottomSheetRef } = useSelector<RootState, AiBottomSheetState>(
    (state) => state.aiBottomSheet
  );

  const { swiperIndex, swiperRef, handleSwiperIndexChange } =
    useSwiper(STEP_ONE_SLIDE_INDEX);

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
   * 게시글 수정 페이지 로드 시 게시물의 상세정보를 읽어와 데이터를 초기화
   */
  const { diaryId } = useLocalSearchParams<{ diaryId: string }>();

  const { data: diary, isLoading } = useQuery(
    ["diaryDetail", diaryId],
    async () => {
      const diary = await apiService.getDiaryDetail(diaryId || "");

      return diary;
    }
  );

  useEffect(() => {
    if (!diary) {
      return;
    }

    const { date, title, content, dogName, imageIds } = diary;

    setValue("date", date);
    setValue("title", title);
    setValue("content", content);
    setValue("dogName", dogName);
    setValue("imageIds", imageIds);
  }, [diary]);

  /**
   * 글쓰기 완료 버튼 클릭 시 동작할 mutation
   */
  const modifyDiaryMutation = useMutation(
    async (data: DiaryWriteFormFieldValues) => {
      await apiService.modifyDiary(diaryId || "", data);
    },
    {
      onSuccess: async () => {
        const diaryWriteDate = getValues("date");

        const [year, month] = diaryWriteDate.split("-").map(Number);

        await queryClient.invalidateQueries(["diaryList", year, month]);
        await queryClient.invalidateQueries(["diaryDetail", diaryId]);
        await queryClient.invalidateQueries(["diariesSummary"]);

        router.replace(`/diary/${diaryId}`);
      },
    }
  );

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
        modifyDiaryMutation.mutate(data);
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
   * 첫 단계에서는 AI 글쓰기 가이드가 나타나지 않도록 함.
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
      {isLoading ? (
        <WritePresenterSkeleton />
      ) : (
        <WritePresenter
          swiperRef={swiperRef}
          handleBottomButtonClick={handleBottomButtonClick}
          handleFinishButtonClick={handleFinishButtonClick}
          handleGoBackButtonClick={handleGoBackButtonClick}
          handleSwiperIndexChange={handleSwiperIndexChange}
          isBottomButtonActive={isBottomButtonActive}
          isStepOneSlide={isStepOneSlide}
          isLoading={modifyDiaryMutation.isLoading}
        />
      )}
    </FormProvider>
  );
}
