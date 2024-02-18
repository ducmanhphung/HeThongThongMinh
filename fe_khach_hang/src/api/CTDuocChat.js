import axios from "axios";
import { BASE_URL } from "./Base";

function taoCTDuocChat(ctDuocChatDtos, cb1, cb2) {
  axios
    .post(`${BASE_URL}/chitietduocchat/them`, ctDuocChatDtos)
    .then(cb1)
    .catch(cb2);
}

export { taoCTDuocChat };
