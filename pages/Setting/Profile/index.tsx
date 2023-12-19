// react
import { Suspense, useCallback } from "react";
import { View, Text } from "react-native";

// components
import { Header } from "@/components/Layout/Header";
import { CaretLeftButton } from "@/components/Button/CaretLeftButton";
import { ProfileForm } from "./ProfileForm";
import { ProfileFormSkeleton } from "./ProfileForm/index.skeleton";

// hooks
import { useExpoRouter } from "@/hooks";

// styles
import { styles } from "./index.styles";

export function ProfilePage() {
  const { router } = useExpoRouter("profile");

  const handleGoBackButtonClick = useCallback(() => {
    router.goBack();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerLayout}>
        <Header
          title="마이 프로필"
          left={<CaretLeftButton onPress={handleGoBackButtonClick} />}
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
