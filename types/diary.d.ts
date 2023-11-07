type Diary = {
  id: number;
  date: string;
  dogName: string;
  createdAt: Date;
  imageIds: number[];
  title: string;
  content: string;
};

type DiarySummary = Omit<Diary, "dogName" | "title" | "content">;

type DiaryImage = {
  id: number;
  url: string;
};
