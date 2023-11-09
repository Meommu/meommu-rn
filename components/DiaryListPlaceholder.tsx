// react
import { View, Text, Image, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  placeholderImage: {
    width: 160,
    height: 160,
  },

  placeholderText: {
    fontFamily: "yeonTheLand",
    fontSize: 20,
    color: "#89899C",
  },
});
