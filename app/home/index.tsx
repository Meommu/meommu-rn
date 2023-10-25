// react
import { View, Text, StyleSheet, Pressable } from "react-native";

// expo
import { router } from "expo-router";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";
import { BannerImage } from "@/components/Image/BannerImage";

// constants
import { VIEW_NAME } from "@/constants";
import { FormInput } from "@/components/Input/FormInput";

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
            간단하게 기록해요,{"\n"}우리 강아지 다이어리 꾸미기
          </Text>
        </View>

        <BannerImage
          source={require("@/assets/images/home/home.png")}
          extraMarginTop={150}
        />
      </View>

      <View style={styles.signInFormView}>
        <FormInput placeholder="이메일 아이디" />
        <FormInput placeholder="비밀번호" />

        <View style={styles.navigationLayoutView}>
          <Pressable>
            <Text style={styles.navigationText}>아이디 찾기</Text>
          </Pressable>

          <View style={styles.splitBarView} />

          <Pressable>
            <Text style={styles.navigationText}>비밀번호 찾기</Text>
          </Pressable>

          <View style={styles.splitBarView} />

          <Pressable onPress={signUpButtonClickHandler}>
            <Text style={styles.navigationText}>회원가입</Text>
          </Pressable>
        </View>

        <NavigationButton content="로그인" onPress={signInButtonClickHandler} />
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

  navigationLayoutView: {
    flexDirection: "row",
    justifyContent: "center",
  },

  navigationText: {
    fontSize: 16,
    color: "#B7B7CB",
    fontFamily: "Pretendard-SemiBold",
  },

  splitBarView: {
    borderLeftColor: "#B7B7CB",
    borderLeftWidth: 2,
    marginHorizontal: 10,
    marginVertical: 3,
  },

  signInFormView: {
    gap: 10,
    padding: 20,
  },
});
