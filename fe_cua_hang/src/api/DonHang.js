import axios from "axios";
import { BASE_URL } from "./Base";

function getAllDonHang(whenSuccess, whenErr) {
  axios.get(`${BASE_URL}/donhang`).then(whenSuccess).catch(whenErr);
}

function huyDonHang(idDonHang, token, whenSuccess, whenErr) {
  const configs = {
    headers: {
      token: token,
    },
  };
  axios
    .put(`${BASE_URL}/donhang/huy/${idDonHang}`, null, configs)
    .then(whenSuccess)
    .catch(whenErr);
}

function duyetDonHang(idDonHang, token, whenSuccess, whenErr) {
  const configs = {
    headers: {
      token: token,
    },
  };
  axios
    .put(`${BASE_URL}/donhang/duyet/${idDonHang}`, null, configs)
    .then(whenSuccess)
    .catch(whenErr);
}

function daGiaoDonHang(idDonHang, token, whenSuccess, whenErr) {
  const configs = {
    headers: {
      token: token,
    },
  };
  axios
    .put(`${BASE_URL}/donhang/dagiao/${idDonHang}`, null, configs)
    .then(whenSuccess)
    .catch(whenErr);
}

function getDonHangById(idDonHang, token, whenSuccess, whenErr) {
  const configs = {
    headers: {
      token: token,
    },
  };
  axios
    .get(`${BASE_URL}/donhang/byid/${idDonHang}`, configs)
    .then(whenSuccess)
    .catch(whenErr);
}

function getCTDonHangByIdDonHang(idDonHang, token, whenSuccess, whenErr) {
  const configs = {
    headers: {
      token: token,
    },
    params: {
      idDonHang: idDonHang,
    },
  };
  axios
    .get(`${BASE_URL}/chitietdonhang/donhang`, configs)
    .then(whenSuccess)
    .catch(whenErr);
}

export {
  getAllDonHang,
  huyDonHang,
  duyetDonHang,
  daGiaoDonHang,
  getDonHangById,
  getCTDonHangByIdDonHang,
};
