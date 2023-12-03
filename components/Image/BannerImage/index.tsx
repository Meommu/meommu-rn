// react
import { View, Image, type ImageProps } from "react-native";

// styles
import { styles } from "./index.styles";

export function BannerImage(props: ImageProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.bannerImageWrapper]}>
        <Image style={styles.bannerImage} {...props} />
      </View>
    </View>
  );
}
