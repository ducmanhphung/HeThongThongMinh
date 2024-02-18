import HeaderBar from "@components/HeaderBar/HeaderBar";
import styles from "./styles.module.scss";

function FormDoiMK() {
  return (
    <div className={styles.formDoiMKWrapper}>
      <div className={styles.simpleHeader}>
        <HeaderBar isSimple={true} />
      </div>
      <div className={styles.formDoiMK}>
        <div className={styles.form}>
          <div className={styles.header}>
            <span className={styles.title}>Đổi mật khẩu</span>
          </div>
          <div className={styles.body}>
            <input placeholder="Nhập số điện thoại" />
            <input placeholder="Nhập mật khẩu cũ" />
            <input placeholder="Nhập mật khẩu mới" />
            <input placeholder="Nhập lại mật khẩu mới" />
          </div>
          <div className={styles.footer}>
            <div className={styles.btn}>
              <button>Đổi mật khẩu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDoiMK;
