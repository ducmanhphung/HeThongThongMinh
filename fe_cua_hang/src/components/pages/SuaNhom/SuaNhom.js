import Header from "@components/header/Header";
import style from "./style.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounces, useGlobal } from "@hooks";
import { checkTenNhom, getNhomById, suaNhom, taoNhom } from "@api/Nhom";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@api/Base";

function SuaNhom() {
  const { id } = useParams();

  const [globalSTT, setGLB] = useGlobal();

  const inputTenNhom = useRef();

  const [nhom, setN] = useState();
  const [errTenNhom, setETN] = useState();
  const [tenNhom, setTN] = useState();

  const tenNhomDB = useDebounces(tenNhom, 500);

  useEffect(() => {
    getNhomById(
      id,
      (res) => {
        setN(res.data);
      },
      (err) => {}
    );
  }, []);

  useEffect(() => {
    if (nhom) {
      setTN(nhom.tenNhom);
    }
  }, [nhom]);

  useEffect(() => {
    checkTenNhom(
      tenNhomDB,
      (res) => {
        if (res.data && res.data.tenNhom != nhom.tenNhom) {
          setETN("Tên nhóm đã tồn tại");
        } else {
          setETN(null);
        }
      },
      (err) => {}
    );
  }, [tenNhomDB]);

  const handleSuaNhom = () => {
    if (errTenNhom) {
      inputTenNhom.current.focus();
      return;
    }
    if (!tenNhom) {
      inputTenNhom.current.focus();
      setETN("Không được để trống tên nhóm");
      return;
    }

    suaNhom(
      id,
      tenNhom,
      (res) => {
        setTB({ title: "Đã sửa nhóm", content: "" });
        handleShowModal();
      },
      (err) => {
        setTB({ title: "Không thể sửa nhóm", content: "" });
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
          <h1>Sửa nhóm</h1>
        </div>
        <div className={style.body}>
          <div className={style.inputGroup}>
            <label htmlFor="tenThuoc">Tên nhóm</label>
            <input
              ref={inputTenNhom}
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
              value={"Thêm"}
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

export default SuaNhom;
