// react
import { View } from "react-native";
import { useCallback, Suspense } from "react";

// components
import { Header } from "@/components/Layout/Header";
import { NoticeList } from "./NoticeList";
import { NoticeListSkeleton } from "./NoticeList/index.skeleton";
import { CaretLeftButton } from "@/components/Button/CaretLeftButton";

// hooks
import { useExpoRouter } from "@/hooks";

// styles
import { styles } from "./index.styles";

export function NoticePage() {
  const { router } = useExpoRouter("notice");

  const handleGoBackButtonClick = useCallback(() => {
    router.goBack();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerLayout}>
        <Header
          title="공지"
          left={<CaretLeftButton onPress={handleGoBackButtonClick} />}
        />
      </View>

      <Suspense fallback={<NoticeListSkeleton />}>
        <NoticeList />
      </Suspense>
    </View>
  );
}
