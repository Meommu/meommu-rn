// react
import { View, Text, StyleSheet } from "react-native";

// expo
import { router } from "expo-router";

// components
import { NavigationButton } from "@/components/NavigationButton";
import { BannerImage } from "@/components/BannerImage";

// constants
import { VIEW_NAME } from "@/constants";

export default function Home() {
  const signInButtonClickHandler = () => {
    router.push(VIEW_NAME.SIGN_IN);
  };

  const signUpButtonClickHandler = () => {
    router.push(VIEW_NAME.SIGN_UP);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>meommu</Text>
          <Text style={styles.subTitleText}>
            계획하고 기록해요,{"\n"}우리 강아지 다이어리 꾸미기
          </Text>
        </View>

        <BannerImage source={require("../../assets/images/home/home.png")} />
      </View>

      <View style={styles.navigationButtonView}>
        <NavigationButton content="로그인" onPress={signInButtonClickHandler} />
        <NavigationButton
          content="이메일 아이디로 회원가입하기"
          backgroundColor="#B7B7CB"
          onPress={signUpButtonClickHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  contentView: {
    flex: 1,
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  titleView: {
    position: "absolute",
    top: 45,
    gap: 5,
    zIndex: 1,
    width: "100%",
  },

  titleText: {
    fontSize: 60,
    textAlign: "center",
    fontFamily: "yeonTheLand",
  },

  subTitleText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
  },

  navigationButtonView: {
    gap: 9,
    padding: 20,
  },
});
