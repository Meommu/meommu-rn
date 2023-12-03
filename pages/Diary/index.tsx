// react
import { Platform, Share, View, Text, Pressable } from "react-native";
import { useCallback, useState, Suspense } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// expo
import { router, useLocalSearchParams } from "expo-router";

// components
import { DiarySkeleton } from "./index.skeleton";
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "@/components/Button/GoBackButton";
import { KebabMenuButton } from "@/components/Button/KebabMenuButton";
import { ImageSlider } from "@/components/Widget/ImageSlider";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { ResponsiveBottomSheetModal } from "@/components/Layout/ResponsiveBottomSheetModal";
import { TransparentButton } from "@/components/Button/TransparentButton";

// constants
import { PATH } from "@/constants";

// apis
import { apiService } from "@/apis";

// hooks
import { useToast, useConfirm } from "@/hooks";

// bottom sheets
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// svgs
import ShareButton from "@/assets/svgs/share.svg";

// styles
import { styles } from "./index.styles";
import { Footer } from "@/components/Layout/Footer";

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
          Platform.OS === "web"
            ? process.env.EXPO_PUBLIC_MODE === "dev"
              ? window.location.origin
              : "https://meommu-rn.vercel.app"
            : "https://meommu-rn.vercel.app";

        Share.share({
          title: "Meommu Diary",
          message: [
            `${diary?.dogName}의 일기 공유`,
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

    openConfirm(
      "일기 삭제",
      "삭제시, 해당 일기를 영구적으로 열람할 수 없게 됩니다.",
      async () => {
        await apiService.deleteDiary(diaryId);

        const [year, month] = diary.date.split("-").map(Number);

        queryClient.invalidateQueries(["diaryList", year, month]);

        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace(PATH.MAIN);
        }
      },
      "삭제하기",
      "취소"
    );
  }, [diaryId, diary]);

  if (!diary) {
    return null;
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Header
          style={styles.header}
          left={<GoBackButton onPress={handleGoBackButtonClick} />}
          right={
            <KebabMenuButton onPress={handleEditButtonClick} fill="black" />
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

              <Pressable onPress={handleShareButtonClick}>
                <ShareButton />
              </Pressable>
            </View>

            <Text style={styles.bodyContent}>{diary.content}</Text>

            <Text style={styles.bodyDate}>
              {diary.date.replaceAll("-", ".")} {diary.dogName} 일기
            </Text>
          </View>

          <Footer>
            <NavigationButton
              content="보내기"
              onPress={handleShareButtonClick}
            />
          </Footer>
        </NonIndicatorScrollView>

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
      </View>
    </BottomSheetModalProvider>
  );
}

export function DiaryPage() {
  return (
    <Suspense fallback={<DiarySkeleton />}>
      <Diary />
    </Suspense>
  );
}
