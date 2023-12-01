// react
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Platform, Share } from "react-native";

// expo
import { router, useLocalSearchParams } from "expo-router";

// components
import { DiaryPresenter } from "../DiaryPresenter";

// constants
import { PATH } from "@/constants";

// apis
import { apiService } from "@/apis";

// hooks
import { useToast, useConfirm } from "@/hooks";

export function DiaryContainer() {
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState({ value: false });

  const queryClient = useQueryClient();

  const { openConfirm } = useConfirm();

  const { fireToast } = useToast();

  const { diaryId } = useLocalSearchParams<{ diaryId: string }>();

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
    <DiaryPresenter
      diary={diary}
      handleEditButtonClick={handleEditButtonClick}
      handleGoBackButtonClick={handleGoBackButtonClick}
      handleShareButtonClick={handleShareButtonClick}
      bottomSheetIsOpen={bottomSheetIsOpen}
      setBottomSheetIsOpen={setBottomSheetIsOpen}
      handleDiaryDeleteButtonClick={handleDiaryDeleteButtonClick}
      handleDiaryEditButtonClick={handleDiaryEditButtonClick}
    />
  );
}
