// expo
import Head from "expo-router/head";

// components
import { RootLayout } from "@/pages/RootLayout";

export default function AppLayout() {
  return (
    <>
      <Head>
        <title>Meommu</title>
        <meta property="og:type" content="website" />
        <meta property="og:image" content="공유시 보여질 이미지 경로" />
        <meta property="og:title" content="공유시 보여질 제목" />
        <meta property="og:description" content="공유시 보여질 설명" />
        <meta property="og:url" content="공유시 이동 url" />
      </Head>
      <RootLayout />
    </>
  );
}
