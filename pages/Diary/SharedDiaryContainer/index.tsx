import { DiaryPresenter } from "../DiaryPresenter";
import { useQuery } from "react-query";
import { useCallback } from "react";
import { PATH } from "@/constants";
import axios from "axios";

import { router, useLocalSearchParams } from "expo-router";

export function SharedDiaryContainer() {
  const { uuid } = useLocalSearchParams();

  const { data } = useQuery(
    ["sharedDiaryDetail", uuid],
    async () => {
      const {
        data: { data },
      } = await axios.get<ResponseTemplate<Diary>>(
        `/api/v1/diaries/shared/${uuid}`
      );

      return data;
    },
    {
      suspense: true,
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
