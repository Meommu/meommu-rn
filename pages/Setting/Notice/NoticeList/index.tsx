// react

import { useQuery } from "react-query";

// components
import { NoticeItem } from "./NoticeItem";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";

// apis
import axios from "axios";

export function NoticeList() {
  const { data: notices } = useQuery(
    ["notices"],
    async () => {
      const {
        data: {
          data: { notices },
        },
      } = await axios.get<
        ResponseTemplate<{
          notices: {
            id: number;
            title: string;
            content: string;
            createdAt: Date;
          }[];
        }>
      >("/api/v1/notices");

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
