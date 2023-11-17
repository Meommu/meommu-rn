import { DiaryPresenter } from "../DiaryPresenter";
import { useMutation, useQuery } from "react-query";
import { useCallback } from "react";
import { PATH } from "@/constants";
import axios from "axios";
import * as Sharing from "expo-sharing";

import { router, useLocalSearchParams } from "expo-router";
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
        Sharing.shareAsync(`shared/${uuid}`);
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
    console.log("share mutation mutate");

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
