// react
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import type { ViewStyle, ImageStyle, TextStyle } from "react-native";

const createStyle = (style: ViewStyle | ImageStyle | TextStyle) => {
  return StyleSheet.create({ _style: style })._style;
};

export const useDynamicStyle = (
  dynamicStyle: () => ViewStyle | ImageStyle | TextStyle,
  deps?: React.DependencyList
) => {
  const [style, setStyle] = useState(createStyle(dynamicStyle()));

  useEffect(() => {
    setStyle(createStyle(dynamicStyle()));
  }, deps);

  return style;
};
