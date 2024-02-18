import Header from "@components/header/Header";
import style from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDebounces, useGlobal } from "@hooks";
import { Button, Modal } from "react-bootstrap";
import { checkTenThuongHieu, taoThuongHieu } from "@api/ThuongHieu";
import { Link } from "react-router-dom";

function ThemThuongHieu() {
  const inputTenNhom = useRef();

  const [errTenNhom, setETN] = useState();
  const [tenNhom, setTN] = useState("");

  const tenNhomDB = useDebounces(tenNhom, 500);

  useEffect(() => {
    checkTenThuongHieu(
      tenNhomDB,
      (res) => {
        if (res.data) {
          setETN("Tên thương hiệu đã tồn tại");
        } else {
          setETN(null);
        }
      },
      (err) => {}
    );
  }, [tenNhomDB]);

  const handleThemNhom = () => {
    if (errTenNhom) {
      inputTenNhom.current.focus();
      return;
    }
    if (!tenNhom) {
      inputTenNhom.current.focus();
      setETN("Không được để trống tên thương hiệu");
      return;
    }

    taoThuongHieu(
      tenNhom,
      (res) => {
        setTB({ title: "Đã thêm thương hiệu", content: "" });
        handleShowModal();
      },
      (err) => {
        if (err.code === "ERR_NETWORK") {
          redirectDangNhap.current.click();
        }
        setTB({ title: "Không thể thêm thương hiệu", content: "" });
        handleShowModal();
      },
      globalSTT?.user?.token
    );
  };

  const [globalSTT, setGLB] = useGlobal();
  const [showModal, setSMD] = useState(false);

  const handleCloseModal = () => setSMD(false);
  const handleShowModal = () => setSMD(true);
  const [thongBao, setTB] = useState({
    title: "Xóa thương hiệu",
    content: "",
  });

  const redirectDangNhap = useRef();

  return (
    <div className={style.pageWrapper}>
      <Link ref={redirectDangNhap} to="/dang-nhap"></Link>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{thongBao.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{thongBao.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.page}>
        <div className={style.header}>
          <h1>Thêm thương hiệu</h1>
        </div>
        <div className={style.body}>
          <div className={style.inputGroup}>
            <label htmlFor="tenNhom">Tên thương hiệu</label>
            <input
              ref={inputTenNhom}
              type="text"
              id="tenNhom"
              value={tenNhom}
              onChange={(e) => {
                const _value = e.target.value;
                setTN(_value);
              }}
            />
            {errTenNhom && <span className={style.error}>{errTenNhom}</span>}
          </div>

          <div className={style.inputGroup}>
            <input
              type="button"
              value={"Thêm"}
              onClick={() => {
                handleThemNhom();
              }}
            />
          </div>
        </div>
        <div className={style.footer}></div>
      </div>
    </div>
  );
}

export default ThemThuongHieu;
