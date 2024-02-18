import axios from "axios";
import { BASE_URL } from "./Base";

function getDonHangsByNguoiDung(idNguoiDung, token, whenSuccess, whenErr) {
  const configs = {
    headers: {
      token: token,
    },
  };
  axios
    .get(`${BASE_URL}/donhang/${idNguoiDung}`, configs)
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

function themDonHang(donHang, idNguoiDung, token, whenSuccess, whenErr) {
  const data = {
    id: 0,
    idNguoiDung: idNguoiDung,
    soDienThoai: donHang.sdt,
    tenNguoiNhan: donHang.tenNguoiNhan,
    diaChi: donHang.diaChi,
    trangThai: 0,
    thoiGian: Date.now(),
  };
  console.log(data);
  const configs = {
    headers: {
      accept: "application/json",
      token: token,
    },
  };
  axios
    .post(`${BASE_URL}/donhang/tao`, data, configs)
    .then(whenSuccess)
    .catch(whenErr);
}

function themChiTietDonHang(chiTiets, token, whenSuccess, whenErr) {
  const data = chiTiets;
  console.log(data);
  const configs = {
    headers: {
      accept: "application/json",
      token: token,
    },
  };
  axios
    .post(`${BASE_URL}/chitietdonhang/tao`, data, configs)
    .then(whenSuccess)
    .catch(whenErr);
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

function daNhanDonHang(idDonHang, token, whenSuccess, whenErr) {
  const configs = {
    headers: {
      token: token,
    },
  };
  axios
    .put(`${BASE_URL}/donhang/danhan/${idDonHang}`, null, configs)
    .then(whenSuccess)
    .catch(whenErr);
}

export {
  themDonHang,
  themChiTietDonHang,
  getDonHangsByNguoiDung,
  getDonHangById,
  getCTDonHangByIdDonHang,
  huyDonHang,
  daNhanDonHang,
};
