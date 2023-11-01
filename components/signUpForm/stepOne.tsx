// react
import { Controller, useFormContext } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { useMutation } from "react-query";

// components
import { FormInput } from "@/components/Input/FormInput";
import { FormDupChkButton } from "@/components/Button/FormDupChkButton";
import { CheckBoxButton } from "@/components/Button/CheckboxButton";
import { AlertText } from "@/components/Text/AlertText";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";

// apis
import { apiService } from "@/apis";

interface StepOneProps {}

export function StepOne({}: StepOneProps) {
  const {
    control,
    setValue,
    formState: { errors },
    trigger,
    watch,
  } = useFormContext<SignUpFormFieldValues>();

  const agreement = watch("agreement");
  const emailInputValue = watch("email");
  const emailDupChk = watch("emailDupChk");
  const password = watch("password");

  const emailDupChkMutation = useMutation(
    async () => {
      const isDuplication = await apiService.getEmailDuplicationStatus(
        emailInputValue
      );

      return isDuplication;
    },
    {
      onSuccess: (isDuplication) => {
        setValue("emailDupChk", isDuplication);
      },
    }
  );

  const agreementButtonClickHandler = () => {
    setValue("agreement", !agreement);
  };

  const emailDupChkButtonClickHandler = async () => {
    const emailIsValid = await trigger("email");

    if (!emailIsValid) {
      return;
    }

    emailDupChkMutation.mutate();

    return;
  };

  const resetEmailDupChk = () => {
    setValue("emailDupChk", null);
  };

  const emailInputCondition =
    errors.email === undefined
      ? typeof emailDupChk === "boolean"
        ? emailDupChk
        : false
      : false;

  const emailInputAlertMessage =
    errors.email === undefined
      ? typeof emailDupChk === "boolean"
        ? `사용 ${!emailDupChk ? "불" : ""}가능한 이메일 입니다.`
        : ""
      : errors.email.message;

  return (
    <View style={styles.container}>
      {/**
       * 이메일
       */}
      <View style={styles.fieldView}>
        <View style={styles.fieldTextLayoutView}>
          <Text style={styles.fieldGuideText}>이메일 주소를 입력해주세요</Text>

          <AlertText condition={emailInputCondition}>
            {emailInputAlertMessage}
          </AlertText>
        </View>

        <View style={styles.emailFieldControllerLayoutView}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "이메일이 입력되지 않았습니다.",
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "이메일 형식이 올바르지 않습니다.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="이메일"
                onBlur={onBlur}
                onChangeText={(text: string) => {
                  resetEmailDupChk();
                  onChange(text);
                }}
                value={value}
                testID="input-email"
              />
            )}
          />
          <FormDupChkButton
            isDupChk={emailDupChk}
            onPress={emailDupChkButtonClickHandler}
            testID="email-button-dup-chk"
          />
        </View>
      </View>

      {/**
       * 패스워드
       */}
      <View style={styles.fieldView}>
        <View style={styles.fieldTextLayoutView}>
          <Text style={styles.fieldGuideText}>비밀번호를 입력해주세요</Text>

          <AlertText condition={!errors.password ? true : false}>
            {(errors.password && errors.password.message) || ""}
          </AlertText>
        </View>

        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^(?=.*\d)(?=.*[!@#$%^~*+=-])[A-Za-z\d!@#$%^~*+=-]{8,20}$/,
              message: "비밀번호 형식이 올바르지 않습니다.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="비밀번호"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              testID="input-password"
            />
          )}
        />

        <Text style={styles.fieldIntroText}>
          *영문 대/소문자, 숫자, 기호(!@#$%^~*+=-) 사용하여 8~20 글자 사이의
          비밀번호를 사용하세요. 숫자와 특수기호가 한 글자 이상
          포함되어야합니다.
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Text style={styles.fieldGuideText}>비밀번호를 확인해주세요</Text>

          <AlertText condition={!errors.passwordConfirm ? true : false}>
            {!errors.password
              ? (errors.passwordConfirm && errors.passwordConfirm.message) || ""
              : ""}
          </AlertText>
        </View>

        <Controller
          name="passwordConfirm"
          control={control}
          rules={{
            required: true,
            validate: (value) =>
              value === password ? true : "패스워드가 일치하지 않습니다.",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="비밀번호"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              testID="input-password-confirm"
            />
          )}
        />
      </View>

      {/**
       * 약관동의
       */}
      <View style={styles.agreementFieldControllerLayoutView}>
        <CheckBoxButton
          isCheck={agreement}
          onPress={agreementButtonClickHandler}
          testID="button-agreement"
        />

        <View style={styles.agreementFieldControllerTextLayoutView}>
          <Text style={styles.fieldGuideText}>
            서비스 이용 및 개인정보 수집약관에 동의합니다.
          </Text>
          <CaretRight />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
    paddingHorizontal: 20,
    width: "100%",
  },

  fieldView: {
    gap: 12,
  },

  fieldTextLayoutView: {
    flexDirection: "row",
    gap: 12,
  },

  fieldGuideText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
  },

  fieldIntroText: {
    fontSize: 10,
    fontFamily: "Pretendard-SemiBold",
    color: "#B7B7CB",
    paddingHorizontal: 10,
  },

  emailFieldControllerLayoutView: {
    flexDirection: "row",
    gap: 15,
  },

  agreementFieldControllerLayoutView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  agreementFieldControllerTextLayoutView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    flexGrow: 1,
    flexShrink: 1,
  },
});
