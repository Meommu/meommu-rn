// react
import { View, Text, Image } from "react-native";

// styles
import { styles } from "./index.styles";

export function DiaryListPlaceholder() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.placeholderImage}
        source={require("@/assets/images/main/placeholder.png")}
      />
      <Text style={styles.placeholderText}>
        안녕하세요! 멈무에요{"\n"}일기를 등록해주세요
      </Text>
    </View>
  );
}
