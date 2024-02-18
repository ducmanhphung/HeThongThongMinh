import HeaderBar from "@components/HeaderBar/HeaderBar";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { useGlobal } from "@hooks";
import LoadingPanel from "@components/LoadingPanel/LoadingPanel";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [globalSTT, setGLB] = useGlobal();
  const link2login = useRef();

  return (
    <div className={styles.profilePageWrapper}>
      <Link ref={link2login} to={"/login"}></Link>

      <div className={styles.simpleHeader}>
        <HeaderBar isSimple={true} />
      </div>
      {globalSTT?.user ? (
        <div className={styles.profilePage}>
          <div className={styles.infos}>
            <span className={styles.title}>Thông tin tài khoản</span>
            <div className={styles.info}>
              <span className={styles.label}>Tên: </span>
              <span className={styles.value}>
                {globalSTT?.user?.tenNguoiDung}
              </span>
            </div>
            <div className={styles.info}>
              <span className={styles.label}>Số điện thoại: </span>
              <span className={styles.value}>
                {globalSTT?.user?.soDienThoai}
              </span>
            </div>
          </div>

          <div className={styles.methods}>
            <a href="#">Đổi mật khẩu</a>
            <Link to={"/order"}>Đơn hàng</Link>
            <a
              href="#"
              onClick={() => {
                setGLB(() => {
                  return {};
                });
                link2login.current.click();
              }}
            >
              Đăng xuất
            </a>
          </div>
        </div>
      ) : (
        <LoadingPanel />
      )}
    </div>
  );
}

export default ProfilePage;
