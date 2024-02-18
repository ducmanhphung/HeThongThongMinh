import HeaderBar from "@components/HeaderBar/HeaderBar";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  daNhanDonHang,
  getDonHangsByNguoiDung,
  huyDonHang,
} from "@api/DonHang";
import { useGlobal } from "@hooks";
import { Link } from "react-router-dom";

function OrderPage() {
  const trangThaiDuocHuy = 0;
  const trangThaiChoXacNhan = 2;

  const [orderList, setOrderList] = useState([]);
  const [globalSTT, setGLB] = useGlobal();

  useEffect(() => {
    const _idNguoiDung = globalSTT?.user?.id;
    const _token = globalSTT?.user?.token;

    if (_idNguoiDung && _token) {
      getDonHangsByNguoiDung(
        _idNguoiDung,
        _token,
        (res) => {
          console.log(res.data);
          setOrderList(res.data);
        },
        (err) => {}
      );
    } else {
      link2DangNhap.current.click();
    }
  }, []);

  const link2DangNhap = useRef();

  return (
    <div className={styles.orderPageWrapper}>
      <Link ref={link2DangNhap} to={"/login"}></Link>
      <div className={styles.simpleHeader}>
        <HeaderBar isSimple={true} />
      </div>
      <div className={styles.orderPage}>
        <div className={styles.body}>
          <div className={styles.orderLines}>
            {orderList &&
              orderList.map((line, index) => (
                <div key={index} className={styles.line}>
                  <div className={styles.infos}>
                    <div className={styles.info}>
                      <Link to={`/order/${line.id}`}>
                        <span className={styles.label}>Mã đơn hàng: </span>
                        <span className={styles.value}>{line.id}</span>
                      </Link>
                    </div>
                    <div className={styles.info}>
                      <span>Ngày đặt: {line.thoiGian}</span>
                    </div>
                  </div>
                  <div className={styles.status}>
                    {line.trangThai === 0
                      ? "Chờ duyệt"
                      : line.trangThai === 1
                      ? "Đang giao"
                      : line.trangThai === 2
                      ? "Đã giao"
                      : line.trangThai === 3
                      ? "Đã nhận"
                      : line.trangThai === -1
                      ? "Đã hủy"
                      : ""}
                  </div>
                  <div className={styles.method}>
                    {line.trangThai === trangThaiDuocHuy && (
                      <button
                        onClick={() => {
                          const _idDonHang = line.id;
                          const _token = globalSTT?.user?.token;
                          if (_token) {
                            huyDonHang(
                              _idDonHang,
                              _token,
                              (res) => {
                                let _newOrderLineList = [...orderList];
                                _newOrderLineList[index].trangThai = -1;
                                setOrderList(_newOrderLineList);
                              },
                              (err) => {
                                console.log(err);
                              }
                            );
                          }
                        }}
                      >
                        Hủy đơn
                      </button>
                    )}
                    {line.trangThai === trangThaiChoXacNhan && (
                      <button
                        onClick={() => {
                          const _idDonHang = line.id;
                          const _token = globalSTT?.user?.token;
                          if (_token) {
                            daNhanDonHang(
                              _idDonHang,
                              _token,
                              (res) => {
                                let _newOrderLineList = [...orderList];
                                _newOrderLineList[index].trangThai = 3;
                                setOrderList(_newOrderLineList);
                              },
                              (err) => {
                                console.log(err);
                              }
                            );
                          }
                        }}
                      >
                        Đã nhận hàng
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
