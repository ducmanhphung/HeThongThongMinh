import HeaderBar from "@components/HeaderBar/HeaderBar";
import styles from "./styles.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingPanel from "@components/LoadingPanel/LoadingPanel";
import { getThuocById } from "@api/Thuoc";
import { BASE_URL } from "@api/Base";
import { formatTienVietNam } from "@utils/Money";
import { useGlobal } from "@hooks";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { themCtGioHang } from "@api/GioHang";
import { getThuocLienQuanByIdThuoc } from "@api/ThuocLienQuan";
import ProductCard from "@components/ProductCard/ProductCard";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [globalSTT, setGLB] = useGlobal();

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

  useEffect(() => {
    setLoading(true);
    getThuocById(
      id,
      (res) => {
        const thuoc = {
          ...res.data,
          hinhAnh: `${BASE_URL}/images/${res.data.hinhAnh}`,
        };
        setProduct(thuoc);
        setLoading(false);
      },
      (err) => {}
    );
    getThuocLienQuanByIdThuoc(
      id,
      (res) => {
        const _newDSTLQ = res.data.map((item) => ({
          ...item,
          hinhAnh: `${BASE_URL}/images/${item.hinhAnh}`,
        }));
        setDSTLQ([..._newDSTLQ]);
      },
      (err) => {}
    );
  }, []);

  const link2Login = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const link2DangNhap = useRef();

  const [thongBao, setTB] = useState({
    title: "Đã thêm vào giỏ hàng",
    content: "",
    isConfirm: false,
  });

  const [dsThuocLienQuan, setDSTLQ] = useState([]);

  return (
    <div className={styles.productPageWrapper}>
      <Link ref={link2DangNhap} to={"/login"}></Link>
      <Link className={styles.link2Cart} to={"/cart"}></Link>
      <Link ref={link2Login} to={"/login"}></Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{thongBao.title}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.simpleHeader}>
        <HeaderBar isSimple={true} />
      </div>
      {loading === true ? (
        <div className={styles.waiting}>
          <LoadingPanel />
        </div>
      ) : (
        <div className={styles.product}>
          <div className={styles.baseInfo}>
            <div className={styles.image}>
              <img alt="product photo" src={product.hinhAnh} />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>
                <span>{product.tenThuoc}</span>
              </div>
              <div className={styles.money}>
                <span className={styles.price}>
                  {formatTienVietNam(product.gia)}
                </span>
                <span> </span>
                <span className={styles.unit}></span>
              </div>
              <div className={styles.add2Cart}>
                <button
                  onClick={() => {
                    const _token = globalSTT?.user?.token;
                    if (!_token) {
                      link2Login.current.click();
                      return;
                    }

                    const _idNguoiDung = globalSTT.user.id;
                    themCtGioHang(
                      id,
                      _idNguoiDung,
                      _token,
                      (res) => {
                        console.log(res);
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
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
          <div className={styles.detailsInfo}>
            <div className={styles.detailsInfoItem}>
              <div className={styles.title}>Công dụng</div>
              <div className={styles.content}>{product.congDung}</div>
            </div>
            <div className={styles.detailsInfoItem}>
              <div className={styles.title}>Hướng dẫn sử dụng</div>
              <div className={styles.content}>{product.hdSuDung}</div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.dsThuocLienQuan}>
        <Row>
          <h2 className={styles.titleSpLienQuan}>Các sản phẩm liên quan</h2>
          {dsThuocLienQuan &&
            dsThuocLienQuan.map((item, index) => (
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
        </Row>
      </div>
    </div>
  );
}

export default ProductPage;
