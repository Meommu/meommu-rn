import { CODE } from "@/constants";

declare global {
  type ResponseTemplate<T> = {
    code: CODE;
    message: string;
    data: T;
  };
}
