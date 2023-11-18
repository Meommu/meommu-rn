// react
import { View, Text } from "react-native";
import type { MutableRefObject } from "react";

// components
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "@/components/Button/GoBackButton";
import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { ImageSlider } from "@/components/Widget/ImageSlider";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";
import { NavigationButton } from "@/components/Button/NavigationButton";

// styles
import { styles } from "./index.styles";

interface DiaryPresenterProps {
  diary: Diary;
  isShared?: boolean;
  imageRef?: MutableRefObject<View | null>;
  handleGoBackButtonClick: () => void;
  handleEditButtonClick: () => void;
  handleShareButtonClick: () => void;
}

export function DiaryPresenter({
  diary,
  imageRef,
  isShared = false,
  handleEditButtonClick,
  handleGoBackButtonClick,
  handleShareButtonClick,
}: DiaryPresenterProps) {
  return (
    <View style={styles.container}>
      {!isShared && (
        <Header
          style={styles.header}
          left={<GoBackButton onPress={handleGoBackButtonClick} />}
          right={
            <KebabMenuButton onPress={handleEditButtonClick} fill="black" />
          }
        />
      )}

      <NonIndicatorScrollView>
        <View style={styles.captureArea} ref={imageRef}>
          {isShared && (
            <Header
              style={[styles.header, { height: 64 }]}
              title={<Text style={styles.headerTitle}>meommu</Text>}
            />
          )}

          <ImageSlider
            imageIds={diary.imageIds}
            aspectRatio="3/4"
            borderRadius={0}
          />

          <View style={styles.body}>
            <Text style={styles.bodyTitle}>{diary.title}</Text>
            <Text style={styles.bodyContent}>{diary.content}</Text>
            <Text style={styles.bodyDate}>
              {diary.date.replaceAll("-", ".")} {diary.dogName} 일기
            </Text>
          </View>
        </View>

        <View style={styles.bottomButtonWrapper}>
          <NavigationButton
            onPress={handleShareButtonClick}
            content={isShared ? "저장하기" : "보내기"}
          />
        </View>
      </NonIndicatorScrollView>
    </View>
  );
}
