import { Link } from "react-router-dom";
import style from "./style.module.scss";

function Header() {
  return (
    <div className={style.headerWrapper}>
      <div className={style.header}>
        <ul className={style.items}>
          <li className={style.item}>
            <div className={style.headerItem}>
              <Link to={"/thuoc"}>Thuốc</Link>
            </div>
          </li>
          <li className={style.item}>
            <div className={style.headerItem}>
              <Link to={"/nhom"}>Nhóm</Link>
            </div>
          </li>
          <li className={style.item}>
            <div className={style.headerItem}>
              <Link to={"/thuong-hieu"}>Thương hiệu</Link>
            </div>
          </li>
          <li className={style.item}>
            <div className={style.headerItem}>
              <Link to={"/duoc-chat"}>Dược chất</Link>
            </div>
          </li>
          <li className={style.item}>
            <div className={style.headerItem}>
              <Link to={"/don-hang"}>Đơn hàng</Link>
            </div>
          </li>
          <li className={style.item}>
            <div className={style.headerItem}>
              <Link to={"/phan-cum"}>Phân cụm thuốc</Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
