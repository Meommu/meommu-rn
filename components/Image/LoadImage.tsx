// react
import { Image } from "react-native";
import { useQuery } from "react-query";

// apis
import { apiService } from "@/apis";

interface LoadImageProps {
  imageId: number;
}

export function LoadImage({ imageId }: LoadImageProps) {
  const { data, isLoading } = useQuery(["diaryImage", imageId], async () => {
    return await apiService.getImageUrl(imageId);
  });

  if (isLoading) {
    return null;
  }

  return (
    <Image
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
      source={{ uri: data?.url }}
    />
  );
}
