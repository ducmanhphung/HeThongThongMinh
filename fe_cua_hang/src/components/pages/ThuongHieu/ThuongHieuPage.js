import Header from "@components/header/Header";
import style from "./style.module.scss";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "@api/Base";
import { getAllThuongHieu, xoaThuongHieu } from "@api/ThuongHieu";
import BasicCard from "@components/BasicCard/BasicCard";
import { useGlobal } from "@hooks";

function ThuongHieuPage() {
  const [showModal, setSMD] = useState(false);
  const handleCloseModal = () => setSMD(false);
  const handleShowModal = () => setSMD(true);
  const [thongBao, setTB] = useState({
    title: "Xóa thương hiệu",
    content: "",
    isXacNhan: true,
  });
  const [idThuongHieuXoa, setITHX] = useState();
  const [dsThuongHieu, setDTH] = useState();

  const loadAllThuongHieu = useCallback(() => {
    getAllThuongHieu(
      (res) => {
        const _newDSTH = res.data.map((thuongHieu) => ({
          ...thuongHieu,
          hinhAnh: `${BASE_URL}/images/${thuongHieu.hinhAnh}`,
        }));
        setDTH(_newDSTH);
      },
      (err) => {}
    );
  });

  const handleXoaThuongHieu = () => {
    xoaThuongHieu(
      idThuongHieuXoa,
      (res) => {
        if (res.data) {
          setTB({
            title: "Xóa thương hiệu thành công",
            content: "",
            isXacNhan: false,
          });
          loadAllThuongHieu();
        }
      },
      (err) => {
        setTB({
          title: "Không thể xóa thương hiệu",
          content: "",
          isXacNhan: false,
        });
      },
      globalSTT?.user?.token
    );
  };

  const [globalSTT, setGLB] = useGlobal();

  useEffect(() => {
    loadAllThuongHieu();
  }, []);

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
          {thongBao.isXacNhan === true ? (
            <Button
              variant="danger"
              onClick={() => {
                handleXoaThuongHieu();
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
      <div className={style.page}>
        <div className={style.header}></div>
        <div className={style.body}>
          <div className={style.options}>
            <ul className={style.items}>
              <li className={style.item}>
                <Link to={`/thuong-hieu/them`}>Thêm thương hiệu</Link>
              </li>
            </ul>
          </div>
          <div className={style.ds}>
            <Row>
              {dsThuongHieu ? (
                dsThuongHieu.map((thuongHieu, index) => (
                  <Col key={thuongHieu.id} xs={12} sm={6} md={4} xl={3}>
                    <BasicCard
                      id={thuongHieu.id}
                      ten={thuongHieu.tenThuongHieu}
                      hinhAnh={thuongHieu.hinhAnh}
                      loai={"thuong-hieu"}
                      haldeXoa={() => {
                        setITHX(thuongHieu.id);
                        setTB({
                          title: "Xóa thương hiệu",
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

export default ThuongHieuPage;
