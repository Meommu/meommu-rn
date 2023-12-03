// react
import { useCallback } from "react";
import { View, Text, Image } from "react-native";

// expo
import { router } from "expo-router";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";

// constants
import { PATH } from "@/constants";

// styles
import { styles } from "./index.styles";

export function NotFound() {
  const handleGoHomeButtonClick = useCallback(() => {
    router.replace(PATH.ROOT);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.guideLayout}>
          <Text style={styles.guideTitleText}>404 ERROR</Text>
          <Text style={styles.guideContentText}>
            존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의{"\n"}주소가
            변경 및 삭제되어 찾을 수 없습니다.
          </Text>
        </View>

        <Image source={require("@/assets/images/404/not-found.png")} />
      </View>

      <View style={styles.bottomButtonLayout}>
        <NavigationButton content="홈으로" onPress={handleGoHomeButtonClick} />
      </View>
    </View>
  );
}
