// react
import { View, Image } from "react-native";
import { useQuery } from "react-query";
import type { ViewProps } from "react-native";

// apis
import { apiService } from "@/apis";

interface LoadImageProps extends ViewProps {
  imageId: number;
}

export function LoadImage({ imageId, style }: LoadImageProps) {
  const { data } = useQuery(["diaryImage", imageId], async () => {
    const { url } = await apiService.getImageUrl(imageId);

    return url;
  });

  if (!data) {
    return null;
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
