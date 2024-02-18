import styles from "./styles.module.scss";

function HeaderSlideItem({ text, imageSrc }) {
  return (
    <div
      className={styles.headerSlideItemWrapper}
      style={{
        backgroundImage: `url("${imageSrc}")`,
      }}
    >
      <span>{text}</span>
    </div>
  );
}

export default HeaderSlideItem;
