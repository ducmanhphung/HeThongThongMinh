import Header from "@components/header/Header";
import style from "./style.module.scss";
import ThuocCard from "@components/ThuocCard/ThuocCard";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllThuoc, getPageThuoc, xoaThuoc } from "@api/Thuoc";
import { BASE_URL } from "@api/Base";
import { useGlobal } from "@hooks";
import checkScrollToEnd from "@utils/checkscrolltoend";

function ThuocsPage() {
  const [danhSachThuoc, setDST] = useState();

  const getDSPageThuoc = () => {
    setLD(true);
    getPageThuoc(
      pageIndex,
      (res) => {
        const _newData = res.data.map((thuoc) => ({
          ...thuoc,
          hinhAnh: `${BASE_URL}/images/${thuoc.hinhAnh}`,
        }));
        if (pageIndex === 0) {
          setDST([..._newData]);
        } else {
          setDST((pre) => [...pre, ..._newData]);
        }
        setLD(false);
      },
      (err) => {}
    );
  };

  const [showModal, setSMD] = useState(false);

  const [pageIndex, setPID] = useState(0);

  const handleCloseModal = () => setSMD(false);
  const handleShowModal = () => setSMD(true);
  const [thongBao, setTB] = useState({
    title: "Xóa thuốc",
    content: "",
    isXacNhan: true,
  });
  const [idThuocXoa, setITX] = useState();

  const [loadding, setLD] = useState();

  const handleXoaThuoc = () => {
    console.log(idThuocXoa);
    xoaThuoc(
      idThuocXoa,
      (res) => {
        setTB({ title: "Đã xóa thuốc", content: "", isXacNhan: false });
        const _newData = danhSachThuoc.filter((item) => item.id != idThuocXoa);
        setDST([..._newData]);
      },
      (err) => {
        setTB({ title: "Không thể xóa", content: "", isXacNhan: false });
        console.log(err);
      },
      globalSTT?.user?.token
    );
    setITX(null);
  };

  const [globalSTT, setGLB] = useGlobal();

  useEffect(() => {
    if (pageIndex >= 0) {
      getDSPageThuoc();
    }
  }, [pageIndex]);

  return (
    <div
      className={style.thuocPageWrapper}
      onScroll={(e) => {
        if (checkScrollToEnd(e) === true) {
          if (loadding !== true) {
            setPID((pre) => pre + 1);
          }
        }
      }}
    >
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
                handleXoaThuoc();
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
      <div className={style.thuocPage}>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.body}>
          <div className={style.options}>
            <ul className={style.items}>
              <li className={style.item}>
                <Link to={`/thuoc/them`}>Thêm thuốc</Link>
              </li>
            </ul>
          </div>
          <div className={style.danhSachThuoc}>
            <Row>
              {danhSachThuoc ? (
                danhSachThuoc.map((thuoc, index) => (
                  <Col key={thuoc.id} xs={12} sm={6} md={4} xl={3}>
                    <ThuocCard
                      {...thuoc}
                      handleXoaThuoc={() => {
                        setITX(thuoc.id);
                        setTB({
                          title: "Xóa thuốc",
                          content: "",
                          isXacNhan: true,
                        });
                        handleShowModal();
                      }}
                    />
                  </Col>
                ))
              ) : (
                <></>
              )}
              {loadding && (
                <div className={style.waittingLoadMore}>
                  <Spinner />
                </div>
              )}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThuocsPage;
