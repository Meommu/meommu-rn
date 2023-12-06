// react
import { View, Text } from "react-native";
import { useFormContext } from "react-hook-form";

// components
import { BannerImage } from "@/components/Image/BannerImage";

// styles
import { styles } from "./index.styles";

export function SignUpFormStepThree() {
  const { watch } = useFormContext<SignUpFormFieldValues>();

  const kindergartenName = watch("kindergartenName");

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>
          {`${kindergartenName}님,`}
          {"\n"}
          멈무유치원에 오신걸 환영합니다!
        </Text>
        <Text style={styles.greetingSubTitle}>
          반려동물과의 건강한 추억을 기록해드리겠습니다.
        </Text>
      </View>

      <BannerImage source={require("@/assets/images/signup/signup-end.png")} />
    </View>
  );
}
