// react
import { useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

// redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { changeVisible, type ConfirmState } from "@/store/modules/confirm";

// constants
import { color, size } from "@/constants";

export function Confirm() {
  const {
    isConfirmOpen,
    title,
    body,
    button: {
      ok: { message: okMessage, callback },
      cancel: { message: cancelMessage },
    },
  } = useSelector<RootState, ConfirmState>((state) => state.confirm);

  const dispatch = useDispatch();

  const handleOkButtonClick = useCallback(() => {
    callback();

    dispatch(changeVisible(false));
  }, [callback]);

  const handleCancelButtonClick = useCallback(() => {
    dispatch(changeVisible(false));
  }, []);

  if (!isConfirmOpen) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.dimmed} />

      <View style={styles.content}>
        <View style={styles.message}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.bodyText}>{body}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Pressable style={styles.okButton} onPress={handleOkButtonClick}>
            <Text style={styles.okButtonText}>{okMessage}</Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={handleCancelButtonClick}
          >
            <Text style={styles.cancelButtonText}>{cancelMessage}</Text>
          </Pressable>
        </View>
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
  },

  dimmed: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  content: {
    width: "80%",
    borderRadius: 20,
    backgroundColor: "#1B1E26",
    padding: 16,
    gap: 24,
  },

  message: {
    gap: 12,
  },

  titleText: {
    fontSize: 20,
    fontFamily: "Pretendard-SemiBold",
    color: color.w,
    textAlign: "center",
  },

  bodyText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    color: "#ABABAB",
    textAlign: "center",
  },

  buttonWrapper: {
    flexDirection: "row",
    gap: 12,
  },

  okButton: {
    width: "60%",
    flexShrink: 1,
    height: size.NAVIGATION_BUTTON_HEIGHT,
    borderRadius: 6,
    backgroundColor: "#CCCCD9",
    alignItems: "center",
    justifyContent: "center",
  },

  okButtonText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    color: "#565667",
  },

  cancelButton: {
    width: "40%",
    flexShrink: 1,
    height: size.NAVIGATION_BUTTON_HEIGHT,
    borderRadius: 6,
    backgroundColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    color: color.w,
  },
});
