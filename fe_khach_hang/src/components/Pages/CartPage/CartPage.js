import HeaderBar from "@components/HeaderBar/HeaderBar";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { getGioHangByIdNguoiDung, xoaCTGioHang } from "@api/GioHang";
import { useGlobal } from "@hooks";
import { Link } from "react-router-dom";
import { getThuocById } from "@api/Thuoc";
import { BASE_URL } from "@api/Base";
import { themChiTietDonHang, themDonHang } from "@api/DonHang";
import { Button, Modal } from "react-bootstrap";
import { formatTienVietNam } from "@utils/Money";

function CartPage() {
  const [cartLines, setCartLines] = useState([]);
  const [dataTho, setDTT] = useState();
  const [globalSTT, setGLB] = useGlobal();
  const [isInit, setIIN] = useState(true);
  const [orderLines, setODL] = useState([]);
  const [tongTien, setTT] = useState(0);
  const [donHang, setDH] = useState({
    tenNguoiNhan: "",
    sdt: "",
    diaChi: "",
  });
  const [coTheOrder, setCTOD] = useState(false);
  const [reaload, setRL] = useState(true);

  useEffect(() => {
    const token = globalSTT?.user?.token;
    if (token) {
      const idNguoiDung = globalSTT?.user?.id;
      getGioHangByIdNguoiDung(
        token,
        idNguoiDung,
        (res) => {
          setDTT([...res.data]);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      link2DangNhap.current.click();
    }
  }, [reaload]);

  useEffect(() => {
    if (dataTho && isInit) {
      dataTho.map((item) => {
        const idThuoc = item.idThuoc;
        getThuocById(idThuoc, (res) => {
          const data = res.data;
          data.hinhAnh = `${BASE_URL}/images/${data.hinhAnh}`;
          data.idThuoc = res.data.id;
          data.id = item.id;
          console.log(data);
          setCartLines((pre) => [...pre, data]);
        });
      });
      setIIN(false);
    }
  }, [dataTho]);

  useEffect(() => {
    if (cartLines != []) {
      console.log(cartLines);
      const data = cartLines.map((item) => {
        const order = {
          ...item,
          soLuong: 1,
          check: item.check ? item.check : false,
        };
        return order;
      });
      setODL(data);
    }
  }, [cartLines]);

  useEffect(() => {
    if (orderLines) {
      let _newTongTien = 0;
      setCTOD(false);
      orderLines.map((item) => {
        if (item.check === true) {
          setCTOD(true);
          _newTongTien += item.soLuong * item.gia;
        }
      });
      setTT(_newTongTien);
    }
  }, [orderLines]);

  const link2DangNhap = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [thongBao, setTB] = useState({
    title: "",
    content: "",
    isConfirm: false,
  });

  return (
    <div className={styles.cartPageWrapper}>
      <Link ref={link2DangNhap} to={"/login"}></Link>
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
      <div className={styles.simpleHeader}>
        <HeaderBar isSimple={true} />
      </div>
      <div className={styles.cartPage}>
        <div className={styles.cartPageBody}>
          {orderLines &&
            orderLines.map((line, index) => (
              <div key={index} className={styles.cardPageProduct}>
                <div className={styles.area}>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      defaultChecked={line.check}
                      onChange={(e) => {
                        const _checked = e.target.checked;
                        orderLines[index].check = _checked;
                        setODL((pre) => [...pre]);
                      }}
                    />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.image}>
                      <img src={line.hinhAnh} />
                    </div>
                    <div className={styles.name}>
                      <span>{line.tenThuoc}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.area}>
                  <div className={styles.money}>
                    <span className={styles.price}>
                      {formatTienVietNam(line.gia)}
                    </span>
                    <span className={styles.unit}>{line.donVi}</span>
                  </div>
                  <div className={styles.quantityControl}>
                    <div className={styles.div}>
                      <button
                        onClick={(e) => {
                          orderLines[index].soLuong -= 1;
                          if (orderLines[index].soLuong < 0) {
                            orderLines[index].soLuong = 0;
                          }
                          setODL((pre) => [...pre]);
                        }}
                      >
                        -
                      </button>
                    </div>
                    <div className={styles.number}>{line.soLuong}</div>
                    <div className={styles.plus}>
                      <button
                        onClick={(e) => {
                          orderLines[index].soLuong += 1;
                          setODL((pre) => [...pre]);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className={styles.totalPrice}>
                    {formatTienVietNam(line.gia * line.soLuong)}
                  </span>
                </div>
                <div className={styles.area}>
                  <div className={styles.remove}>
                    <button
                      onClick={(e) => {
                        const _idCTGioHang = line.id;
                        const _token = globalSTT?.user?.token;
                        xoaCTGioHang(
                          _idCTGioHang,
                          _token,
                          (res) => {
                            const _newCartLines = cartLines.filter(
                              (item) => item.id != _idCTGioHang
                            );
                            for (
                              let index = 0;
                              index < _newCartLines.length;
                              index++
                            ) {
                              _newCartLines[index]["check"] =
                                orderLines[index]["check"];
                            }
                            setCartLines(_newCartLines);
                            setRL((pre) => !pre);
                          },
                          (err) => {
                            console.log(err);
                          }
                        );
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className={styles.buyInfo}>
          <input
            placeholder="Tên người nhận"
            value={donHang.tenNguoiNhan}
            onChange={(e) => {
              const _value = e.target.value;
              setDH((pre) => ({ ...pre, tenNguoiNhan: _value }));
            }}
          />
          <input
            placeholder="Số điện thoại"
            value={donHang.sdt}
            onChange={(e) => {
              const _value = e.target.value;
              setDH((pre) => ({ ...pre, sdt: _value }));
            }}
          />
          <input
            placeholder="Địa chỉ"
            value={donHang.diaChi}
            onChange={(e) => {
              const _value = e.target.value;
              setDH((pre) => ({ ...pre, diaChi: _value }));
            }}
          />
        </div>
        <div className={styles.cartPageFooter}>
          <div className={styles.totalPrice}>
            <span className={styles.label}>Tổng thanh toán: </span>
            <span className={styles.price}>{formatTienVietNam(tongTien)}</span>
          </div>
          <div className={styles.buy}>
            {coTheOrder === true ? (
              <button
                onClick={() => {
                  if (
                    !donHang.tenNguoiNhan ||
                    !donHang.sdt ||
                    !donHang.diaChi
                  ) {
                    setTB({ title: "Vui lòng điền đầy đủ thông tin đơn hàng" });
                    handleShow();
                    return;
                  }
                  const _token = globalSTT?.user?.token;
                  const _idNguoiDung = globalSTT?.user?.id;
                  themDonHang(
                    donHang,
                    _idNguoiDung,
                    _token,
                    (res) => {
                      const _idDonHang = res.data.id;
                      const _ordersList = orderLines.filter(
                        (item) => item.check === true
                      );
                      console.log(res.data);
                      const _orders = _ordersList.map((item) => ({
                        id: 0,
                        idDonHang: _idDonHang,
                        idThuoc: item.idThuoc,
                        soLuong: item.soLuong,
                      }));
                      if (_orders) {
                        themChiTietDonHang(
                          _orders,
                          _token,
                          (res) => {
                            console.log(res);
                            setTB({
                              title: "Tạo đơn hàng thành công",
                              content: "",
                              isConfirm: true,
                            });
                            handleShow();
                          },
                          (err) => {
                            console.log(err);
                            setTB({
                              title: "Tạo đơn hàng thất bại",
                              content: "",
                              isConfirm: false,
                            });
                            handleShow();
                          }
                        );
                      }
                    },
                    (err) => {
                      console.log(err);
                      setTB({
                        title: "Không thể tạo đơn hàng",
                        content: "",
                        isConfirm: false,
                      });
                      handleShow();
                    }
                  );
                }}
              >
                Mua hàng
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
