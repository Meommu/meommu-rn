// react
import { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

// redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";
import { changeSelectedYearMonth } from "@/store/modules/diaryDate";

// components
import { LoadImage } from "./Image/LoadImage";

interface MonthCalendarProps {
  year: number;
}

export function MonthCalendar({ year }: MonthCalendarProps) {
  const dispatch = useDispatch();

  const {
    selectedYear,
    selectedMonth,
    currentMonth,
    currentYear,
    yearMonthToImageId,
  } = useSelector<RootState, DiaryDateState>((state) => state.diaryDate);

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
          const yearMonthKey = `${year}|${month}`;

          const isSelected = year === selectedYear && month === selectedMonth;
          const isFuture =
            now.getFullYear() > year ? false : month > now.getMonth() + 1;
          const isCurrentDate = year === currentYear && month === currentMonth;

          const diaryImageId = yearMonthToImageId.get(yearMonthKey);

          return (
            <View
              style={styles.monthElementLayout}
              key={yearMonthKey}
              testID={`button-month-calendar-element-${year}-${month}`}
            >
              <View style={styles.monthElement}>
                <Pressable
                  style={[
                    styles.monthElementCircle,
                    {
                      borderColor: isSelected ? "black" : "white",
                    },
                  ]}
                  onPress={handleMonthSelect(month)}
                  disabled={isFuture}
                >
                  {diaryImageId && (
                    <LoadImage
                      imageId={diaryImageId}
                      style={styles.monthElementCircleImage}
                    />
                  )}

                  <View
                    style={[
                      styles.monthElementCircleImage,
                      {
                        backgroundColor: isCurrentDate
                          ? "rgba(0, 0, 0, 0.3)"
                          : "transparnet",
                      },
                    ]}
                  />

                  <Text
                    style={[
                      styles.monthElementText,
                      {
                        color: isFuture
                          ? "lightgray"
                          : isCurrentDate || diaryImageId !== undefined
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
    flexDirection: "row",
    flexWrap: "wrap",
  },

  monthElementLayout: {
    width: "25%",
    height: "33%",
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
