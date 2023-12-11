// react
import { MutableRefObject, useCallback } from "react";
import { View, Text, Pressable } from "react-native";

// components
import { Header } from "@/components/Layout/Header";

// svgs
import CaretLeft from "@/assets/svgs/caret-left.svg";
import CaretRight from "@/assets/svgs/caret-right.svg";

// utils
import { getPastYearDate } from "@/utils";

// constants
import { size, color } from "@/constants";

// styles
import { styles } from "./index.styles";

// swiper
import Swiper from "react-native-web-swiper";

interface MonthPickerHandleProps {
  swiperRef: MutableRefObject<Swiper | null>;

  swiperIndex: number;
}

function MonthPickerHandle({ swiperRef, swiperIndex }: MonthPickerHandleProps) {
  const handleSwiperPrevButtonClick = useCallback(() => {
    swiperRef.current?.goToPrev();
  }, [swiperRef]);

  const handleSwiperNextButtonClick = useCallback(() => {
    swiperRef.current?.goToNext();
  }, [swiperRef]);

  return (
    <View style={styles.container}>
      <View style={styles.grabber} />

      <Header
        style={styles.header}
        title={
          <Text style={styles.yearText}>
            {`${getPastYearDate(
              size.MONTH_CALENDAR_PAGE_COUNT - swiperIndex - 1
            ).getFullYear()}년`}
          </Text>
        }
        left={
          swiperIndex !== 0 && (
            <Pressable
              onPress={handleSwiperPrevButtonClick}
              testID="button-month-calendar-prev"
              style={styles.swiperController}
            >
              <CaretLeft fill={color.g300} />
            </Pressable>
          )
        }
        right={
          swiperIndex !== size.MONTH_CALENDAR_PAGE_COUNT - 1 && (
            <Pressable
              onPress={handleSwiperNextButtonClick}
              style={styles.swiperController}
            >
              <CaretRight fill={color.g300} />
            </Pressable>
          )
        }
      />

      <Text style={styles.guideText}>이동하고 싶은 월을 선택하세요</Text>
    </View>
  );
}

export function renderHandle(props: MonthPickerHandleProps) {
  return function () {
    return <MonthPickerHandle {...props} />;
  };
}
