// react
import { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import Animated from "react-native-reanimated";

// expo
import { router } from "expo-router";

// components
import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { ImageSlider } from "@/components/Widget/ImageSlider";

// hooks
import { usePressInOutAnimation } from "@/hooks";

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

  const {
    containerAnimatedStyle,
    Dimmed,
    handleButtonPressIn,
    handleButtonPressOut,
  } = usePressInOutAnimation();

  return (
    <View style={styles.container}>
      <View style={styles.imageSliderWrapper}>
        <ImageSlider imageIds={imageIds} aspectRatio="1/1" />

        <View style={styles.menu}>
          <KebabMenuButton onPress={handleKebabMenuButtonClick} />
        </View>
      </View>

      <Animated.View style={[styles.diaryBodyWrapper, containerAnimatedStyle]}>
        <Pressable
          style={styles.diaryBody}
          onPress={handleDiaryBodyClick}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onTouchStart={handleButtonPressIn}
          onTouchEnd={handleButtonPressOut}
          onTouchMove={handleButtonPressIn}
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
        </Pressable>

        {Dimmed}
      </Animated.View>
    </View>
  );
}
