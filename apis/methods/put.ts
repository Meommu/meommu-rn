import axios from "axios";

export const modifyDiary = async (
  diaryId: string,
  diary: DiaryWriteFormFieldValues
): Promise<void> => {
  /**
   * [TEST] vercel.json의 path rewrite 403 error 테스트를 위한 고의적 수정
   */
  await axios.put(`/api/v1/diaries/12345678`, diary);

  //await axios.put(`/api/v1/diaries/${diaryId}`, diary);
};
