// react
import { Platform, Share, View, Text } from "react-native";
import { useCallback, useState, Suspense } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// expo
import { router, useLocalSearchParams } from "expo-router";

// components
import { DiarySkeleton } from "./index.skeleton";
import { Header } from "@/components/Layout/Header";
import { ShareButton } from "@/components/Button/ShareButton";
import { CaretLeftButton } from "@/components/Button/CaretLeftButton";
import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { ImageSlider } from "@/components/Widget/ImageSlider";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Footer } from "@/components/Layout/Footer";
import { FixedRelativeView } from "@/components/Layout/FixedRelativeView";
import { DiaryEditDeleteBottomSheetModal } from "@/components/Widget/DiaryEditDeleteBottomSheetModal";

// constants
import { PATH, color } from "@/constants";

// apis
import { apiService } from "@/apis";

// hooks
import { useToast, useConfirm } from "@/hooks";

// styles
import { styles } from "./index.styles";

function Diary() {
  const { diaryId } = useLocalSearchParams<{ diaryId: string }>();

  const { openConfirm } = useConfirm();

  const { fireToast } = useToast();

  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState({ value: false });

  const queryClient = useQueryClient();

  const { data: diary } = useQuery(
    ["diaryDetail", diaryId],
    async () => {
      const diary = await apiService.getDiaryDetail(diaryId || "");

      return diary;
    },
    {
      suspense: true,
    }
  );

  const shareMutation = useMutation(
    async () => {
      const uuid = await apiService.getDiaryShareUUID(diaryId || "");

      return uuid;
    },
    {
      onSuccess: (uuid) => {
        const origin =
          Platform.OS !== "web"
            ? "https://meommu-rn.vercel.app"
            : window.location.origin;

        Share.share({
          title: "Meommu Diary",
          message: [
            `${diary?.dogName}의 일기가 도착했습니다! 💌 강아지 일기를 확인해보세요.`,
            "",
            `${origin}/diary/shared/${uuid}`,
          ].join("\n"),
        });
      },
    }
  );

  const handleGoBackButtonClick = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(PATH.MAIN);
    }
  }, []);

  const handleEditButtonClick = useCallback(() => {
    setBottomSheetIsOpen({ value: true });
  }, []);

  const handleShareButtonClick = useCallback(() => {
    shareMutation.mutate();
  }, []);

  const handleDiaryEditButtonClick = useCallback(() => {
    router.push(`/modify/${diaryId}`);
  }, [diaryId]);

  const handleDiaryDeleteButtonClick = useCallback(() => {
    if (!diary || !diaryId) {
      fireToast("알 수 없는 오류가 발생했습니다.", 3000);

      return;
    }

    setBottomSheetIsOpen({ value: false });

    openConfirm({
      title: "일기 삭제",
      body: "삭제시, 해당 일기를 영구적으로 열람할 수 없게 됩니다.",
      button: {
        ok: {
          message: "삭제하기",
          callback: async () => {
            await apiService.deleteDiary(diaryId);

            const [year, month] = diary.date.split("-").map(Number);

            await queryClient.invalidateQueries(["diaryList", year, month]);
            await queryClient.invalidateQueries(["diariesSummary"]);

            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace(PATH.MAIN);
            }
          },
        },
        cancel: {
          message: "취소",
        },
      },
    });
  }, [diaryId, diary]);

  if (!diary) {
    return null;
  }

  return (
    <FixedRelativeView style={styles.container}>
      <Header
        style={styles.header}
        left={<CaretLeftButton onPress={handleGoBackButtonClick} />}
        right={
          <KebabMenuButton onPress={handleEditButtonClick} fill={color.g400} />
        }
      />

      <NonIndicatorScrollView>
        <ImageSlider
          imageIds={diary.imageIds}
          aspectRatio="3/4"
          borderRadius={0}
        />

        <View style={styles.body}>
          <View style={styles.bodyTitleLayout}>
            <Text style={styles.bodyTitle}>{diary.title}</Text>

            <ShareButton onPress={handleShareButtonClick} />
          </View>

          <Text style={styles.bodyContent}>{diary.content}</Text>

          <Text style={styles.bodyDate}>
            {diary.date.replaceAll("-", ".")} {diary.dogName} 일기
          </Text>
        </View>

        <Footer>
          <NavigationButton content="보내기" onPress={handleShareButtonClick} />
        </Footer>
      </NonIndicatorScrollView>

      <DiaryEditDeleteBottomSheetModal
        isOpen={bottomSheetIsOpen}
        setIsOpen={setBottomSheetIsOpen}
        handleDiaryDeleteButtonClick={handleDiaryDeleteButtonClick}
        handleDiaryEditButtonClick={handleDiaryEditButtonClick}
      />
    </FixedRelativeView>
  );
}

export function DiaryPage() {
  return (
    <Suspense fallback={<DiarySkeleton />}>
      <Diary />
    </Suspense>
  );
}
