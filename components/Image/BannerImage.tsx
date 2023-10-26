// react
import { View, Image, StyleSheet } from "react-native";
import type { ImageProps } from "react-native";

// constants
import { size } from "@/constants";

interface BannerImageProps extends ImageProps {
  extraMarginTop?: number;
}

export function BannerImage({
  extraMarginTop = 0,
  ...props
}: BannerImageProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bannerImageWrapper,
          { marginTop: size.NAVIGATION_BUTTON_HEIGHT + 20 + extraMarginTop },
        ]}
      >
        <Image style={styles.bannerImage} {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  bannerImageWrapper: {
    maxWidth: size.MOBILE_WIDTH,
    width: "100%",
    aspectRatio: "1/1",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
  },
});
