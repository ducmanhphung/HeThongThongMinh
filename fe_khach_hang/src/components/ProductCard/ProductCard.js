import { useGlobal } from "@hooks";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { themCtGioHang } from "@api/GioHang";
import { formatTienVietNam } from "@utils/Money";

function ProductCard({
  id,
  price,
  name,
  image,
  kinhDoanh,
  handleThemVaoGioHang,
}) {
  return (
    <div className={styles.productCardWrapper}>
      <div className={styles.productCard}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url("${image}")`,
          }}
        ></div>
        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.name}>
              <Link to={`/tmp/${id}`}>
                <span>{name}</span>
              </Link>
            </div>
            <div className={styles.money}>
              <span className={styles.price}>{formatTienVietNam(price)}</span>
            </div>
          </div>
          <div className={styles.options}>
            <div className={styles.option}>
              {kinhDoanh == true ? (
                <button
                  onClick={() => {
                    handleThemVaoGioHang(id);
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
              ) : (
                <div>Không kinh doanh</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
