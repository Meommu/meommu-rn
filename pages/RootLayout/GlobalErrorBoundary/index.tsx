// react
import React, { useCallback } from "react";
import { View, Text, Image } from "react-native";
import { ErrorBoundary } from "react-error-boundary";

// expo
import { router } from "expo-router";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Footer } from "@/components/Layout/Footer";

// constants
import { PATH } from "@/constants";

// styles
import { styles } from "./index.styles";

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallBack />}>
      {children}
    </ErrorBoundary>
  );
}

function ErrorBoundaryFallBack() {
  const handleGoHomeButtonClick = useCallback(() => {
    router.replace(PATH.ROOT);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.guideLayout}>
          <Text style={styles.guideTitleText}>ERROR</Text>
          <Text style={styles.guideContentText}>
            예상치 못한 에러가 발생했습니다.
          </Text>
        </View>

        <Image source={require("@/assets/images/404/not-found.png")} />
      </View>

      <Footer>
        <NavigationButton onPress={handleGoHomeButtonClick} content="홈으로" />
      </Footer>
    </View>
  );
}
