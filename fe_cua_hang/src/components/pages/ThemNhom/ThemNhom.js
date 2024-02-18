import Header from "@components/header/Header";
import style from "./style.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounces, useGlobal } from "@hooks";
import { checkTenNhom, taoNhom } from "@api/Nhom";
import { Button, Modal } from "react-bootstrap";

function ThemNhom() {
  const inputTenNhom = useRef();

  const [errTenNhom, setETN] = useState();
  const [tenNhom, setTN] = useState();
  const [imgSrc, setIS] = useState();

  const [globalSTT, setGLB] = useGlobal();

  const tenNhomDB = useDebounces(tenNhom, 500);

  useEffect(() => {
    checkTenNhom(
      tenNhomDB,
      (res) => {
        if (res.data) {
          setETN("Tên nhóm đã tồn tại");
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
      setETN("Không được để trống tên nhóm");
      return;
    }

    taoNhom(
      tenNhom,
      (res) => {
        setTB({ title: "Đã thêm nhóm", content: "" });
        handleShowModal();
      },
      (err) => {
        setTB({ title: "Không thể thêm nhóm", content: "" });
        handleShowModal();
      },
      globalSTT?.user?.token
    );
  };

  const [showModal, setSMD] = useState(false);

  const handleCloseModal = () => setSMD(false);
  const handleShowModal = () => setSMD(true);
  const [thongBao, setTB] = useState({
    title: "Xóa nhóm",
    content: "",
  });

  return (
    <div className={style.pageWrapper}>
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
          <h1>Thêm nhóm</h1>
        </div>
        <div className={style.body}>
          <div className={style.inputGroup}>
            <label htmlFor="tenNhom">Tên nhóm</label>
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

export default ThemNhom;
