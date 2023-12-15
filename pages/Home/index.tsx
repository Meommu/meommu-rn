// react
import { useCallback } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import { router } from "expo-router";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { BannerImage } from "@/components/Image/BannerImage";
import { FormInput } from "@/components/Input/FormInput";
import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";

// constants
import { PATH, color, regExp, size } from "@/constants";

// api
import { apiService } from "@/apis";
import axios from "axios";

// hooks
import { useToast } from "@/hooks";

// utils
import { sleep } from "@/utils";

// styles
import { styles } from "./index.styles";

export function HomePage() {
  const { control, handleSubmit } = useForm<SignInFormFieldValues>({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const { fireToast } = useToast();

  const signinMutation = useMutation(
    async (data: SignInFormFieldValues) => {
      const accessToken = apiService.signin(data.id, data.password);

      return accessToken;
    },
    {
      onSuccess: async (data) => {
        const accessToken = `Bearer ${data}`;

        axios.defaults.headers.common.Authorization = accessToken;

        await AsyncStorage.setItem("accessToken", accessToken);

        router.replace(PATH.MAIN);
      },
    }
  );

  const handleSignInButtonClick = () => {
    handleSubmit(
      (formData) => {
        signinMutation.mutate(formData);
      },
      (errors) => {
        if (errors.id?.message) {
          fireToast(errors.id.message, 2000);

          return;
        }

        if (errors.password?.message) {
          fireToast(errors.password.message, 2000);

          return;
        }
      }
    )();
  };

  const handleSignUpButtonClick = useCallback(async () => {
    await sleep(size.BUTTON_PRESS_IN_OUT_DURATION * 2);

    router.push(PATH.SIGN_UP);
  }, []);

  const handlePasswordRecoveryButtoncClick = useCallback(async () => {
    await sleep(size.BUTTON_PRESS_IN_OUT_DURATION * 2);

    router.push(PATH.RECOVERY);
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <BannerImage source={require("@/assets/images/home/home.png")} />

      <View style={styles.brandContainer}>
        <Text style={styles.logo}>meommu</Text>
        <Text style={styles.caption}>
          간단하게 기록해요,{"\n"}우리 강아지 다이어리 꾸미기
        </Text>
      </View>

      <View style={styles.signInForm}>
        <View style={styles.signInFormInputs}>
          <Controller
            name="id"
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
              <FormInput
                placeholder="아이디 (이메일)"
                inputMode="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                testID="input-signin-email"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "패스워드가 입력되지 않았습니다.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="비밀번호"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                testID="input-signin-password"
              />
            )}
          />
        </View>

        <View style={styles.navigationLayout}>
          <NavigationButton
            style={styles.navigationButtonStyle}
            content="비밀번호 찾기"
            onPress={handlePasswordRecoveryButtoncClick}
            backgroundColor="transparent"
            fontColor={color.g300}
          />

          <View style={styles.splitBar} />

          <NavigationButton
            style={styles.navigationButtonStyle}
            content="회원가입"
            onPress={handleSignUpButtonClick}
            backgroundColor="transparent"
            fontColor={color.g300}
            testID="button-signup"
          />
        </View>

        <Footer style={styles.bottomButton}>
          <NavigationButton
            content="로그인"
            onPress={handleSignInButtonClick}
            isLoading={signinMutation.isLoading}
            testID="button-signin"
          />
        </Footer>
      </View>
    </View>
  );
}
