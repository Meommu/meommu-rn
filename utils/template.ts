import { CODE } from "@/constants";

export const resBodyTemplate = ({
  code,
  message = "",
  data = null,
}: {
  code: CODE;
  message?: string;
  data?: unknown;
}): ResponseTemplate<unknown> => ({
  code,
  message,
  data,
});
