// react
import { View, Text } from "react-native";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { ToastState } from "@/store/modules/toast";

// components
import { AView } from "@/components/Layout/AView";
import { ResponsiveKeyboardAvoidingView } from "@/components/Layout/ResponsiveKeyboardAvoidingView";

// styles
import { styles } from "./index.styles";

export function Toast() {
  const { isToastOpen, message } = useSelector<RootState, ToastState>(
    (state) => state.toast
  );

  return (
    <View style={styles.container}>
      <ResponsiveKeyboardAvoidingView>
        <View style={styles.content}>
          <AView
            style={styles.modalLayout}
            isMount={isToastOpen}
            duration={300}
          >
            <View style={styles.modal}>
              <Text style={styles.modalMessage}>{message}</Text>
            </View>
          </AView>
        </View>
      </ResponsiveKeyboardAvoidingView>
    </View>
  );
}
