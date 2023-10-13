import { Controller } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { FormInput } from "../../components/FormInput";
import { FormDupChkButton } from "../../components/FormDupChkButton";
import { CheckBoxButton } from "../../components/CheckboxButton";
import { AlertText } from "../../components/AlertText";
import CaretRight from "../../../assets/svgs/caret-right.svg";
import type { SignUpFormFieldValues } from "../signUp";
import type { Control, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepOneProps {
  control: Control<SignUpFormFieldValues, any>;
  setValue: UseFormSetValue<SignUpFormFieldValues>;
  errors: FieldErrors<SignUpFormFieldValues>;
}

export function StepOne({ control, setValue, errors }: StepOneProps) {
  const [isEmailDup, setIsEmailDup] = useState<boolean | null>(null);

  const [agreement, setAgreement] = useState(false);

  const agreementButtonClickHandler = () => {
    setAgreement(!agreement);
    setValue("agreement", !agreement);
  };

  const emailDupChkButtonClickHandler = async () => {
    /**
     * todo: 이메일 중복 체크 api 호출
     */
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });

    const isDup = isEmailDup === null ? true : !isEmailDup;

    setIsEmailDup(isDup);
    setValue("emailDupChk", !isDup);

    return;
  };

  const resetEmailDupChk = () => {
    setIsEmailDup(null);
    setValue("emailDupChk", false);
  };

  return (
    <View style={styles.container}>
      {/**
       * 이메일
       */}
      <View style={styles.fieldView}>
        <View style={styles.fieldTextLayoutView}>
          <Text style={styles.fieldGuideText}>이메일 주소를 입력해주세요</Text>

          {isEmailDup !== null && (
            <AlertText condition={isEmailDup}>
              사용 {isEmailDup ? "불" : ""}가능한 이메일 입니다.
            </AlertText>
          )}
        </View>

        <View style={styles.emailFieldControllerLayoutView}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "에러",
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
              />
            )}
          />
          <FormDupChkButton
            isDup={isEmailDup}
            onPress={emailDupChkButtonClickHandler}
          />
        </View>
      </View>

      {/**
       * 패스워드
       */}
      <View style={styles.fieldView}>
        <View style={styles.fieldTextLayoutView}>
          <Text style={styles.fieldGuideText}>비밀번호를 입력해주세요</Text>

          {isEmailDup !== null && (
            <AlertText condition={isEmailDup}>
              사용 {isEmailDup ? "불" : ""}가능한 이메일 입니다.
            </AlertText>
          )}
        </View>

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="비밀번호"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
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
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Pretendard-SemiBold",
            }}
          >
            비밀번호를 확인해주세요
          </Text>
          {isEmailDup !== null && (
            <AlertText condition={isEmailDup}>
              사용 {isEmailDup ? "불" : ""}가능한 이메일 입니다.
            </AlertText>
          )}
        </View>

        <Controller
          name="passwordConfirm"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="비밀번호"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
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
    height: "100%",
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
