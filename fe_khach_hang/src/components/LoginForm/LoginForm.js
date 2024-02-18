import { Button, Modal } from "react-bootstrap";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { nguoiDungDangNhap } from "@api/NguoiDung";
import { useGlobal } from "@hooks";
import { Link } from "react-router-dom";

function LoginForm() {
  const [global, setGLB] = useGlobal();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [thongBao, setTB] = useState({ title: "", content: "" });
  const [thongTinDangNhap, setTTDN] = useState({
    tenDangNhap: "",
    matKhau: "",
  });

  const dangNhap = () => {
    console.log(thongTinDangNhap);
    if (!thongTinDangNhap.tenDangNhap || !thongTinDangNhap.matKhau) {
      setTB({
        title: "Đăng nhập thất bại",
        content: "vui lòng điền đầy đủ thông tin đăng nhập",
      });
      handleShow();
      return;
    }
    nguoiDungDangNhap(
      thongTinDangNhap.tenDangNhap,
      thongTinDangNhap.matKhau,
      (res) => {
        if (res.data) {
          console.log(res.data);
          const _user = res.data;
          setGLB(() => {
            return { user: _user };
          });
          link2Home.current.click();
        }
      },
      (err) => {
        setTB({
          title: "Đăng nhập thất bại",
          content: "Tài khoản hoặc mật khẩu không đúng",
        });
        handleShow();
      }
    );
  };

  useEffect(() => {
    console.log(global);
  }, [global]);

  const link2Home = useRef();

  return (
    <div className={styles.loginFormWrapper}>
      <Link ref={link2Home} to={"/"}></Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{thongBao.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{thongBao.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.loginForm}>
        <div className={styles.header}>
          <span className={styles.title}>Đăng nhập</span>
        </div>
        <div className={styles.body}>
          <input
            value={thongTinDangNhap.tenDangNhap}
            placeholder="Nhập số điện thoại"
            onChange={(e) => {
              const _value = e.target.value;
              const _newTTDN = { ...thongTinDangNhap };
              _newTTDN.tenDangNhap = _value;
              setTTDN(_newTTDN);
            }}
          />
          <input
            value={thongTinDangNhap.matKhau}
            placeholder="Nhập mật khẩu"
            onChange={(e) => {
              const _value = e.target.value;
              const _newTTDN = { ...thongTinDangNhap };
              _newTTDN.matKhau = _value;
              setTTDN(_newTTDN);
            }}
          />
        </div>
        <div className={styles.footer}>
          <div className={styles.btnLogin}>
            <button
              onClick={() => {
                dangNhap();
              }}
            >
              Đăng nhập
            </button>
          </div>
          <div className={styles.orther}>
            <div className={styles.logo}>
              <Link to={"/"}>
                <img
                  alt="logo"
                  src="https://cms-prod.s3-sgn09.fptcloud.com/smalls/logo_web_a11ae0bbab.svg"
                />
              </Link>
            </div>
            <div className={styles.options}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
