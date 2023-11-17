// react
import { Suspense } from "react";

// components
import { DiaryContainer } from "./DiaryContainer";
import { SharedDiaryContainer } from "./SharedDiaryContainer";
import { DiaryPresenterSkeleton } from "./DiaryPresenter/index.skeleton";

export function DiaryPage() {
  return (
    <Suspense fallback={<DiaryPresenterSkeleton />}>
      <DiaryContainer />
    </Suspense>
  );
}

export function SharedDiaryPage() {
  return (
    <Suspense fallback={<DiaryPresenterSkeleton isShared={true} />}>
      <SharedDiaryContainer />
    </Suspense>
  );
}
