// react
import { View, Pressable, Text } from "react-native";
import { useState } from "react";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

interface MultiSelectListProps {
  guideElementItems: GuideElementItem[];
}

export function MultiSelectList({ guideElementItems }: MultiSelectListProps) {
  const [items, setItems] = useState<GuideElementItem[]>(guideElementItems);

  const m = guideElementItems.length;

  const handleItemClick = (index: number) => () => {
    const newItems = [...items];

    newItems[index].isSelect = !guideElementItems[index].isSelect;

    /**
     * 값 동기화를 위해 원본 배열의 값을 변경시켜준다.
     */
    guideElementItems[index].isSelect = newItems[index].isSelect;

    setItems(newItems);
  };

  return (
    <View style={styles.list}>
      {items.map(({ isSelect, sentence }, i) => {
        return (
          <Pressable
            key={i}
            onPress={handleItemClick(i)}
            style={[
              styles.item,
              {
                backgroundColor: isSelect ? color.primary : "#363C48",
              },
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.itemText,
                {
                  color: isSelect ? "white" : "#8A8E95",
                },
              ]}
            >
              {sentence === "" && i === m - 1
                ? "나만의 문장 추가하기"
                : sentence}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
