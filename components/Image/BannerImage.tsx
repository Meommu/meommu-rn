// react
import { View, Image, StyleSheet } from "react-native";
import type { ImageProps } from "react-native";

// constants
import { size } from "@/constants";

export function BannerImage({ ...props }: ImageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bannerImageWrapper}>
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
    maxWidth: 400,
    width: "100%",
    aspectRatio: "1/1",
    marginTop: size.NAVIGATION_BUTTON_HEIGHT + 20,
  },

  bannerImage: {
    width: "100%",
    height: "100%",
  },
});
