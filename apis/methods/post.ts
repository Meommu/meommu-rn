// axios
import axios from "axios";

export const setUserInfo = async ({
  email,
  password,
  passwordConfirm,
  kindergartenName,
  kindergartenDirectorName,
  phoneNumber,
}: SignUpFormFieldValues): Promise<void> => {
  await axios.post("/api/v1/kindergartens/signup", {
    name: kindergartenName,
    email,
    ownerName: kindergartenDirectorName,
    phone: phoneNumber,
    password,
    passwordConfirmation: passwordConfirm,
  });
};

export const signin = async (id: string, password: string): Promise<string> => {
  const {
    data: {
      data: { accessToken },
    },
  } = await axios.post<ResponseTemplate<{ accessToken: string }>>(
    "/api/v1/kindergartens/signin",
    {
      email: id,
      password,
    }
  );

  return accessToken;
};

export const uploadImage = async (formData: FormData): Promise<number> => {
  const {
    data: {
      data: {
        images: [{ id }],
      },
    },
  } = await axios.post<
    ResponseTemplate<{ images: { id: number; url: string }[] }>
  >(
    "/api/v1/images",
    /**
     * 개발 환경일 때, miragejs가 api 요청을 intercept하게 되는데,
     * formData를 읽어들이는 중 `body.forEach is not a function` 에러가 발생하여
     * 폼 데이터를 전달하지 않도록 처리함.
     */
    process.env.EXPO_PUBLIC_MODE !== "dev" && formData
  );

  return id;
};
