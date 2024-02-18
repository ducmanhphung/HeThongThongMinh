import axios from "axios";
import { BASE_URL } from "./Base";

function callAppPhanCum(whenSuccess, whenErr) {
  axios.get(`${BASE_URL}/runapp`).then(whenSuccess).catch(whenErr);
}

function checkRunApp(whenSuccess, whenErr) {
  axios.get(`${BASE_URL}/runapp/check`).then(whenSuccess).catch(whenErr);
}

export { callAppPhanCum, checkRunApp };
