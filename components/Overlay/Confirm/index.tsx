// react
import { useCallback } from "react";
import { View, Text, Pressable } from "react-native";

// redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { changeVisible, type ConfirmState } from "@/store/modules/confirm";

// components
import { AView } from "@/components/Layout/AView";

// hooks
import { ZoomAndFadeInOut } from "@/hooks";

// styles
import { styles } from "./index.styles";

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
    dispatch(changeVisible(false));

    callback();
  }, [callback]);

  const handleCancelButtonClick = useCallback(() => {
    dispatch(changeVisible(false));
  }, []);

  return (
    <View
      style={[
        styles.container,
        { pointerEvents: isConfirmOpen ? "auto" : "none" },
      ]}
    >
      <AView isMount={isConfirmOpen} duration={300} style={styles.dimmed} />

      <AView
        isMount={isConfirmOpen}
        duration={300}
        style={styles.content}
        enterExitAnimation={ZoomAndFadeInOut}
      >
        <View style={styles.message}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.bodyText}>{body}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Pressable
            style={styles.okButton}
            onPress={handleOkButtonClick}
            testID="button-confirm-ok"
          >
            <Text style={styles.okButtonText}>{okMessage}</Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={handleCancelButtonClick}
          >
            <Text style={styles.cancelButtonText}>{cancelMessage}</Text>
          </Pressable>
        </View>
      </AView>
    </View>
  );
}
