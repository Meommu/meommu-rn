// react
import { View, Text, StyleSheet } from "react-native";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { ToastState } from "@/store/modules/toast";

export function Toast() {
  const { isOpen, message } = useSelector<RootState, ToastState>(
    (state) => state.toast
  );

  return (
    <View style={[styles.container, { display: isOpen ? "flex" : "none" }]}>
      <View style={styles.dimmed}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",

    pointerEvents: "none",
  },

  dimmed: {
    opacity: 0.9,
    backgroundColor: "#626262",
    borderRadius: 100,
  },

  message: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
});
