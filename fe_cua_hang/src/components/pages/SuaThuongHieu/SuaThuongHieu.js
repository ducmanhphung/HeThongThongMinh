import Header from "@components/header/Header";
import style from "./style.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounces } from "@hooks";
import { checkTenNhom, getNhomById, suaNhom } from "@api/Nhom";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@api/Base";
import { getThuocById } from "@api/Thuoc";
import {
  checkTenThuongHieu,
  getThuongHieuById,
  suaThuongHieu,
} from "@api/ThuongHieu";

function SuaThuongHieu() {
  const { id } = useParams();

  const inputTenthuongHieu = useRef();

  const [thuongHieu, setTH] = useState();
  const [errTenNhom, setETN] = useState();
  const [tenNhom, setTN] = useState();

  const tenNhomDB = useDebounces(tenNhom, 500);

  const [globalSTT, setGLB] = useState();

  useEffect(() => {
    getThuongHieuById(
      id,
      (res) => {
        setTH(res.data);
      },
      (err) => {}
    );
  }, []);

  useEffect(() => {
    checkTenThuongHieu(
      tenNhomDB,
      (res) => {
        if (res.data && res.data.tenThuongHieu != thuongHieu.tenThuongHieu) {
          setETN("Tên thương hiệu đã tồn tại");
        } else {
          setETN(null);
        }
      },
      (err) => {}
    );
  }, [tenNhomDB]);

  useEffect(() => {
    if (thuongHieu) {
      setTN(thuongHieu.tenThuongHieu);
    }
  }, [thuongHieu]);

  const handleSuaNhom = () => {
    if (errTenNhom) {
      inputTenthuongHieu.current.focus();
      return;
    }
    if (!tenNhom) {
      inputTenthuongHieu.current.focus();
      setETN("Không được để trống tên thương hiệu");
      return;
    }

    suaThuongHieu(
      id,
      tenNhom,
      (res) => {
        setTB({ title: "Đã sửa thương hiệu", content: "" });
        handleShowModal();
      },
      (err) => {
        setTB({ title: "Không thể sửa thương hiệu", content: "" });
        handleShowModal();
      },
      globalSTT?.user?.token
    );
  };

  const [showModal, setSMD] = useState(false);

  const handleCloseModal = () => setSMD(false);
  const handleShowModal = () => setSMD(true);
  const [thongBao, setTB] = useState({
    title: "Xóa thương hiệu",
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
          <h1>Sửa nhóm</h1>
        </div>
        <div className={style.body}>
          <div className={style.inputGroup}>
            <label htmlFor="tenThuoc">Tên thương hiệu</label>
            <input
              ref={inputTenthuongHieu}
              type="text"
              id="tenThuoc"
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
              value={"Sửa"}
              onClick={() => {
                handleSuaNhom();
              }}
            />
          </div>
        </div>
        <div className={style.footer}></div>
      </div>
    </div>
  );
}

export default SuaThuongHieu;
