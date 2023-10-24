// react
import { useFormContext } from "react-hook-form";
import { View, StyleSheet, Text } from "react-native";

// components
import { BannerImage } from "@/components/BannerImage";

interface CompleteProps {}

export function Complete({}: CompleteProps) {
  const { watch } = useFormContext<SignUpFormFieldValues>();

  const kindergartenName = watch("kindergartenName");

  return (
    <View style={styles.container}>
      <View style={styles.GuideText}>
        <Text style={styles.GreetingText}>
          {`${kindergartenName}님,`}
          {"\n"}
          멈무유치원에 오신걸 환영합니다!
        </Text>
        <Text style={styles.IntroductionText}>
          반려동물과의 건강한 추억을 기록해드리겠습니다.
        </Text>
      </View>

      <BannerImage source={require("@/assets/images/signup/signup-end.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },

  GuideText: {
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,

    position: "absolute",
    top: 0,
    left: 0,
  },

  GreetingText: {
    fontSize: 25,
    fontFamily: "Pretendard-SemiBold",
  },

  IntroductionText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    color: "#B7B7CB",
  },
});
