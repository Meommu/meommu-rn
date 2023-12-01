// react
import { View } from "react-native";
import { useCallback, Suspense } from "react";

// expo
import { router } from "expo-router";

// components
import { GoBackButton } from "@/components/Button/GoBackButton";
import { Header } from "@/components/Layout/Header";

// constants
import { PATH } from "@/constants";

// styles
import { styles } from "./index.styles";
import { NoticeList } from "./NoticeList";
import { NoticeListSkeleton } from "./NoticeList/index.skeleton";

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
          left={<GoBackButton onPress={handleGoBackButtonClick} />}
        />
      </View>

      <Suspense fallback={<NoticeListSkeleton />}>
        <NoticeList />
      </Suspense>
    </View>
  );
}
