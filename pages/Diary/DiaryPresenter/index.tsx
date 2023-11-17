// react
import { View, Text } from "react-native";

// expo
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "@/components/Button/GoBackButton";

import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { ImageSlider } from "@/components/Widget/ImageSlider";

import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";
import { NavigationButton } from "@/components/Button/NavigationButton";
import React from "react";

interface DiaryPresenterProps {
  diary: Diary;
  isShared?: boolean;
  imageRef?: React.MutableRefObject<View | null>;
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
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      {!isShared && (
        <Header
          style={{ padding: 12 }}
          left={<GoBackButton onPress={handleGoBackButtonClick} />}
          right={
            <KebabMenuButton onPress={handleEditButtonClick} fill="black" />
          }
        />
      )}

      <NonIndicatorScrollView>
        <View style={{ backgroundColor: "white" }} ref={imageRef}>
          {isShared && (
            <Header
              style={{ padding: 12, height: 64 }}
              title={
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: "yeonTheLand",
                  }}
                >
                  meommu
                </Text>
              }
            />
          )}

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
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <NavigationButton
            onPress={handleShareButtonClick}
            content={isShared ? "저장하기" : "보내기"}
          />
        </View>
      </NonIndicatorScrollView>
    </View>
  );
}
