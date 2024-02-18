import { useRef, useState } from "react";
import style from "./style.module.scss";
import { Spinner } from "react-bootstrap";
import { nhanVienDangNhap } from "@api/NhanVien";
import { useGlobal } from "@hooks";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [globalState, setGLBSS] = useGlobal();
  const [dangDangNhap, setDDN] = useState();
  const [dangNhapThatBai, setDNTB] = useState();
  const [thongTinDangNhap, setTTDN] = useState({
    tenDangNhap: "",
    matKhau: "",
  });
  const dangNhap = () => {
    setDDN(true);
    if (!thongTinDangNhap.tenDangNhap && thongTinDangNhap.matKhau == "") {
      setDNTB("Vui lòng điền đầy đủ thông tin!");
    } else {
      nhanVienDangNhap(
        thongTinDangNhap.tenDangNhap,
        thongTinDangNhap.matKhau,
        (res) => {
          if (res.data) {
            setGLBSS(() => {
              return { user: res.data };
            });
            link2Home.current.click();
          } else {
            setDNTB("Đăng nhập thất bại vui lòng kiểm tra lại");
          }
        },
        (err) => {
          setDNTB("Đăng nhập thất bại vui lòng kiểm tra lại");
          console.log(err);
        }
      );
    }
    setDDN(false);
  };

  const link2Home = useRef();

  return (
    <div className={style.loginWrapper}>
      <Link ref={link2Home} to={"/"}></Link>
      <div className={style.login}>
        <div className={style.header}>
          <h1>Đăng nhập</h1>
        </div>
        {dangDangNhap === true ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div className={style.body}>
            <div className={style.inputGroup}>
              <label htmlFor="tenDangNhap">Tên đăng nhập</label>
              <input
                type="text"
                id="tenDangNhap"
                value={thongTinDangNhap.tenDangNhap}
                onChange={(e) => {
                  const _value = e.target.value;
                  const _newTTDN = { ...thongTinDangNhap, tenDangNhap: _value };
                  setTTDN(_newTTDN);
                }}
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="matKhau">Mật khẩu</label>
              <input
                type="text"
                id="matKhau"
                value={thongTinDangNhap.matKhau}
                onChange={(e) => {
                  const _value = e.target.value;
                  const _newTTDN = { ...thongTinDangNhap, matKhau: _value };
                  setTTDN(_newTTDN);
                }}
              />
            </div>

            <div className={style.inputGroup}>
              <input
                type="button"
                value={"Đăng nhập"}
                onClick={() => {
                  dangNhap();
                }}
              />
            </div>
            {dangNhapThatBai && (
              <span className={style.error}>{dangNhapThatBai}</span>
            )}
          </div>
        )}
        <div className={style.footer}></div>
      </div>
    </div>
  );
}

export default Login;
