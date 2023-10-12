import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CaretLeft from "../../assets/svgs/caret-left.svg";

interface GoBackButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export function GoBackButton({ onPress }: GoBackButtonProps) {
  const navigation = useNavigation();

  const goBackButtonClickHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={onPress || goBackButtonClickHandler}>
      <View style={styles.container}>
        <Image source={CaretLeft} style={styles.caretImage} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  caretImage: {
    width: 7,
    height: 14,
  },
});
