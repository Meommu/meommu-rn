// axios
import axios from "axios";

export const getEmailDuplicationStatus = async (
  email: string
): Promise<boolean> => {
  try {
    await axios.get<ResponseTemplate<null>>("/api/v1/kindergartens/email", {
      params: { email },
    });

    return true;
  } catch (e) {
    return false;
  }
};
