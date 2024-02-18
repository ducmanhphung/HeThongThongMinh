import { Link } from "react-router-dom";
import style from "./style.module.scss";

function PageNotFound() {
  return (
    <div className={style.pageWrapper}>
      <div className={style.page}>
        <div className={style.header}></div>
        <div className={style.body}>
          <h1>404</h1>
          <span>page not found</span>
          <Link to={"/"}>Home</Link>
        </div>
        <div className={style.footer}></div>
      </div>
    </div>
  );
}

export default PageNotFound;
