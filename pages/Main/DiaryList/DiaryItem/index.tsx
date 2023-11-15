// react
import { View, Text } from "react-native";

// swiper
import Swiper from "react-native-web-swiper";

// components
import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { SView } from "@/components/Layout/SView";
import { LoadImage } from "@/components/Image/LoadImage";

// hooks
import { useSwiper } from "@/hooks";

// styles
import { styles } from "./index.styles";

interface DiaryItemProps {
  diary: Diary;
  handleKebabMenuButtonClick: (diaryId: number) => () => void;
}

export function DiaryItem({
  diary,
  handleKebabMenuButtonClick,
}: DiaryItemProps) {
  const { id, date, dogName, title, content, imageIds } = diary;

  const { swiperRef, swiperIndex, handleSwiperIndexChange } = useSwiper(0);

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
            {swiperIndex + 1}/{imageIds.length}
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
