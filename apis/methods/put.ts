import axios from "axios";

export const modifyDiary = async (
  diaryId: string,
  diary: DiaryWriteFormFieldValues
): Promise<void> => {
  await axios.put(`/api/v1/diaries/${diaryId}`, diary);
};
