// react
import { useState, useRef, useCallback } from "react";
import Swiper from "react-native-web-swiper";
import { useForm, FormProvider } from "react-hook-form";

// expo
import { router } from "expo-router";

// components
import { WritePresenter } from "../WritePresenter";

// constants
import { PATH } from "@/constants";

const FIRST_SLIDE_INDEX = 0;
const LAST_SLIDE_INDEX = 1;

export function WriteContainer() {
  const methods = useForm<DiaryWriteFormFieldValues>({
    defaultValues: {
      date: "",
      title: "",
      content: "",
      dogName: "",
      imageIds: [],
    },
  });

  const { handleSubmit, watch } = methods;

  const [swiperIndex, setSwiperIndex] = useState(0);

  const swiperRef = useRef<Swiper | null>(null);

  const handleSwiperIndexChange = useCallback((index: number) => {
    setSwiperIndex(index);
  }, []);

  const handleBottomButtonClick = useCallback(() => {
    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        swiperRef.current?.goTo(LAST_SLIDE_INDEX);

        break;
      case LAST_SLIDE_INDEX:
        break;
    }
  }, [swiperIndex]);

  const handleFinishButtonClick = useCallback(() => {
    handleSubmit((data) => {
      console.log("[handle submit]", data);
    });
  }, []);

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

  const formState = watch();

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
      />
    </FormProvider>
  );
}
