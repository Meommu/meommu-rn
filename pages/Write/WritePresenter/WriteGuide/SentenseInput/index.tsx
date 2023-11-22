// react
import { View, TextInput } from "react-native";

// styles
import { styles } from "./index.styles";
import { useState } from "react";

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

    guideElementItems[m - 1].isSelect = true;
    guideElementItems[m - 1].sentence = text;
    setInputValue(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        placeholder="GPT가 자동으로 만들어 드릴게요"
        placeholderTextColor={"#B7B8BA"}
        textAlignVertical="top"
        style={styles.input}
        onChangeText={handleTextChange}
        value={inputValue}
      />
    </View>
  );
}
