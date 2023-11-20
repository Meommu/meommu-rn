// react
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import type { ViewStyle, ImageStyle, TextStyle } from "react-native";

const createStyle = <T extends ViewStyle | ImageStyle | TextStyle>(
  style: T
) => {
  return StyleSheet.create({ _style: style })._style;
};

export const useDynamicStyle = <T extends ViewStyle | ImageStyle | TextStyle>(
  dynamicStyle: () => T,
  deps?: React.DependencyList
) => {
  const [style, setStyle] = useState<T>(createStyle(dynamicStyle()));

  useEffect(() => {
    setStyle(createStyle(dynamicStyle()));
  }, deps);

  return style;
};
