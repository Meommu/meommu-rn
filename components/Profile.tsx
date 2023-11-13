// react
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "react-query";

// components
import { SView } from "@/components/Layout/SView";

// apis
import { apiService } from "@/apis";

export function Profile() {
  const { data } = useQuery(
    ["userInfo"],
    async () => {
      return await apiService.getLoginInfo();
    },
    {
      suspense: true,
    }
  );

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileImage}>
        <View style={styles.profileImagePlaceholder}>
          <Text style={styles.profileImagePlaceholderText}>me</Text>
        </View>
      </View>

      <View style={styles.profileContent}>
        <Text style={styles.profileContentName}>{data.name}</Text>
        <Text style={styles.profileContentEmail}>{data.email}</Text>
      </View>
    </View>
  );
}

export function ProfileSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.profileImage}>
        <View style={styles.profileImagePlaceholder}>
          <SView style={{ width: "100%", height: "100%" }} />
        </View>
      </View>

      <View style={styles.profileContent}>
        <SView style={{ width: 80, height: 21 }} />
        <SView style={{ width: 115, height: 14 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
    position: "relative",
    overflow: "hidden",
  },

  profileImagePlaceholder: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8579F1",
  },

  profileImagePlaceholderText: {
    fontSize: 26,
    fontFamily: "yeonTheLand",
    fontWeight: "normal",
    color: "white",
  },

  profileContent: {
    gap: 4,
  },

  profileContentName: {
    color: "#1A1A1A",
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
  },

  profileContentEmail: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    color: "#808080",
  },
});
