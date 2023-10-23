import { Stack } from "expo-router";
import { View, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

export default function AppLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
    overflow: "hidden",
  },
});
