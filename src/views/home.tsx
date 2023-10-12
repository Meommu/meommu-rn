import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { NavigationButton } from "../components/NavigationButton";

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>meom-mu</Text>
        <Text style={styles.subTitleText}>
          계획하고 기록해요,{"\n"}우리 강아지 다이어리 꾸미기
        </Text>
      </View>

      <View style={styles.bannerImageWrapper}>
        <Image
          source={require("../../assets/images/home/home.png")}
          style={styles.bannerImage}
        />
      </View>

      <View style={styles.navigationButtonView}>
        <NavigationButton content="로그인" />
        <NavigationButton
          content="이메일 아이디로 회원가입하기"
          backgroundColor="#B7B7CB"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  titleView: {
    gap: 5,
  },

  titleText: {
    fontSize: 60,
    textAlign: "center",
    marginTop: 45,
  },

  subTitleText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
  },

  bannerImageWrapper: {
    width: "100%",
    aspectRatio: "1/1",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
  },

  navigationButtonView: {
    gap: 9,
  },
});
