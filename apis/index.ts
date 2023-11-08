import * as GET from "./methods/get";
import * as POST from "./methods/post";

import axios from "axios";

import { Platform } from "react-native";

const devApiUrl =
  "https://port-0-meommu-api-jvvy2blm5wku9j.sel5.cloudtype.app/";

/**
 * 운영용 API가 현재 존재하지 않기 때문에 개발용 API와 주소가 같은 상태
 */
const prodApiUrl =
  "https://port-0-meommu-api-jvvy2blm5wku9j.sel5.cloudtype.app/";

switch (process.env.EXPO_PUBLIC_MODE) {
  case "dev":
    /**
     * 캐싱 여부를 확인하기 위해 0.5초에서 1초 사이의 시간으로 지연이 발생하게끔 함.
     */
    axios.interceptors.request.use((config) => {
      const delay = Math.floor(Math.random() * 501) + 500;

      if (config.method === "get") {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(config);
          }, delay);
        });
      }

      return config;
    });

    break;
  case "qa":
    axios.defaults.baseURL = devApiUrl;

    break;
  case "prod":
  default:
    if (Platform.OS !== "web") {
      axios.defaults.baseURL = prodApiUrl;
    }

    break;
}

export const apiService = {
  ...GET,
  ...POST,
};
