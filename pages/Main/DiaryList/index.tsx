// react
import { useState } from "react";
import { Text } from "react-native";
import { useQuery } from "react-query";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";

// expo
import { router } from "expo-router";

// apis
import { apiService } from "@/apis";

// components
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";
import { DiaryListPlaceholder } from "./DiaryListPlaceholder";
import { DiaryItemSkeleton } from "./DiaryItem/index.skeleton";
import { DiaryItem } from "./DiaryItem";
import { DiaryMenuButtonSheetModal } from "@/components/Widget/DiaryMenuBottomSheetModal";

// hooks
import { useConfirm } from "@/hooks";

// bottom sheet
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// styles
import { styles } from "./index.styles";

export function DiaryList() {
  const [menuPressedDiaryId, setMenuPressedDiaryId] = useState(-1);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);

  const { selectedYear, selectedMonth } = useSelector<
    RootState,
    DiaryDateState
  >((state) => state.diaryDate);

  const { openConfirm } = useConfirm();

  /**
   * 다이어리 일기정보 불러오기
   */
  const { data, isLoading, refetch } = useQuery(
    ["diaryList", selectedYear, selectedMonth],
    async () => {
      return await apiService.getDiaries(selectedYear, selectedMonth);
    }
  );

  const diaries = data || [];

  /**
   * event handlers
   */
  const handleKebabMenuButtonClick = (diaryId: number) => () => {
    setMenuPressedDiaryId(diaryId);
    setBottomSheetIsOpen(true);
  };

  const handleDiaryEditButtonClick = () => {
    router.push(`/modify/${menuPressedDiaryId}`);
  };

  const handleDiaryDeleteButtonClick = async () => {
    setBottomSheetIsOpen(false);

    openConfirm(
      "일기 삭제",
      "삭제시, 해당 일기를 영구적으로 열람할 수 없게 됩니다.",
      async () => {
        await apiService.deleteDiary(menuPressedDiaryId.toString());

        refetch();
      },
      "삭제하기",
      "취소"
    );
  };

  return (
    <BottomSheetModalProvider>
      <NonIndicatorScrollView style={styles.container}>
        {diaries.map((diary) => {
          return (
            <DiaryItem
              diary={diary}
              key={diary.id}
              handleKebabMenuButtonClick={handleKebabMenuButtonClick(diary.id)}
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

        <DiaryMenuButtonSheetModal
          isOpen={bottomSheetIsOpen}
          setIsOpen={setBottomSheetIsOpen}
          handleDiaryDeleteButtonClick={handleDiaryDeleteButtonClick}
          handleDiaryEditButtonClick={handleDiaryEditButtonClick}
        />
      </NonIndicatorScrollView>
    </BottomSheetModalProvider>
  );
}
