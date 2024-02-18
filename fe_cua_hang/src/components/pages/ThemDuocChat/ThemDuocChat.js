import Header from "@components/header/Header";
import style from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDebounces, useGlobal } from "@hooks";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { checkTenDuocChat, taoDuocChat } from "@api/DuocChat";
import { BASE_URL } from "@api/Base";
import { sendPostRequestWithToken } from "@utils/Xhr";

function ThemDuocChat() {
  const inputTen = useRef();
  const inputFHA = useRef();

  const [errTen, setET] = useState();
  const [ten, setT] = useState("");
  const [fileHinhAnh, setFHA] = useState();
  const [imgSrc, setIS] = useState();

  const tenDB = useDebounces(ten, 500);

  const [globalSTT, setGLB] = useGlobal();

  useEffect(() => {
    console.log("checlTen duoc chat");
    checkTenDuocChat(
      tenDB,
      (res) => {
        if (res.data) {
          setET("Tên dược chất đã tồn tại");
        } else {
          setET(null);
        }
      },
      (err) => {}
    );
  }, [tenDB]);

  useEffect(() => {
    if (fileHinhAnh) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setIS(e.target.result);
      };

      reader.readAsDataURL(fileHinhAnh);
    }
  }, [fileHinhAnh]);

  const handleThem = async () => {
    if (errTen) {
      inputTen.current.focus();
      return;
    }
    if (!ten) {
      inputTen.current.focus();
      setET("Không được để trống tên dược chất");
      return;
    }

    console.log(ten);

    taoDuocChat(
      ten,
      (res) => {
        setTB({ title: "Đã thêm dược chất", content: "" });
        handleShowModal();
      },
      (err) => {
        console.log(err);
        const statusCode = err.toJSON().status;
        // if (statusCode >= 400 && statusCode < 500) {
        //   redirectDangNhap.current.click();
        //   return;
        // }
        setTB({ title: "Không thể thêm dược chất", content: "" });
        handleShowModal();
      },
      globalSTT?.user?.token
    );
  };

  const [showModal, setSMD] = useState(false);

  const handleCloseModal = () => setSMD(false);
  const handleShowModal = () => setSMD(true);
  const [thongBao, setTB] = useState({
    title: "Xóa dược chất",
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
          <h1>Thêm dược chất</h1>
        </div>
        <div className={style.body}>
          <div className={style.inputGroup}>
            <label htmlFor="ten">Tên dược chất</label>
            <input
              ref={inputTen}
              type="text"
              id="ten"
              value={ten}
              onChange={(e) => {
                const _value = e.target.value;
                setT(_value);
              }}
            />
            {errTen && <span className={style.error}>{errTen}</span>}
          </div>

          <div className={style.inputGroup}>
            <input
              type="button"
              value={"Thêm"}
              onClick={() => {
                handleThem();
              }}
            />
          </div>
        </div>
        <div className={style.footer}></div>
      </div>
    </div>
  );
}

export default ThemDuocChat;
