import { decode as atob } from "base-64";

export const b64ToBlob = (
  b64Data: string | null | undefined,
  contentType = "",
  sliceSize = 512
) => {
  const byteCharacters = atob(b64Data || "");
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const insertHyphenToPhoneNumber = (str: string) => {
  str = str.replace(/[^0-9]/g, "");

  let tmp = "";

  if (str.length < 4) {
    return str;
  } else if (str.length < 7) {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3);

    return tmp;
  } else if (str.length < 11) {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3, 3);
    tmp += "-";
    tmp += str.substr(6);

    return tmp;
  } else {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3, 4);
    tmp += "-";
    tmp += str.substr(7);

    return tmp;
  }
};

export const dateToHyphenatedYYYYMMDD = (date: Date) => {
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ].join("-");
};

export const dateToKoreanStyleYYMMDD = (date: Date) => {
  return `${date.getFullYear() % 100}년 ${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}월 ${date.getDate().toString().padStart(2, "0")}일`;
};
