import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { formatTienVietNam } from "@utils/Money";
import { useEffect } from "react";

function ThuocCard({
  id,
  tenThuoc,
  hinhAnh,
  kinhDoanh,
  daBan,
  tong,
  handleXoaThuoc,
  gia,
}) {
  useEffect(() => {
    // gia = formatTienVietNam(gia);
  }, []);
  return (
    <div className={style.thuocCardWrapper}>
      <div className={style.thuocCard}>
        <div className={style.header}>
          <div className={style.image}>
            <img alt="hinh anh thuoc" src={hinhAnh} />
          </div>
        </div>
        <div className={style.body}>
          <div className={style.tenThuoc}>
            <Link to={`/thuoc/${id}`}>{tenThuoc}</Link>
          </div>
          <div className={style.kinhDoanh}>
            {kinhDoanh === true ? "Đang kinh doanh" : "Không kinh doanh"}
          </div>
          <div className={style.soLuong}>
            <div className={style.daBan}>Đã bán: {daBan}</div>
            <div className={style.tong}>Tổng: {tong}</div>
            <div className={style.tong}>Giá: {formatTienVietNam(gia)}</div>
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.options}>
            <Link to={`/thuoc/sua/${id}`}>Chỉnh sửa</Link>
            <button
              onClick={() => {
                handleXoaThuoc();
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThuocCard;
