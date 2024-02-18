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

function taoNhom(tenNhom, fileHinhAnh, cb1, cb2) {
  const formData = new FormData();
  formData.append("hinhAnh", fileHinhAnh);
  formData.append("tenNhom", tenNhom);

  axios
    .post(`${BASE_URL}/nhom/tao`, formData, {
      headers: {
        accept: "application/json",
        "Content-Type": `multipart/form-data;`,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function suaNhom(idNhom, tenNhom, fileHinhAnh, tenHinhAnhCu, cb1, cb2) {
  const formData = new FormData();
  formData.append("idNhom", idNhom);
  formData.append("tenNhom", tenNhom);
  formData.append("hinhAnh", fileHinhAnh);
  formData.append("tenHinhAnhCu", tenHinhAnhCu);

  axios
    .put(`${BASE_URL}/nhom/sua`, formData, {
      headers: {
        accept: "application/json",
        "Content-Type": `multipart/form-data;`,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function xoaNhom(idNhom, cb1, cb2) {
  axios
    .delete(`${BASE_URL}/nhom/xoa`, {
      params: {
        idNhom,
      },
    })
    .then(cb1)
    .catch(cb2);
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
