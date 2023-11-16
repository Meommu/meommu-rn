import { Suspense } from "react";
import { View } from "react-native";
import { DiaryContainer } from "./DiaryContainer";

export function DiaryPage() {
  return (
    <Suspense
      fallback={
        /**
         * TODO: DiaryPresenter의 스켈레톤 ui 로 교체
         */

        <View />
      }
    >
      <DiaryContainer />
    </Suspense>
  );
}
