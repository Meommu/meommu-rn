// react
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import { router } from "expo-router";

// constants
import { VIEW_NAME } from "@/constants";

export default function Setting() {
  const handleLogoutButtonClick = () => {
    AsyncStorage.removeItem("accessToken");

    router.replace(VIEW_NAME.HOME);
  };

  return (
    <View>
      <Text>세팅 화면</Text>

      <Button onPress={handleLogoutButtonClick} title="로그아웃" />
    </View>
  );
}
