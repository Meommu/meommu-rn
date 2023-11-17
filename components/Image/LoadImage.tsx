// react
import { View, Image } from "react-native";
import type { ViewProps } from "react-native";
import { useQuery } from "react-query";
import { useState } from "react";

// apis
import { apiService } from "@/apis";
import axios from "axios";

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

  base64?: boolean;
}

export function LoadImage({
  imageId,
  style,
  originRatio = false,
  base64 = false,
}: LoadImageProps) {
  const { data } = useQuery(["diaryImage", imageId], async () => {
    const { url } = await apiService.getImageUrl(imageId);

    if (base64) {
      try {
        const { data } = await axios.get<string>("/api/v1/proxy", {
          params: { url },
          responseType: "arraybuffer",
        });

        const b64Image = Buffer.from(data, "binary").toString("base64");

        /**
         * TODO: 이미지 타입을 항상 jpeg로 설정하면 안될 것 같다.
         */
        return `data:image/jpeg;base64,${b64Image}`;
      } catch (e) {
        console.log("[error]", e);
      }
    }

    return url;
  });

  const [imageRatio, setImageRatio] = useState("1/1");

  const aspectRatioStyle = useDynamicStyle(() => {
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
