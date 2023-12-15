// expo
import Head from "expo-router/head";

// constants
import { domain } from "@/constants";

// components
import { RootLayout } from "@/pages/RootLayout";

export default function AppLayout() {
  return (
    <>
      <Head>
        <title>Meommu</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={require("@/assets/open-graph-image.png")}
        />
        <meta
          property="og:title"
          content="멈무 일기 - GPT 가이드와 함께하는 애견 일지"
        />
        <meta
          property="og:description"
          content="우리 강아지 일기가 도착했어요!"
        />
        <meta property="og:url" content={domain.FE_DOMAIN} />
      </Head>
      <RootLayout />
    </>
  );
}
