// react
import {
  View,
  StyleSheet,
  Pressable,
  PressableProps,
  Text,
} from "react-native";

// svgs
import ArrowDropDown from "@/assets/svgs/arrow-drop-down.svg";

// components
import { SView } from "../Layout/SView";

interface DatePickerButtonProps extends PressableProps {
  year: number;
  month: number;
}

export function DatePickerButton({
  year,
  month,
  ...props
}: DatePickerButtonProps) {
  const isLoading = year === -1 || month === -1;

  /**
   * skeleton ui
   */
  if (isLoading) {
    return (
      <View style={styles.datePicker}>
        <SView textLength={7} />
      </View>
    );
  }

  /**
   * TODO: 이곳으로 바텀 시트 모달 이동
   */
  return (
    <Pressable style={styles.datePicker} {...props}>
      <Text style={styles.datePickerText}>
        {year}년 {month}월
      </Text>
      <ArrowDropDown />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 12,
  },

  datePickerText: {
    fontFamily: "yeonTheLand",
    color: "#89899C",
  },
});
