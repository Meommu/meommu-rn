import { ProfilePage } from "@/pages/Setting/Profile";
import { Suspense } from "react";
import { View, Text } from "react-native";

export default function Profile() {
  return (
    <Suspense
      fallback={
        /**
         * TODO: 스켈레톤 UI 구현하여 적용
         */
        <View>
          <Text>로딩중...</Text>
        </View>
      }
    >
      <ProfilePage />;
    </Suspense>
  );
}
