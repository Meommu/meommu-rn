// react
import { useState } from "react";
import { View, TextInput } from "react-native";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

interface SentenseInputProps {
  guideElementItems: GuideElementItem[];
}

export function SentenseInput({ guideElementItems }: SentenseInputProps) {
  const [inputValue, setInputValue] = useState<string>(
    guideElementItems[guideElementItems.length - 1].sentence
  );

  const handleTextChange = (text: string) => {
    const m = guideElementItems.length;

    if (!m) {
      return;
    }

    guideElementItems[m - 1].isSelect = text !== "";
    guideElementItems[m - 1].sentence = text;
    setInputValue(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        placeholder="GPT가 자동으로 만들어 드릴게요"
        placeholderTextColor={color.bg200}
        textAlignVertical="top"
        style={styles.input}
        onChangeText={handleTextChange}
        value={inputValue}
      />
    </View>
  );
}
