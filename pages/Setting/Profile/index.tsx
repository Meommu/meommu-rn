// react
import { Suspense, useCallback } from "react";
import { View, Text } from "react-native";

// expo
import { router } from "expo-router";

// components
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "@/components/Button/GoBackButton";
import { ProfileForm } from "./ProfileForm";
import { ProfileFormSkeleton } from "./ProfileForm/index.skeleton";

// constants
import { PATH } from "@/constants";

// styles
import { styles } from "./index.styles";

export function ProfilePage() {
  const handleGoBackButtonClick = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(PATH.SETTING);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerLayout}>
        <Header
          title="마이 프로필"
          left={<GoBackButton onPress={handleGoBackButtonClick} />}
        />
      </View>

      <View style={styles.profileImageLayout}>
        <View style={styles.profileImage}>
          <Text style={styles.profileImageText}>me</Text>
        </View>
      </View>

      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfileForm />
      </Suspense>
    </View>
  );
}
