import { Spinner } from "react-bootstrap";
import styles from "./styles.module.scss";

function LoadingPanel() {
  return (
    <div className={styles.loadingPanelWrapper}>
      <Spinner />
    </div>
  );
}

export default LoadingPanel;
