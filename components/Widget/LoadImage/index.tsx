// react
import { View, Image, type ViewProps, type ImageStyle } from "react-native";
import { useQuery } from "react-query";

// apis
import { apiService } from "@/apis";

// components
import { OriginRatioImage } from "@/components/Image/OriginRatioImage";

// styles
import { styles } from "./index.styles";

interface LoadImageProps extends ViewProps {
  imageId: number;

  /**
   * ImageProps를 컴포넌트 인터페이스로 설정할 경우 source 값을 필수로 입력받게 되므로,
   * ViewProps를 사용하되 style만 ImageStyle 타입으로 전달받도록 함
   */
  style?: ImageStyle;

  /**
   * 화면의 너비는 꽉 채우되, 실제 이미지 비율을 유지하는 이미지 요소를 얻고 싶을 때 사용
   *
   * default: false
   */
  originRatio?: boolean;

  /**
   * originRatio가 true일 때, 가로 세로 중 어느 요소를 기준으로 이미지를 확장시킬지를 정하는 옵션
   *
   * default: undefined
   */
  expansion?: "width" | "height";
}

export function LoadImage({
  imageId,
  style,
  originRatio = false,
  expansion,
}: LoadImageProps) {
  const { data } = useQuery(["diaryImage", imageId], async () => {
    const { url } = await apiService.getImageUrl(imageId);

    return url;
  });

  if (!data) {
    return null;
  }

  if (originRatio) {
    return (
      <OriginRatioImage
        style={style}
        source={{ uri: data }}
        imageUriForCalculateRatio={data}
        expansion={expansion}
      />
    );
  }

  return (
    <View style={[style, styles.container]}>
      <Image resizeMode="cover" style={styles.image} source={{ uri: data }} />
    </View>
  );
}
