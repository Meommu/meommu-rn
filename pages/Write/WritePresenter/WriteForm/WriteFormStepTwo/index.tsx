// react
import { View, TextInput } from "react-native";
import { useFormContext, Controller } from "react-hook-form";

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BottomSheetState } from "@/store/modules/bottomSheet";

// components
import { UnderlineInput } from "@/components/Input/UnderlineInput";
import { UploadImagePicker } from "@/pages/Write/components/UploadImagePicker";
import { DatePickerController } from "@/pages/Write/components/DatePickerController";

// constants
import { color, size } from "@/constants";

// styles
import { styles } from "./index.styles";

export function WriteFormStepTwo() {
  const { control, watch, setValue, getValues } =
    useFormContext<DiaryWriteFormFieldValues>();

  const imageIds = watch("imageIds");

  const { datePickerBottomSheetRef } = useSelector<RootState, BottomSheetState>(
    (state) => state.bottomSheet
  );

  /**
   * swiper 라이브러리의 한계로 상태변화가 발생하지 않아 Presenter에 직접 핸들러를 작성함.
   */
  const handleDatePickerButtonClick = () => {
    datePickerBottomSheetRef?.current?.snapToIndex(0);
  };

  return (
    <View style={styles.container}>
      <DatePickerController
        getValues={getValues}
        onPress={handleDatePickerButtonClick}
      />

      <UploadImagePicker
        imageIds={imageIds}
        setValue={setValue}
        getValues={getValues}
      />

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
              required: {
                value: true,
                message: "최소 1자 이상의 일기를 입력해주세요.",
              },
              maxLength: {
                value: size.DIARY_CONTENT_MAX_LENGTH,
                message: [
                  "일기는 최대 1,000자 까지 작성 가능합니다. (",
                  getValues("content").length,
                  "/1000)",
                ].join(""),
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <TextInput
                  style={styles.writeFormContentInput}
                  textAlignVertical="top"
                  multiline={true}
                  placeholder={`${getValues(
                    "dogName"
                  )}의 일기를 작성해주세요. (0/${
                    size.DIARY_CONTENT_MAX_LENGTH
                  })`}
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
