// react
import { useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import { Platform, Share } from "react-native";

// expo
import { router, useLocalSearchParams } from "expo-router";

// components
import { DiaryPresenter } from "../DiaryPresenter";

// constants
import { PATH } from "@/constants";

// apis
import { apiService } from "@/apis";

export function DiaryContainer() {
  const { diaryId } = useLocalSearchParams<{ diaryId: string }>();

  const { data } = useQuery(
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
            `${data?.dogName}의 일기 공유`,
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
    /**
     * TODO: 수정, 삭제 바텀 시트 모달 open
     */
  }, []);

  const handleShareButtonClick = useCallback(() => {
    shareMutation.mutate();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <DiaryPresenter
      diary={data}
      handleEditButtonClick={handleEditButtonClick}
      handleGoBackButtonClick={handleGoBackButtonClick}
      handleShareButtonClick={handleShareButtonClick}
    />
  );
}
