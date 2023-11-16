import { DiaryPresenter } from "../DiaryPresenter";
import { useMutation, useQuery } from "react-query";
import { useCallback } from "react";
import { PATH } from "@/constants";
import axios from "axios";
import * as Sharing from "expo-sharing";

import { router, useLocalSearchParams } from "expo-router";

export function DiaryContainer() {
  const { diaryId } = useLocalSearchParams();

  const { data } = useQuery(
    ["diaryDetail", diaryId],
    async () => {
      const {
        data: { data },
      } = await axios.get<ResponseTemplate<Diary>>(
        `/api/v1/diaries/${diaryId}`
      );

      return data;
    },
    {
      suspense: true,
    }
  );

  const shareMutation = useMutation(
    async () => {
      const {
        data: {
          data: { uuid },
        },
      } = await axios.get<ResponseTemplate<{ uuid: string }>>(
        `/api/v1/diaries/${diaryId}/share-uuid`
      );

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
