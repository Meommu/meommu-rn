// react
import { View, Text } from "react-native";
import { Controller, useFormContext } from "react-hook-form";

// components
import { FormInput } from "@/components/Input/FormInput";
import { AlertText } from "@/components/Text/AlertText";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";

// constants
import { regExp } from "@/constants";

// styles
import { styles } from "./index.styles";

interface SignUpFormStepTwoProps {
  showGuideText?: boolean;
}

export function SignUpFormStepTwo({
  showGuideText = true,
}: SignUpFormStepTwoProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProfileFormFieldValues>();

  return (
    <View style={styles.container}>
      {showGuideText && (
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>
            이제 곧 끝나요!{"\n"}
            유치원 정보를 입력해주세요
          </Text>
          <Text style={styles.greetingSubTitle}>
            반려동물과의 건강한 추억을 기록해드리겠습니다.
          </Text>
        </View>
      )}

      <NonIndicatorScrollView>
        <View style={styles.formLayout}>
          <View style={styles.formField}>
            <View style={styles.formFieldGuideLayout}>
              <Text style={styles.formFieldGuideText}>
                유치원 이름을 입력해주세요
              </Text>

              <AlertText condition={!errors.kindergartenName ? true : false}>
                {errors.kindergartenName
                  ? "2에서 8글자 사이의 이름을 입력해주세요."
                  : ""}
              </AlertText>
            </View>

            <Controller
              name="kindergartenName"
              control={control}
              rules={{
                required: true,
                minLength: 2,
                maxLength: 8,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  placeholder="유치원 이름 (2글자~8글자)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  testID="input-signup-kindergarten-name"
                />
              )}
            />
          </View>

          <View style={styles.formField}>
            <View style={styles.formFieldGuideLayout}>
              <Text style={styles.formFieldGuideText}>
                대표자 이름을 입력해주세요
              </Text>

              <AlertText
                condition={!errors.kindergartenDirectorName ? true : false}
              >
                {errors.kindergartenDirectorName
                  ? "3에서 4글자 사이의 한글 이름을 입력해주세요."
                  : ""}
              </AlertText>
            </View>

            <Controller
              name="kindergartenDirectorName"
              control={control}
              rules={{
                required: true,
                minLength: 3,
                maxLength: 4,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  placeholder="예) 김숙자"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  testID="input-signup-kindergarten-director-name"
                />
              )}
            />
          </View>

          <View style={styles.formField}>
            <View style={styles.formFieldGuideLayout}>
              <Text style={styles.formFieldGuideText}>
                전화번호를 입력해주세요
              </Text>

              <AlertText condition={!errors.phoneNumber ? true : false}>
                {(errors.phoneNumber && errors.phoneNumber.message) || ""}
              </AlertText>
            </View>

            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: regExp.phone,
                  message: "올바른 형식의 전화번호를 입력하세요",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  placeholder="예) 010-1234-5678"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  testID="input-signup-phone-number"
                />
              )}
            />
          </View>
        </View>
      </NonIndicatorScrollView>
    </View>
  );
}
