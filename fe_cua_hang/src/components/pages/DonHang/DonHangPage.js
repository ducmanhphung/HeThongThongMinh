import Header from "@components/header/Header";
import style from "./style.module.scss";
import { Alert, Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { getAllDuocChat, xoaDuocChat } from "@api/DuocChat";
import { useGlobal } from "@hooks";
import {
  daGiaoDonHang,
  duyetDonHang,
  getAllDonHang,
  huyDonHang,
} from "@api/DonHang";
import { Link } from "react-router-dom";

function DonHangPage() {
  const [globalSTT, setGLB] = useGlobal();
  const [showModal, setSMD] = useState(false);

  const handleCloseModal = () => {
    setSMD(false);
  };
  const handleShowModal = () => setSMD(true);

  const [showModal2, setSMD2] = useState(false);

  const handleCloseModal2 = () => {
    setSMD2(false);
  };
  const handleShowModal2 = () => setSMD2(true);

  const [showModal3, setSMD3] = useState(false);

  const handleCloseModal3 = () => {
    setSMD3(false);
  };
  const handleShowModal3 = () => setSMD3(true);

  const [currentId, setCRID] = useState();
  const [ds, setDS] = useState();

  const loadDS = useCallback(() => {
    setWT(true);
    getAllDonHang(
      (res) => {
        setDS(res.data);
        setWT(false);
      },
      (err) => {
        setWT(false);
      }
    );
  });

  useEffect(() => {
    loadDS();
  }, []);

  const [waiting, setWT] = useState(false);

  return (
    <div className={style.pageWrapper}>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Duyệt đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              const _token = globalSTT?.user?.token;
              if (_token) {
                const _idDonHang = currentId;
                setWT(true);
                duyetDonHang(
                  _idDonHang,
                  _token,
                  (res) => {
                    loadDS();
                  },
                  (err) => {
                    setWT(false);
                  }
                );
              }
              handleCloseModal();
            }}
          >
            Xác nhận
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModal2}
        onHide={handleCloseModal2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hủy đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              const _token = globalSTT?.user?.token;
              if (_token) {
                const _idDonHang = currentId;
                setWT(true);
                huyDonHang(
                  _idDonHang,
                  _token,
                  (res) => {
                    loadDS();
                  },
                  (err) => {
                    setWT(false);
                  }
                );
              }
              handleCloseModal2();
            }}
          >
            Xác nhận
          </Button>
          <Button variant="secondary" onClick={() => handleCloseModal2()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModal3}
        onHide={handleCloseModal3}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đã giao</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              const _token = globalSTT?.user?.token;
              if (_token) {
                const _idDonHang = currentId;
                setWT(true);
                daGiaoDonHang(
                  _idDonHang,
                  _token,
                  (res) => {
                    loadDS();
                  },
                  (err) => {
                    setWT(false);
                  }
                );
              }
              handleCloseModal3();
            }}
          >
            Xác nhận
          </Button>
          <Button variant="secondary" onClick={() => handleCloseModal3()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.page}>
        {waiting && (
          <div className={style.waittingPanel}>
            <Spinner />
          </div>
        )}
        <div className={style.header}></div>
        <div className={style.body}>
          <div className={style.options}>
            <ul className={style.items}>
              {/* <li className={style.item}>
                <Link to={`/duoc-chat/them`}>Thêm dược chất</Link>
              </li> */}
            </ul>
          </div>
          <div className={style.ds}>
            <Row>
              {ds ? (
                ds.map((dh, index) => (
                  <div key={dh.id} className={style.donHangLine}>
                    <div className={style.thongTin}>
                      <div className={style.thongTinChinh}>
                        <span className={style.maDonHang}>
                          <Link to={`/don-hang/${dh.id}`}>
                            Mã đơn hàng: {dh.id}
                          </Link>
                        </span>
                        <span className={style.ngayDat}>{dh.thoiGian}</span>
                      </div>
                      <span className={style.trangThai}>
                        {dh.trangThai === 0
                          ? "Chờ duyệt"
                          : dh.trangThai === 1
                          ? "Đang giao"
                          : dh.trangThai === 2
                          ? "Đã giao"
                          : dh.trangThai === 3
                          ? "Đã nhận"
                          : dh.trangThai === -1
                          ? "Đã hủy"
                          : ""}
                      </span>
                    </div>
                    <div className={style.options}>
                      {dh.trangThai === 0 ? (
                        <>
                          <Button
                            onClick={() => {
                              setCRID(dh.id);
                              handleShowModal();
                            }}
                          >
                            Duyệt đơn
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setCRID(dh.id);
                              handleShowModal2();
                            }}
                          >
                            Hủy đơn
                          </Button>
                        </>
                      ) : dh.trangThai === 1 ? (
                        <Button
                          variant="primary"
                          onClick={() => {
                            setCRID(dh.id);
                            handleShowModal3();
                          }}
                        >
                          Đã giao
                        </Button>
                      ) : dh.trangThai === 2 ? (
                        "Đã giao"
                      ) : dh.trangThai === 3 ? (
                        "Đã nhận"
                      ) : dh.trangThai === -1 ? (
                        "Đã hủy"
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
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

export default DonHangPage;
