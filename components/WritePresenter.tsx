// react
import { useCallback, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, View, Text, TextInput, Image } from "react-native";
import Swiper from "react-native-web-swiper";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "./Button/GoBackButton";
import { PATH, color } from "@/constants";
import { router } from "expo-router";

const FIRST_SLIDE_INDEX = 0;
const LAST_SLIDE_INDEX = 1;

export function WritePresenter() {
  const {
    formState: { isSubmitting },
    trigger,
    watch,
    handleSubmit,
  } = useFormContext<DiaryWriteFormFieldValues>();

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
        router.replace(PATH.MAIN);

        break;

      case LAST_SLIDE_INDEX:
        swiperRef.current?.goToPrev();
        break;
    }
  }, [swiperIndex, swiperRef]);

  const formState = watch();

  const isButtomButtonActive = useCallback(() => {
    const { dogName } = formState;

    switch (swiperIndex) {
      case FIRST_SLIDE_INDEX:
        return dogName.length >= 1;

      case LAST_SLIDE_INDEX:
      default:
        return true;
    }
  }, [swiperIndex, formState]);

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <Header
        style={{ padding: 20 }}
        title={
          swiperIndex === FIRST_SLIDE_INDEX
            ? "누구에게 보낼 건가요?"
            : "일기쓰기"
        }
        left={<GoBackButton onPress={handleGoBackButtonClick} />}
        right={
          swiperIndex === LAST_SLIDE_INDEX && (
            <Pressable onPress={handleFinishButtonClick}>
              <Text
                style={{
                  color: "#828282",
                  fontFamily: "Pretendard-SemiBold",
                  fontSize: 16,
                }}
              >
                완료
              </Text>
            </Pressable>
          )
        }
      />

      <Swiper
        ref={swiperRef}
        onIndexChanged={handleSwiperIndexChange}
        controlsEnabled={false}
        gesturesEnabled={() => false}
        springConfig={{
          tension: 0,
        }}
      >
        <StepOne />
        <StepTwo />
      </Swiper>

      <NavigationButton
        style={{ padding: 20 }}
        onPress={handleBottomButtonClick}
        backgroundColor={
          isButtomButtonActive() ? color.primary : color.inactive
        }
        disabled={!isButtomButtonActive() || isSubmitting}
        content={swiperIndex === LAST_SLIDE_INDEX ? "멈무일기 가이드" : "다음"}
      />
    </View>
  );
}

function StepOne() {
  const { control, formState } = useFormContext<DiaryWriteFormFieldValues>();

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        padding: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
          backgroundColor: color.formElementBg,
          alignItems: "center",
          gap: 39,
          paddingVertical: 55,
        }}
      >
        <View
          style={{
            width: 169,
            height: 169,
            borderRadius: 60,
            backgroundColor: "white",
          }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            source={require("@/assets/images/write/dummy-dog.png")}
          />
        </View>
        <Controller
          name="dogName"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TextInput
                maxLength={10}
                placeholder="강아지 이름 (0/10)"
                style={{
                  fontFamily: "yeonTheLand",
                  fontSize: 20,
                  textAlign: "center",
                  borderBottomWidth: 1,
                  paddingBottom: 4,
                }}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

function StepTwo() {
  return (
    <View>
      <Text>두번째 폼</Text>
    </View>
  );
}
