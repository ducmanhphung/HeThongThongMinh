import { callAppPhanCum, checkRunApp } from "@api/PhanCum";
import Header from "@components/header/Header";
import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { Spinner } from "react-bootstrap";

function PhanCumPage() {
  const p = useRef();

  const [statusPhanCum, setSTTPC] = useState(-2);
  const [messagePhanCum, setMSPC] = useState("");

  useEffect(() => {
    setInterval(() => {
      checkRunApp(
        (res) => {
          const _data = res.data;
          if (statusPhanCum && statusPhanCum != _data.status)
            setSTTPC(_data.status);
          if (messagePhanCum != _data.message) setMSPC(_data.message);
        },
        (err) => {}
      );
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(`status: ${statusPhanCum}`);
  }, [statusPhanCum]);

  return (
    <div className={style.pageWrapper}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.page}>
        {statusPhanCum == 0 ? (
          <button
            className={style.button}
            onClick={() => {
              callAppPhanCum(
                (res) => {
                  console.log(res);
                },
                (err) => {
                  console.log(err);
                }
              );
            }}
          >
            Chạy chương trình phân cụm
          </button>
        ) : (
          <>
            <Spinner />
          </>
        )}
        <div className={style.notify}>
          <p ref={p}>{`Trạng thái: ${messagePhanCum}`}</p>
        </div>
      </div>
    </div>
  );
}

export default PhanCumPage;
