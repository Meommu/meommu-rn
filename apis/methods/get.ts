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

export const getDiaryDetail = async (diaryId: string): Promise<Diary> => {
  const {
    data: { data },
  } = await axios.get<ResponseTemplate<Diary>>(`/api/v1/diaries/${diaryId}`);

  return data;
};

export const getSharedDiaryDetail = async (uuid: string): Promise<Diary> => {
  const {
    data: { data },
  } = await axios.get<ResponseTemplate<Diary>>(
    `/api/v1/diaries/shared/${uuid}`
  );

  return data;
};

export const getDiaryShareUUID = async (diaryId: string): Promise<string> => {
  const {
    data: {
      data: { uuid },
    },
  } = await axios.get<ResponseTemplate<{ uuid: string }>>(
    `/api/v1/diaries/${diaryId}/share-uuid`
  );

  return uuid;
};

export const getImageUrl = async (imageId: number): Promise<DiaryImage> => {
  const {
    data: { data },
  } = await axios.get<ResponseTemplate<DiaryImage>>(
    `/api/v1/images/${imageId}`
  );

  return data;
};

export const getGuideGuides = async (): Promise<GuideGuide[]> => {
  const {
    data: {
      data: { guides },
    },
  } = await axios.get<ResponseTemplate<{ guides: GuideGuide[] }>>(
    "/api/v1/guides"
  );

  return guides;
};

export const getGuideDetails = async (
  guideId: number
): Promise<GuideDetail[]> => {
  const {
    data: {
      data: { details },
    },
  } = await axios.get<ResponseTemplate<{ details: GuideDetail[] }>>(
    `/api/v1/guides/${guideId}/details`
  );

  return details;
};
