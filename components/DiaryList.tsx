// react
import { useRef, useMemo, useCallback } from "react";
import {
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Pressable,
} from "react-native";
import { useQuery } from "react-query";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";

// apis
import { apiService } from "@/apis";

// constants
import { zIndex, size } from "@/constants";

// components
import { DiaryItem, DiaryItemSkeleton } from "./DiaryItem";
import { NonIndicatorScrollView } from "./ScrollView/NonIndicatorScrollView";
import { DiaryListPlaceholder } from "./DiaryListPlaceholder";
import { NavigationButton } from "./Button/NavigationButton";

// hooks
import { useDyanmicStyle } from "@/hooks";

// bottom sheet
import {
  useBottomSheetDynamicSnapPoints,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";

export function DiaryList() {
  const { currentMonth, currentYear } = useSelector<RootState, DiaryDateState>(
    (state) => state.diaryDate
  );

  const { data, isLoading } = useQuery(
    ["diaryList", currentMonth, currentYear],
    async () => {
      return await apiService.getDiaries(currentYear, currentMonth);
    }
  );

  const diaries = data || [];

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const handleKebabMenuButtonClick = (diaryId: number) => () => {
    /**
     * TODO: 현재 선택된 다이어리 아이디 변경
     */

    console.log("[diary id]", diaryId);

    bottomSheetRef.current?.present();
  };

  const handleDiaryEditButtonClick = () => {
    /**
     * TODO: 글쓰기 페이지 이동
     *
     * 이후, 현재 선택된 다이어리 아이디 값을 통해 데이터를 불러와 초기화
     */
  };

  const handleDiaryDeleteButtonClick = () => {
    /**
     * TODO: 정말 삭제할 것인지 확인 후 다이어리 아이디 삭제 요청 전송 후 리스트 새로고침
     */

    bottomSheetRef.current?.dismiss();
  };

  /**
   * bottom sheet의 반응형 너비 계산
   */
  const { width, height } = useWindowDimensions();

  const bottomSheetMaxWidthStyle = useDyanmicStyle(() => {
    const maxWidth =
      Platform.OS === "web" && width >= size.LAPTOP_WIDTH
        ? (9 * height) / 16
        : "100%";

    return { maxWidth };
  }, [width, height]);

  /**
   * bottom sheet의 dimmed
   *
   * ※ Web 환경에서는 뒷 배경 클릭시 바텀시트 모달이 닫히지 않음.
   * ※ v5 버전에서 업데이트를 기다려야 할 것 같음.
   */
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[props.style, styles.bottomSheetBackdrop]}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <NonIndicatorScrollView style={styles.container}>
        {diaries.map((diary) => {
          return (
            <DiaryItem
              diary={diary}
              key={diary.id}
              handleKebabMenuButtonClick={handleKebabMenuButtonClick}
            />
          );
        })}

        {isLoading &&
          Array(3)
            .fill(null)
            .map((_, i) => {
              return <DiaryItemSkeleton key={i} />;
            })}

        {diaries.length > 0 ? (
          <Text style={styles.listCountText}>{diaries.length}개의 일기</Text>
        ) : (
          <DiaryListPlaceholder />
        )}

        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={animatedSnapPoints}
          contentHeight={animatedContentHeight}
          handleHeight={animatedHandleHeight}
          enableContentPanningGesture={false}
          containerStyle={[
            bottomSheetMaxWidthStyle,
            styles.bottomSheetContainer,
          ]}
          handleIndicatorStyle={styles.handleIndicator}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView
            onLayout={handleContentLayout}
            style={styles.bottomSheetContent}
          >
            <NavigationButton
              content="일기 수정하기"
              onPress={handleDiaryEditButtonClick}
            />
            <Pressable
              style={styles.deleteDiaryButton}
              onPress={handleDiaryDeleteButtonClick}
            >
              <Text style={styles.deleteDiaryButtonText}>삭제하기</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheetModal>
      </NonIndicatorScrollView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  listCountText: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 60,
    fontSize: 14,
    color: "#7D8899",
    fontFamily: "Pretendard-SemiBold",
  },

  bottomSheetBackdrop: {
    zIndex: zIndex.bottomSheetBackdrop,
  },

  bottomSheetContainer: {
    marginHorizontal: "auto",
    zIndex: zIndex.bottomSheetContainer,
  },

  bottomSheetContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  handleIndicator: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "10%",
  },

  deleteDiaryButton: {
    height: size.NAVIGATION_BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteDiaryButtonText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
  },
});
