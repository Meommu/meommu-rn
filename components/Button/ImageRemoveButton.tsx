// react
import { View } from "react-native";

import X from "@/assets/svgs/x.svg";

export function ImageRemoveButton() {
  return (
    <View
      style={{
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#BFC4CE",
        width: 20,
        height: 20,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <X />
    </View>
  );
}
