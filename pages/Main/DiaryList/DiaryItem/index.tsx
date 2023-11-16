// react
import { View, Text } from "react-native";

// components
import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { ImageSlider } from "@/components/Widget/ImageSlider";

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
  const { date, dogName, title, content, imageIds } = diary;

  return (
    <View style={styles.container}>
      <View style={styles.imageSliderWrapper}>
        <ImageSlider imageIds={imageIds} aspectRatio="1/1" />

        <KebabMenuButton
          style={styles.menu}
          onPress={handleKebabMenuButtonClick}
        />
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
