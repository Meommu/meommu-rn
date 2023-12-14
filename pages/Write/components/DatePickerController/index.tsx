// react
import { UseFormGetValues } from "react-hook-form";
import { View, Text, Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

// styles
import { styles } from "./index.styles";

interface DatePickerControllerProps extends PressableProps {
  getValues: UseFormGetValues<DiaryWriteFormFieldValues>;
}

export function DatePickerController({
  getValues,
  ...props
}: DatePickerControllerProps) {
  const {
    containerAnimatedStyle,
    Dimmed,
    handleButtonPressIn,
    handleButtonPressOut,
  } = usePressInOutAnimation();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, containerAnimatedStyle]}>
        <Pressable
          style={styles.button}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          {...props}
        >
          <Text style={styles.buttonText}>
            {`${getValues("date").split("-")[0]}년 ${
              getValues("date").split("-")[1]
            }월 ${getValues("date").split("-")[2]}일`}
          </Text>

          <ArrowDropDown />
        </Pressable>

        {Dimmed}
      </Animated.View>
    </View>
  );
}
