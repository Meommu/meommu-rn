// react
import { useCallback } from "react";
import { View, Text, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Header } from "@/components/Layout/Header";
import { BannerImage } from "@/components/Image/BannerImage";
import { GoBackButton } from "@/components/Button/GoBackButton";

// swiper
import Swiper from "react-native-web-swiper";

// hooks
import { useSwiper, useToast } from "@/hooks";

// constants
import { PATH, color, regExp } from "@/constants";

// apis
import axios from "axios";

// styles
import { styles } from "./index.styles";
import { router } from "expo-router";

const EMAIL_SLIDE = 0;
const CODE_VERIFY_SLIDE = 1;
const NEW_PASSWORD_SLIDE = 2;
const NEW_PASSWORD_CONFIRM_SLIDE = 3;

type RecoveryPasswordFormFieldValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  recoveryCode: string;
  recoveryCodeIsCorrect: boolean;
};

export function RecoveryPage() {
  const { fireToast } = useToast();

  const { swiperIndex, swiperRef, handleSwiperIndexChange } =
    useSwiper(EMAIL_SLIDE);

  const { control, setValue, watch, trigger, handleSubmit } =
    useForm<RecoveryPasswordFormFieldValues>({
      defaultValues: {
        email: "",
        recoveryCode: "",
        password: "",
        passwordConfirm: "",
        recoveryCodeIsCorrect: false,
      },
    });

  const formState = watch();

  const recoveryEmailChkMutation = useMutation(
    async (email: string) => {
      await axios.post<ResponseTemplate<boolean>>(
        "/api/v1/kindergartens/email/verification-request",
        null,
        { params: { email } }
      );
    },
    {
      onSuccess: () => {
        swiperRef.current?.goTo(CODE_VERIFY_SLIDE);
      },
    }
  );

  const recoveryCodeChkMutation = useMutation(
    async ({
      email,
      recoveryCode,
    }: Pick<RecoveryPasswordFormFieldValues, "email" | "recoveryCode">) => {
      const {
        data: { data: isCorrect },
      } = await axios.get<ResponseTemplate<boolean>>(
        "/api/v1/kindergartens/email/verification",
        {
          params: {
            email,
            code: recoveryCode,
          },
        }
      );

      return isCorrect;
    },
    {
      onSuccess: (isCorrect: boolean) => {
        if (isCorrect) {
          setValue("recoveryCodeIsCorrect", true);

          swiperRef.current?.goTo(NEW_PASSWORD_SLIDE);
        } else {
          fireToast("코드를 다시 입력해주세요.", 3000);
        }
      },
    }
  );

  const recoveryPasswordMutation = useMutation(
    async (data: RecoveryPasswordFormFieldValues) => {
      const { email, password, passwordConfirm } = data;

      await axios.patch(
        "/api/v1/kindergartens/password",
        { password, passwordConfirmation: passwordConfirm },
        { params: { email } }
      );
    },
    {
      onSuccess: () => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace(PATH.HOME);
        }

        fireToast("비밀번호가 변경되었습니다.", 3000);
      },
    }
  );

  const handleNextButtonClick = useCallback(async (): Promise<void> => {
    const { email, recoveryCode, password, passwordConfirm } = formState;

    switch (swiperIndex) {
      case EMAIL_SLIDE:
        if (!(await trigger("email"))) {
          fireToast("올바른 형태의 이메일을 입력하세요.", 3000);

          break;
        }

        recoveryEmailChkMutation.mutate(email);

        break;

      case CODE_VERIFY_SLIDE:
        if (!(await trigger("recoveryCode"))) {
          fireToast("올바른 형태의 인증 코드를 입력하세요.", 3000);

          break;
        }

        recoveryCodeChkMutation.mutate({ email, recoveryCode });

        break;

      case NEW_PASSWORD_SLIDE:
        if (!(await trigger("password"))) {
          fireToast("올바른 형태의 비밀번호를 입력하세요.", 3000);

          break;
        }

        swiperRef.current?.goTo(NEW_PASSWORD_CONFIRM_SLIDE);

        break;

      case NEW_PASSWORD_CONFIRM_SLIDE:
        /**
         * Controller - rules - validate 속성으로 패스워드의 일치 여부를 확인하지 않는 이유는,
         * Swiper 사용으로 인해 폼 상태를 watch 중임에도 상태가 업데이트 되지 않기 때문.
         */
        if (password !== passwordConfirm) {
          fireToast("패스워드가 일치하지 않습니다.", 3000);

          break;
        }

        handleSubmit((data) => {
          /**
           * TODO: `recoveryCodeIsCorrect` 폼 상태에 대한 보이지 않는 Controller를 하나 만들어 해당 IF문 제거하기
           */
          if (!data.recoveryCodeIsCorrect) {
            fireToast("인증 과정에서 문제가 발생했습니다.", 3000);

            return;
          }

          recoveryPasswordMutation.mutate(data);
        })();

        break;
    }
  }, [swiperIndex, formState]);

  const handleGoBackButtonClick = useCallback(() => {
    switch (swiperIndex) {
      case EMAIL_SLIDE:
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace(PATH.HOME);
        }

        break;

      default:
        swiperRef.current?.goToPrev();

        break;
    }
  }, [swiperIndex]);

  const isNextButtonClickable = useCallback((): boolean => {
    const { email, recoveryCode, password, passwordConfirm } = formState;

    switch (swiperIndex) {
      case EMAIL_SLIDE:
        if (!email) {
          return false;
        }

        return true;

      case CODE_VERIFY_SLIDE:
        if (!recoveryCode) {
          return false;
        }

        return true;

      case NEW_PASSWORD_SLIDE:
        if (!password) {
          return false;
        }

        return true;

      case NEW_PASSWORD_CONFIRM_SLIDE:
        if (!passwordConfirm) {
          return false;
        }

        return true;

      default:
        return true;
    }
  }, [swiperIndex, formState]);

  console.log(
    "[test]",
    isNextButtonClickable(),
    recoveryEmailChkMutation.isLoading
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerLayout}>
        <Header left={<GoBackButton onPress={handleGoBackButtonClick} />} />
      </View>

      <Swiper
        ref={swiperRef}
        controlsEnabled={false}
        onIndexChanged={handleSwiperIndexChange}
        containerStyle={styles.swiper}
        gesturesEnabled={() => false}
        loop={false}
        springConfig={{
          tension: 0,
        }}
      >
        <View style={styles.slideLayout}>
          <Text style={styles.guideText}>
            비밀번호를 찾고자하는{"\n"}이메일을 입력해주세요
          </Text>

          <BannerImage
            source={require("@/assets/images/recovery/recovery.png")}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "이메일이 입력되지 않았습니다.",
              },
              pattern: {
                value: regExp.email,
                message: "이메일 형식이 올바르지 않습니다.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <TextInput
                  placeholder="이메일"
                  placeholderTextColor={color.g300}
                  style={styles.inputContent}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    setValue("recoveryCodeIsCorrect", false);

                    onChange(text);
                  }}
                  value={value}
                />
              </View>
            )}
          />
        </View>

        <View style={styles.slideLayout}>
          <Text style={styles.guideText}>
            이메일로 전송한 코드를 {"\n"}
            입력해주세요
          </Text>

          <BannerImage
            source={require("@/assets/images/recovery/recovery.png")}
          />

          <Controller
            name="recoveryCode"
            control={control}
            rules={{
              required: true,
              pattern: /^[0-9]{6}$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <View style={styles.input}>
                  <TextInput
                    placeholder="인증코드"
                    placeholderTextColor={color.g300}
                    style={styles.inputContent}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              );
            }}
          />
        </View>

        <View style={styles.slideLayout}>
          <Text style={styles.guideText}>변경할 비밀번호를 입력해주세요</Text>

          <BannerImage
            source={require("@/assets/images/recovery/recovery.png")}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: regExp.password,
                message: "비밀번호 형식이 올바르지 않습니다.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <TextInput
                  style={styles.inputContent}
                  placeholderTextColor={color.g300}
                  placeholder="비밀번호"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              </View>
            )}
          />
        </View>

        <View style={styles.slideLayout}>
          <Text style={styles.guideText}>
            변경할 비밀번호를 다시 한번 {"\n"}입력해주세요
          </Text>

          <BannerImage
            source={require("@/assets/images/recovery/recovery.png")}
          />

          <Controller
            name="passwordConfirm"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <TextInput
                  style={styles.inputContent}
                  placeholderTextColor={color.g300}
                  placeholder="비밀번호"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              </View>
            )}
          />
        </View>
      </Swiper>

      <View style={styles.footerLayout}>
        <NavigationButton
          content="다음"
          onPress={handleNextButtonClick}
          disabled={!isNextButtonClickable()}
          isLoading={recoveryEmailChkMutation.isLoading}
        />
      </View>
    </View>
  );
}
