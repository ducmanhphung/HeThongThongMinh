import style from "./style.module.scss";

function PageThongBao({ title, content }) {
  return (
    <div className={style.pageWrapper}>
      <div className={style.page}>
        <div className={style.header}></div>
        <div className={style.body}>
          <h1 className={style.title}>{title}</h1>
          <span className={style.content}>{content}</span>
        </div>
        <div className={style.footer}></div>
      </div>
    </div>
  );
}

export default PageThongBao;
