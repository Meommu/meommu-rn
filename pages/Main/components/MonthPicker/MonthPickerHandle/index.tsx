// react
import { MutableRefObject, useCallback } from "react";
import { View, Text } from "react-native";

// components
import { Header } from "@/components/Layout/Header";
import { CaretLeftButton } from "@/components/Button/CaretLeftButton";
import { CaretRightButton } from "@/components/Button/CaretRightButton";

// utils
import { getPastYearDate } from "@/utils";

// constants
import { color, size } from "@/constants";

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
            <CaretLeftButton
              onPress={handleSwiperPrevButtonClick}
              fill={color.g300}
              testID="button-month-calendar-prev"
            />
          )
        }
        right={
          swiperIndex !== size.MONTH_CALENDAR_PAGE_COUNT - 1 && (
            <CaretRightButton
              onPress={handleSwiperNextButtonClick}
              fill={color.g300}
            />
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
