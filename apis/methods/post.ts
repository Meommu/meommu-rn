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
