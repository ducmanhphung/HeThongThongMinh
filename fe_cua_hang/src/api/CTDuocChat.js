import axios from "axios";
import { BASE_URL } from "./Base";

function taoCTDuocChat(idThuoc, ctDuocChatDtos, cb1, cb2, token = null) {
  const newCtDuocChatDtos = ctDuocChatDtos.map((dc) => ({
    idThuoc: idThuoc,
    ...dc,
  }));
  console.log("newCtDuocChatDtos");

  console.log(newCtDuocChatDtos);

  const config = {
    headers: {
      token: `${token}`,
      "Content-Type": "application/json",
    },
  };

  axios
    .post(`${BASE_URL}/chitietduocchat/them`, newCtDuocChatDtos, config)
    .then(cb1)
    .catch(cb2);
}

function capNhatCTDuocChat(idThuoc, ctDuocChatDtos, cb1, cb2, token) {
  const newCtDuocChatDtos = ctDuocChatDtos.map((dc) => ({
    idThuoc: idThuoc,
    ...dc,
  }));
  const config = {
    headers: {
      token: `${token}`,
      "Content-Type": "application/json",
    },
  };
  axios
    .post(
      `${BASE_URL}/chitietduocchat/capnhat/${idThuoc}`,
      newCtDuocChatDtos,
      config
    )
    .then(cb1)
    .catch(cb2);
}

function getCTDuocChatByIdThuoc(idThuoc, cb1, cb2) {
  axios
    .get(`${BASE_URL}/chitietduocchat/thuoc`, {
      params: {
        idThuoc: idThuoc,
      },
    })
    .then(cb1)
    .catch(cb2);
}

export { taoCTDuocChat, getCTDuocChatByIdThuoc, capNhatCTDuocChat };
