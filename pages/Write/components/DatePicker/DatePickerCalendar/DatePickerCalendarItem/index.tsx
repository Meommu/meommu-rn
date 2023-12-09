// react
import { useContext, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { DatePickerContext } from "../../index.context";

// components
import { LoadImage } from "@/components/Widget/LoadImage";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

interface DatePickerCalendarItemProps {
  calendarMonth: number;
}

export function DatePickerCalendarItem({
  calendarMonth,
}: DatePickerCalendarItemProps) {
  const { year, month, date, setDate, setMonth, dateToImageId } =
    useContext(DatePickerContext);

  const handleCalendarItemClick = (date: number) => () => {
    setMonth(calendarMonth);
    setDate(date);
  };

  const MONTH_END_DATE = useMemo(
    () => [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    []
  );

  const DAY_OF_THE_WEEK = useMemo(
    () => ["일", "월", "화", "수", "목", "금", "토"],
    []
  );

  const startingDate = new Date();

  startingDate.setFullYear(year);
  startingDate.setMonth(calendarMonth);
  startingDate.setDate(1);

  const items = [
    ...Array(7)
      .fill(null)
      .map((_, i) => DAY_OF_THE_WEEK[i]),
    ...Array(startingDate.getDay()).fill(null),
    ...Array(MONTH_END_DATE[calendarMonth - 1])
      .fill(null)
      .map((_, i) => i + 1),
    ...Array(
      42 - startingDate.getDay() - MONTH_END_DATE[calendarMonth - 1]
    ).fill(null),
  ];

  return (
    <View style={styles.container} onStartShouldSetResponder={() => true}>
      {items.map((calendarDate, i) => {
        if (calendarDate === null) {
          return <View style={styles.calenderItemLayout} key={i} />;
        }

        if (isNaN(calendarDate)) {
          return (
            <View style={styles.calenderItemLayout} key={i}>
              <Text style={styles.calendarItemHeaderText}>{calendarDate}</Text>
            </View>
          );
        }

        const isSelect = month === calendarMonth && date === calendarDate;

        const imageId = dateToImageId.get(
          [
            year,
            calendarMonth.toString().padStart(2, "0"),
            calendarDate.toString().padStart(2, "0"),
          ].join("-")
        );

        return (
          <View style={styles.calenderItemLayout} key={i}>
            <Pressable
              style={styles.calendarItemDataLayout}
              onPress={handleCalendarItemClick(calendarDate)}
            >
              {imageId && (
                <View style={styles.calenderItemDataImage}>
                  <LoadImage imageId={imageId} />
                </View>
              )}

              <View style={styles.calenderItemData}>
                <Text
                  style={[
                    styles.calendarItemDataText,
                    {
                      color: imageId ? color.w : color.g500,
                    },
                  ]}
                >
                  {calendarDate}
                </Text>
              </View>

              {isSelect && (
                <View style={styles.calendarItemDataSelectedCircle} />
              )}
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
