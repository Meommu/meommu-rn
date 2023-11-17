// react
import { Platform } from "react-native";

// axios
import axios from "axios";
import * as GET from "./methods/get";
import * as POST from "./methods/post";

// utils
import { createRandomNumberInRange } from "@/utils";

export let baseUrl = "";

switch (process.env.EXPO_PUBLIC_MODE) {
  case "dev":
    /**
     * 캐싱 여부를 확인하기 위해 0.5초에서 1초 사이의 시간으로 지연이 발생하게끔 함.
     */
    axios.interceptors.request.use((config) => {
      const delay = createRandomNumberInRange(500, 1000);

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
    baseUrl = "https://port-0-meommu-api-jvvy2blm5wku9j.sel5.cloudtype.app";

    axios.defaults.baseURL = baseUrl;

    break;

  case "prod":
  default:
    /**
     * 웹 환경 프론트엔드는 vercel를 이용함.
     *
     * `/vercel.json`에 설정해 둔 운영용 url 주소로 프록시되기 때문에 웹이 아닌 환경에서만 baseUrl를 설정함.
     *
     * 운영용 API가 현재 존재하지 않기 때문에 개발용 API와 주소가 같은 상태
     */
    if (Platform.OS !== "web") {
      baseUrl = "https://port-0-meommu-api-jvvy2blm5wku9j.sel5.cloudtype.app";

      axios.defaults.baseURL = baseUrl;
    }

    break;
}

export const apiService = {
  ...GET,
  ...POST,
};
