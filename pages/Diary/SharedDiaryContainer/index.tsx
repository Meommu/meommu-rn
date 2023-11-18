// react
import { View, Platform } from "react-native";
import { useQuery } from "react-query";
import { useCallback, useRef, useState } from "react";

// expo
import { router, useLocalSearchParams } from "expo-router";

// components
import { DiaryPresenter } from "../DiaryPresenter";

// constants
import { PATH } from "@/constants";

// apis
import { apiService, baseUrl } from "@/apis";

import FileSaver from "file-saver";

export function SharedDiaryContainer() {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();

  const imageRef = useRef<View | null>(null);

  const [captureImageB64, setCaptureImageB64] = useState<string | null>(null);

  const { data } = useQuery(
    ["sharedDiaryDetail", uuid],
    async () => {
      const diary = await apiService.getSharedDiaryDetail(uuid || "");

      return diary;
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

  const handleShareButtonClick = useCallback(async () => {
    if (
      Platform.OS !== "web" ||
      !imageRef.current ||
      /**
       * proxy 서버가 필요한 이슈가 있어 개발 환경에서는 해당 기능을 차단
       */
      process.env.EXPO_PUBLIC_MODE === "dev"
    ) {
      return;
    }

    /**
     * View는 웹 환경에서 `div` 태그로 변환되므로 as를 이용하여 형변환 함.
     */
    const $divElement = imageRef.current as unknown as HTMLDivElement;

    /**
     * 웹 환경에서만 동작하는 라이브러리이므로, 동적으로 불러와 사용
     */
    const html2canvas = require("html2canvas");

    const canvas = await html2canvas($divElement, {
      proxy: `${baseUrl}/api/v1/proxy`,
    });

    setCaptureImageB64(canvas.toDataURL());
  }, []);

  const handleCloseModalButtonClick = useCallback(() => {
    setCaptureImageB64(null);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <DiaryPresenter
      diary={data}
      imageRef={imageRef}
      isShared={true}
      captureImageB64={captureImageB64}
      handleCloseModalButtonClick={handleCloseModalButtonClick}
      handleEditButtonClick={handleEditButtonClick}
      handleGoBackButtonClick={handleGoBackButtonClick}
      handleShareButtonClick={handleShareButtonClick}
    />
  );
}
