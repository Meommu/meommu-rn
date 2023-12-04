// react
import { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// svgs
import PopoverTap from "@/assets/svgs/popover-tap.svg";

// styles
import { styles } from "./index.styles";

interface PopoverProps {
  id: string;
}

export function Popover({ id }: PopoverProps) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(`popover-${id}`).then((v) => {
      if (v === "clicked") {
        return;
      }

      setIsShow(true);
    });
  }, []);

  const handlePopoverClick = useCallback(async () => {
    await AsyncStorage.setItem(`popover-${id}`, "clicked");

    setIsShow(false);
  }, []);

  if (!isShow) {
    return null;
  }

  return (
    <Pressable onPress={handlePopoverClick} style={styles.container}>
      <Text style={styles.contentText}>선생님 지금 시작해보세요</Text>

      <View style={styles.tabLayout}>
        <PopoverTap />
      </View>
    </Pressable>
  );
}
