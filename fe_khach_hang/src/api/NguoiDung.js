import axios from "axios";
import { BASE_URL } from "./Base";

function nguoiDungDangNhap(tenDangNhap, matKhau, whenSuccess, whenErr) {
  axios
    .post(`${BASE_URL}/nguoidung/dangnhap`, { tenDangNhap, matKhau })
    .then(whenSuccess)
    .catch(whenErr);
}

function taoTaiKhoanNguoiDung(
  tenDangNhap,
  matKhau,
  tenNguoiDung,
  whenSuccess,
  whenErr
) {
  const _data = {
    id: 0,
    soDienThoai: tenDangNhap,
    matKhau: matKhau,
    tenNguoiDung: tenNguoiDung,
    token: "",
  };
  axios
    .post(`${BASE_URL}/nguoidung/tao`, _data)
    .then(whenSuccess)
    .catch(whenErr);
}

export { nguoiDungDangNhap, taoTaiKhoanNguoiDung };
