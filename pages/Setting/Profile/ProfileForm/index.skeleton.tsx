// react
import { View } from "react-native";

// components
import { SView } from "@/components/Layout/SView";
import { SignUpFormStepTwoSkeleton } from "@/pages/SignUp/SignUpForm/SignUpFormStepTwo/index.skeleton";

// constants
import { size } from "@/constants";

// styles
import { styles } from "./index.styles";

export function ProfileFormSkeleton() {
  return (
    <>
      <SignUpFormStepTwoSkeleton showGuideText={false} />

      <View style={styles.bottomButtonLayout}>
        <SView
          style={{ width: "100%", height: size.NAVIGATION_BUTTON_HEIGHT }}
        />
      </View>
    </>
  );
}
