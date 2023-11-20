// react
import { View, Text } from "react-native";
import Swiper from "react-native-web-swiper";

// components
import { LoadImage } from "@/components/Widget/LoadImage";

// hooks
import { useSwiper } from "@/hooks";

// styles
import { styles } from "./index.styles";

interface ImageSliderProps {
  imageIds: number[];
  aspectRatio?: "1/1" | "3/4";
  borderRadius?: number;
}

export function ImageSlider({
  imageIds,
  aspectRatio = "1/1",
  borderRadius = 3,
}: ImageSliderProps) {
  const { swiperRef, swiperIndex, handleSwiperIndexChange } = useSwiper(0);

  return (
    <View style={[styles.container, { aspectRatio, borderRadius }]}>
      <Swiper
        ref={swiperRef}
        onIndexChanged={handleSwiperIndexChange}
        controlsEnabled={false}
      >
        {imageIds.map((imageId) => (
          <LoadImage imageId={imageId} key={`imageId${imageId}`} />
        ))}
      </Swiper>

      {/**
       * 스타일을 전개 연산자로 풀어 인라인 스타일로 적용한 이유
       *
       * : html2canvas 에서 동적으로 생성된 스타일을 찾을 수 없어 올바르게 내보내기 되지 않는 이슈를 해결하기 위함.
       *
       * (+) 이미지 슬라이더는 공유 일기 페이지에서도 사용 됨
       */}
      <View style={{ ...styles.order }}>
        <Text style={{ ...styles.orderText }}>
          {swiperIndex + 1}/{imageIds.length}
        </Text>
      </View>
    </View>
  );
}
