// react
import React, { useCallback } from "react";
import { View, Text, Image } from "react-native";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Footer } from "@/components/Layout/Footer";

// styles
import { styles } from "./index.styles";

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallBack}>
      {children}
    </ErrorBoundary>
  );
}

function ErrorBoundaryFallBack(props: FallbackProps) {
  const handleGoHomeButtonClick = useCallback(() => {
    props.resetErrorBoundary();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.guideLayout}>
          <Text style={styles.guideTitleText}>WOOPS!</Text>
          <Text style={styles.guideContentText}>
            죄송합니다. 일시적인 오류가 발생했습니다.{"\n"}잠시 후에 다시 시도해
            주세요.
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
