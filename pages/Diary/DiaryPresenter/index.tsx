// react
import { View, Text } from "react-native";

// expo
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "@/components/Button/GoBackButton";

import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { ImageSlider } from "@/components/Widget/ImageSlider";

import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";
import { NavigationButton } from "@/components/Button/NavigationButton";

interface DiaryPresenterProps {
  diary: Diary;
  handleGoBackButtonClick: () => void;
  handleEditButtonClick: () => void;
  handleShareButtonClick: () => void;
}

export function DiaryPresenter({
  diary,
  handleEditButtonClick,
  handleGoBackButtonClick,
  handleShareButtonClick,
}: DiaryPresenterProps) {
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <Header
        style={{ padding: 12 }}
        left={<GoBackButton onPress={handleGoBackButtonClick} />}
        right={<KebabMenuButton onPress={handleEditButtonClick} fill="black" />}
      />

      <NonIndicatorScrollView>
        <ImageSlider
          imageIds={diary.imageIds}
          aspectRatio="3/4"
          borderRadius={0}
        />

        <View style={{ paddingHorizontal: 20, paddingVertical: 33, gap: 16 }}>
          <Text
            style={{
              color: "#626154",
              fontSize: 26,
              fontFamily: "yeonTheLand",
            }}
          >
            {diary.title}
          </Text>

          <Text
            style={{
              color: "#626154",
              fontSize: 17,
              fontFamily: "yeonTheLand",
            }}
          >
            {diary.content}
          </Text>

          <Text
            style={{
              color: "#8F8F8F",
              fontSize: 14,

              fontFamily: "Pretendard-Regular",
            }}
          >
            {diary.date.replaceAll("-", ".")} {diary.dogName} 일기
          </Text>

          <NavigationButton onPress={handleShareButtonClick} content="보내기" />
        </View>
      </NonIndicatorScrollView>
    </View>
  );
}
