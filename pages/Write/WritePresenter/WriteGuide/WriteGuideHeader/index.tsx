// react
import { View, Text } from "react-native";

// style
import { styles } from "./index.styles";

interface WriteGuideHeaderProps {
  swiperIndex: number;

  guideElements: GuideElement[] | undefined;
}

export function WriteGuideHeader({
  swiperIndex,
  guideElements,
}: WriteGuideHeaderProps) {
  const headerTitle = !guideElements
    ? "멈무일기 가이드"
    : swiperIndex === 0
    ? "멈무일기 가이드"
    : swiperIndex === guideElements.length - 1
    ? "다른 일상"
    : guideElements[0].items[Math.floor((swiperIndex - 1) / 2)].sentence;

  const headerSubTitle = !guideElements
    ? "오늘 강아지에게 어떤 일상이 있었나요?"
    : swiperIndex === 0
    ? "오늘 강아지에게 어떤 일상이 있었나요?"
    : swiperIndex === guideElements.length - 1
    ? "이외의 다른 일상이 있다면 얘기해주세요"
    : guideElements[0].items[Math.floor((swiperIndex - 1) / 2)].description;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headerTitle}</Text>
      <Text style={styles.subTitle}>{headerSubTitle}</Text>
    </View>
  );
}
