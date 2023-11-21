// react
import React from "react";
import { View, Text } from "react-native";
import { ErrorBoundary } from "react-error-boundary";

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
  return (
    <View>
      <Text>오류 발생</Text>
    </View>
  );
}
