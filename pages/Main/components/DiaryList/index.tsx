// react
import { useState, useCallback } from "react";
import { RefreshControl, Text } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { DiaryDateState } from "@/store/modules/diaryDate";

// expo
import { router } from "expo-router";

// apis
import { apiService } from "@/apis";

// components
import { DiaryListPlaceholder } from "./DiaryListPlaceholder";
import { DiaryItemSkeleton } from "./DiaryItem/index.skeleton";
import { DiaryItem } from "./DiaryItem";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { TransparentButton } from "@/components/Button/TransparentButton";
import { ResponsiveBottomSheetModal } from "@/components/Layout/ResponsiveBottomSheetModal";
import { Footer } from "@/components/Layout/Footer";
import { Popover } from "@/components/Overlay/Popover";

// hooks
import { useConfirm } from "@/hooks";

// bottom sheet
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// constants
import { PATH, size } from "@/constants";

// styles
import { styles } from "./index.styles";

export function DiaryList() {
  const queryClient = useQueryClient();

  const [menuPressedDiaryId, setMenuPressedDiaryId] = useState(-1);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState({ value: false });

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
    setBottomSheetIsOpen({ value: true });
  };

  const handleDiaryEditButtonClick = () => {
    router.push(`/modify/${menuPressedDiaryId}`);
  };

  const handleDiaryDeleteButtonClick = async () => {
    setBottomSheetIsOpen({ value: false });

    openConfirm({
      title: "일기 삭제",
      body: "삭제시, 해당 일기를 영구적으로 열람할 수 없게 됩니다.",
      button: {
        ok: {
          message: "삭제하기",
          callback: async () => {
            await apiService.deleteDiary(menuPressedDiaryId.toString());

            await queryClient.invalidateQueries(["diariesSummary"]);

            refetch();
          },
        },
        cancel: {
          message: "취소",
        },
      },
    });
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * floating button when scroll up
   */
  const translateY = useSharedValue(0);
  const lastOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: ({ contentOffset: { y }, contentSize, layoutMeasurement }) => {
        const threshold = contentSize.height - layoutMeasurement.height;

        /**
         * 위로 스크롤 될 경우 (= 스크롤 뷰의 y축 offset값이 작아질 경우)
         */
        if (y > 0 && y < threshold && lastOffset.value > y) {
          translateY.value = 0;
        }

        /**
         * 아래로 스크롤 될 경우
         */
        if (y > 0 && y < threshold && lastOffset.value < y) {
          translateY.value = 1000;
        }

        lastOffset.value = y;
      },
    },
    []
  );

  const floatingButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(translateY.value, { duration: 600 }) },
      ],
    };
  }, []);

  const handleWriteButtonClick = useCallback(() => {
    router.push(PATH.WRITE);
  }, []);

  return (
    <BottomSheetModalProvider>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={async () => {
              setIsRefreshing(true);

              await refetch();

              setIsRefreshing(false);
            }}
          />
        }
      >
        {isLoading || isRefreshing ? (
          Array(3)
            .fill(null)
            .map((_, i) => {
              return <DiaryItemSkeleton key={i} />;
            })
        ) : diaries.length > 0 ? (
          <>
            {diaries.map((diary) => {
              return (
                <DiaryItem
                  diary={diary}
                  key={diary.id}
                  handleKebabMenuButtonClick={handleKebabMenuButtonClick(
                    diary.id
                  )}
                />
              );
            })}
            <Text style={styles.listCountText}>{diaries.length}개의 일기</Text>
          </>
        ) : (
          <DiaryListPlaceholder />
        )}
      </Animated.ScrollView>

      <Animated.View
        style={[
          { position: "absolute", width: "100%", bottom: 0 },
          floatingButtonStyle,
        ]}
      >
        <Footer>
          <NavigationButton
            content="작성하기"
            onPress={handleWriteButtonClick}
          />
        </Footer>

        <Popover
          id="write"
          content="선생님 지금 시작해보세요"
          bottom={
            size.NAVIGATION_BUTTON_HEIGHT + size.FOOTER_PADDING_BOTTOM + 24
          }
        />
      </Animated.View>

      <ResponsiveBottomSheetModal
        isOpen={bottomSheetIsOpen}
        setIsOpen={setBottomSheetIsOpen}
      >
        <Footer style={styles.bottomSheetContent}>
          <NavigationButton
            content="일기 수정하기"
            onPress={handleDiaryEditButtonClick}
          />

          <TransparentButton
            content="일기 삭제하기"
            onPress={handleDiaryDeleteButtonClick}
          />
        </Footer>
      </ResponsiveBottomSheetModal>
    </BottomSheetModalProvider>
  );
}
