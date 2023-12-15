// react
import { useCallback } from "react";
import { View, Text, Pressable } from "react-native";

// expo
import { router } from "expo-router";

// components
import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { ImageSlider } from "@/components/Widget/ImageSlider";
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// styles
import { styles } from "./index.styles";

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

      <InteractionPressable
        containerStyle={styles.diaryBody}
        onPress={handleDiaryBodyClick}
      >
        <Text
          style={styles.diaryBodyTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          style={styles.diaryBodyContent}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {content}
        </Text>
        <Text style={styles.diaryBodyInfo}>
          {date.replaceAll("-", ".")} {dogName} 일기
        </Text>
      </InteractionPressable>
    </View>
  );
}
