// react
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import { router } from "expo-router";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { BannerImage } from "@/components/Image/BannerImage";
import { FormInput } from "@/components/Input/FormInput";
import { KView } from "@/components/Layout/KView";

// constants
import { VIEW_NAME } from "@/constants";

// api
import { apiService } from "@/apis";
import axios from "axios";

// hooks
import { useToast } from "@/hooks";
import { useThrowRootIfLogin } from "@/hooks/useAccessControl";

// utils
import { regExp } from "@/utils";

export default function Home() {
  useThrowRootIfLogin();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormFieldValues>({
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

        /**
         * 로그인 성공 시 메인 페이지로 이동
         */
        router.replace(VIEW_NAME.MAIN);
      },
    }
  );

  const signInButtonClickHandler = () => {
    handleSubmit(
      (formData) => {
        signinMutation.mutate(formData);
      },
      (errors) => {
        if (errors.id) {
          switch (errors.id.type) {
            case "required":
              fireToast("이메일이 입력되지 않았습니다.", 2000);

              break;
            case "pattern":
              fireToast("이메일 형식이 올바르지 않습니다.", 2000);

              break;
          }

          return;
        }

        if (errors.password) {
          fireToast("패스워드가 입력되지 않았습니다.", 2000);

          return;
        }
      }
    )();
  };

  const signUpButtonClickHandler = () => {
    router.push(VIEW_NAME.SIGN_UP);
  };

  return (
    <KView style={styles.container}>
      <View style={styles.contentView}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>meommu</Text>
          <Text style={styles.subTitleText}>
            간단하게 기록해요,{"\n"}우리 강아지 다이어리 꾸미기
          </Text>
        </View>

        <BannerImage
          source={require("@/assets/images/home/home.png")}
          extraMarginTop={150}
        />
      </View>

      <View style={styles.signInFormView}>
        <Controller
          name="id"
          control={control}
          rules={{
            required: {
              value: true,
              message: "아이디(이메일)가 입력되지 않았습니다.",
            },
            pattern: {
              value: regExp.email,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="아이디 (이메일)"
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

        <View style={styles.navigationLayoutView}>
          <Pressable>
            <Text style={styles.navigationText}>아이디 찾기</Text>
          </Pressable>

          <View style={styles.splitBarView} />

          <Pressable>
            <Text style={styles.navigationText}>비밀번호 찾기</Text>
          </Pressable>

          <View style={styles.splitBarView} />

          <Pressable
            onPress={signUpButtonClickHandler}
            testID="text-goto-signup"
          >
            <Text style={styles.navigationText}>회원가입</Text>
          </Pressable>
        </View>

        <NavigationButton
          content="로그인"
          onPress={signInButtonClickHandler}
          disabled={isSubmitting}
          testID="button-signin"
        />
      </View>
    </KView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  contentView: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  titleView: {
    position: "absolute",
    top: 45,
    gap: 5,
    zIndex: 1,
    width: "100%",
  },

  titleText: {
    fontSize: 60,
    textAlign: "center",
    fontFamily: "yeonTheLand",
  },

  subTitleText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
  },

  navigationLayoutView: {
    flexDirection: "row",
    justifyContent: "center",
  },

  navigationText: {
    fontSize: 16,
    color: "#B7B7CB",
    fontFamily: "Pretendard-SemiBold",
  },

  splitBarView: {
    borderLeftColor: "#B7B7CB",
    borderLeftWidth: 2,
    marginHorizontal: 10,
    marginVertical: 3,
  },

  signInFormView: {
    gap: 10,
    padding: 20,
  },
});
