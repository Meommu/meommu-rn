import axios from "axios";

export const setUserInfo = async (email: string): Promise<void> => {
  await axios.post("/api/v1/kindergartens/signup", {
    email,
  });
};

export const signin = async (
  id: string,
  password: string
): Promise<string | null> => {
  const {
    data: { code, message, data },
  } = await axios.post<ResponseTemplate<{ accessToken: string }>>(
    "/api/v1/kindergartens/signin",
    {
      email: id,
      password,
    }
  );

  /**
   * 4xx, 5xx 응답일 경우 axios에서 자체적인 오류를 반환하므로,
   * 현재 코드 값 체크는 의미가 없음.
   */
  if (code === "0000") {
    return data.accessToken;
  }

  return null;
};
