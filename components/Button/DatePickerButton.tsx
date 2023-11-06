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
        <View
          style={{
            backgroundColor: "lightgray",
            borderRadius: 10,
          }}
        >
          <Text style={[styles.datePickerText, { color: "transparent" }]}>
            xxxx년 xx월 xxxx
          </Text>
        </View>
      </View>
    );
  }

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
