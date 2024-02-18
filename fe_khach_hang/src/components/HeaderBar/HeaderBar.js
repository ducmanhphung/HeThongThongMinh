import { useGlobal } from "@hooks";
import styles from "./styles.module.scss";
import Button from "@components/Button/Button";
import HeaderSlide from "@components/HeaderSlide/HeaderSlide";
import Filter from "@components/Filter/Filter";
import { Link } from "react-router-dom";

function HeaderBar({ isSimple }) {
  const [globalState, setGlobalState] = useGlobal();

  const user = globalState["user"];

  return (
    <div className={styles.headerBarWrapper}>
      {isSimple === true ? (
        <div className={styles.banner}>
          <div className={styles.logo}>
            <Link to={"/"}>
              <img
                alt="logo"
                src="https://cms-prod.s3-sgn09.fptcloud.com/smalls/logo_web_a11ae0bbab.svg"
              />
            </Link>
          </div>
          <div className={styles.search}>
            <input placeholder="Tìm kiếm . . ." />
          </div>
          <div className={styles.functions}>
            {user ? (
              <div className={styles.tenNguoiDung}>
                <Link to={"/profile"}>{user.tenNguoiDung}</Link>
              </div>
            ) : (
              <>
                <Button>
                  <Link to="/register">Đăng kí</Link>
                </Button>
                <Button isActive={true}>
                  <Link to="/login">Đăng nhập</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.banner}>
            <div className={styles.logo}>
              <img
                alt="logo"
                src="https://cms-prod.s3-sgn09.fptcloud.com/smalls/logo_web_a11ae0bbab.svg"
              />
            </div>
            <div className={styles.search}>
              <input placeholder="Tìm kiếm . . ." />
            </div>
            <div className={styles.functions}>
              {user ? (
                <>
                  <div className={styles.tenNguoiDung}>
                    <Link to={"/profile"}>{user.tenNguoiDung}</Link>
                  </div>
                </>
              ) : (
                <>
                  <Button>
                    <Link to="/register">Đăng kí</Link>
                  </Button>
                  <Button isActive={true}>
                    {" "}
                    <Link to="/login">Đăng nhập</Link>{" "}
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className={styles.slide}>
            <HeaderSlide />
          </div>
          <div></div>
        </>
      )}
    </div>
  );
}

export default HeaderBar;
