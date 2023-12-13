// react

import { useQuery } from "react-query";

// components
import { NoticeItem } from "./NoticeItem";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";

// apis
import { apiService } from "@/apis";

export function NoticeList() {
  const { data: notices } = useQuery(
    ["notices"],
    async () => {
      const notices = await apiService.getNotices();

      return notices;
    },
    {
      suspense: true,
    }
  );

  return (
    <NonIndicatorScrollView>
      {notices &&
        notices.map((notice) => {
          const { id, content, createdAt } = notice;

          const date = new Date(createdAt);

          return <NoticeItem date={date} content={content} key={id} />;
        })}
    </NonIndicatorScrollView>
  );
}
