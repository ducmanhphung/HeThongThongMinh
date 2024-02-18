import Header from "@components/header/Header";
import style from "./style.module.scss";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicCard from "@components/BasicCard/BasicCard";
import { getAllDuocChat, xoaDuocChat } from "@api/DuocChat";
import hinhAnhCTHH from "src/assets/images/cthh.jpg";
import { useGlobal } from "@hooks";

function DuocChatPage() {
  const [globalSTT, setGLB] = useGlobal();
  const [showModal, setSMD] = useState(false);

  const handleCloseModal = () => setSMD(false);
  const handleShowModal = () => setSMD(true);
  const [thongBao, setTB] = useState({
    title: "Xóa dược chất",
    content: "",
    isXacNhan: true,
  });
  const [idXoa, setIX] = useState();
  const [ds, setDS] = useState();

  const loadDS = useCallback(() => {
    getAllDuocChat(
      (res) => {
        setDS(res.data);
      },
      (err) => {}
    );
  });

  const handleXoa = () => {
    xoaDuocChat(
      idXoa,
      (res) => {
        if (res.data) {
          setTB({
            title: "Xóa dược chất thành công",
            content: "",
            isXacNhan: false,
          });
          loadDS();
        }
      },
      (err) => {
        setTB({
          title: "Không thể xóa dược chất",
          content: "",
          isXacNhan: false,
        });
      },
      globalSTT?.user?.token
    );
  };

  useEffect(() => {
    loadDS();
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
                handleXoa();
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
                <Link to={`/duoc-chat/them`}>Thêm dược chất</Link>
              </li>
            </ul>
          </div>
          <div className={style.ds}>
            <Row>
              {ds ? (
                ds.map((duocChat, index) => (
                  <Col key={duocChat.id} xs={12} sm={6} md={4} xl={3}>
                    <BasicCard
                      id={duocChat.id}
                      ten={duocChat.tenDuocChat}
                      hinhAnh={hinhAnhCTHH}
                      loai={"duoc-chat"}
                      notSua={true}
                      haldeXoa={() => {
                        setIX(duocChat.id);
                        setTB({
                          title: "Xóa dược chất",
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

export default DuocChatPage;
