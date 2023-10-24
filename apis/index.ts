import * as GET from "./methods/get";
import * as POST from "./methods/post";

import axios from "axios";

if (process.env.NODE_ENV !== "development") {
  axios.defaults.baseURL =
    "https://port-0-meommu-api-jvvy2blm5wku9j.sel5.cloudtype.app";
}

export const apiService = {
  ...GET,
  ...POST,
};
