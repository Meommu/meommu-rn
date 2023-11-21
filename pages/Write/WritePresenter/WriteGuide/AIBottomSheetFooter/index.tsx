// react
import { View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";

// constants
import { size } from "@/constants";

// bottom sheet
import {
  type BottomSheetFooterProps,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";

// styles
import { styles } from "./index.styles";

interface AIBottomSheetFooter {
  guideElements?: GuideElement[];
}

export function AIBottomSheetFooter({ guideElements }: AIBottomSheetFooter) {
  return function ({ animatedFooterPosition }: BottomSheetFooterProps) {
    const footerPosition = useDerivedValue(() => {
      /**
       * 바텀시트 푸터 컴포넌트에는, 푸터 컴포넌트가 항상 시트의 하단에 위치할 수 있도록하기 위한 계산값 `animatedFooterPosition`이 props로 넘겨진다.
       *
       * `animatedFooterPosition`은 바텀시트의 최상단 position과의 거리값이므로, 바텀시트가 위로 올라올수록 값은 더 커진다.
       *
       * 만약 푸터 컴포넌트의 등장을 지연시키고 싶다면, 이러한 특징을 이용하여 `animatedFooterPosition`의 최소값을 늘려주면 된다.
       *
       * 1) `animatedFooterPosition`의 값
       * 2) 바텀시트가 등장하기를 원하는 적절한 높이
       *
       * 두 값을 비교하여 항상 최대값을 반환하면 된다.
       */
      return Math.max(
        animatedFooterPosition.value,
        size.AI_BOTTOM_SHEET_HEADER_HEIGHT
      );
    }, []);

    return (
      <BottomSheetFooter
        bottomInset={0}
        animatedFooterPosition={footerPosition}
      >
        <View style={styles.container}>
          <NavigationButton content="이전" backgroundColor="#373840" />
          <NavigationButton
            content="다음"
            onPress={() => {
              console.log("[test]", guideElements);
            }}
          />
        </View>
      </BottomSheetFooter>
    );
  };
}
