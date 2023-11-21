import { View, Text } from "react-native";
import { size } from "@/constants";
import { useQuery } from "react-query";
import axios from "axios";
import BottomSheet, {
  type BottomSheetFooterProps,
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useResponsiveBottomSheet } from "@/hooks";
import { useDerivedValue } from "react-native-reanimated";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { shareWriteGuideButtonSheetRef } from "@/store/modules/bottomSheetRef";

interface WriteGuideProps {}

export function WriteGuide({}: WriteGuideProps) {
  /**
   * TODO: 사용되지 않는 훅도 내부에 존재하고 있어 추후 분리해야 할 것 같음.
   */
  const { bottomSheetRef, bottomSheetMaxWidthStyle } =
    useResponsiveBottomSheet();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shareWriteGuideButtonSheetRef(bottomSheetRef));
  }, []);

  const { data } = useQuery(["writeGuide"], async () => {
    const {
      data: {
        data: { guides },
      },
    } = await axios.get<
      ResponseTemplate<{ guides: { id: number; guide: string }[] }>
    >("/api/v1/guides");

    return guides;
  });

  const handleBottomSheetOpenButtonClick = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[
        size.BOTTOM_SHEET_INDICATOR_HEIGHT + size.AI_BOTTOM_SHEET_HEADER_HEIGHT,
        "60%",
        "100%",
      ]}
      containerStyle={bottomSheetMaxWidthStyle}
      backgroundStyle={{
        backgroundColor: "#1B1E26",
      }}
      handleIndicatorStyle={{
        backgroundColor: "rgba(235, 235, 245, 0.3)",
        width: "10%",
      }}
      footerComponent={renderFooter}
      enablePanDownToClose={true}
      index={-1}
    >
      <BottomSheetView>
        <View
          style={{
            height: size.AI_BOTTOM_SHEET_HEADER_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: size.BOTTOM_SHEET_INDICATOR_HEIGHT,
            gap: 4,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Pretendard-SemiBold",
              color: "white",
            }}
          >
            멈무일기 가이드
          </Text>
          <Text
            style={{
              color: "#6F7682",
              fontSize: 14,
              fontFamily: "Pretendard-Regular",
            }}
          >
            오늘은 어떤 낮잠 이었나요?
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 4,
              backgroundColor: "#98FF98",
            }}
          >
            <Text style={{ color: "white" }}>컨텐츠</Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

function renderFooter({ animatedFooterPosition }: BottomSheetFooterProps) {
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
    <BottomSheetFooter bottomInset={0} animatedFooterPosition={footerPosition}>
      <View
        style={{
          padding: 12,
          margin: 12,
          borderRadius: 12,
          backgroundColor: "#80f",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "800",
          }}
        >
          Footer
        </Text>
      </View>
    </BottomSheetFooter>
  );
}
