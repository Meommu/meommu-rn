// react
import { useContext, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { DatePickerContext } from "../../index.context";

// constants
import { color, font } from "@/constants";

interface DatePickerCalendarItemProps {
  calendarMonth: number;
}

export function DatePickerCalendarItem({
  calendarMonth,
}: DatePickerCalendarItemProps) {
  const { year, month, date, setDate, setMonth } =
    useContext(DatePickerContext);

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
    <View
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",

        paddingHorizontal: 20,
      }}
      onStartShouldSetResponder={() => true}
    >
      {items.map((v, j) => {
        if (v === null) {
          return (
            <View
              style={{
                width: "14%",
                height: "14%",
              }}
              key={j}
            />
          );
        }

        if (isNaN(v)) {
          return (
            <View
              style={{
                width: "14%",
                height: "14%",
                justifyContent: "center",
                alignItems: "center",

                padding: 6,
              }}
              key={j}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: color.g300,
                  fontSize: 16,
                  fontFamily: font.PretendardRegular,
                }}
              >
                {v}
              </Text>
            </View>
          );
        }

        const isSelect = month === calendarMonth && date === v;

        return (
          <View
            style={{
              width: "14%",
              height: "14%",
              justifyContent: "center",
              alignItems: "center",

              padding: 6,
            }}
            key={j}
          >
            <Pressable
              style={{
                position: "relative",

                height: "100%",
                aspectRatio: "1/1",
              }}
              onPress={() => {
                setMonth(calendarMonth);
                setDate(v);
              }}
            >
              {isSelect && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,

                    width: "100%",
                    height: "100%",

                    borderWidth: 1,
                    borderColor: color.b,
                    borderRadius: 9999,
                  }}
                ></View>
              )}

              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,

                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: font.PretendardRegular,
                    color: color.g500,
                  }}
                >
                  {v}
                </Text>
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
