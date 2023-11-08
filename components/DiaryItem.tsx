// react
import { useRef, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useQuery } from "react-query";

// swiper
import Swiper from "react-native-web-swiper";

// components
import { KebabMenuButton } from "./Button/KebabMenuButton";

// apis
import { apiService } from "@/apis";

interface LoadImageProps {
  imageId: number;
}

function LoadImage({ imageId }: LoadImageProps) {
  const { data, isLoading } = useQuery(["diaryImage", imageId], async () => {
    return await apiService.getImageUrl(imageId);
  });

  if (isLoading) {
    return null;
  }

  return (
    <Image
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
      source={{ uri: data?.url }}
    />
  );
}

interface DiaryItemProps {
  diary: Diary;
}

export function DiaryItem({ diary }: DiaryItemProps) {
  const { date, dogName, title, content, imageIds } = diary;

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

        <KebabMenuButton style={styles.menu} />

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

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
