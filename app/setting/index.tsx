// react
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo
import { router } from "expo-router";

// constants
import { VIEW_NAME } from "@/constants";

// components
import { GoBackButton } from "@/components/Button/GoBackButton";
import { Header } from "@/components/Layout/Header";

export default function Setting() {
  const handleLogoutButtonClick = () => {
    AsyncStorage.removeItem("accessToken");

    router.replace(VIEW_NAME.HOME);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header title="설정" left={<GoBackButton />} />

        <View style={styles.sign}>
          <Pressable
            style={styles.signButton}
            onPress={handleLogoutButtonClick}
          >
            <Text style={styles.signButtonText}>로그아웃</Text>
          </Pressable>

          <View style={styles.splitBar} />

          <Pressable style={styles.signButton}>
            <Text style={styles.signButtonText}>회원 탈퇴</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    margin: 20,
    position: "relative",
  },

  sign: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },

  signButton: {
    width: "50%",
  },

  signButtonText: {
    color: "#ABB0BA",
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    textAlign: "center",
  },

  splitBar: {
    borderWidth: 1,
    borderColor: "#ABB0BA",
  },
});
