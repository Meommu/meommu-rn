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

// apis
import { apiService } from "@/apis";

// components
import { DiaryListPlaceholder } from "./DiaryListPlaceholder";
import { DiaryItemSkeleton } from "./DiaryItem/index.skeleton";
import { DiaryItem } from "./DiaryItem";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Footer } from "@/components/Layout/Footer";
import { Popover } from "@/components/Overlay/Popover";
import { DiaryEditDeleteBottomSheetModal } from "@/components/Widget/DiaryEditDeleteBottomSheetModal";

// hooks
import { useConfirm, useExpoRouter } from "@/hooks";

// constants
import { size } from "@/constants";

// utils
import { sleep } from "@/utils";

// styles
import { styles } from "./index.styles";

export function DiaryList() {
  const queryClient = useQueryClient();
  const { router } = useExpoRouter("main");

  const [menuPressedDiaryId, setMenuPressedDiaryId] = useState(-1);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState({ value: false });
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    router.goToModifyPage(menuPressedDiaryId);
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

  const handleWriteButtonClick = useCallback(async () => {
    await sleep(size.BUTTON_PRESS_IN_OUT_DURATION * 2);

    router.goToWritePage();
  }, []);

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

  return (
    <>
      {diaries.length > 0 ? (
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
          ) : (
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
              <Text style={styles.listCountText}>
                {diaries.length}개의 일기
              </Text>
            </>
          )}
        </Animated.ScrollView>
      ) : (
        <DiaryListPlaceholder />
      )}

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
          content="지금 시작해보세요"
          bottom={
            size.NAVIGATION_BUTTON_HEIGHT + size.FOOTER_PADDING_BOTTOM + 24
          }
        />
      </Animated.View>

      <DiaryEditDeleteBottomSheetModal
        isOpen={bottomSheetIsOpen}
        setIsOpen={setBottomSheetIsOpen}
        handleDiaryDeleteButtonClick={handleDiaryDeleteButtonClick}
        handleDiaryEditButtonClick={handleDiaryEditButtonClick}
      />
    </>
  );
}
