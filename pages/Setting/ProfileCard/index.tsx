// react
import { View, Text } from "react-native";
import { useQuery } from "react-query";

// apis
import { apiService } from "@/apis";

// styles
import { styles } from "./index.styles";

export function ProfileCard() {
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
