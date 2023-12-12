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
import { ZoomAndFadeInOut, useToast } from "@/hooks";

// styles
import { styles } from "./index.styles";
import { color, font } from "@/constants";

export function Confirm() {
  const { fireToast } = useToast();

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
        fireToast("확인 문자열이 일치하지 않습니다.", 3000);
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
        <View style={styles.message}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.bodyText}>{body}</Text>
        </View>

        <View style={{ width: "100%", gap: 12, flexDirection: "column" }}>
          {lock && (
            <TextInput
              style={{
                width: "100%",

                backgroundColor: color.bg400,

                borderRadius: 6,

                padding: 14,

                color: color.bg200,
                fontSize: 16,
                fontFamily: font.PretendardSemiBold,
              }}
              onChangeText={setInputValue}
              value={inputValue}
              placeholder={lock}
              placeholderTextColor={color.bg200}
            />
          )}

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
        </View>
      </AView>
    </View>
  );
}
