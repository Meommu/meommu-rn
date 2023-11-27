// react
import { View, Text, Image } from "react-native";

export function NotFound() {
  return (
    <View>
      <Image source={require("@/assets/images/404/not-found.png")} />
      <Text>Not Found</Text>
    </View>
  );
}
