import { useFormContext } from "react-hook-form";
import type { SignUpFormFieldValues } from "../signUp";
import { View, StyleSheet, Text, Image } from "react-native";
import { size } from "../../constants";

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

      <View style={styles.bannerImageWrapper}>
        <Image
          style={styles.bannerImage}
          source={require("../../../assets/images/signup/signup-end.png")}
        />
      </View>
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

  bannerImageWrapper: {
    width: "100%",
    aspectRatio: "1/1",
    marginTop: size.NAVIGATION_BUTTON_HEIGHT + 20,
  },

  bannerImage: {
    width: "100%",
    height: "100%",
  },
});
