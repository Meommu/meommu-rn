import { View, Pressable, Text } from "react-native";

import { size } from "@/constants";

// svgs
import Stop from "@/assets/svgs/stop.svg";

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
    <View
      style={{
        position: "relative",
        width: "100%",
        height: size.BOTTOM_SHEET_INDICATOR_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isGptDiaryMutationLoading && !isGptDirayMutationSuccess && (
        <View
          style={{
            position: "absolute",
            top: -(14 + 40),
            width: "100%",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <Pressable
            onPress={handleGptDiaryStopButtonClick}
            style={{
              pointerEvents: "auto",
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: "white",
              borderRadius: 6,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              flexDirection: "row",
              gap: 7,
            }}
          >
            <Stop />
            <Text
              style={{
                color: "#B0B0B0",
                fontSize: 16,
                fontFamily: "Pretendard-SemiBold",
              }}
            >
              생성 멈추기
            </Text>
          </Pressable>
        </View>
      )}

      <View
        style={{
          backgroundColor: "rgba(235, 235, 245, 0.3)",
          borderRadius: 2.5,
          width: 48,
          height: 4,
        }}
      />
    </View>
  );
}

export const renderHandle = (props: WriteGuideHandleProps) => {
  return () => {
    return <WriteGuideHandle {...props} />;
  };
};
