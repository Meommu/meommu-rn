// react
import { Platform } from "react-native";

// axios
import axios from "axios";
import * as GET from "./methods/get";
import * as POST from "./methods/post";
import * as PUT from "./methods/put";
import * as DELETE from "./methods/delete";

// utils
import { createRandomNumberInRange } from "@/utils";

/**
 * 운영용 API가 현재 존재하지 않기 때문에 API와 주소가 같은 상태
 */
export const qaApiUrl =
  "https://port-0-meommu-api-jvvy2blm5wku9j.sel5.cloudtype.app";

export const prodApiUrl =
  "https://port-0-meommu-api-jvvy2blm5wku9j.sel5.cloudtype.app";

export let baseURL = "";

switch (process.env.EXPO_PUBLIC_MODE) {
  case "dev":
    /**
     * 캐싱 여부를 확인하기 위해 0.5초에서 1초 사이의 시간으로 지연이 발생하게끔 함.
     */
    axios.interceptors.request.use((config) => {
      const delay = createRandomNumberInRange(500, 1000);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(config);
        }, delay);
      });
    });

    break;

  case "qa":
    /**
     * Metro bundler를 사용하고 있어 Webpack의 DevServerProxy와 같은 기능을 이용할 수 없기 때문에
     * 웹 환경에서도 baseURL를 설정해서 사용하되, CORS 에러가 발생하지 않도록 처리한 개발용 API 서버를 사용함.
     */
    baseURL = qaApiUrl;

    axios.defaults.baseURL = baseURL;

    break;

  case "prod":
  default:
    baseURL = prodApiUrl;

    /**
     * 웹 환경에서는 외부 서버로 요청을 보낼 시 CORS 에러가 발생하기 때문에
     * 따로 baseURL를 지정하지 않고, 배포 환경(vercel)의 proxy 기능을 이용함.
     * `/vercel.json` 파일을 보면 운영용 url로 proxy되도록 하기 위한 설정이 되어있음.
     */
    if (Platform.OS === "web") {
      break;
    }

    axios.defaults.baseURL = baseURL;

    break;
}

export const apiService = {
  ...GET,
  ...POST,
  ...PUT,
  ...DELETE,
};
