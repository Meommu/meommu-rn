// react
import { useCallback, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";

// redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { changeVisible, type ConfirmState } from "@/store/modules/confirm";

// components
import { AView } from "@/components/Layout/AView";

// hooks
import { ZoomAndFadeInOut } from "@/hooks";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

export function Confirm() {
  const dispatch = useDispatch();

  const {
    isConfirmOpen,

    title,
    body,
    button: {
      ok: { lock, message: okMessage, callback },
      cancel: { message: cancelMessage },
    },
  } = useSelector<RootState, ConfirmState>((state) => state.confirm);

  const [inputValue, setInputValue] = useState("");

  const handleOkButtonClick = useCallback(() => {
    if (lock) {
      if (lock === inputValue) {
        callback();

        dispatch(changeVisible(false));
      } else {
        // do nothing
      }
    } else {
      callback();

      dispatch(changeVisible(false));
    }
  }, [callback, lock, inputValue]);

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
        <Text style={styles.titleText}>{title}</Text>

        <Text style={styles.bodyText}>{body}</Text>

        {lock && (
          <View style={styles.confirmInputWrapper}>
            <TextInput
              style={styles.confirmInput}
              onChangeText={setInputValue}
              value={inputValue}
              placeholder={lock}
              placeholderTextColor={color.bg200}
            />
          </View>
        )}

        <View style={styles.buttonWrapper}>
          <Pressable
            style={[
              styles.okButton,
              {
                /**
                 * 배경색이 어두우므로 투명도를 조절하면 버튼을 어둡게 할 수 있음.
                 */
                opacity: !lock ? 1 : lock !== inputValue ? 0.5 : 1,
              },
            ]}
            onPress={handleOkButtonClick}
            testID="button-confirm-ok"
            disabled={lock ? lock !== inputValue : false}
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
