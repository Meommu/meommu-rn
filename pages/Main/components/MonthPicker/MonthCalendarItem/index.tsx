// react
import { useContext, useMemo } from "react";
import { View, Text } from "react-native";

// components
import { LoadImage } from "@/components/Widget/LoadImage";
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// context
import { MonthPickerContext } from "../index.context";

// constants
import { color } from "@/constants";

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
    useContext(MonthPickerContext);

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
                <InteractionPressable
                  style={styles.monthElementButtonWrapper}
                  containerStyle={styles.monthElementButton}
                  onPress={handleMonthSelect(month)}
                  disabled={isFuture}
                >
                  {diaryImageId && (
                    <View style={styles.monthElementButtonCircleLayout}>
                      <LoadImage imageId={diaryImageId} />
                    </View>
                  )}

                  {isCurrentDate && (
                    <View
                      style={[
                        styles.monthElementButtonCircleLayout,
                        {
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                        },
                      ]}
                    />
                  )}

                  {isSelected && (
                    <View
                      style={[
                        styles.monthElementButtonCircleLayout,
                        { borderWidth: 1 },
                      ]}
                    />
                  )}

                  <Text
                    style={[
                      styles.monthElementButtonText,
                      {
                        color: isFuture
                          ? "lightgray"
                          : isCurrentDate || diaryImageId !== undefined
                          ? color.w
                          : color.g700,
                      },
                    ]}
                  >
                    {month}월
                  </Text>
                </InteractionPressable>
              </View>
            </View>
          );
        })}
    </View>
  );
}
