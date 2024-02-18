import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useGlobal } from "@hooks";
import { getAllNhom } from "@api/Nhom";
import { getAllThuongHieu } from "@api/ThuongHieu";

function Filter({ nhomHandle, thuongHieuHandle }) {
  const [groupLines, setGroupLines] = useState([]);
  const [brandLines, setBrandLines] = useState([]);

  useEffect(() => {
    getAllNhom(
      (res) => {
        setGroupLines(res.data);
      },
      (err) => {}
    );
    getAllThuongHieu(
      (res) => {
        setBrandLines(res.data);
      },
      (err) => {}
    );
  }, []);

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filterBar}>
        <div className={styles.selectBox}>
          <select
            id="brand"
            onChange={(e) => {
              thuongHieuHandle(e);
            }}
          >
            <option value={-1}>Tất cả</option>
            {brandLines.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.tenThuongHieu}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.selectBox}>
          <select
            id="type"
            onChange={(e) => {
              nhomHandle(e);
            }}
          >
            <option value={-1}>Tất cả</option>
            {groupLines.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.tenNhom}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filter;
