// react
import { useContext, useMemo } from "react";
import { View, Text, Pressable } from "react-native";

// components
import { LoadImage } from "@/components/Image/LoadImage";

// context
import { MonthCalendarContext } from "../index.context";

// styles
import { styles } from "./index.styles";

interface MonthCalendarProps {
  calendarYear: number;
  selectedYear: number;
  selectedMonth: number;
}

export function MonthCalendarItem({
  calendarYear,
  selectedYear,
  selectedMonth,
}: MonthCalendarProps) {
  const { currentYear, currentMonth, yearMonthToImageId, setCurrentYearMonth } =
    useContext(MonthCalendarContext);

  const now = useMemo(() => new Date(), []);

  const handleMonthSelect = (month: number) => () => {
    setCurrentYearMonth(calendarYear, month);
  };

  return (
    <View style={styles.container}>
      {Array(12)
        .fill(null)
        .map((_, i) => {
          const month = i + 1;
          const yearMonthKey = `${calendarYear}|${month}`;

          const isSelected =
            calendarYear === currentYear && month === currentMonth;
          const isFuture =
            now.getFullYear() > calendarYear
              ? false
              : month > now.getMonth() + 1;
          const isCurrentDate =
            calendarYear === selectedYear && month === selectedMonth;

          const diaryImageId = yearMonthToImageId.get(yearMonthKey);

          return (
            <View
              style={styles.monthElementLayout}
              key={yearMonthKey}
              testID={`button-month-calendar-element-${calendarYear}-${month}`}
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
