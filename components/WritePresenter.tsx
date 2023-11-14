// react
import { useCallback, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Pressable,
  View,
  Text,
  TextInput,
  Image,
  Platform,
} from "react-native";
import Swiper from "react-native-web-swiper";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "./Button/GoBackButton";
import { PATH, color } from "@/constants";
import { router } from "expo-router";
import Camera from "@/assets/svgs/camera.svg";
import * as ImagePicker from "expo-image-picker";
import axios, { AxiosError } from "axios";
import { focusManager, useMutation } from "react-query";
import { LoadImage } from "./Image/LoadImage";
import { ImageRemoveButton } from "./Button/ImageRemoveButton";
import { b64ToBlob } from "@/utils";
import { UnderlineInput } from "./Input/UnderlineInput";

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
        style={{ padding: 12 }}
        title={
          swiperIndex === FIRST_SLIDE_INDEX
            ? "누구에게 보낼 건가요?"
            : "일기쓰기"
        }
        left={<GoBackButton onPress={handleGoBackButtonClick} />}
        right={
          swiperIndex === LAST_SLIDE_INDEX && (
            <Pressable
              style={{ justifyContent: "center" }}
              onPress={handleFinishButtonClick}
            >
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

      <View style={{ padding: 20 }}>
        <NavigationButton
          onPress={handleBottomButtonClick}
          backgroundColor={
            isButtomButtonActive() ? color.primary : color.inactive
          }
          disabled={!isButtomButtonActive() || isSubmitting}
          content={
            swiperIndex === LAST_SLIDE_INDEX ? "멈무일기 가이드" : "다음"
          }
        />
      </View>
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
              <View style={{ width: 169 }}>
                <UnderlineInput
                  maxLength={10}
                  placeholder="강아지 이름 (0/10)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const enum IMAGE_CATEGORY {
  "PARENT_PROFILE" = "PARENT_PROFILE",
  "KINDERGARTEN_PROFILE" = "KINDERGARTEN_PROFILE",
  "DOG_PROFILE" = "DOG_PROFILE",
  "DIARY_IMAGE" = "DIARY_IMAGE",
}

function StepTwo() {
  const { control, formState, watch, setValue, getValues } =
    useFormContext<DiaryWriteFormFieldValues>();

  const imageIds = watch("imageIds");

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImageMutation = useMutation(
    async (formData: FormData) => {
      const {
        data: {
          data: {
            images: [{ id }],
          },
        },
      } = await axios.post<
        ResponseTemplate<{ images: { id: number; url: string }[] }>
      >("/api/v1/images", process.env.EXPO_PUBLIC_MODE !== "dev" && formData);

      return id;
    },
    {
      onSuccess: (id: number) => {
        setValue("imageIds", [...imageIds, id]);
      },
    }
  );

  const handleImageRemoveButtonClick = (index: number) => () => {
    const newImageIds = [...imageIds];

    newImageIds.splice(index, 1);

    setValue("imageIds", newImageIds);
  };

  const handleImagePick = async () => {
    /**
     * 권한 확인 후 획득
     */
    if (!status?.granted) {
      const permission = await requestPermission();

      if (!permission.granted) {
        return;
      }
    }

    /**
     * 이미지 선택 후 업로드
     *
     * 모바일, 웹 모두 같은 코드를 사용하게끔 base64 방식의 인코딩을 사용
     */
    const getImageFormData =
      Platform.OS === "web" ? getImageFormDataOnWeb : getImageFormDataOnMobile;

    const formData = await getImageFormData();

    if (!formData) {
      return;
    }

    uploadImageMutation.mutate(formData);
  };

  const getImageFormDataOnWeb = async (): Promise<FormData | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
      base64: true,
    });

    if (result.canceled) {
      return null;
    }

    const formData = new FormData();

    const { base64, uri } = result.assets[0];

    const fileExtension = uri.split(";")[0].split("/")[1];
    const fileName = `imageName.${fileExtension}`;
    const contentType = `image/${fileExtension}`;

    const blob = b64ToBlob(base64, contentType);
    const file = new File([blob], fileName, { type: contentType });

    formData.append("category", IMAGE_CATEGORY.DIARY_IMAGE);
    formData.append("images", file);

    return formData;
  };

  const getImageFormDataOnMobile = async (): Promise<FormData | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    });

    if (result.canceled) {
      return null;
    }

    const formData = new FormData();

    const { uri } = result.assets[0];

    const fileExtension = uri.slice(uri.lastIndexOf(".") + 1);
    const fileName = `imageName.${fileExtension}`;
    const contentType = `image/${fileExtension}`;

    formData.append("category", IMAGE_CATEGORY.DIARY_IMAGE);
    // @ts-ignore
    formData.append("images", { uri, name: fileName, type: contentType });

    return formData;
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ padding: 7, flexDirection: "row" }}>
        {Array(5)
          .fill(null)
          .map((_, i) => {
            return (
              <View
                key={imageIds[i] ? `imageId${imageIds[i]}` : i}
                style={{
                  width: "20%",
                  aspectRatio: "1/1",
                  padding: 7,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: "#BFC4CE",
                    borderRadius: 4,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {imageIds.length === i ? (
                    <Pressable
                      style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                      }}
                      onPress={handleImagePick}
                    >
                      <Camera />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Pretendard-Regular",
                          color: "#BFC4CE",
                        }}
                      >
                        {imageIds.length} / 5
                      </Text>
                    </Pressable>
                  ) : (
                    imageIds[i] && (
                      <View
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "relative",
                        }}
                      >
                        <LoadImage
                          style={{ position: "absolute" }}
                          imageId={imageIds[i]}
                        />
                        <Pressable
                          onPress={handleImageRemoveButtonClick(i)}
                          style={{
                            position: "absolute",
                            right: -10,
                            top: -10,
                          }}
                        >
                          <ImageRemoveButton />
                        </Pressable>
                      </View>
                    )
                  )}
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
}
