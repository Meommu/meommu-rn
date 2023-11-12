// react
import { View, Text } from "react-native";

interface SwiperIndexForTest {
  swiperIndex: number;
}

export function SwiperIndexForTest({ swiperIndex }: SwiperIndexForTest) {
  return (
    <View style={{ display: "none" }}>
      <Text>{`swiperIndex ${swiperIndex}`}</Text>
    </View>
  );
}
