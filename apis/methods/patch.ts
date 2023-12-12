// axios
import axios from "axios";

export const resetPassword = async (
  password: string,
  passwordConfirm: string,
  email: string
) => {
  await axios.patch(
    "/api/v1/kindergartens/password",
    { password, passwordConfirmation: passwordConfirm },
    { params: { email } }
  );
};

export const updateProfileInfo = async (
  name: string,
  ownerName: string,
  phone: string
) => {
  await axios.patch("/api/v1/kindergartens/info", {
    name,
    ownerName,
    phone,
  });
};
