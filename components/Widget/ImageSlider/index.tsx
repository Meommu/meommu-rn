// react
import { View, Text } from "react-native";
import Swiper from "react-native-web-swiper";

// components
import { LoadImage } from "@/components/Image/LoadImage";

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

      <View style={styles.order}>
        <Text style={styles.orderText}>
          {swiperIndex + 1}/{imageIds.length}
        </Text>
      </View>
    </View>
  );
}
