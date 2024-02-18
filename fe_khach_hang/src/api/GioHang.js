import axios from "axios";
import { BASE_URL } from "./Base";

function themCtGioHang(idThuoc, idNguoiDung, token, whenSuccess, whenErr) {
  const data = {
    id: 0,
    idThuoc: idThuoc,
    idNguoiDung: idNguoiDung,
  };
  const configs = {
    headers: {
      accept: "application/json",
      token: token,
    },
  };
  axios
    .post(`${BASE_URL}/chitietgiohang/them`, data, configs)
    .then(whenSuccess)
    .catch(whenErr);
}

function getGioHangByIdNguoiDung(token, idNguoiDung, whenSuccess, whenErr) {
  const configs = {
    headers: {
      token: token,
    },
    params: {
      idNguoiDung: idNguoiDung,
    },
  };
  axios
    .get(`${BASE_URL}/chitietgiohang/nguoidung`, configs)
    .then(whenSuccess)
    .catch(whenErr);
}

function xoaCTGioHang(idCTGioHang, token, cb1, cb2) {
  const configs = {
    headers: {
      token: token,
    },
    params: {
      idCTGioHang,
    },
  };
  axios.delete(`${BASE_URL}/chitietgiohang/xoa`, configs).then(cb1).catch(cb2);
}

export { themCtGioHang, getGioHangByIdNguoiDung, xoaCTGioHang };
