// react
import { View, Text, Pressable } from "react-native";
import type { MutableRefObject } from "react";

// components
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "@/components/Button/GoBackButton";
import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { ImageSlider } from "@/components/Widget/ImageSlider";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { OriginRatioImage } from "@/components/Image/OriginRatioImage";

// styles
import { styles } from "./index.styles";

// svgs
import XBig from "@/assets/svgs/x-big.svg";

interface DiaryPresenterProps {
  diary: Diary;
  handleGoBackButtonClick: () => void;
  handleEditButtonClick: () => void;
  handleShareButtonClick: () => void;

  isShared?: boolean;
  imageRef?: MutableRefObject<View | null>;
  captureImageB64?: string | null;
  handleCloseModalButtonClick?: () => void;
}

export function DiaryPresenter({
  diary,
  handleEditButtonClick,
  handleGoBackButtonClick,
  handleShareButtonClick,

  isShared = false,
  imageRef,
  captureImageB64 = null,
  handleCloseModalButtonClick,
}: DiaryPresenterProps) {
  return (
    <View style={[styles.container, { position: "relative" }]}>
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
        {/**
         * 스타일을 전개 연산자로 풀어 인라인 스타일로 적용한 이유
         *
         * : html2canvas 에서 동적으로 생성된 스타일을 찾을 수 없어 올바르게 내보내기 되지 않는 이슈를 해결하기 위함.
         */}
        <View style={{ ...styles.captureArea }} ref={imageRef}>
          {isShared && (
            <Header
              style={{ ...styles.header, height: 64 }}
              title={<Text style={{ ...styles.headerTitle }}>meommu</Text>}
            />
          )}

          <ImageSlider
            imageIds={diary.imageIds}
            aspectRatio="3/4"
            borderRadius={0}
          />

          <View style={{ ...styles.body }}>
            <Text style={{ ...styles.bodyTitle }}>{diary.title}</Text>
            <Text style={{ ...styles.bodyContent }}>{diary.content}</Text>
            <Text style={{ ...styles.bodyDate }}>
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

      {isShared && captureImageB64 !== null && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            padding: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            onPress={handleCloseModalButtonClick}
          />
          <OriginRatioImage
            source={{ uri: captureImageB64 }}
            imageUriForCalculateRatio={captureImageB64}
            expansion="height"
          />
          <Pressable
            style={{ position: "absolute", top: 15, right: 15 }}
            onPress={handleCloseModalButtonClick}
          >
            <XBig />
          </Pressable>
        </View>
      )}
    </View>
  );
}
