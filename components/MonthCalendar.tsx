// react
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

// redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";
import { changeSelectedYearMonth } from "@/store/modules/diaryDate";
import { useMemo } from "react";

interface MonthCalendarProps {
  year: number;
}

export function MonthCalendar({ year }: MonthCalendarProps) {
  const dispatch = useDispatch();

  const { selectedYear, selectedMonth, currentMonth, currentYear } =
    useSelector<RootState, DiaryDateState>((state) => state.diaryDate);

  const handleMonthSelect = (month: number) => () => {
    dispatch(changeSelectedYearMonth(year, month));
  };

  const now = useMemo(() => new Date(), []);

  return (
    <View style={styles.container}>
      {Array(12)
        .fill(null)
        .map((_, i) => {
          const month = i + 1;

          const isSelected = year === selectedYear && month === selectedMonth;

          const isFuture =
            year > now.getFullYear() ? true : month > now.getMonth() + 1;

          const isCurrentDate = year === currentYear && month === currentMonth;

          return (
            <View style={styles.monthElementLayout} key={`${year}|${month}`}>
              <View style={styles.monthElement}>
                <Pressable
                  style={[
                    styles.monthElementCircle,
                    {
                      borderColor: isSelected ? "black" : "white",
                      backgroundColor: isCurrentDate
                        ? "rgba(0, 0, 0, 0.3)"
                        : "transparnet",
                    },
                  ]}
                  onPress={handleMonthSelect(month)}
                  disabled={isFuture}
                >
                  <Text
                    style={[
                      styles.monthElementText,
                      {
                        color: isFuture
                          ? "lightgray"
                          : isCurrentDate
                          ? "white"
                          : "#4A5660",
                      },
                    ]}
                  >
                    {month}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 40,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  monthElementLayout: {
    width: "25%",
  },

  monthElement: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    padding: 5,
  },

  monthElementCircle: {
    height: "100%",
    aspectRatio: "1/1",

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 999,
    borderWidth: 1,

    overflow: "hidden",

    position: "relative",
  },

  monthElementCircleImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  monthElementText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    color: "#4A5660",
  },
});
