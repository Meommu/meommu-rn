// axios
import axios from "axios";

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
