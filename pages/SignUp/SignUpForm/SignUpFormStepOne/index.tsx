// react
import { Controller, useFormContext } from "react-hook-form";
import { View, Text, Pressable, Platform } from "react-native";
import { useMutation } from "react-query";

// expo
import * as Linking from "expo-linking";

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

const TERMS_OF_USE_LINK =
  "https://glittery-indigo-2e2.notion.site/8628c2aec700417299577d4ab1547f3d?pvs=25#9ff248ea306a4a6da8de2c3214ebb255";
const PRIVACY_POLICY_LINK =
  "https://glittery-indigo-2e2.notion.site/8628c2aec700417299577d4ab1547f3d#d117b28858274d6aacc87700d0fc77f9";
const TERMS_OF_USE_AND_PRIVACY_POLICY_LINK =
  "https://glittery-indigo-2e2.notion.site/8628c2aec700417299577d4ab1547f3d";

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

  const handleTermsOfUseTextClick = useCallback(() => {
    if (Platform.OS === "web") {
      window.open(TERMS_OF_USE_LINK, "_blank");

      return;
    }

    Linking.openURL(TERMS_OF_USE_LINK);
  }, []);

  const handlePrivacyPolicyTextClick = useCallback(() => {
    if (Platform.OS === "web") {
      window.open(PRIVACY_POLICY_LINK, "_blank");

      return;
    }

    Linking.openURL(PRIVACY_POLICY_LINK);
  }, []);

  const handleTermsOfUseAndPrivacyPolicyButtonClick = useCallback(() => {
    if (Platform.OS === "web") {
      window.open(TERMS_OF_USE_AND_PRIVACY_POLICY_LINK, "_blank");

      return;
    }

    Linking.openURL(TERMS_OF_USE_AND_PRIVACY_POLICY_LINK);
  }, []);

  /**
   * 유틸 함수
   */
  const resetEmailDupChk = useCallback(() => {
    setValue("emailDupChk", null);
  }, []);

  const emailInputCondition =
    errors.email !== undefined
      ? false
      : typeof emailDupChk === "boolean"
      ? emailDupChk
      : false;

  const emailInputAlertMessage =
    errors.email !== undefined
      ? errors.email.message
      : typeof emailDupChk === "boolean"
      ? `사용 ${!emailDupChk ? "불" : ""}가능한 이메일 입니다.`
      : "";

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
                    inputMode="email"
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

            <View style={styles.agreementFormField}>
              <Pressable onPress={handleTermsOfUseTextClick}>
                <Text
                  style={[
                    styles.agreementFormFieldText,
                    { textDecorationLine: "underline" },
                  ]}
                >
                  서비스 이용
                </Text>
              </Pressable>

              <Text style={styles.agreementFormFieldText}> 및 </Text>

              <Pressable onPress={handlePrivacyPolicyTextClick}>
                <Text
                  style={[
                    styles.agreementFormFieldText,
                    { textDecorationLine: "underline" },
                  ]}
                >
                  개인정보 수집약관
                </Text>
              </Pressable>

              <Text style={styles.agreementFormFieldText}>에 동의합니다.</Text>
            </View>

            <Pressable
              style={styles.agreementFormFieldCaretRight}
              onPress={handleTermsOfUseAndPrivacyPolicyButtonClick}
            >
              <CaretRight />
            </Pressable>
          </View>
        </View>
      </NonIndicatorScrollView>
    </View>
  );
}
