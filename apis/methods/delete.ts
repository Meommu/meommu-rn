import axios from "axios";

export const deleteDiary = async (diaryId: string): Promise<void> => {
  await axios.delete(`/api/v1/diaries/${diaryId}`);
};
