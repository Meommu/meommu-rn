// react
import { Controller, useFormContext } from "react-hook-form";
import { View, Text } from "react-native";
import { useMutation } from "react-query";

// components
import { FormInput } from "@/components/Input/FormInput";
import { FormDupChkButton } from "@/components/Button/FormDupChkButton";
import { CheckBoxButton } from "@/components/Button/CheckboxButton";
import { AlertText } from "@/components/Text/AlertText";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";

// apis
import { apiService } from "@/apis";

// utils
import { useCallback } from "react";

// constants
import { regExp } from "@/constants";

// styles
import { styles } from "./index.styles";

export function SignUpFormStepOne() {
  /**
   * useForm
   */
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

  /**
   * useMutation
   */
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

  /**
   * 버튼 클릭 핸들러
   */
  const handleAgreementButtonClick = useCallback(() => {
    setValue("agreement", !agreement);
  }, [agreement, setValue]);

  const handleEmailDupChkButtonClick = useCallback(async () => {
    const emailIsValid = await trigger("email");

    if (!emailIsValid) {
      return;
    }

    emailDupChkMutation.mutate();

    return;
  }, [trigger, emailDupChkMutation]);

  /**
   * 유틸 함수
   */
  const resetEmailDupChk = useCallback(() => {
    setValue("emailDupChk", null);
  }, []);

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
      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>
          안녕하세요 선생님,{"\n"}
          멈무유치원에 오신걸 환영합니다!
        </Text>
        <Text style={styles.greetingSubTitle}>
          반려동물과의 건강한 추억을 기록해드리겠습니다.
        </Text>
      </View>

      <NonIndicatorScrollView>
        <View style={styles.formLayout}>
          {/**
           * 이메일
           */}
          <View style={styles.formField}>
            <View style={styles.formFieldGuideLayout}>
              <Text style={styles.formFieldGuideText}>
                이메일 주소를 입력해주세요
              </Text>

              <AlertText condition={emailInputCondition}>
                {emailInputAlertMessage}
              </AlertText>
            </View>

            <View style={styles.emailFormFieldLayout}>
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
                  <FormInput
                    placeholder="이메일"
                    onBlur={onBlur}
                    onChangeText={(text: string) => {
                      resetEmailDupChk();
                      onChange(text);
                    }}
                    value={value}
                    testID="input-signup-email"
                  />
                )}
              />
              <FormDupChkButton
                isDupChk={emailDupChk}
                onPress={handleEmailDupChkButtonClick}
                testID="button-email-dup-chk"
              />
            </View>
          </View>

          {/**
           * 패스워드
           */}
          <View style={styles.formField}>
            <View style={styles.formFieldGuideLayout}>
              <Text style={styles.formFieldGuideText}>
                비밀번호를 입력해주세요
              </Text>

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
                  value: regExp.password,
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
                  testID="input-signup-password"
                />
              )}
            />

            <Text style={styles.formFieldGuideDetailText}>
              *영문 대/소문자, 숫자, 기호(!@#$%^~*+=-) 사용하여 8~20 글자 사이의
              비밀번호를 사용하세요. 숫자와 특수기호가 한 글자 이상
              포함되어야합니다.
            </Text>
          </View>

          <View style={styles.formField}>
            <View style={styles.formFieldGuideLayout}>
              <Text style={styles.formFieldGuideText}>
                비밀번호를 확인해주세요
              </Text>

              <AlertText condition={!errors.passwordConfirm ? true : false}>
                {!errors.password
                  ? (errors.passwordConfirm &&
                      errors.passwordConfirm.message) ||
                    ""
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
                  testID="input-signup-password-confirm"
                />
              )}
            />
          </View>

          {/**
           * 약관동의
           */}
          <View style={styles.agreementFormFieldLayout}>
            <CheckBoxButton
              isCheck={agreement}
              onPress={handleAgreementButtonClick}
              testID="button-agreement"
            />

            <Text style={styles.agreementFormFieldText}>
              서비스 이용 및 개인정보 수집약관에 동의합니다.
            </Text>

            <CaretRight />
          </View>
        </View>
      </NonIndicatorScrollView>
    </View>
  );
}
