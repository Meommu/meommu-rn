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
