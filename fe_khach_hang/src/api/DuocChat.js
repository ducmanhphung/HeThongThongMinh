import axios from "axios";
import { BASE_URL } from "./Base";

function getAllDuocChat(cb1, cb2) {
  axios.get(`${BASE_URL}/duocchat`).then(cb1).catch(cb2);
}

function getPageDuocChat(pageIndex, cb1, cb2) {
  axios
    .get(`${BASE_URL}/duocchat/page`, {
      params: {
        pageIndex,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function checkTenDuocChat(tenDuocChat, cb1, cb2) {
  axios
    .get(`${BASE_URL}/duocchat/checktenduocchat`, { params: { tenDuocChat } })
    .then(cb1)
    .catch(cb2);
}

function taoDuocChat(duocChatDto, cb1, cb2) {
  axios.post(`${BASE_URL}/duocchat/tao`, duocChatDto).then(cb1).catch(cb2);
}

function suaDuocChat(duocChatDto, cb1, cb2) {
  axios.put(`${BASE_URL}/duocchat/sua`, duocChatDto).then(cb1).catch(cb2);
}

function xoaDuocChat(idDuocChat, cb1, cb2) {
  axios
    .delete(`${BASE_URL}/duocchat/xoa`, {
      params: {
        idDuocChat,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function getDuocChatById(idDuocChat, cb1, cb2) {
  axios.get(`${BASE_URL}/duocchat/${idDuocChat}`).then(cb1).catch(cb2);
}

export {
  getAllDuocChat,
  getPageDuocChat,
  checkTenDuocChat,
  taoDuocChat,
  suaDuocChat,
  xoaDuocChat,
  getDuocChatById,
};
