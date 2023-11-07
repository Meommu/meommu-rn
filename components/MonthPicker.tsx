// react
import React, { Component, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Swiper from "react-native-web-swiper";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";
import CaretLeft from "@/assets/svgs/caret-left.svg";

// components
import { MonthCalendar } from "./MonthCalendar";

// utils
import { getPastYearDate } from "@/utils";

const MAXIMUM_PAST_YEAR = 10;
const MONTH_PICKER_HEIGHT = 300;

export function MonthPicker() {
  const swiperRef = useRef<Swiper | null>(null);

  const [index, setIndex] = useState(MAXIMUM_PAST_YEAR - 1);

  const swiperIndexChangeHandler = (index: number) => {
    setIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.yearView}>
        <Text style={styles.yearText}>
          {getPastYearDate(MAXIMUM_PAST_YEAR - index - 1).getFullYear()}년
        </Text>
      </View>

      <Swiper
        ref={swiperRef}
        from={MAXIMUM_PAST_YEAR - 1}
        onIndexChanged={swiperIndexChangeHandler}
        controlsProps={{
          dotsPos: false,
          nextPos: "top-right",
          prevPos: "top-left",
          NextComponent,
          PrevComponent,
        }}
      >
        {Array(MAXIMUM_PAST_YEAR)
          .fill(null)
          .map((_, i) => new Date().getFullYear() - i)
          .reverse()
          .map((year) => {
            return <MonthCalendar year={year} key={year} />;
          })}
      </Swiper>
    </View>
  );
}

class NextComponent extends Component {
  render(): React.ReactNode {
    return (
      <Pressable
        // @ts-expect-error
        onPress={this.props.onPress}
      >
        <CaretRight fill={"#B5BEC6"} />
      </Pressable>
    );
  }
}

class PrevComponent extends Component {
  render(): React.ReactNode {
    return (
      <Pressable
        // @ts-expect-error
        onPress={this.props.onPress}
      >
        <CaretLeft fill={"#B5BEC6"} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: MONTH_PICKER_HEIGHT,
  },

  yearView: { position: "absolute", width: "100%", top: 10 },

  yearText: {
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
    color: "#4A5660",
  },
});
