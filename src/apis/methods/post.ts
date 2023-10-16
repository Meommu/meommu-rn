import axios from "axios";

export const setUserInfo = async (email: string): Promise<void> => {
  await axios.post("/api/v1/kindergartens/signup", {
    email,
  });
};
