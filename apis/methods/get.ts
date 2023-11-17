// axios
import axios from "axios";
import { baseUrl } from "..";

// html2canvas
import html2canvas from "html2canvas";

export const getEmailDuplicationStatus = async (
  email: string
): Promise<boolean> => {
  const {
    data: { data },
  } = await axios.get<ResponseTemplate<boolean>>(
    "/api/v1/kindergartens/email",
    {
      params: { email },
    }
  );

  return data;
};

export const getDiaries = async (
  year: number,
  month: number
): Promise<Diary[]> => {
  const {
    data: {
      data: { diaries },
    },
  } = await axios.get<ResponseTemplate<{ diaries: Diary[] }>>(
    "/api/v1/diaries",
    {
      params: {
        year,
        month,
      },
    }
  );

  return diaries;
};

export const getLoginInfo = async (): Promise<User> => {
  const {
    data: { data },
  } = await axios.get<ResponseTemplate<User>>("/api/v1/kindergartens/me");

  return data;
};

export const getDiariesSummary = async (): Promise<DiarySummary[]> => {
  const {
    data: {
      data: { diaries },
    },
  } = await axios.get<ResponseTemplate<{ diaries: DiarySummary[] }>>(
    "/api/v1/diaries/summary"
  );

  return diaries;
};

export const getImageUrl = async (imageId: number): Promise<DiaryImage> => {
  const {
    data: { data },
  } = await axios.get<ResponseTemplate<DiaryImage>>(
    `/api/v1/images/${imageId}`
  );

  return data;
};

/**
 * 항상 내부적으로 api를 요청하지는 않지만, html에 이미지가 존재하는 경우 api 요청이 이루어지므로
 * api 주소를 한 곳에서 집중적으로 관리할 필요가 있어 해당 파일 다른 api 함수와 같은 형태로 작성함.
 */
export const getCanvasWithHtmlWithImage = async (
  element: HTMLElement
): Promise<HTMLCanvasElement> => {
  const canvas = await html2canvas(element, {
    proxy: `${baseUrl}/html2canvas/proxy.json`,
  });

  return canvas;
};
