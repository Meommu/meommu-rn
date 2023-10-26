// axios
import axios, { AxiosError } from "axios";

// constants
import { CODE } from "@/constants";

// utils
import { resBodyTemplate } from "@/utils";

export const getEmailDuplicationStatus = async (
  email: string
): Promise<boolean> => {
  const { code } = await (async (): Promise<ResponseTemplate<unknown>> => {
    try {
      const { data } = await axios.get<ResponseTemplate<null>>(
        "/api/v1/kindergartens/email",
        {
          params: { email },
        }
      );

      return data;
    } catch (e) {
      if (!(e instanceof AxiosError) || !e.response) {
        return resBodyTemplate({ code: CODE.INTERNAL_SERVER_ERROR });
      }

      return e.response.data;
    }
  })();

  if (code === CODE.INTERNAL_SERVER_ERROR) {
    throw new Error();
  }

  if (code === CODE.EMAIL_DUP) {
    return false;
  }

  return true;
};
