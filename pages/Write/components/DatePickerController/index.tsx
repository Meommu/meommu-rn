// react
import { UseFormGetValues } from "react-hook-form";
import { View, Text, type PressableProps } from "react-native";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

// styles
import { styles } from "./index.styles";

interface DatePickerControllerProps extends PressableProps {
  getValues: UseFormGetValues<DiaryWriteFormFieldValues>;
}

export function DatePickerController({
  getValues,
  style,
  ...props
}: DatePickerControllerProps) {
  return (
    <View style={styles.container}>
      <InteractionPressable containerStyle={styles.button} {...props}>
        <Text style={styles.buttonText}>
          {`${getValues("date").split("-")[0]}년 ${
            getValues("date").split("-")[1]
          }월 ${getValues("date").split("-")[2]}일`}
        </Text>

        <ArrowDropDown />
      </InteractionPressable>
    </View>
  );
}
