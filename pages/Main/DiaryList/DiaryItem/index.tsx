// react
import { View, Text, Pressable } from "react-native";

// components
import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { ImageSlider } from "@/components/Widget/ImageSlider";

// styles
import { styles } from "./index.styles";
import { router } from "expo-router";
import { useCallback } from "react";

interface DiaryItemProps {
  diary: Diary;
  handleKebabMenuButtonClick: () => void;
}

export function DiaryItem({
  diary,
  handleKebabMenuButtonClick,
}: DiaryItemProps) {
  const { id, date, dogName, title, content, imageIds } = diary;

  const handleDiaryBodyClick = useCallback(() => {
    router.push(`diary/${id}`);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageSliderWrapper}>
        <ImageSlider imageIds={imageIds} aspectRatio="1/1" />

        <View style={styles.menu}>
          <KebabMenuButton onPress={handleKebabMenuButtonClick} />
        </View>
      </View>

      <Pressable style={styles.diaryBody} onPress={handleDiaryBodyClick}>
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
      </Pressable>
    </View>
  );
}
