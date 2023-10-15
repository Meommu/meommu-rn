import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { NavigationButton } from "../components/NavigationButton";
import { useNavigation } from "@react-navigation/native";
import { VIEW_NAME } from "../constants";
import { size } from "../constants";

export function Home() {
  const navigation = useNavigation();

  const signInButtonClickHandler = () => {
    navigation.navigate(VIEW_NAME.SIGN_IN);
  };

  const signUpButtonClickHandler = () => {
    navigation.navigate(VIEW_NAME.SIGN_UP);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
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
    padding: 20,
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
    fontFamily: "Author-Medium",
  },

  subTitleText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
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

  navigationButtonView: {
    gap: 9,
  },
});
