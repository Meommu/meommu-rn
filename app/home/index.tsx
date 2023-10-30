// react
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";

// expo
import { router } from "expo-router";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { BannerImage } from "@/components/Image/BannerImage";
import { FormInput } from "@/components/Input/FormInput";

// constants
import { VIEW_NAME } from "@/constants";

// api
import { apiService } from "@/apis";

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormFieldValues>({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const signinMutation = useMutation(
    async (data: SignInFormFieldValues) => {
      const accessToken = apiService.signin(data.id, data.password);

      return accessToken;
    },
    {
      onSuccess: (data) => {
        /**
         * TODO: 로그인 성공 시 전달받은 토큰을 저장하도록 구현
         */
        const accessToken = data;

        /**
         * 로그인 성공 시 메인 페이지로 이동
         */
        router.replace(VIEW_NAME.MAIN);
      },
    }
  );

  const signInButtonClickHandler = () => {
    if (errors.id || errors.password) {
      /**
       * TODO: 아이디 혹은 패스워드가 입력되지 않았을 경우
       * 오류 타입에 따라서 경고 메세지를 출력하도록 구현
       */
      console.log(
        "[error] 아이디 혹은 패스워드가 입력되지 않았거나 올바르지 않은 형태입니다."
      );

      return;
    }

    handleSubmit((formData) => {
      signinMutation.mutate(formData);
    })();
  };

  const signUpButtonClickHandler = () => {
    router.push(VIEW_NAME.SIGN_UP);
  };

  return (
    <View style={styles.container}>
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
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="아이디 (이메일)"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
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
            pattern: {
              value: /^(?=.*\d)(?=.*[!@#$%^~*+=-])[A-Za-z\d!@#$%^~*+=-]{8,20}$/,
              message: "비밀번호 형식이 올바르지 않습니다.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="비밀번호"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              secureTextEntry={true}
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

          <Pressable onPress={signUpButtonClickHandler}>
            <Text style={styles.navigationText}>회원가입</Text>
          </Pressable>
        </View>

        <NavigationButton
          content="로그인"
          onPress={signInButtonClickHandler}
          disabled={isSubmitting}
        />
      </View>
    </View>
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
