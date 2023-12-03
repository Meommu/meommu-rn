// react
import { View, TextInput } from "react-native";
import { useFormContext, Controller } from "react-hook-form";

// components
import { UnderlineInput } from "@/components/Input/UnderlineInput";
import { UploadImagePicker } from "@/components/Widget/UploadImagePicker";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

export function WriteFormStepTwo() {
  const { control, watch, setValue, getValues } =
    useFormContext<DiaryWriteFormFieldValues>();

  const imageIds = watch("imageIds");

  return (
    <View style={styles.container}>
      <UploadImagePicker imageIds={imageIds} setValue={setValue} />

      <View style={styles.writeForm}>
        <View style={styles.writeFormTitleInputWrapper}>
          <Controller
            name="title"
            control={control}
            rules={{
              required: true,
              minLength: 1,
              maxLength: 20,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <UnderlineInput
                  style={styles.writeFormTitleInput}
                  maxLength={20}
                  placeholder="글 제목 (0/20)"
                  placeholderTextColor={color.g300}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
        </View>

        <View style={styles.writeFormContentInputWrapper}>
          <Controller
            name="content"
            control={control}
            rules={{
              required: true,
              minLength: 1,
              maxLength: 1000,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <TextInput
                  style={styles.writeFormContentInput}
                  textAlignVertical="top"
                  multiline={true}
                  maxLength={1000}
                  placeholder={`${getValues(
                    "dogName"
                  )}의 일기를 작성해주세요. (0/1000)`}
                  placeholderTextColor={color.g300}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}
