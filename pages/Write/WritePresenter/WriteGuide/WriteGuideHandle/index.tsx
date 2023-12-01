// react
import { View, Pressable, Text } from "react-native";

// svgs
import Stop from "@/assets/svgs/stop.svg";

// style
import { styles } from "./index.styles";

interface WriteGuideHandleProps {
  isGptDiaryMutationLoading: boolean;

  isGptDirayMutationSuccess: boolean;

  handleGptDiaryStopButtonClick: () => void;
}

function WriteGuideHandle({
  isGptDiaryMutationLoading,
  isGptDirayMutationSuccess,
  handleGptDiaryStopButtonClick,
}: WriteGuideHandleProps) {
  return (
    <View style={styles.container}>
      {isGptDiaryMutationLoading && !isGptDirayMutationSuccess && (
        <Pressable
          onPress={handleGptDiaryStopButtonClick}
          style={styles.stopButton}
        >
          <Stop />
          <Text style={styles.stopButtonText}>생성 멈추기</Text>
        </Pressable>
      )}

      <View style={styles.grabber} />
    </View>
  );
}

export const renderHandle = (props: WriteGuideHandleProps) => {
  return () => {
    return <WriteGuideHandle {...props} />;
  };
};
