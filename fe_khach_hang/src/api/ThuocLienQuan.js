import axios from "axios";
import { BASE_URL } from "./Base";

function getThuocLienQuanByIdThuoc(idThuoc, whensuccess, whenError) {
  axios
    .get(`${BASE_URL}/thuoclienquan`, {
      params: {
        idThuoc: idThuoc,
      },
    })
    .then(whensuccess)
    .catch(whenError);
}

export { getThuocLienQuanByIdThuoc };
