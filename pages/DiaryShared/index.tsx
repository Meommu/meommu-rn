// react
import { View, Text, Pressable, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useRef, useCallback, Suspense } from "react";
import { useQuery } from "react-query";

// components
import { Header } from "@/components/Layout/Header";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";
import { ImageSlider } from "@/components/Widget/ImageSlider";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { OriginRatioImage } from "@/components/Image/OriginRatioImage";
import { DiarySharedSkeleton } from "./index.skeleton";

// apis
import { apiService, baseURL } from "@/apis";

// svgs
import XBig from "@/assets/svgs/x-big.svg";

// styles
import { styles } from "./index.styles";

function DiaryShared() {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();

  const imageRef = useRef<View | null>(null);

  const [captureImageB64, setCaptureImageB64] = useState<string | null>(null);

  const { data: diary } = useQuery(
    ["sharedDiaryDetail", uuid],
    async () => {
      const diary = await apiService.getSharedDiaryDetail(uuid || "");

      return diary;
    },
    {
      suspense: true,
    }
  );

  const handleShareButtonClick = useCallback(async () => {
    if (
      Platform.OS !== "web" ||
      !imageRef.current ||
      /**
       * proxy 서버가 필요한 이슈가 있어 개발 환경에서는 해당 기능을 차단
       */
      process.env.EXPO_PUBLIC_MODE === "dev"
    ) {
      return;
    }

    /**
     * View는 웹 환경에서 `div` 태그로 변환되므로 as를 이용하여 형변환 함.
     */
    const $divElement = imageRef.current as unknown as HTMLDivElement;

    /**
     * 웹 환경에서만 동작하는 라이브러리이므로, 동적으로 불러와 사용
     */
    const html2canvas = require("html2canvas");

    const canvas = await html2canvas($divElement, {
      proxy: `${baseURL}/api/v1/proxy`,
    });

    setCaptureImageB64(canvas.toDataURL());
  }, []);

  const handleCloseModalButtonClick = useCallback(() => {
    setCaptureImageB64(null);
  }, []);

  if (!diary) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NonIndicatorScrollView>
        {/**
         * 스타일을 전개 연산자로 풀어 인라인 스타일로 적용한 이유
         *
         * : html2canvas 에서 동적으로 생성된 스타일을 찾을 수 없어 올바르게 내보내기 되지 않는 이슈를 해결하기 위함.
         */}
        <View style={{ ...styles.captureArea }} ref={imageRef}>
          <Header
            style={{ ...styles.header, height: 64 }}
            title={<Text style={{ ...styles.headerTitle }}>meommu</Text>}
          />

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
            content="저장하기"
            onPress={handleShareButtonClick}
          />
        </View>
      </NonIndicatorScrollView>

      {captureImageB64 !== null && (
        <View style={styles.modal}>
          <Pressable
            style={styles.modalDimmed}
            onPress={handleCloseModalButtonClick}
          />
          <OriginRatioImage
            source={{ uri: captureImageB64 }}
            imageUriForCalculateRatio={captureImageB64}
            expansion="height"
          />
          <Pressable
            style={styles.modalClosebutton}
            onPress={handleCloseModalButtonClick}
          >
            <XBig />
          </Pressable>
        </View>
      )}
    </View>
  );
}

export function DiarySharedPage() {
  return (
    <Suspense fallback={<DiarySharedSkeleton />}>
      <DiaryShared />
    </Suspense>
  );
}
