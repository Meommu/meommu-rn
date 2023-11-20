// react
import { useEffect, useState } from "react";
import { Image, ImageStyle } from "react-native";
import type { ImageProps } from "react-native";

// hooks
import { useDynamicStyle } from "@/hooks";

interface OriginRatioImageProps extends ImageProps {
  imageUriForCalculateRatio: string;
  expansion?: "width" | "height";
}

export function OriginRatioImage({
  imageUriForCalculateRatio,
  expansion,
  style,
  ...props
}: OriginRatioImageProps) {
  const [imageRatio, setImageRatio] = useState<string | null>(null);

  useEffect(() => {
    Image.getSize(imageUriForCalculateRatio, (width, height) => {
      switch (expansion) {
        case "width":
          setImageRatio(`1/${height / width}`);
          break;

        case "height":
          setImageRatio(`${width / height}/1`);
          break;

        default:
          setImageRatio(`${width}/${height}`);
          break;
      }
    });
  }, []);

  const imageRatioStyle = useDynamicStyle<ImageStyle>(() => {
    if (!imageRatio) {
      return {};
    }

    switch (expansion) {
      case "width":
        return {
          width: "100%",
          aspectRatio: imageRatio,
        };

      case "height":
        return {
          height: "100%",
          aspectRatio: imageRatio,
        };

      default:
        return {
          aspectRatio: imageRatio,
        };
    }
  }, [imageRatio]);

  if (!imageRatio) {
    return;
  }

  return (
    <Image
      {...props}
      style={[style, imageRatioStyle]}
    />
  );
}
