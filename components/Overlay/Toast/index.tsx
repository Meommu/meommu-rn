// react
import { View, Text } from "react-native";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { ToastState } from "@/store/modules/toast";

// components
import { AView } from "@/components/Layout/AView";

// styles
import { styles } from "./index.styles";

export function Toast() {
  const { isOpen, message } = useSelector<RootState, ToastState>(
    (state) => state.toast
  );

  return (
    <View style={styles.container}>
      <AView isMount={isOpen} duration={300} style={styles.contentLayout}>
        <View style={styles.contentBody}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </AView>
    </View>
  );
}
