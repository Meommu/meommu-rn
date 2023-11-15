// react
import { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";

// expo
import { router } from "expo-router";

// components
import { SignUpPresenter } from "../SignUpPresenter";

// apis
import { apiService } from "@/apis";

// constants
import { PATH } from "@/constants";

// hooks
import { useSwiper } from "@/hooks";

const FIRST_SLIDE_INDEX = 0;
const SECOND_SLIDE_INDEX = 1;
const LAST_SLIDE_INDEX = 2;

export function SignUpContainer() {
  /**
   * useForm
   */
  const methods = useForm<SignUpFormFieldValues>({
    defaultValues: {
      email: "",
      emailDupChk: null,
      password: "",
      passwordConfirm: "",
      agreement: false,
      kindergartenName: "",
      kindergartenDirectorName: "",
      phoneNumber: "",
    },
  });

  const { handleSubmit, watch, trigger } = methods;

  const formState = watch();

  /**
   * swiper
   */
  const { swiperIndex, swiperRef, handleSwiperIndexChange } =
    useSwiper(FIRST_SLIDE_INDEX);

  /**
   * useMutation
   */
  const signUpMutation = useMutation(
    async (data: SignUpFormFieldValues) => {
      await apiService.setUserInfo(data);
    },
    {
      onSuccess: () => {
        swiperRef.current?.goTo(LAST_SLIDE_INDEX);
      },
    }
  );

  /**
   * button onPress handler
   */
  const handleNextButtonClick = useCallback(async () => {
    if (!swiperRef.current) {
      return;
    }

    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        if (
          !(await trigger("email")) ||
          !(await trigger("password")) ||
          !(await trigger("passwordConfirm"))
        ) {
          break;
        }

        swiperRef.current.goTo(SECOND_SLIDE_INDEX);

        break;

      case SECOND_SLIDE_INDEX:
        handleSubmit(async (formData) => {
          signUpMutation.mutate(formData);
        })();

        break;

      case LAST_SLIDE_INDEX:
        router.replace(PATH.HOME);

        break;
    }
  }, [swiperRef, swiperIndex]);

  const handleGoBackButtonClick = useCallback(() => {
    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace(PATH.HOME);
        }

        break;

      case LAST_SLIDE_INDEX:
        break;

      default:
        swiperRef.current?.goToPrev();
    }
  }, [swiperRef, swiperIndex, trigger]);

  /**
   * util 함수
   */
  const isNextButtonActive = useCallback((): boolean => {
    const {
      password,
      passwordConfirm,
      emailDupChk,
      agreement,
      kindergartenName,
      kindergartenDirectorName,
      phoneNumber,
    } = formState;

    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        if (!emailDupChk || !agreement || !password || !passwordConfirm) {
          return false;
        }

        return true;
      case SECOND_SLIDE_INDEX:
        if (!kindergartenName || !kindergartenDirectorName || !phoneNumber) {
          return false;
        }

        return true;
      default:
        return true;
    }
  }, [formState, swiperIndex]);

  const isLastSlide = useCallback(() => {
    return swiperIndex === LAST_SLIDE_INDEX;
  }, [swiperIndex]);

  return (
    <FormProvider {...methods}>
      <SignUpPresenter
        swiperIndex={swiperIndex}
        swiperRef={swiperRef}
        handleSwiperIndexChange={handleSwiperIndexChange}
        handleGoBackButtonClick={handleGoBackButtonClick}
        handleNextButtonClick={handleNextButtonClick}
        isNextButtonActive={isNextButtonActive}
        isLastSlide={isLastSlide}
      />
    </FormProvider>
  );
}
