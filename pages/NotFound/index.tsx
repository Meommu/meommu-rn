// react
import { View, Text, Image } from "react-native";

// constants
import { PATH, color } from "@/constants";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { router } from "expo-router";

export function NotFound() {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: color.w,
      }}
    >
      <View
        style={{
          marginTop: 92,
          gap: 81,
          alignItems: "center",
        }}
      >
        <View style={{ gap: 12 }}>
          <Text
            style={{
              color: color.g900,
              fontSize: 60,
              fontFamily: "yeonTheLand",
            }}
          >
            404 ERROR
          </Text>
          <Text
            style={{
              color: color.g400,
              fontSize: 14,
              fontFamily: "Pretendard-SemiBold",
              textAlign: "center",
            }}
          >
            존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의{"\n"}주소가
            변경 및 삭제되어 찾을 수 없습니다.
          </Text>
        </View>

        <Image source={require("@/assets/images/404/not-found.png")} />
      </View>

      <View style={{ width: "100%", padding: 20 }}>
        <NavigationButton
          content="홈으로"
          onPress={() => {
            router.replace(PATH.HOME);
          }}
        />
      </View>
    </View>
  );
}
