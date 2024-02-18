import { Link, useParams } from "react-router-dom";
import style from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import { getCTDonHangByIdDonHang, getDonHangById } from "@api/DonHang";
import { useGlobal } from "@hooks";
import { getThuocById } from "@api/Thuoc";
import { BASE_URL } from "@api/Base";
import Header from "@components/header/Header";
import { Spinner } from "react-bootstrap";
import { formatTienVietNam } from "@utils/Money";

function ChiTietDonHang() {
  const { id } = useParams();
  const link2DangNhap = useRef();
  const [globalSTT, setGLB] = useGlobal();
  const [tongTien, setTT] = useState(0);
  const [donHang, setDH] = useState();
  const [donHangLines, setDHL] = useState();
  const [orderLines, setODL] = useState([]);
  const [isInit, setIIN] = useState(true);

  useEffect(() => {
    const _token = globalSTT?.user?.token;
    if (!_token) {
      link2DangNhap.current.click();
    }
    getDonHangById(
      id,
      _token,
      (res) => {
        console.log(res);
        setDH(res.data);
        const _idDonHang = res.data.id;
        getCTDonHangByIdDonHang(
          _idDonHang,
          _token,
          (res) => {
            setDHL(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    if (donHangLines && isInit) {
      console.log("CC DIT ME");
      donHangLines.map((item) => {
        console.log("get thuoc info");

        const _idThuoc = item.idThuoc;
        getThuocById(
          _idThuoc,
          (res) => {
            const _thuoc = res.data;
            const _orderLine = {
              id: item.id,
              tenThuoc: _thuoc.tenThuoc,
              hinhAnh: `${BASE_URL}/images/${_thuoc.hinhAnh}`,
              gia: _thuoc.gia,
              soLuong: item.soLuong,
            };
            setODL((pre) => [...pre, _orderLine]);
          },
          (err) => {
            console.log(err);
          }
        );
      });
      setIIN(false);
    }
  }, [donHangLines]);

  useEffect(() => {
    if (orderLines) {
      let _tongTien = 0;
      orderLines.map((item) => {
        const _tien = item.gia * item.soLuong;
        _tongTien += _tien;
      });
      setTT(_tongTien);
    }
  }, [orderLines]);

  return (
    <div className={style.pageWrapper}>
      <Link ref={link2DangNhap} to={"/login"}></Link>
      <div className={style.header}>
        <Header />
      </div>
      {donHang ? (
        <div className={style.page}>
          <div className={style.header}></div>
          <div className={style.body}>
            <div className={style.info}>
              <span className={style.maDonHang}>Mã đơn hàng: {donHang.id}</span>
              <span className={style.tenNguoiNhan}>
                Tên người nhận: {donHang.tenNguoiNhan}
              </span>
              <span className={style.soDienThoai}>
                Số điện thoại: {donHang.soDienThoai}
              </span>
              <span className={style.diaChi}>Địa chỉ: {donHang.diaChi}</span>
              <span className={style.trangThai}>
                Trạng thái:{" "}
                {donHang.trangThai === 0
                  ? "Chờ duyệt"
                  : donHang.trangThai === 1
                  ? "Đang giao"
                  : donHang.trangThai === 2
                  ? "Đã giao"
                  : donHang.trangThai === 3
                  ? "Đã nhận"
                  : donHang.trangThai === -1
                  ? "Đã hủy"
                  : ""}
              </span>
            </div>
            <div className={style.danhSach}>
              {orderLines?.length > 0 ? (
                orderLines.map((item) => (
                  <div key={item.id} className={style.item}>
                    <div className={style.hinhAnh}>
                      <img alt="hinh anh thuoc" src={item.hinhAnh} />
                    </div>
                    <div className={style.tenThuoc}>{item.tenThuoc}</div>
                    <div className={style.donGia}>
                      {formatTienVietNam(item.gia)}
                    </div>
                    <div className={style.soLuong}>{item.soLuong}</div>
                    <div className={style.thanhTien}>
                      {formatTienVietNam(item.gia * item.soLuong)}
                    </div>
                  </div>
                ))
              ) : (
                <div className={style.waitting}>
                  <Spinner />
                </div>
              )}
            </div>
            <div className={style.moreInfo}>
              <div className={style.tongTien}>
                Tổng tiền: {formatTienVietNam(tongTien)}
              </div>
            </div>
          </div>
          <div className={style.footer}></div>
        </div>
      ) : (
        <div className={style.waitting}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default ChiTietDonHang;
