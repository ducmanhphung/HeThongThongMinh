import axios from "axios";
import { BASE_URL } from "./Base";

function getAllNhom(cb1, cb2) {
  axios.get(`${BASE_URL}/nhom`).then(cb1).catch(cb2);
}

function getPageNhom(pageIndex, cb1, cb2) {
  axios
    .get(`${BASE_URL}/nhom/page`, {
      params: {
        pageIndex,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function getNhomById(idNhom, cb1, cb2) {
  axios.get(`${BASE_URL}/nhom/${idNhom}`).then(cb1).catch(cb2);
}

function checkTenNhom(tenNhom, cb1, cb2) {
  axios
    .get(`${BASE_URL}/nhom/checktennhom`, { params: { tenNhom } })
    .then(cb1)
    .catch(cb2);
}

function taoNhom(tenNhom, cb1, cb2, token = null) {
  console.log(token);
  const config = {
    headers: {
      token: `${token}`,
      accept: "application/json",
    },
    params: {
      tenNhom: tenNhom,
    },
  };

  axios.post(`${BASE_URL}/nhom/tao`, null, config).then(cb1).catch(cb2);
}

function suaNhom(idNhom, tenNhom, cb1, cb2, token = null) {
  const config = {
    headers: {
      token: `${token}`,
      accept: "application/json",
    },
    params: {
      idNhom: idNhom,
      tenNhom: tenNhom,
    },
  };

  axios.put(`${BASE_URL}/nhom/sua`, null, config).then(cb1).catch(cb2);
}

function xoaNhom(idNhom, cb1, cb2, token = null) {
  const config = {
    headers: {
      token: `${token}`,
    },
    params: {
      idNhom,
    },
  };
  axios.delete(`${BASE_URL}/nhom/xoa`, config).then(cb1).catch(cb2);
}

export {
  getAllNhom,
  getNhomById,
  getPageNhom,
  checkTenNhom,
  taoNhom,
  suaNhom,
  xoaNhom,
};
