// react
import { View, Image } from "react-native";
import type { ImageStyle, ViewProps } from "react-native";
import { useQuery } from "react-query";
import { useState } from "react";

// apis
import { apiService } from "@/apis";

// hooks
import { useDynamicStyle } from "@/hooks";

global.Buffer = global.Buffer || require("buffer").Buffer;

interface LoadImageProps extends ViewProps {
  imageId: number;
  original?: boolean;
  /**
   * 화면의 너비는 꽉 채우되, 실제 이미지 비율을 유지하는 이미지 요소를 얻고 싶을 때 사용
   *
   * default: false
   */
  originRatio?: boolean;
}

export function LoadImage({
  imageId,
  style,
  originRatio = false,
}: LoadImageProps) {
  const { data } = useQuery(["diaryImage", imageId], async () => {
    const { url } = await apiService.getImageUrl(imageId);

    return url;
  });

  const [imageRatio, setImageRatio] = useState("1/1");

  const aspectRatioStyle = useDynamicStyle<ImageStyle>(() => {
    return {
      width: "100%",
      aspectRatio: imageRatio,
    };
  }, [imageRatio]);

  if (!data) {
    return null;
  }

  if (originRatio) {
    return (
      <Image
        style={aspectRatioStyle}
        source={{ uri: data }}
        onLoad={() => {
          Image.getSize(data, (width, height) => {
            setImageRatio(`1/${height / width}`);
          });
        }}
      />
    );
  }

  return (
    <View style={[style, { width: "100%", height: "100%" }]}>
      <Image
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        source={{ uri: data }}
      />
    </View>
  );
}
