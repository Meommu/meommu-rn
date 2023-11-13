// react
import { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// swiper
import Swiper from "react-native-web-swiper";

// components
import { KebabMenuButton } from "./Button/KebabMenuButton";
import { SView } from "./Layout/SView";
import { LoadImage } from "./Image/LoadImage";

// utils
import { createRandomNumberInRange } from "@/utils";

interface DiaryItemProps {
  diary: Diary;
  handleKebabMenuButtonClick: (diaryId: number) => () => void;
}

export function DiaryItem({
  diary,
  handleKebabMenuButtonClick,
}: DiaryItemProps) {
  const { id, date, dogName, title, content, imageIds } = diary;

  const swiperRef = useRef<Swiper | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwiperIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageSwiperWrapper}>
        <Swiper
          ref={swiperRef}
          onIndexChanged={handleSwiperIndexChange}
          controlsEnabled={false}
        >
          {imageIds.map((imageId) => (
            <LoadImage imageId={imageId} key={`imageId${imageId}`} />
          ))}
        </Swiper>

        <KebabMenuButton
          style={styles.menu}
          onPress={handleKebabMenuButtonClick(id)}
        />

        <View style={styles.order}>
          <Text style={styles.orderText}>
            {currentIndex + 1}/{imageIds.length}
          </Text>
        </View>
      </View>

      <View style={styles.diaryBody}>
        <Text style={styles.diaryTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text
          style={styles.diaryContent}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {content}
        </Text>
        <Text style={styles.diaryInfo}>
          {date.replaceAll("-", ".")} {dogName} 일기
        </Text>
      </View>
    </View>
  );
}

export function DiaryItemSkeleton() {
  return (
    <View style={styles.container}>
      <SView style={styles.imageSwiperWrapper} />

      <View style={styles.diaryBody}>
        <SView
          style={{ width: `${createRandomNumberInRange(70, 80)}%`, height: 32 }}
        />
        <View style={{ width: "100%", gap: 2 }}>
          {Array(createRandomNumberInRange(2, 3))
            .fill(null)
            .map((_, i) => (
              <SView
                key={i}
                style={{
                  width: `${createRandomNumberInRange(70, 95)}%`,
                  height: 18,
                }}
              />
            ))}
        </View>
        <SView style={{ width: 110, height: 16 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    gap: 16,
  },

  imageSwiperWrapper: {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",
  },

  menu: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  order: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(13, 61, 70, 0.8)",
    borderRadius: 400,
    paddingHorizontal: 11,
    paddingTop: 1,
    paddingBottom: 3,
  },

  orderText: {
    fontSize: 14,
    color: "white",
  },

  diaryBody: {
    alignItems: "flex-start",
    gap: 6,
  },

  diaryTitle: {
    color: "black",
    fontSize: 26,
    fontFamily: "yeonTheLand",
  },

  diaryContent: {
    fontSize: 16,
    fontFamily: "yeonTheLand",
    color: "#626154",
  },

  diaryInfo: {
    color: "#8F8F8F",
    fontSize: 14,
    fontFamily: "yeonTheLand",
  },
});
