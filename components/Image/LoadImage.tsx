// react
import { View, Image } from "react-native";
import type { ViewProps } from "react-native";
import { useQuery } from "react-query";
import { useState } from "react";

// apis
import { apiService } from "@/apis";

// hooks
import { useDyanmicStyle } from "@/hooks";

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

  const aspectRatioStyle = useDyanmicStyle(() => {
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
        /**
         * TODO: ImageView 스타일이 아닐 수 있기 때문에 타입검사에서 오류가 발생하는 문제 해결할 것.
         */
        // @ts-ignore
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
