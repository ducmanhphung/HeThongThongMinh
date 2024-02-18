import axios from "axios";
import { BASE_URL } from "./Base";

function getAllThuongHieu(cb1, cb2) {
  axios.get(`${BASE_URL}/thuonghieu`).then(cb1).catch(cb2);
}

function getPageThuongHieu(pageIndex, cb1, cb2) {
  axios
    .get(`${BASE_URL}/thuonghieu/page`, {
      params: {
        pageIndex,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function checkTenThuongHieu(tenThuongHieu, cb1, cb2) {
  axios
    .get(`${BASE_URL}/thuonghieu/checktenthuonghieu`, {
      params: { tenThuongHieu },
    })
    .then(cb1)
    .catch(cb2);
}

function xoaThuongHieu(idThuongHieu, cb1, cb2, token = null) {
  const config = {
    headers: {
      token: `${token}`,
    },
    params: {
      idThuongHieu,
    },
  };
  axios.delete(`${BASE_URL}/thuonghieu/xoa`, config).then(cb1).catch(cb2);
}

function getThuongHieuById(idThuongHieu, cb1, cb2) {
  axios.get(`${BASE_URL}/thuonghieu/${idThuongHieu}`).then(cb1).catch(cb2);
}
function taoThuongHieu(tenThuongHieu, cb1, cb2, token = null) {
  const config = {
    headers: {
      token: `${token}`,
      accept: "application/json",
    },
    params: {
      tenthuongHieu: tenThuongHieu,
    },
  };

  axios
    .post(`${BASE_URL}/thuonghieu/tao`, null, config)
    .then(cb1)
    .catch(cb2)
    .catch((err) => {
      console.log(err);
    });
}

function suaThuongHieu(idThuongHieu, tenThuongHieu, cb1, cb2, token = null) {
  const config = {
    headers: {
      token: `${token}`,
      accept: "application/json",
    },
    params: {
      idThuongHieu: idThuongHieu,
      tenThuongHieu: tenThuongHieu,
    },
  };

  axios.put(`${BASE_URL}/thuonghieu/sua`, null, config).then(cb1).catch(cb2);
}

export {
  getAllThuongHieu,
  getPageThuongHieu,
  checkTenThuongHieu,
  taoThuongHieu,
  suaThuongHieu,
  xoaThuongHieu,
  getThuongHieuById,
};
