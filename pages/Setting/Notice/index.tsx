// react
import { View } from "react-native";
import { useCallback, Suspense } from "react";

// expo
import { router } from "expo-router";

// components
import { Header } from "@/components/Layout/Header";
import { NoticeList } from "./NoticeList";
import { NoticeListSkeleton } from "./NoticeList/index.skeleton";
import { CaretLeftButton } from "@/components/Button/CaretLeftButton";

// constants
import { PATH } from "@/constants";

// styles
import { styles } from "./index.styles";

export function NoticePage() {
  const handleGoBackButtonClick = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(PATH.SETTING);
    }
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
