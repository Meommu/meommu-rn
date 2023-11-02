// react
import { View, Text, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";

// components
import { FormInput } from "@/components/Input/FormInput";
import { AlertText } from "@/components/Text/AlertText";

// utils
import { regExp } from "@/utils";

interface StepTwoProps {}

export function StepTwo({}: StepTwoProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignUpFormFieldValues>();

  return (
    <View style={styles.container}>
      <View style={styles.fieldView}>
        <View style={styles.fieldTextLayoutView}>
          <Text style={styles.fieldGuideText}>유치원 이름을 입력해주세요</Text>

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
              testID="input-kindergarten-name"
            />
          )}
        />
      </View>

      <View style={styles.fieldView}>
        <View style={styles.fieldTextLayoutView}>
          <Text style={styles.fieldGuideText}>대표자 이름을 입력해주세요</Text>

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
              testID="input-kindergarten-director-name"
            />
          )}
        />
      </View>

      <View style={styles.fieldView}>
        <View style={styles.fieldTextLayoutView}>
          <Text style={styles.fieldGuideText}>전화번호를 입력해주세요</Text>

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
              testID="input-phone-number"
            />
          )}
        />
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
});
