type GuideGuide = {
  id: number;
  guide: string;
  description: string;
};

type GuideDetail = {
  id: number;
  detail: string;
};

type GuideElement = {
  type: "list" | "input";

  /**
   * items의 제일 마지막 요소는 사용자가 `나만의 문장`을 입력하기 위한 요소이다.
   */
  items: GuideElementItem[];
};

type GuideElementItem = {
  isSelect: boolean;
  sentence: string;

  /**
   * 1단계일 경우 존재
   */
  description?: string;
};
