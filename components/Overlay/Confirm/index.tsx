// react
import { useCallback, useMemo, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";

// redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { changeVisible, type ConfirmState } from "@/store/modules/confirm";

// components
import { AView } from "@/components/Layout/AView";
import { ResponsiveKeyboardAvoidingView } from "@/components/Layout/ResponsiveKeyboardAvoidingView";
import { NavigationButton } from "@/components/Button/NavigationButton";

// hooks
import { ZoomAndFadeInOut, useDynamicStyle } from "@/hooks";

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

  const isOkButtonDisable = useMemo(() => {
    if (!lock) {
      return false;
    }

    return lock !== inputValue;
  }, [lock, inputValue]);

  /**
   * dynamic styles
   */
  const containerPointerEventStyle = useDynamicStyle(() => {
    if (isConfirmOpen) {
      return {
        pointerEvents: "auto",
      };
    }

    return {
      pointerEvents: "none",
    };
  }, [isConfirmOpen]);

  const okButtonOpacityStyle = useDynamicStyle(() => {
    if (!lock) {
      return {
        opacity: 1,
      };
    }

    if (lock !== inputValue) {
      // 배경색이 어두우므로 투명하게 하여 버튼을 어둡게 처리할 수 있음.
      return {
        opacity: 0.5,
      };
    }

    return {
      opacity: 1,
    };
  }, [lock, inputValue]);

  /**
   * event handlers
   */
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
    <View style={[styles.container, containerPointerEventStyle]}>
      <ResponsiveKeyboardAvoidingView>
        <View style={styles.content}>
          <AView isMount={isConfirmOpen} duration={300} style={styles.dimmed} />

          <AView
            isMount={isConfirmOpen}
            duration={300}
            style={styles.modal}
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
              <NavigationButton
                style={[{ width: "60%" }, [okButtonOpacityStyle]]}
                backgroundColor={color.g800}
                disableBackgroundColor={color.g800}
                fontColor={color.g300}
                content={okMessage}
                onPress={handleOkButtonClick}
                disabled={isOkButtonDisable}
                testID="button-confirm-ok"
              />

              <NavigationButton
                style={{ width: "40%" }}
                onPress={handleCancelButtonClick}
                content={cancelMessage}
              />
            </View>
          </AView>
        </View>
      </ResponsiveKeyboardAvoidingView>
    </View>
  );
}
