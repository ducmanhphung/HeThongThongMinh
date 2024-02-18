import {
  getAllThuoc,
  getByNhomVaThuongHieu,
  getByNhomVaThuongHieuPage,
  getPageThuoc,
} from "@api/Thuoc";
import styles from "./styles.module.scss";

import ChatForm from "@components/ChatForm/ChatForm";
import HeaderBar from "@components/HeaderBar/HeaderBar";
import LoadingPanel from "@components/LoadingPanel/LoadingPanel";
import ProductCard from "@components/ProductCard/ProductCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { BASE_URL } from "@api/Base";
import { getAllNhom } from "@api/Nhom";
import { getAllThuongHieu } from "@api/ThuongHieu";
import Filter from "@components/Filter/Filter";
import { useGlobal } from "@hooks";
import { themCtGioHang } from "@api/GioHang";
import { Link } from "react-router-dom";
import checkScrollToEnd from "@utils/checkscrolltoend";

function HomePage() {
  const [chatLines, setChatLines] = useState([]);
  const [productLines, setProductLines] = useState([]);
  const [nhom, setNhom] = useState(-1);
  const [thuongHieu, setThuongHieu] = useState(-1);
  const [loading, setLoading] = useState();
  const [globalSTT, setGLB] = useGlobal();

  const [pageIndex, setPID] = useState(0);

  const loadData = () => {
    setLoading(true);
    if (nhom == -1 && thuongHieu == -1) {
      getPageThuoc(
        pageIndex,
        (res) => {
          const data = res.data.map((item) => ({
            ...item,
            hinhAnh: `${BASE_URL}/images/${item.hinhAnh}`,
          }));
          if (pageIndex === 0) {
            setProductLines([...data]);
          } else {
            setProductLines((pre) => [...pre, ...data]);
          }
          setLoading(false);
        },
        (err) => {}
      );
    } else {
      getByNhomVaThuongHieuPage(
        pageIndex,
        nhom,
        thuongHieu,
        (res) => {
          const data = res.data.map((item) => ({
            ...item,
            hinhAnh: `${BASE_URL}/images/${item.hinhAnh}`,
          }));
          if (pageIndex === 0) {
            setProductLines([...data]);
          } else {
            setProductLines((pre) => [...pre, ...data]);
          }
          setLoading(false);
        },
        (err) => {}
      );
    }
  };

  useEffect(() => {
    setProductLines([]);
    setPID(-1);
  }, [nhom]);

  useEffect(() => {
    setProductLines([]);
    setPID(-1);
  }, [thuongHieu]);

  useEffect(() => {
    if (pageIndex === -1) {
      setPID(0);
    }
    if (pageIndex >= 0) {
      loadData();
    }
  }, [pageIndex]);

  const link2DangNhap = useRef();

  const handleThemVaoGioHang = useCallback((idThuoc) => {
    const token = globalSTT?.user?.token;
    if (!token) {
      link2DangNhap.current.click();
      return;
    }
    const idNguoiDung = globalSTT.user.id;
    themCtGioHang(
      idThuoc,
      idNguoiDung,
      token,
      (res) => {
        setTB({
          title: "Đã thêm vào giỏ hàng",
        });
        handleShow();
      },
      (err) => {
        setTB({
          title: "Lỗi",
        });
        handleShow();
      }
    );
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [thongBao, setTB] = useState({
    title: "",
    content: "",
    isConfirm: false,
  });

  return (
    <div
      className={styles.homePageWrapper}
      onScroll={(e) => {
        if (checkScrollToEnd(e)) {
          setPID((pre) => pre + 1);
        }
      }}
    >
      <Link ref={link2DangNhap} to={"/login"}></Link>
      <Link className={styles.link2Cart} to={"/cart"}>
        Giỏ hàng
      </Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{thongBao.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{thongBao.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <HeaderBar />
        <Filter
          nhomHandle={(e) => {
            const value = e.target.value;
            if (nhom != value) setNhom(value);
          }}
          thuongHieuHandle={(e) => {
            const value = e.target.value;
            if (thuongHieu != value) setThuongHieu(value);
          }}
        />
      </div>
      <div className={styles.products}>
        <Row>
          {productLines &&
            productLines.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  id={item.id}
                  price={item.gia}
                  name={item.tenThuoc}
                  image={item.hinhAnh}
                  handleThemVaoGioHang={handleThemVaoGioHang}
                  kinhDoanh={item.kinhDoanh}
                />
              </Col>
            ))}
          {loading === true && (
            <div className={styles.loadingMore}>
              <LoadingPanel />
            </div>
          )}
        </Row>
      </div>
      {/* <div className={styles.chatBox}>
        <ChatForm
          chatLines={chatLines}
          sendHandler={({ message }) => {
            setChatLines([...chatLines, { isUser: true, content: message }]);
          }}
        />
      </div> */}
    </div>
  );
}

export default HomePage;
