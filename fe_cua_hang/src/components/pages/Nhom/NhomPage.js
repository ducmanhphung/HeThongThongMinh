import Header from "@components/header/Header";
import style from "./style.module.scss";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNhom, xoaNhom } from "@api/Nhom";
import { BASE_URL } from "@api/Base";
import BasicCard from "@components/BasicCard/BasicCard";
import { useGlobal } from "@hooks";

function NhomPage() {
  const [showModal, setSMD] = useState(false);
  const [globalSTT, setGLB] = useGlobal();
  const handleCloseModal = () => setSMD(false);
  const handleShowModal = () => setSMD(true);
  const [thongBao, setTB] = useState({
    title: "Xóa nhóm",
    content: "",
    isXacNhan: true,
  });
  const [idNhomXoa, setINX] = useState();
  const [dsNhom, setDSN] = useState();

  const loadAllNhom = useCallback(() => {
    getAllNhom(
      (res) => {
        const _newDSN = res.data.map((nhom) => ({
          ...nhom,
          hinhAnh: `${BASE_URL}/images/${nhom.hinhAnh}`,
        }));
        setDSN(_newDSN);
      },
      (err) => {}
    );
  });

  const handleXoaNhom = () => {
    xoaNhom(
      idNhomXoa,
      (res) => {
        if (res.data) {
          setTB({
            title: "Xóa nhóm thành công",
            content: "",
            isXacNhan: false,
          });
          loadAllNhom();
        }
      },
      (err) => {
        setTB({
          title: "Không thể xóa nhóm",
          content: "",
          isXacNhan: false,
        });
      },
      globalSTT?.user?.token
    );
  };

  useEffect(() => {
    loadAllNhom();
  }, []);

  return (
    <div className={style.nhomPageWrapper}>
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
          {thongBao.isXacNhan === true ? (
            <Button
              variant="danger"
              onClick={() => {
                handleXoaNhom();
              }}
            >
              Xóa
            </Button>
          ) : (
            <></>
          )}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.nhomPage}>
        <div className={style.header}></div>
        <div className={style.body}>
          <div className={style.options}>
            <ul className={style.items}>
              <li className={style.item}>
                <Link to={`/nhom/them`}>Thêm nhóm</Link>
              </li>
            </ul>
          </div>
          <div className={style.danhSachNhom}>
            <Row>
              {dsNhom ? (
                dsNhom.map((nhom, index) => (
                  <Col key={nhom.id} xs={12} sm={6} md={4} xl={3}>
                    <BasicCard
                      id={nhom.id}
                      ten={nhom.tenNhom}
                      hinhAnh={nhom.hinhAnh}
                      loai={"nhom"}
                      haldeXoa={() => {
                        setINX(nhom.id);
                        setTB({
                          title: "Xóa nhóm",
                          content: "",
                          isXacNhan: true,
                        });
                        handleShowModal();
                      }}
                    />
                  </Col>
                ))
              ) : (
                <div className={style.waiting}>
                  <Spinner />
                </div>
              )}
            </Row>
          </div>
        </div>
        <div className={style.footer}></div>
      </div>
    </div>
  );
}

export default NhomPage;
