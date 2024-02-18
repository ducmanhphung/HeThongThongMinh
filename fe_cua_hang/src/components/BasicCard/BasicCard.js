import { Link } from "react-router-dom";
import style from "./style.module.scss";

function BasicCard({ id, ten, hinhAnh, haldeXoa, loai, notSua }) {
  return (
    <div className={style.CardWrapper}>
      <div className={style.Card}>
        <div className={style.header}>
          <div className={style.image}>
            <img alt="hinh anh thuoc" src={hinhAnh} />
          </div>
        </div>
        <div className={style.body}>
          <div className={style.tenNhom}>
            <Link to={`/${loai}/${id}`}>{ten}</Link>
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.options}>
            {notSua === true ? (
              <></>
            ) : (
              <Link to={`/${loai}/sua/${id}`}>Chỉnh sửa</Link>
            )}
            <button
              onClick={() => {
                haldeXoa();
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

export default BasicCard;
