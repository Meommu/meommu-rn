// react
import { View, Text } from "react-native";

// components
import { SView } from "@/components/Layout/SView";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";

// styles
import { styles } from "./index.styles";

interface SignUpFormStepTwoSkeletonProps {
  showGuideText?: boolean;
}

export function SignUpFormStepTwoSkeleton({
  showGuideText,
}: SignUpFormStepTwoSkeletonProps) {
  return (
    <View style={styles.container}>
      {showGuideText && (
        <View style={styles.GuideText}>
          <Text style={styles.GreetingText}>
            이제 곧 끝나요!{"\n"}
            유치원 정보를 입력해주세요
          </Text>
          <Text style={styles.IntroductionText}>
            반려동물과의 건강한 추억을 기록해드리겠습니다.
          </Text>
        </View>
      )}

      <NonIndicatorScrollView>
        <View style={styles.fieldLayout}>
          <View style={styles.fieldView}>
            <View style={styles.fieldTextLayoutView}>
              <SView style={{ width: 150, height: 16 }} />
            </View>

            <SView style={{ width: "100%", height: 39 }} />
          </View>

          <View style={styles.fieldView}>
            <View style={styles.fieldTextLayoutView}>
              <SView style={{ width: 150, height: 16 }} />
            </View>

            <SView style={{ width: "100%", height: 39 }} />
          </View>

          <View style={styles.fieldView}>
            <View style={styles.fieldTextLayoutView}>
              <SView style={{ width: 150, height: 16 }} />
            </View>

            <SView style={{ width: "100%", height: 39 }} />
          </View>
        </View>
      </NonIndicatorScrollView>
    </View>
  );
}
