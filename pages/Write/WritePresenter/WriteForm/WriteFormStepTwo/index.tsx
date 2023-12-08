// react
import { View, Text, TextInput, Pressable } from "react-native";
import { useFormContext, Controller } from "react-hook-form";

// components
import { UnderlineInput } from "@/components/Input/UnderlineInput";
import { UploadImagePicker } from "@/pages/Write/components/UploadImagePicker";

// constants
import { color, font } from "@/constants";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

// styles
import { styles } from "./index.styles";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BottomSheetState } from "@/store/modules/bottomSheet";

export function WriteFormStepTwo() {
  const { control, watch, setValue, getValues } =
    useFormContext<DiaryWriteFormFieldValues>();

  const imageIds = watch("imageIds");

  /**
   * TODO: container로 이동
   */
  const { datePickerBottomSheetRef } = useSelector<RootState, BottomSheetState>(
    (state) => state.bottomSheet
  );

  const handleDatePickerButtonClick = () => {
    datePickerBottomSheetRef?.current?.snapToIndex(0);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "flex-start",

          paddingVertical: 10,
          paddingHorizontal: 21,

          backgroundColor: color.g200,
        }}
      >
        <Pressable
          onPress={handleDatePickerButtonClick}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Text
            style={{
              color: color.g500,
              fontSize: 18,
              fontFamily: font.YeonTheLand,
              lineHeight: 24,
            }}
          >
            {`${getValues("date").split("-")[0]}년 ${
              getValues("date").split("-")[1]
            }월 ${getValues("date").split("-")[2]}일`}
          </Text>

          <ArrowDropDown />
        </Pressable>
      </View>

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
