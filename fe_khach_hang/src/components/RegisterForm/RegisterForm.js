import { taoTaiKhoanNguoiDung } from "@api/NguoiDung";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [sdt, setSDT] = useState();
  const [mk, setMK] = useState();
  const [tenND, setTND] = useState();

  const [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [thongBao, setTB] = useState({ title: "", content: "" });

  return (
    <div className={styles.loginFormWrapper}>
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
          <span className={styles.title}>Đăng kí</span>
        </div>
        <div className={styles.body}>
          <input
            placeholder="Nhập tên người dùng"
            value={tenND}
            onChange={(e) => {
              const _value = e.target.value;
              setTND(_value);
            }}
          />
          <input
            placeholder="Nhập số điện thoại"
            value={sdt}
            onChange={(e) => {
              const _value = e.target.value;
              setSDT(_value);
            }}
          />
          <input
            placeholder="Nhập mật khẩu"
            value={mk}
            onChange={(e) => {
              const _value = e.target.value;
              setMK(_value);
            }}
          />
        </div>
        <div className={styles.footer}>
          <div className={styles.btnLogin}>
            <button
              onClick={() => {
                if (!sdt || !mk || !tenND) {
                  setTB({
                    title: "Vui lòng điền đầy đủ thông tin",
                    content: "",
                  });
                  handleShow();
                  return;
                }
                taoTaiKhoanNguoiDung(
                  sdt,
                  mk,
                  tenND,
                  (res) => {
                    setTB({
                      title: "Đăng kí thành công",
                      content: "",
                    });
                    handleShow();
                  },
                  (err) => {
                    setTB({
                      title: "Đăng kí thất bại",
                      content: "",
                    });
                    handleShow();
                  }
                );
              }}
            >
              Đăng ký
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

export default RegisterForm;
