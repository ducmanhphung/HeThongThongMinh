import axios from "axios";
import { BASE_URL } from "./Base";

function nhanVienDangNhap(tenDangNhap, matKhau, whenSuccess, whenErr) {
  axios
    .post(`${BASE_URL}/taikhoannhanvien/dangnhap`, { tenDangNhap, matKhau })
    .then(whenSuccess)
    .catch(whenErr);
}

export { nhanVienDangNhap };
