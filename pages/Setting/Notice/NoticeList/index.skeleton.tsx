// react
import { View } from "react-native";

// components
import { NoticeItemSkeleton } from "./NoticeItem/index.skeleton";

export function NoticeListSkeleton() {
  return (
    <View>
      {Array(3)
        .fill(null)
        .map((_, i) => {
          return <NoticeItemSkeleton key={i} />;
        })}
    </View>
  );
}
